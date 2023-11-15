import { IndexedDBProps } from "react-indexed-db-hook";

export const DBConfig: IndexedDBProps = {
    name: "ElektronikTeile",
    version: 1,
    objectStoresMeta: [
      {
        store: "parts",
        storeConfig: { keyPath: "partNumber", autoIncrement: false },
        storeSchema: [
            {name: "title", keypath: "title", options: {unique: false}},
            {name: "partNumber", keypath: "partNumber", options: {unique: true}},
            {name: "packageFormat", keypath: "packageFormat", options: {unique: false}},
            {name: "value", keypath: "value", options: {unique: false}},
            {name: "stock", keypath: "stock", options: {unique: false}},
            {name: "storage", keypath: "storage", options: {unique: false}},
            {name: "manufactorer", keypath: "manufactorer", options: {unique: false}},
            {name: "price", keypath: "price", options: {unique: false}},
            {name: "datasheetUrl", keypath: "datasheetUrl", options: {unique: false}}
        ],
      },
      {
        store: "storage",
        storeConfig: { keyPath: "id", autoIncrement: true },
        storeSchema: [
          { name: "name", keypath: "name", options: { unique: false } },
          { name: "email", keypath: "email", options: { unique: false } },
        ],
      }
    ],
  };