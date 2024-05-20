import { Refresh } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { ElectronicItem } from "./model/ElectronicItem";
import { DateTime } from "luxon";
import {
  CategoryNode,
  Configuration,
  ConfigurationParameters,
  KeywordRequest,
  KeywordSearchRequest,
  ProductSearchApi,
} from "./openapi";

export type UpdateProps = {
  item: ElectronicItem | undefined;
  onUpdate?: (item: ElectronicItem) => void;
};

function fetchToken(): Promise<string> {
  const tokenValidity = DateTime.fromISO(
    localStorage.getItem("token_validity") || "2016-12-20T12:24:15.123",
  );
  console.log(
    "token valid till " +
      tokenValidity +
      " (" +
      DateTime.now().diff(tokenValidity, "seconds").seconds +
      " ago)",
  );
  const clientId = localStorage.getItem("nexar-clientid");
  const clientSecret = localStorage.getItem("nexar-clientsecret");
  if (DateTime.now().diff(tokenValidity, "seconds").seconds >= 0) {
    console.log("fetching new access token");
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
    };
    return fetch("https://api.digikey.com/v1/oauth2/token", options).then(
      async (response) => {
        let resp: any = await response.json();
        localStorage.setItem("token", resp["access_token"]);
        localStorage.setItem(
          "token_validity",
          DateTime.now().plus({ seconds: resp["expires_in"] }).toISO(),
        );
        return resp["access_token"] as string;
      },
      () => {
        return localStorage.getItem("token") || "";
      },
    );
  } else {
    console.log("token up to date from " + tokenValidity);
  }
  return new Promise<string>((res) => {
    res(localStorage.getItem("token") || "");
  });
}

const flatten = (data: CategoryNode[]) => {
  return data.reduce((r, { childCategories, ...rest }) => {
    r.push(rest);
    if (childCategories) r.push(...flatten(childCategories));
    return r;
  }, [] as CategoryNode[]);
};

async function updateFromDigikey(
  token: string,
  item?: ElectronicItem,
): Promise<ElectronicItem> {
  const clientId = localStorage.getItem("nexar-clientid");
  let api = new ProductSearchApi(
    new Configuration({
      accessToken: `Bearer ${token}`,
    } as ConfigurationParameters),
  );
  return await api
    .keywordSearch({
      body: {
        keywords: item?.partNumber || "",
        limit: 1,
        offset: 0,
      } as KeywordRequest,
      xDIGIKEYClientId: clientId,
      authorization: `Bearer ${token}`,
      xDIGIKEYLocaleCurrency: "EUR",
      xDIGIKEYLocaleLanguage: "de",
    } as KeywordSearchRequest)
    .then((response) => {
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
          if (attr.parameterText && attr.valueText)
            map.set(attr.parameterText, attr.valueText);
          return map;
        }, new Map<string, string>()),
        tags: flatten([result?.category || ({} as CategoryNode)]).map(
          (cat) => cat.name,
        ),
        stock: item?.stock,
        storage: item?.storage,
      } as ElectronicItem;
    });
}

export default function UpdateAttributesFromDigikey(props: UpdateProps) {
  return (
    <IconButton
      aria-label="refresh data"
      onClick={() => {
        fetchToken()
          .then((token) => updateFromDigikey(token, props.item))
          .then((updatedItem) => {
            if (props.onUpdate) props.onUpdate(updatedItem);
          });
      }}
    >
      <Refresh />
    </IconButton>
  );
}
