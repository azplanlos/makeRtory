/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n          query specAttributes($search: String!) {\n            supSearchMpn(\n              q: $search\n              filters: { case_package: ["DIP"] }\n              limit: 1\n              country: "DE"\n              currency: "EUR"\n              inStockOnly: true\n            ) {\n              hits\n              results {\n                part {\n                  name\n                  bestDatasheet {\n                    name\n                    url\n                  }\n                  manufacturer {\n                    name\n                  }\n                  bestImage {\n                    url\n                  }\n                  descriptions {\n                    text\n                  }\n                  sellers(includeBrokers: false, authorizedOnly: true) {\n                    company {\n                      name\n                    }\n                    country\n                  }\n                  specs {\n                    attribute {\n                      name\n                    }\n                    displayValue\n                  }\n                  medianPrice1000 {\n                    convertedPrice\n                    convertedCurrency\n                    currency\n                  }\n                }\n              }\n            }\n          }\n        ':
    types.SpecAttributesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n          query specAttributes($search: String!) {\n            supSearchMpn(\n              q: $search\n              filters: { case_package: ["DIP"] }\n              limit: 1\n              country: "DE"\n              currency: "EUR"\n              inStockOnly: true\n            ) {\n              hits\n              results {\n                part {\n                  name\n                  bestDatasheet {\n                    name\n                    url\n                  }\n                  manufacturer {\n                    name\n                  }\n                  bestImage {\n                    url\n                  }\n                  descriptions {\n                    text\n                  }\n                  sellers(includeBrokers: false, authorizedOnly: true) {\n                    company {\n                      name\n                    }\n                    country\n                  }\n                  specs {\n                    attribute {\n                      name\n                    }\n                    displayValue\n                  }\n                  medianPrice1000 {\n                    convertedPrice\n                    convertedCurrency\n                    currency\n                  }\n                }\n              }\n            }\n          }\n        ',
): (typeof documents)['\n          query specAttributes($search: String!) {\n            supSearchMpn(\n              q: $search\n              filters: { case_package: ["DIP"] }\n              limit: 1\n              country: "DE"\n              currency: "EUR"\n              inStockOnly: true\n            ) {\n              hits\n              results {\n                part {\n                  name\n                  bestDatasheet {\n                    name\n                    url\n                  }\n                  manufacturer {\n                    name\n                  }\n                  bestImage {\n                    url\n                  }\n                  descriptions {\n                    text\n                  }\n                  sellers(includeBrokers: false, authorizedOnly: true) {\n                    company {\n                      name\n                    }\n                    country\n                  }\n                  specs {\n                    attribute {\n                      name\n                    }\n                    displayValue\n                  }\n                  medianPrice1000 {\n                    convertedPrice\n                    convertedCurrency\n                    currency\n                  }\n                }\n              }\n            }\n          }\n        '];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
