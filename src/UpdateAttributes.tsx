import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  concat,
} from "@apollo/client";
import { Refresh } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { ElectronicItem } from "./model/ElectronicItem";
import { AsyncStorageWrapper, persistCache } from "apollo3-cache-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { graphql } from "./gql";
import { SpecAttributesQuery } from "./gql/graphql";
import { DateTime } from "luxon";
import { CategoryNode, Configuration, ConfigurationParameters, KeywordRequest, KeywordSearchRequest, ProductSearchApi } from "./openapi";


const httpLink = new HttpLink({ uri: "https://api.nexar.com/graphql/" });

const authMiddleware = new ApolloLink(
  (
    operation: {
      setContext: (arg0: { headers: { authorization: string } }) => void;
    },
    forward: (arg0: any) => any
  ) => {
    // add the authorization to the headers
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
    return forward(operation);
  }
);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: cache,
});

await persistCache({
  cache,
  storage: new AsyncStorageWrapper(AsyncStorage),
});

function updateAttributes(props: UpdateProps, token: string) {
  if (props.item !== undefined && props.item !== null) {
    console.log("updating from oktopart");
    client
      .query<SpecAttributesQuery>({
        query: graphql(`
          query specAttributes($search: String!) {
            supSearchMpn(
              q: $search
              filters: { case_package: ["DIP"] }
              limit: 1
              country: "DE"
              currency: "EUR"
              inStockOnly: true
            ) {
              hits
              results {
                part {
                  name
                  bestDatasheet {
                    name
                    url
                  }
                  manufacturer {
                    name
                  }
                  bestImage {
                    url
                  }
                  descriptions {
                    text
                  }
                  sellers(includeBrokers: false, authorizedOnly: true) {
                    company {
                      name
                    }
                    country
                  }
                  specs {
                    attribute {
                      name
                    }
                    displayValue
                  }
                  medianPrice1000 {
                    convertedPrice
                    convertedCurrency
                    currency
                  }
                }
              }
            }
          }
        `),
        variables: {
          search: props.item?.partNumber ?? "",
        },
      })
      .then(async (result) => {
        if (
          result.data.supSearchMpn.results !== undefined &&
          result.data.supSearchMpn.results !== null &&
          (result.data.supSearchMpn.results?.length ?? 0 > 0)
        ) {
          const bestResult = result.data.supSearchMpn.results[0].part;
          console.log("found part " + bestResult.name);
          if (props.item !== undefined) {
            props.item.title = bestResult.name;
            props.item.datasheetUrl = bestResult.bestDatasheet?.url;
            props.item.price = bestResult.medianPrice1000?.convertedPrice;
            props.item.description = bestResult.descriptions[0].text;
            props.item.manufactorer = bestResult.manufacturer.name;
            if (props.item.attributes == null) {
              props.item.attributes = new Map();
            }
            bestResult.specs.forEach(attr => {
              props.item?.attributes?.set(attr.attribute.name, attr.displayValue);
            });
            props.item.imageUrl = bestResult.bestImage?.url;
            console.log(props.item);
            if (props.item !== undefined && props.item !== null && props.onUpdate !== undefined) {
              props.onUpdate(props.item);
            }
          }
        }
      });
  }
}

export type UpdateProps = {
  item: ElectronicItem | undefined;
  onUpdate?: (item: ElectronicItem) => void;
};

function fetchToken(): Promise<string> {
  const tokenValidity = DateTime.fromISO(localStorage.getItem("token_validity") || "2016-12-20T12:24:15.123")
  console.log("token valid till " + tokenValidity + " (" + DateTime.now().diff(tokenValidity, 'seconds').seconds + " ago)");
    const clientId = localStorage.getItem('nexar-clientid');
    const clientSecret = localStorage.getItem('nexar-clientsecret');
    if (DateTime.now().diff(tokenValidity, 'seconds').seconds >= 0) {
      console.log("fetching new access token");
      let options = {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `client_id=${ clientId }&client_secret=${ clientSecret }&grant_type=client_credentials`
      }
      return fetch("https://api.digikey.com/v1/oauth2/token", options).then( async response => {
        let resp: any = await (response.json())
        localStorage.setItem("token", resp['access_token']);
        localStorage.setItem("token_validity", DateTime.now().plus({seconds: resp['expires_in']}).toISO())
        return resp['access_token'] as string;
      }, error => {
        return localStorage.getItem("token") || ""
      }
      )
    } else {
      console.log("token up to date from " + tokenValidity);
    }
    return new Promise<string>((res, rej) => {
      res(localStorage.getItem("token") || "")
  });
}

const flatten = (data: CategoryNode[]) => {
  return data.reduce((r, { childCategories, ...rest}) => {
    r.push(rest);
    if (childCategories) r.push(...flatten(childCategories));
    return r;
  }, [] as CategoryNode[])
};

async function updateFromDigikey(token: string, item?: ElectronicItem): Promise<ElectronicItem> {
  const clientId = localStorage.getItem('nexar-clientid');
  let api = new ProductSearchApi(new Configuration({accessToken: `Bearer ${token}`} as ConfigurationParameters));
  return await api.keywordSearch({
    body: {keywords: item?.partNumber || "", limit: 1, offset: 0} as KeywordRequest, 
    xDIGIKEYClientId: clientId, 
    authorization: `Bearer ${token}`, 
    xDIGIKEYLocaleCurrency: 'EUR', 
    xDIGIKEYLocaleLanguage: 'de'
  } as KeywordSearchRequest)
    .then(response => {
      console.log(response);
      const result = response.products?.at(0);
      return {
        title: item?.title, 
        partNumber: item?.partNumber, 
        description: result?.description?.detailedDescription,
        datasheetUrl: result?.datasheetUrl,
        imageUrl: result?.photoUrl,
        manufactorer: result?.manufacturer?.name,
        price: result?.unitPrice,
        attributes: result?.parameters?.reduce((map, attr) => {
          if (attr.parameterText && attr.valueText) map.set(attr.parameterText, attr.valueText);
          return map;
        }, new Map<string, string>()),
        tags: flatten([result?.category || {} as CategoryNode]).map(cat => cat.name),
        stock: item?.stock,
        storage: item?.storage
      } as ElectronicItem;
  });
}

export default function UpdateAttributesFromOkopart(props: UpdateProps) {
  return (
    <IconButton
      aria-label="refresh data"
      onClick={() => {
        fetchToken().then(token => updateFromDigikey(token, props.item)).then(updatedItem => {
          if (props.onUpdate) props.onUpdate(updatedItem);}
        );
      }
    }
    >
      <Refresh />
    </IconButton>
  );
}
