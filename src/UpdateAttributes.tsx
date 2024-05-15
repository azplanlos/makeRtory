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

function updateAttributes(props: UpdateProps) {
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

export default function UpdateAttributesFromOkopart(props: UpdateProps) {
  return (
    <IconButton
      aria-label="refresh data"
      onClick={() => updateAttributes(props)}
    >
      <Refresh />
    </IconButton>
  );
}
