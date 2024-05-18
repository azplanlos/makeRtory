/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Any: { input: any; output: any };
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: { input: any; output: any };
  /** The built-in `Decimal` scalar type. */
  Decimal: { input: any; output: any };
  /** The `Long` scalar type represents non-fractional signed whole 64-bit numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: { input: any; output: any };
  Map: { input: any; output: any };
  /** The multiplier path scalar represents a valid GraphQL multiplier path string. */
  MultiplierPath: { input: any; output: any };
  Time: { input: any; output: any };
};

/** An application belonging to an organization which facilitates access. Users interact with the Nexar API through applications. */
export type AdmApplication = {
  __typename?: "AdmApplication";
  /** When this application was created. */
  createdDate: Scalars["DateTime"]["output"];
  /** Whether or not this application has been deleted. */
  deleted: Scalars["Boolean"]["output"];
  /** The description of this application. */
  description?: Maybe<Scalars["String"]["output"]>;
  /** A unique identifier for the application. */
  id: Scalars["String"]["output"];
  /** The name of this application. */
  name: Scalars["String"]["output"];
  /** The organization to which this application belongs. */
  organizationId?: Maybe<Scalars["String"]["output"]>;
  /** The scopes assigned to this application. */
  scopes: Array<AdmApplicationScope>;
  /** Security detail for this application, such as its client id and secret. */
  security: AdmApplicationSecurity;
  /** Information about supply quota if this application has the supply scope. */
  supplyCounts?: Maybe<AdmSupplyCounts>;
};

/** A scope for an application, e.g. design, supply or manufacturing. */
export type AdmApplicationScope = {
  __typename?: "AdmApplicationScope";
  /** The application to which this scope applies. */
  applicationId: Scalars["String"]["output"];
  /** The scope to which the application has been granted access. */
  scope: Scalars["String"]["output"];
};

/** Security access details for an application. */
export type AdmApplicationSecurity = {
  __typename?: "AdmApplicationSecurity";
  /** The application to which this scope applies. */
  applicationId: Scalars["String"]["output"];
  /** The unique client id for this application. */
  clientId: Scalars["String"]["output"];
  /** The unique client secret for this application. Guard this secret carefully! */
  clientSecret: Scalars["String"]["output"];
};

export enum AdmEventType {
  ApiCustomEvent = "API_CUSTOM_EVENT",
}

/** An `AdmEvtCustomEvent` is an entity representing a message generaged from the API. */
export type AdmEvtCustomEvent = {
  __typename?: "AdmEvtCustomEvent";
  /** Time of event creation. */
  createdAt: Scalars["DateTime"]["output"];
  /** `customData` is extra user specified data attached to the a Custom Event. */
  customData?: Maybe<Scalars["String"]["output"]>;
  /** Identifier of the application to receive the event. */
  destinationApplicationId: Scalars["String"]["output"];
  /** The unique Identifier for this message. */
  id: Scalars["String"]["output"];
  /** Identifier of the application which generated the event (null if system generated). */
  senderApplicationId?: Maybe<Scalars["String"]["output"]>;
  /** Identifier of object which the event was generated for (project, workspace, part, etc). */
  subject?: Maybe<Scalars["String"]["output"]>;
  type: AdmEventType;
  /** Unique global identifier of the user generating the event (null if client credentials are used). */
  userId?: Maybe<Scalars["String"]["output"]>;
};

/** An `AdmEvtSendAppNotificationInput` the input object for the `admEvtSendAppNotification` mutation. */
export type AdmEvtSendAppNotificationInput = {
  /** customData is destination application specified extra data. */
  customData?: InputMaybe<Scalars["Any"]["input"]>;
  /** Identifier of application to send notification event. */
  destinationApplicationId: Scalars["String"]["input"];
  /** Identifier of object the event is generate for (project, workspace, part, etc). */
  subject?: InputMaybe<Scalars["String"]["input"]>;
};

/** An `AdmEvtSendAppNotificationPayload` is the return value for the `admEvtSendAppNotification` mutation. */
export type AdmEvtSendAppNotificationPayload = {
  __typename?: "AdmEvtSendAppNotificationPayload";
  /** `errors` found during execution. */
  errors?: Maybe<Array<AdmRequestError>>;
  /** `event` is the underlying sent event if available. */
  event?: Maybe<AdmEvtCustomEvent>;
};

/** An Organization is an entity representing a partner, company or individual engaging with Nexar. */
export type AdmOrganization = {
  __typename?: "AdmOrganization";
  /** The applications belonging to this organization through which users interact with the API. */
  applications: Array<AdmApplication>;
  /** When this organization was created. */
  createdDate: Scalars["DateTime"]["output"];
  /** A unique identifier for the organization. */
  id: Scalars["String"]["output"];
  /** Invitations sent for others to join this organization. */
  invitations: Array<AdmUserInvitation>;
  /** Whether this is the current user's default organization. */
  isDefault: Scalars["Boolean"]["output"];
  /** The name of this organization. */
  name: Scalars["String"]["output"];
  /** The users belonging to this organization. */
  users: Array<AdmUser>;
};

export type AdmRequestError = {
  __typename?: "AdmRequestError";
  code: Scalars["String"]["output"];
  message: Scalars["String"]["output"];
};

/** Supply count information for supply applications. */
export type AdmSupplyCounts = {
  __typename?: "AdmSupplyCounts";
  /** The count of supply parts used this month. */
  partCounter: Scalars["Int"]["output"];
  /** The monthly quota of parts which can be returned through supply API queries. */
  partLimit: Scalars["Int"]["output"];
};

/** A user represents and individual who can login to Nexar and interact with API through applications of this organization. */
export type AdmUser = {
  __typename?: "AdmUser";
  /** When the user was created in the system. */
  createdDate: Scalars["DateTime"]["output"];
  /** The user's first name. */
  firstName: Scalars["String"]["output"];
  /** A unique identifier for the user. */
  id: Scalars["String"]["output"];
  /** The user's last name. */
  lastName: Scalars["String"]["output"];
  /** The email address for the user used as their username. */
  userName: Scalars["String"]["output"];
};

/** An invitation sent for a user to join an invitation. */
export type AdmUserInvitation = {
  __typename?: "AdmUserInvitation";
  /** Whether or not the user accepted the invitation to join the organization. */
  accepted: Scalars["Boolean"]["output"];
  /** The email of the user receiving the invitation to join the organization. */
  email?: Maybe<Scalars["String"]["output"]>;
  /** The organization to which the user has been invited. */
  organizationId?: Maybe<Scalars["String"]["output"]>;
};

export enum ApplyPolicy {
  AfterResolver = "AFTER_RESOLVER",
  BeforeResolver = "BEFORE_RESOLVER",
  Validation = "VALIDATION",
}

export type BooleanOperationFilterInput = {
  eq?: InputMaybe<Scalars["Boolean"]["input"]>;
  neq?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type ComparableDateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars["DateTime"]["input"]>;
  gt?: InputMaybe<Scalars["DateTime"]["input"]>;
  gte?: InputMaybe<Scalars["DateTime"]["input"]>;
  in?: InputMaybe<Array<Scalars["DateTime"]["input"]>>;
  lt?: InputMaybe<Scalars["DateTime"]["input"]>;
  lte?: InputMaybe<Scalars["DateTime"]["input"]>;
  neq?: InputMaybe<Scalars["DateTime"]["input"]>;
  ngt?: InputMaybe<Scalars["DateTime"]["input"]>;
  ngte?: InputMaybe<Scalars["DateTime"]["input"]>;
  nin?: InputMaybe<Array<Scalars["DateTime"]["input"]>>;
  nlt?: InputMaybe<Scalars["DateTime"]["input"]>;
  nlte?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type ComparableInt32OperationFilterInput = {
  eq?: InputMaybe<Scalars["Int"]["input"]>;
  gt?: InputMaybe<Scalars["Int"]["input"]>;
  gte?: InputMaybe<Scalars["Int"]["input"]>;
  in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  lt?: InputMaybe<Scalars["Int"]["input"]>;
  lte?: InputMaybe<Scalars["Int"]["input"]>;
  neq?: InputMaybe<Scalars["Int"]["input"]>;
  ngt?: InputMaybe<Scalars["Int"]["input"]>;
  ngte?: InputMaybe<Scalars["Int"]["input"]>;
  nin?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  nlt?: InputMaybe<Scalars["Int"]["input"]>;
  nlte?: InputMaybe<Scalars["Int"]["input"]>;
};

export type ComparableNullableOfDoubleOperationFilterInput = {
  eq?: InputMaybe<Scalars["Float"]["input"]>;
  gt?: InputMaybe<Scalars["Float"]["input"]>;
  gte?: InputMaybe<Scalars["Float"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Float"]["input"]>>>;
  lt?: InputMaybe<Scalars["Float"]["input"]>;
  lte?: InputMaybe<Scalars["Float"]["input"]>;
  neq?: InputMaybe<Scalars["Float"]["input"]>;
  ngt?: InputMaybe<Scalars["Float"]["input"]>;
  ngte?: InputMaybe<Scalars["Float"]["input"]>;
  nin?: InputMaybe<Array<InputMaybe<Scalars["Float"]["input"]>>>;
  nlt?: InputMaybe<Scalars["Float"]["input"]>;
  nlte?: InputMaybe<Scalars["Float"]["input"]>;
};

export type DatBomAnalysis = {
  __typename?: "DatBomAnalysis";
  items: Array<DatBomPartItem>;
  level: DatBomAnalysisLevel;
  message: Scalars["String"]["output"];
};

export enum DatBomAnalysisLevel {
  Error = "ERROR",
  Suggestion = "SUGGESTION",
  Warning = "WARNING",
}

export type DatBomCategory = {
  __typename?: "DatBomCategory";
  categoryID: Scalars["Int"]["output"];
};

export type DatBomItemInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  designator?: InputMaybe<Scalars["String"]["input"]>;
  itemRefId?: InputMaybe<Scalars["String"]["input"]>;
  manufacturerName?: InputMaybe<Scalars["String"]["input"]>;
  mpn?: InputMaybe<Scalars["String"]["input"]>;
};

export type DatBomPart = {
  __typename?: "DatBomPart";
  confidence: Scalars["Float"]["output"];
  partId: Scalars["String"]["output"];
  strategy: DatBomPartSearchStrategy;
};

export type DatBomPartHistory = {
  __typename?: "DatBomPartHistory";
  threeMonthGrowthPercentage: Scalars["Float"]["output"];
};

export type DatBomPartItem = {
  __typename?: "DatBomPartItem";
  alternateCandidatePartIds?: Maybe<Array<Scalars["String"]["output"]>>;
  itemRefId?: Maybe<Scalars["String"]["output"]>;
  partId: Scalars["String"]["output"];
  quantity: Scalars["Int"]["output"];
};

export type DatBomPartItemInput = {
  alternateCandidatePartIds?: InputMaybe<Array<Scalars["String"]["input"]>>;
  itemRefId?: InputMaybe<Scalars["String"]["input"]>;
  partId: Scalars["String"]["input"];
  quantity: Scalars["Int"]["input"];
};

export enum DatBomPartSearchStrategy {
  Exact = "EXACT",
  Fuzzy = "FUZZY",
  Partial = "PARTIAL",
}

export type DatBomPartsResult = {
  __typename?: "DatBomPartsResult";
  itemRefId?: Maybe<Scalars["String"]["output"]>;
  parts: Array<DatBomPart>;
};

export type DatEddiCategory = {
  __typename?: "DatEddiCategory";
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
};

export type DatEddiCategoryFilterInput = {
  and?: InputMaybe<Array<DatEddiCategoryFilterInput>>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<DatEddiCategoryFilterInput>>;
};

export type DatEddiEdition = {
  __typename?: "DatEddiEdition";
  eddiTimeSeries: Array<DatEddiTimeSeries>;
  id: Scalars["Int"]["output"];
  releaseDate: Scalars["DateTime"]["output"];
  title: Scalars["String"]["output"];
};

export type DatEddiEditionEddiTimeSeriesArgs = {
  where?: InputMaybe<DatEddiTimeSeriesFilterInput>;
};

export type DatEddiEditionFilterInput = {
  and?: InputMaybe<Array<DatEddiEditionFilterInput>>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<DatEddiEditionFilterInput>>;
  releaseDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  title?: InputMaybe<StringOperationFilterInput>;
};

export type DatEddiIndex = {
  __typename?: "DatEddiIndex";
  demandIndex?: Maybe<Scalars["Float"]["output"]>;
  indexDate: Scalars["DateTime"]["output"];
  supplyIndex?: Maybe<Scalars["Float"]["output"]>;
};

export type DatEddiIndexFilterInput = {
  and?: InputMaybe<Array<DatEddiIndexFilterInput>>;
  demandIndex?: InputMaybe<ComparableNullableOfDoubleOperationFilterInput>;
  indexDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  or?: InputMaybe<Array<DatEddiIndexFilterInput>>;
  supplyIndex?: InputMaybe<ComparableNullableOfDoubleOperationFilterInput>;
};

export type DatEddiTimeSeries = {
  __typename?: "DatEddiTimeSeries";
  category?: Maybe<DatEddiCategory>;
  children?: Maybe<Array<DatEddiTimeSeries>>;
  indices: Array<DatEddiIndex>;
};

export type DatEddiTimeSeriesChildrenArgs = {
  where?: InputMaybe<DatEddiTimeSeriesFilterInput>;
};

export type DatEddiTimeSeriesIndicesArgs = {
  where?: InputMaybe<DatEddiIndexFilterInput>;
};

export type DatEddiTimeSeriesFilterInput = {
  and?: InputMaybe<Array<DatEddiTimeSeriesFilterInput>>;
  category?: InputMaybe<DatEddiCategoryFilterInput>;
  or?: InputMaybe<Array<DatEddiTimeSeriesFilterInput>>;
};

/** A generic `dat` domain error. */
export type DatError = {
  /** A short description of the error. */
  message: Scalars["String"]["output"];
};

/** A mapping to rename column headers in the CSV to known fields */
export type DatScrColumnMapInput = {
  /** Name of the CSV column that corresponds to the estimated annual usage */
  eau?: InputMaybe<Scalars["String"]["input"]>;
  /** Name of the CSV column that corresponds to the name of the manufacturer */
  manufacturer?: InputMaybe<Scalars["String"]["input"]>;
  /** Name of the CSV column that corresponds to the manufacturer's part number */
  mpn?: InputMaybe<Scalars["String"]["input"]>;
  /** Name of the CSV column that corresponds to an internal part number */
  pn?: InputMaybe<Scalars["String"]["input"]>;
};

/** Error indicating that the SCR processing run could not be deleted. */
export type DatScrCouldNotDeleteJobError = DatError & {
  __typename?: "DatScrCouldNotDeleteJobError";
  /** Job to be deleted. */
  job: DatScrJob;
  message: Scalars["String"]["output"];
};

export type DatScrCreateJobError =
  | DatScrQuotaExceededError
  | DatScrSubscriptionNotFoundError;

/** Input data to create an SCR job. */
export type DatScrCreateJobInput = {
  /** The name remapping of the CSV columns. */
  columnMapping?: InputMaybe<DatScrColumnMapInput>;
  /** The Nexar file ID which contains the data to process in CSV format. */
  fileId: Scalars["String"]["input"];
  /** A label to add to the job for easier reference. */
  label?: InputMaybe<Scalars["String"]["input"]>;
};

export type DatScrCreateJobPayload = {
  __typename?: "DatScrCreateJobPayload";
  datScrJob?: Maybe<DatScrJob>;
  errors?: Maybe<Array<DatScrCreateJobError>>;
};

export type DatScrDeleteJobError = DatScrCouldNotDeleteJobError;

/** Input data to delete an SCR job. */
export type DatScrDeleteJobInput = {
  /** The ID of the job to delete. */
  jobId: Scalars["String"]["input"];
};

export type DatScrDeleteJobPayload = {
  __typename?: "DatScrDeleteJobPayload";
  datScrJob?: Maybe<DatScrJob>;
  errors?: Maybe<Array<DatScrDeleteJobError>>;
};

/** Grouped SCR part information. */
export type DatScrIpnPartInfo = {
  __typename?: "DatScrIpnPartInfo";
  /** Number between 0 and 1 indicating what proportion of the past 365 days the globally available stock of at least one part in the group was at or above the input EAU value. */
  ipnHistoricalProcurability: Scalars["Float"]["output"];
};

/** Contains information about an SCR processing job. */
export type DatScrJob = {
  __typename?: "DatScrJob";
  /** The ID of this job. */
  jobId: Scalars["String"]["output"];
  /** A small message relating to running of the job. */
  jobMessage?: Maybe<Scalars["String"]["output"]>;
  /** The current state of the job. */
  jobState: DatScrJobState;
  /** An optional label to easily identify the job. */
  label?: Maybe<Scalars["String"]["output"]>;
  /** Statistics relating to the running of this job. */
  runStats?: Maybe<DatScrRunStats>;
  /** The date and time of when the job was requested. */
  uploadDatetime: Scalars["DateTime"]["output"];
  /** The ID of the user who owns the job. */
  userId: Scalars["String"]["output"];
};

/** Possible states of an SCR processing run. */
export enum DatScrJobState {
  /** Job has completed successfully. */
  Completed = "COMPLETED",
  /** The job has failed to process the data. */
  Failed = "FAILED",
  /** The job is still processing the data. */
  Running = "RUNNING",
  /** Job is in an unknown state. */
  Unknown = "UNKNOWN",
}

export type DatScrModelInfo = {
  __typename?: "DatScrModelInfo";
  /** Number of days into the future that the SCR predictions are run for (estimatedDaysOfSupply and probableAvailabilityWindow). */
  predictionHorizonDays: Scalars["Int"]["output"];
};

/** SCR part information. */
export type DatScrPartInfo = {
  __typename?: "DatScrPartInfo";
  /** Estimated number of days into the future that the total global stock for a part is predicted to remain above the EAU value, assuming the part is not restocked. */
  estimatedDaysOfSupply?: Maybe<Scalars["Int"]["output"]>;
  /** Number between 0 and 1 that indicates what proportion of the last 365 days that a part’s globally available stock was at or above the input EAU value. */
  historicalProcurability?: Maybe<Scalars["Float"]["output"]>;
  /** Weekly average of the total global stock available at franchised distributors for last week. */
  marketAvailability7dAgo?: Maybe<Scalars["Int"]["output"]>;
  /** Weekly average of the total global stock available at franchised distributors for two weeks ago. */
  marketAvailability14dAgo?: Maybe<Scalars["Int"]["output"]>;
  /** Weekly average of the total global stock available at franchised distributors for three weeks ago. */
  marketAvailability21dAgo?: Maybe<Scalars["Int"]["output"]>;
  /** Weekly average of the total global stock available at franchised distributors for four weeks ago. */
  marketAvailability28dAgo?: Maybe<Scalars["Int"]["output"]>;
  /** Weekly average of the total global stock available at franchised distributors over the past week. */
  marketAvailabilityToday?: Maybe<Scalars["Int"]["output"]>;
  /** Monthly averages of the total global stock available at franchised distributors for the last 11 full calendar months. */
  monthlyMarketAvailability?: Maybe<Array<Scalars["Int"]["output"]>>;
  /** Estimated number of days into the future that the total global stock for a part is predicted to remain above the EAU value, including predicted restock events. */
  probableAvailabilityWindow?: Maybe<Scalars["Float"]["output"]>;
  /** Risk rating for the procurability of this part. */
  rating?: Maybe<DatScrPartInfoRating>;
};

/** Input data for an SCR part information query. */
export type DatScrPartInfoInput = {
  /** Estimated Annual Usage (EAU) as a number of pieces. */
  eau: Scalars["Int"]["input"];
  /** Part ID, as returned from an Octopart supply data query. */
  partId: Scalars["String"]["input"];
};

/** Possible levels of an SCR part rating. */
export enum DatScrPartInfoRating {
  /** This part has had occasional procurement issues in the past 12 months or availability has trended down significantly in the last quarter. */
  Amber = "AMBER",
  /** This part has been procurable for the past 12 months and is predicted to be available in your desired quantity for 2+ months. */
  Green = "GREEN",
  /** This part has had a volatile supply or been mainly unavailable in the past 12 months or is predicted to be unavailable in your desired quantity in the next 2 months. */
  Red = "RED",
}

/** Error indicates that the user has exceeded their quota. */
export type DatScrQuotaExceededError = DatError & {
  __typename?: "DatScrQuotaExceededError";
  message: Scalars["String"]["output"];
  /** The number of allowed parts resolved for the current period. */
  quota: Scalars["Int"]["output"];
  /** The number of distinct parts resolved for the user in the current period. */
  usage: Scalars["Int"]["output"];
};

/** A supply-chain resilience report. */
export type DatScrReport = {
  __typename?: "DatScrReport";
  /** A URL to download this report. */
  downloadUrl: Scalars["String"]["output"];
  /** The SCR job that created this report. */
  jobId: Scalars["String"]["output"];
};

/** Statistics relating to the running of a job. Procurability here is with respect to a given EAU (estimated annual usage). */
export type DatScrRunStats = {
  __typename?: "DatScrRunStats";
  /** Number of parts that were procurable last week that are now non-procurable. */
  numDestocked?: Maybe<Scalars["Int"]["output"]>;
  /** Number of parts with a historical procurability between zero and one. */
  numHpIntervalParts?: Maybe<Scalars["Int"]["output"]>;
  /** Number of parts with complete historical procurability. */
  numHpOneParts?: Maybe<Scalars["Int"]["output"]>;
  /** Number of parts with no historical procurability. */
  numHpZeroParts?: Maybe<Scalars["Int"]["output"]>;
  /** Number of parts that were procurable seven days ago. */
  numProc7dAgo?: Maybe<Scalars["Int"]["output"]>;
  /** Number of parts that were procurable 14 days ago. */
  numProc14dAgo?: Maybe<Scalars["Int"]["output"]>;
  /** Number of parts that were procurable 21 days ago. */
  numProc21dAgo?: Maybe<Scalars["Int"]["output"]>;
  /** Number of parts that were procurable 28 days ago. */
  numProc28dAgo?: Maybe<Scalars["Int"]["output"]>;
  /** Number of parts that are currently procurable. */
  numProcCurrent?: Maybe<Scalars["Int"]["output"]>;
  /** Total number of parts resolved. */
  numResolvedParts?: Maybe<Scalars["Int"]["output"]>;
  /** Number of parts that were not procurable last week that are now procurable. */
  numRestocked?: Maybe<Scalars["Int"]["output"]>;
  /** Total number of parts requested for processing. */
  numTotalParts?: Maybe<Scalars["Int"]["output"]>;
};

/** Error indicates that an SCR subscription could not be found. */
export type DatScrSubscriptionNotFoundError = DatError & {
  __typename?: "DatScrSubscriptionNotFoundError";
  message: Scalars["String"]["output"];
};

/** User's metered usage statistics. */
export type DatScrUsage = {
  __typename?: "DatScrUsage";
  /** Total number of distinct resolved parts within the current period. */
  countDistinctParts: Scalars["Int"]["output"];
  /** The start date of the current period. */
  fromDate: Scalars["String"]["output"];
  /** Allowed quota of the user within the current period. */
  quota: Scalars["Int"]["output"];
};

export type DateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars["DateTime"]["input"]>;
  gt?: InputMaybe<Scalars["DateTime"]["input"]>;
  gte?: InputMaybe<Scalars["DateTime"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  lt?: InputMaybe<Scalars["DateTime"]["input"]>;
  lte?: InputMaybe<Scalars["DateTime"]["input"]>;
  neq?: InputMaybe<Scalars["DateTime"]["input"]>;
  ngt?: InputMaybe<Scalars["DateTime"]["input"]>;
  ngte?: InputMaybe<Scalars["DateTime"]["input"]>;
  nin?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  nlt?: InputMaybe<Scalars["DateTime"]["input"]>;
  nlte?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type DesAddUsersToGroupInput = {
  /** The group node ID. */
  id: Scalars["ID"]["input"];
  /** User IDs. */
  userIds: Array<Scalars["String"]["input"]>;
};

export type DesAddUsersToGroupPayload = {
  __typename?: "DesAddUsersToGroupPayload";
  errors: Array<DesPayloadError>;
};

export type DesArea = {
  __typename?: "DesArea";
  x: Scalars["Float"]["output"];
  xMils2: Scalars["Decimal"]["output"];
  xMm2: Scalars["Decimal"]["output"];
};

export type DesAssemblyDrawings = {
  __typename?: "DesAssemblyDrawings";
  assemblyDrawingFiles: Array<DesDownloadableFile>;
  downloadUrl?: Maybe<Scalars["String"]["output"]>;
  packageName?: Maybe<Scalars["String"]["output"]>;
};

/** A Bill of Materials (BOM) contains a list of all of the parts needed for the assembly of a PCB. */
export type DesBom = Node & {
  __typename?: "DesBom";
  /** The list of each unique part within the BOM. */
  bomItems: Array<DesBomItem>;
  /** The node identifier for this BOM (used by `desBomById`). */
  id: Scalars["ID"]["output"];
};

/** A Bill of Materials (BOM) item contains usage information for a unique component on the PCB. */
export type DesBomItem = {
  __typename?: "DesBomItem";
  /** The list of each instance of this BOM item. */
  bomItemInstances: Array<DesBomItemInstance>;
  /** The detailed component information for this BOM item. */
  component: DesComponent;
  /** The total number of times this item is used. */
  quantity: Scalars["Int"]["output"];
};

/** A Bill of Materials (BOM) item instance contains information for one specific use case of the item. */
export type DesBomItemInstance = {
  __typename?: "DesBomItemInstance";
  /** The unique label for this item. */
  designator: Scalars["String"]["output"];
  /** The variant use status for this item. */
  isFitted: Scalars["Boolean"]["output"];
};

export type DesCadBendingLine = {
  __typename?: "DesCadBendingLine";
  affectedRegions?: Maybe<Array<Scalars["String"]["output"]>>;
  angle: Scalars["Float"]["output"];
  endPoint: DesCadPoint;
  foldIndex: Scalars["Int"]["output"];
  radius: Scalars["Int"]["output"];
  startPoint: DesCadPoint;
};

export type DesCadBendingLineInput = {
  affectedRegions?: InputMaybe<Array<Scalars["String"]["input"]>>;
  angle?: InputMaybe<Scalars["Float"]["input"]>;
  endPoint?: InputMaybe<DesCadBoardPointInput>;
  foldIndex?: InputMaybe<Scalars["Int"]["input"]>;
  radius?: InputMaybe<Scalars["Int"]["input"]>;
  startPoint?: InputMaybe<DesCadBoardPointInput>;
};

export type DesCadBoard3DBodyModelData = {
  __typename?: "DesCadBoard3DBodyModelData";
  color?: Maybe<Scalars["Long"]["output"]>;
  isEcadProvidesRaw3DModel: Scalars["Boolean"]["output"];
  localTestFileName?: Maybe<Scalars["String"]["output"]>;
  modelDisplayName?: Maybe<Scalars["String"]["output"]>;
  modelFileExtension?: Maybe<Scalars["String"]["output"]>;
  modelFileHash?: Maybe<Scalars["String"]["output"]>;
  modelFilePath?: Maybe<Scalars["String"]["output"]>;
  modelIdOnServer?: Maybe<Scalars["String"]["output"]>;
  modelNetName?: Maybe<Scalars["String"]["output"]>;
  modelPartName?: Maybe<Scalars["String"]["output"]>;
  opacity?: Maybe<Scalars["Float"]["output"]>;
};

export type DesCadBoard3DBodyModelDataInput = {
  color?: InputMaybe<Scalars["Long"]["input"]>;
  isEcadProvidesRaw3DModel?: InputMaybe<Scalars["Boolean"]["input"]>;
  localTestFileName?: InputMaybe<Scalars["String"]["input"]>;
  modelDisplayName?: InputMaybe<Scalars["String"]["input"]>;
  modelFileExtension?: InputMaybe<Scalars["String"]["input"]>;
  modelFileHash?: InputMaybe<Scalars["String"]["input"]>;
  modelFilePath?: InputMaybe<Scalars["String"]["input"]>;
  modelIdOnServer?: InputMaybe<Scalars["String"]["input"]>;
  modelNetName?: InputMaybe<Scalars["String"]["input"]>;
  modelPartName?: InputMaybe<Scalars["String"]["input"]>;
  opacity?: InputMaybe<Scalars["Float"]["input"]>;
};

export type DesCadBoardArea = {
  __typename?: "DesCadBoardArea";
  comment?: Maybe<Scalars["String"]["output"]>;
  designator?: Maybe<Scalars["String"]["output"]>;
  location: DesCadPoint;
  objectType: DesCadBoardObjectType;
  placement: DesCadBoardComponentPlacement;
  restrictsCopper: Scalars["Boolean"]["output"];
  restrictsSMDPad: Scalars["Boolean"]["output"];
  restrictsTHPad: Scalars["Boolean"]["output"];
  restrictsTrack: Scalars["Boolean"]["output"];
  restrictsVia: Scalars["Boolean"]["output"];
  rotation: Scalars["Float"]["output"];
  /** JSON serialized `GeometricShape`. */
  shapeJson?: Maybe<Scalars["String"]["output"]>;
  uniqueId?: Maybe<Scalars["String"]["output"]>;
};

export type DesCadBoardAreaInput = {
  comment?: InputMaybe<Scalars["String"]["input"]>;
  designator?: InputMaybe<Scalars["String"]["input"]>;
  location?: InputMaybe<DesCadBoardPointInput>;
  placement?: InputMaybe<DesCadBoardComponentPlacement>;
  restrictsCopper?: InputMaybe<Scalars["Boolean"]["input"]>;
  restrictsSMDPad?: InputMaybe<Scalars["Boolean"]["input"]>;
  restrictsTHPad?: InputMaybe<Scalars["Boolean"]["input"]>;
  restrictsTrack?: InputMaybe<Scalars["Boolean"]["input"]>;
  restrictsVia?: InputMaybe<Scalars["Boolean"]["input"]>;
  rotation?: InputMaybe<Scalars["Float"]["input"]>;
  /** JSON serialized `GeometricShape`. */
  shapeJson?: InputMaybe<Scalars["String"]["input"]>;
  uniqueId?: InputMaybe<Scalars["String"]["input"]>;
};

export enum DesCadBoardCollaborationFlag {
  BaselineUnitImperial = "BASELINE_UNIT_IMPERIAL",
  IgnoreDuplicatePadDesignators = "IGNORE_DUPLICATE_PAD_DESIGNATORS",
}

export type DesCadBoardComponent = {
  __typename?: "DesCadBoardComponent";
  boardRegionName?: Maybe<Scalars["String"]["output"]>;
  deepening: Scalars["Int"]["output"];
  designator?: Maybe<Scalars["String"]["output"]>;
  free3DBodyRotationX: Scalars["Float"]["output"];
  free3DBodyRotationY: Scalars["Float"]["output"];
  free3DBodyRotationZ: Scalars["Float"]["output"];
  free3DBodyStandoffHeight: Scalars["Int"]["output"];
  id?: Maybe<Scalars["String"]["output"]>;
  innerBodyRelativeToBoardTransform?: Maybe<DesCadBodyTransformation>;
  isFree3DBody: Scalars["Boolean"]["output"];
  isLocked: Scalars["Boolean"]["output"];
  isMcadUsesOwn3DBody: Scalars["Boolean"]["output"];
  location: DesCadPoint;
  modelInComponentTransform?: Maybe<DesCadBodyTransformation>;
  objectType: DesCadBoardObjectType;
  placement: DesCadBoardComponentPlacement;
  rotation: Scalars["Float"]["output"];
  variantName?: Maybe<Scalars["String"]["output"]>;
};

export type DesCadBoardComponentInput = {
  boardRegionName?: InputMaybe<Scalars["String"]["input"]>;
  deepening?: InputMaybe<Scalars["Int"]["input"]>;
  designator?: InputMaybe<Scalars["String"]["input"]>;
  free3DBodyRotationX?: InputMaybe<Scalars["Float"]["input"]>;
  free3DBodyRotationY?: InputMaybe<Scalars["Float"]["input"]>;
  free3DBodyRotationZ?: InputMaybe<Scalars["Float"]["input"]>;
  free3DBodyStandoffHeight?: InputMaybe<Scalars["Int"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  innerBodyRelativeToBoardTransform?: InputMaybe<DesCadBodyTransformationInput>;
  isFree3DBody?: InputMaybe<Scalars["Boolean"]["input"]>;
  isLocked?: InputMaybe<Scalars["Boolean"]["input"]>;
  isMcadUsesOwn3DBody?: InputMaybe<Scalars["Boolean"]["input"]>;
  location?: InputMaybe<DesCadBoardPointInput>;
  modelInComponentTransform?: InputMaybe<DesCadBodyTransformationInput>;
  placement?: InputMaybe<DesCadBoardComponentPlacement>;
  rotation?: InputMaybe<Scalars["Float"]["input"]>;
  variantName?: InputMaybe<Scalars["String"]["input"]>;
};

export enum DesCadBoardComponentPlacement {
  Both = "BOTH",
  Bottom = "BOTTOM",
  Top = "TOP",
}

export type DesCadBoardComponentType = {
  __typename?: "DesCadBoardComponentType";
  bodyShape?: Maybe<DesCadComponentBodyShape>;
  companyComponentId?: Maybe<Scalars["String"]["output"]>;
  components?: Maybe<Array<DesCadBoardComponent>>;
  dmsComponentName?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  internalId?: Maybe<Scalars["String"]["output"]>;
  isFromLocalPcbLibrary: Scalars["Boolean"]["output"];
  itemGuid?: Maybe<Scalars["String"]["output"]>;
  libraryReference?: Maybe<Scalars["String"]["output"]>;
  properties?: Maybe<Array<DesCadProperty>>;
  revisionGuid?: Maybe<Scalars["String"]["output"]>;
};

export type DesCadBoardComponentTypeInput = {
  bodyShape?: InputMaybe<DesCadComponentBodyShapeInput>;
  companyComponentId?: InputMaybe<Scalars["String"]["input"]>;
  components?: InputMaybe<Array<DesCadBoardComponentInput>>;
  dmsComponentName?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  internalId?: InputMaybe<Scalars["String"]["input"]>;
  isFromLocalPcbLibrary?: InputMaybe<Scalars["Boolean"]["input"]>;
  itemGuid?: InputMaybe<Scalars["String"]["input"]>;
  libraryReference?: InputMaybe<Scalars["String"]["input"]>;
  properties?: InputMaybe<Array<DesCadPropertyInput>>;
  revisionGuid?: InputMaybe<Scalars["String"]["input"]>;
};

export enum DesCadBoardCopperExportFeature {
  CopperRegions = "COPPER_REGIONS",
  Pads = "PADS",
  Tracks = "TRACKS",
  Vias = "VIAS",
}

export type DesCadBoardCopperLayer = {
  __typename?: "DesCadBoardCopperLayer";
  isPadAndViaBarrelsSpecialLayer: Scalars["Boolean"]["output"];
  models?: Maybe<Array<DesCadBoard3DBodyModelData>>;
  name?: Maybe<Scalars["String"]["output"]>;
  platformLayerId: Scalars["Int"]["output"];
  thickness: Scalars["Int"]["output"];
};

export type DesCadBoardCopperLayerInput = {
  isPadAndViaBarrelsSpecialLayer?: InputMaybe<Scalars["Boolean"]["input"]>;
  models?: InputMaybe<Array<DesCadBoard3DBodyModelDataInput>>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  platformLayerId?: InputMaybe<Scalars["Int"]["input"]>;
  thickness?: InputMaybe<Scalars["Int"]["input"]>;
};

export type DesCadBoardCopperRegion = {
  __typename?: "DesCadBoardCopperRegion";
  /** JSON serialized array of `GeometricShape`. */
  holeShapesJson?: Maybe<Scalars["String"]["output"]>;
  layerName?: Maybe<Scalars["String"]["output"]>;
  /** JSON serialized array of `GeometricShape`. */
  outlineShapesJson?: Maybe<Scalars["String"]["output"]>;
  regionType: DesCadBoardCopperRegionType;
};

export type DesCadBoardCopperRegionInput = {
  /** JSON serialized array of `GeometricShape`. */
  holeShapesJson?: InputMaybe<Scalars["String"]["input"]>;
  layerName?: InputMaybe<Scalars["String"]["input"]>;
  /** JSON serialized array of `GeometricShape`. */
  outlineShapesJson?: InputMaybe<Scalars["String"]["input"]>;
};

export enum DesCadBoardCopperRegionType {
  Pad = "PAD",
  Region = "REGION",
}

export type DesCadBoardCutout = {
  __typename?: "DesCadBoardCutout";
  associatedComponentDesignator?: Maybe<Scalars["String"]["output"]>;
  designator?: Maybe<Scalars["String"]["output"]>;
  location: DesCadPoint;
  objectType: DesCadBoardObjectType;
  originalDesignator?: Maybe<Scalars["String"]["output"]>;
  rotation: Scalars["Float"]["output"];
  /** JSON serialized `GeometricShape`. */
  shapeJson?: Maybe<Scalars["String"]["output"]>;
  uniqueId?: Maybe<Scalars["String"]["output"]>;
};

export type DesCadBoardCutoutInput = {
  associatedComponentDesignator?: InputMaybe<Scalars["String"]["input"]>;
  designator?: InputMaybe<Scalars["String"]["input"]>;
  location?: InputMaybe<DesCadBoardPointInput>;
  originalDesignator?: InputMaybe<Scalars["String"]["input"]>;
  rotation?: InputMaybe<Scalars["Float"]["input"]>;
  /** JSON serialized `GeometricShape`. */
  shapeJson?: InputMaybe<Scalars["String"]["input"]>;
  uniqueId?: InputMaybe<Scalars["String"]["input"]>;
};

export type DesCadBoardHole = {
  __typename?: "DesCadBoardHole";
  associatedComponentDesignator?: Maybe<Scalars["String"]["output"]>;
  designator?: Maybe<Scalars["String"]["output"]>;
  diameter: Scalars["Int"]["output"];
  holeType: DesCadHoleType;
  isPlated: Scalars["Boolean"]["output"];
  location: DesCadPoint;
  objectType: DesCadBoardObjectType;
  originalDesignator?: Maybe<Scalars["String"]["output"]>;
  rotation: Scalars["Float"]["output"];
  size: DesCadPoint;
  uniqueId?: Maybe<Scalars["String"]["output"]>;
};

export type DesCadBoardHoleInput = {
  associatedComponentDesignator?: InputMaybe<Scalars["String"]["input"]>;
  designator?: InputMaybe<Scalars["String"]["input"]>;
  diameter?: InputMaybe<Scalars["Int"]["input"]>;
  holeType?: InputMaybe<DesCadHoleType>;
  isPlated?: InputMaybe<Scalars["Boolean"]["input"]>;
  location?: InputMaybe<DesCadBoardPointInput>;
  originalDesignator?: InputMaybe<Scalars["String"]["input"]>;
  rotation?: InputMaybe<Scalars["Float"]["input"]>;
  size?: InputMaybe<DesCadBoardPointInput>;
  uniqueId?: InputMaybe<Scalars["String"]["input"]>;
};

export type DesCadBoardLayer = {
  __typename?: "DesCadBoardLayer";
  layerCategory: DesCadBoardLayerCategory;
  layerComponentPlacement: DesCadBoardLayerComponentPlacement;
  layerDielectricType: DesCadBoardLayerDielectricType;
  layerPhysicalCategory: DesCadBoardLayerPhysicalCategory;
  layerPosition: DesCadBoardLayerPosition;
  layerType: DesCadBoardLayerType;
  name?: Maybe<Scalars["String"]["output"]>;
  platformLayerId: Scalars["Int"]["output"];
  thickness: Scalars["Int"]["output"];
};

export enum DesCadBoardLayerCategory {
  Mechanical = "MECHANICAL",
  Physical = "PHYSICAL",
}

export enum DesCadBoardLayerComponentPlacement {
  BodyDown = "BODY_DOWN",
  BodyUp = "BODY_UP",
  None = "NONE",
}

export enum DesCadBoardLayerDielectricType {
  Core = "CORE",
  Film = "FILM",
  None = "NONE",
  PrePreq = "PRE_PREQ",
  Surface = "SURFACE",
}

export type DesCadBoardLayerInput = {
  layerCategory?: InputMaybe<DesCadBoardLayerCategory>;
  layerComponentPlacement?: InputMaybe<DesCadBoardLayerComponentPlacement>;
  layerDielectricType?: InputMaybe<DesCadBoardLayerDielectricType>;
  layerPhysicalCategory?: InputMaybe<DesCadBoardLayerPhysicalCategory>;
  layerPosition?: InputMaybe<DesCadBoardLayerPosition>;
  layerType?: InputMaybe<DesCadBoardLayerType>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  platformLayerId?: InputMaybe<Scalars["Int"]["input"]>;
  thickness?: InputMaybe<Scalars["Int"]["input"]>;
};

export enum DesCadBoardLayerPhysicalCategory {
  DielectricalOrdinal = "DIELECTRICAL_ORDINAL",
  DielectricalSolderMask = "DIELECTRICAL_SOLDER_MASK",
  ElectricalInternalPlane = "ELECTRICAL_INTERNAL_PLANE",
  ElectricalSignalLayer = "ELECTRICAL_SIGNAL_LAYER",
  PhysicalOverlay = "PHYSICAL_OVERLAY",
  PhysicalPasteMask = "PHYSICAL_PASTE_MASK",
}

export enum DesCadBoardLayerPosition {
  Bottom = "BOTTOM",
  Internal = "INTERNAL",
  Top = "TOP",
}

export enum DesCadBoardLayerType {
  Dielectric = "DIELECTRIC",
  InternalPlane = "INTERNAL_PLANE",
  Signal = "SIGNAL",
}

export enum DesCadBoardObjectType {
  BendingLine = "BENDING_LINE",
  BoardArea = "BOARD_AREA",
  BoardOutline = "BOARD_OUTLINE",
  BoardVia = "BOARD_VIA",
  Component = "COMPONENT",
  ComponentType = "COMPONENT_TYPE",
  Cutout = "CUTOUT",
  Hole = "HOLE",
  Layer = "LAYER",
  Region = "REGION",
  SplitLine = "SPLIT_LINE",
  Track = "TRACK",
}

export type DesCadBoardPointInput = {
  x: Scalars["Int"]["input"];
  y: Scalars["Int"]["input"];
  z: Scalars["Int"]["input"];
};

export type DesCadBoardRegion = {
  __typename?: "DesCadBoardRegion";
  color: Scalars["Long"]["output"];
  internalPoint: DesCadPoint;
  isFlex: Scalars["Boolean"]["output"];
  isLocked3D: Scalars["Boolean"]["output"];
  layers?: Maybe<Array<DesCadBoardLayer>>;
  name?: Maybe<Scalars["String"]["output"]>;
  regionLayerZBottom: Scalars["Int"]["output"];
  regionLayerZTop: Scalars["Int"]["output"];
  /** JSON serialized `ComplexShape`. */
  shapeJson?: Maybe<Scalars["String"]["output"]>;
};

export type DesCadBoardRegionInput = {
  color?: InputMaybe<Scalars["Long"]["input"]>;
  internalPoint?: InputMaybe<DesCadBoardPointInput>;
  isFlex?: InputMaybe<Scalars["Boolean"]["input"]>;
  isLocked3D?: InputMaybe<Scalars["Boolean"]["input"]>;
  layers?: InputMaybe<Array<DesCadBoardLayerInput>>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  regionLayerZBottom?: InputMaybe<Scalars["Int"]["input"]>;
  regionLayerZTop?: InputMaybe<Scalars["Int"]["input"]>;
  /** JSON serialized `ComplexShape`. */
  shapeJson?: InputMaybe<Scalars["String"]["input"]>;
};

export type DesCadBoardTrack = {
  __typename?: "DesCadBoardTrack";
  layerName?: Maybe<Scalars["String"]["output"]>;
  netName?: Maybe<Scalars["String"]["output"]>;
  points: Array<DesCadPoint>;
  width: Scalars["Int"]["output"];
};

export type DesCadBoardTrackInput = {
  layerName?: InputMaybe<Scalars["String"]["input"]>;
  netName?: InputMaybe<Scalars["String"]["input"]>;
  points?: InputMaybe<Array<DesCadBoardPointInput>>;
  width?: InputMaybe<Scalars["Int"]["input"]>;
};

export type DesCadBoardVariant = {
  __typename?: "DesCadBoardVariant";
  description?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  uniqueId?: Maybe<Scalars["String"]["output"]>;
  variations?: Maybe<Array<DesCadComponentVariation>>;
};

export type DesCadBoardVariantInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  uniqueId?: InputMaybe<Scalars["String"]["input"]>;
  variations?: InputMaybe<Array<DesCadComponentVariationInput>>;
};

export type DesCadBoardVariants = {
  __typename?: "DesCadBoardVariants";
  componentTypeVariantLibrary?: Maybe<Array<DesCadBoardComponentType>>;
  variants?: Maybe<Array<DesCadBoardVariant>>;
};

export type DesCadBoardVariantsInput = {
  componentTypeVariantLibrary?: InputMaybe<
    Array<DesCadBoardComponentTypeInput>
  >;
  variants?: InputMaybe<Array<DesCadBoardVariantInput>>;
};

export type DesCadBoardVia = {
  __typename?: "DesCadBoardVia";
  copperDiameter: Scalars["Int"]["output"];
  endLayerName?: Maybe<Scalars["String"]["output"]>;
  holeDiameter: Scalars["Int"]["output"];
  location: DesCadPoint;
  startLayerName?: Maybe<Scalars["String"]["output"]>;
};

export type DesCadBoardViaInput = {
  copperDiameter?: InputMaybe<Scalars["Int"]["input"]>;
  endLayerName?: InputMaybe<Scalars["String"]["input"]>;
  holeDiameter?: InputMaybe<Scalars["Int"]["input"]>;
  location?: InputMaybe<DesCadBoardPointInput>;
  startLayerName?: InputMaybe<Scalars["String"]["input"]>;
};

export type DesCadBodyTransformation = {
  __typename?: "DesCadBodyTransformation";
  rotationX: Scalars["Float"]["output"];
  rotationY: Scalars["Float"]["output"];
  rotationZ: Scalars["Float"]["output"];
  scaleX: Scalars["Float"]["output"];
  scaleY: Scalars["Float"]["output"];
  scaleZ: Scalars["Float"]["output"];
  translationX: Scalars["Float"]["output"];
  translationY: Scalars["Float"]["output"];
  translationZ: Scalars["Float"]["output"];
};

export type DesCadBodyTransformationInput = {
  rotationX: Scalars["Float"]["input"];
  rotationY: Scalars["Float"]["input"];
  rotationZ: Scalars["Float"]["input"];
  scaleX: Scalars["Float"]["input"];
  scaleY: Scalars["Float"]["input"];
  scaleZ: Scalars["Float"]["input"];
  translationX: Scalars["Float"]["input"];
  translationY: Scalars["Float"]["input"];
  translationZ: Scalars["Float"]["input"];
};

export type DesCadComponentBodyShape = {
  __typename?: "DesCadComponentBodyShape";
  height: Scalars["Int"]["output"];
  isBodylessOnEcad: Scalars["Boolean"]["output"];
  isHidden: Scalars["Boolean"]["output"];
  modelData?: Maybe<DesCadBoard3DBodyModelData>;
  /** JSON serialized `GeometricShape`. */
  shapeJson?: Maybe<Scalars["String"]["output"]>;
};

export type DesCadComponentBodyShapeInput = {
  height?: InputMaybe<Scalars["Int"]["input"]>;
  isBodylessOnEcad?: InputMaybe<Scalars["Boolean"]["input"]>;
  isHidden?: InputMaybe<Scalars["Boolean"]["input"]>;
  modelData?: InputMaybe<DesCadBoard3DBodyModelDataInput>;
  /** JSON serialized `GeometricShape`. */
  shapeJson?: InputMaybe<Scalars["String"]["input"]>;
};

export type DesCadComponentVariation = {
  __typename?: "DesCadComponentVariation";
  componentTypeId?: Maybe<Scalars["String"]["output"]>;
  designator?: Maybe<Scalars["String"]["output"]>;
  location: DesCadPoint;
  modelInComponentTransform?: Maybe<DesCadBodyTransformation>;
  placement: DesCadBoardComponentPlacement;
  rotation: Scalars["Float"]["output"];
  variantKind: DesCadComponentVariationKind;
};

export type DesCadComponentVariationInput = {
  componentTypeId?: InputMaybe<Scalars["String"]["input"]>;
  designator?: InputMaybe<Scalars["String"]["input"]>;
  location?: InputMaybe<DesCadBoardPointInput>;
  modelInComponentTransform?: InputMaybe<DesCadBodyTransformationInput>;
  placement?: InputMaybe<DesCadBoardComponentPlacement>;
  rotation?: InputMaybe<Scalars["Float"]["input"]>;
  variantKind?: InputMaybe<DesCadComponentVariationKind>;
};

export enum DesCadComponentVariationKind {
  Alternate = "ALTERNATE",
  Fitted = "FITTED",
  NotFitted = "NOT_FITTED",
}

export type DesCadDesign = {
  __typename?: "DesCadDesign";
  boardAreas?: Maybe<Array<DesCadBoardArea>>;
  boardBendingLines?: Maybe<Array<DesCadBendingLine>>;
  boardColor: Scalars["Long"]["output"];
  boardCoreColor?: Maybe<Scalars["Long"]["output"]>;
  boardCoreOpacity?: Maybe<Scalars["Float"]["output"]>;
  boardLayers?: Maybe<Array<DesCadBoardLayer>>;
  boardOffsetMcadToEcadOrigin: DesCadPoint;
  boardOrigin: DesCadPoint;
  /** JSON serialized `ComplexShape`. */
  boardOutlineJson?: Maybe<Scalars["String"]["output"]>;
  boardRegions?: Maybe<Array<DesCadBoardRegion>>;
  boardSplitLines?: Maybe<Array<DesCadSplitLine>>;
  boardThickness: Scalars["Int"]["output"];
  collaborationFlags: Array<DesCadBoardCollaborationFlag>;
  componentTypes?: Maybe<Array<DesCadBoardComponentType>>;
  coordinateSystemTranslation: DesCadPoint;
  copperExportFeatures: Array<DesCadBoardCopperExportFeature>;
  copperLayers?: Maybe<Array<DesCadBoardCopperLayer>>;
  copperRegions?: Maybe<Array<DesCadBoardCopperRegion>>;
  cutouts?: Maybe<Array<DesCadBoardCutout>>;
  designFileName?: Maybe<Scalars["String"]["output"]>;
  designVariantId?: Maybe<Scalars["String"]["output"]>;
  designVariantName?: Maybe<Scalars["String"]["output"]>;
  hasHatchedCopperPolygons: Scalars["Boolean"]["output"];
  holes?: Maybe<Array<DesCadBoardHole>>;
  isRF20Design: Scalars["Boolean"]["output"];
  layersExportMode: DesCadLayersExportMode;
  messages?: Maybe<Array<Scalars["String"]["output"]>>;
  minimalHeightComponentsShown: Scalars["Int"]["output"];
  tracks?: Maybe<Array<DesCadBoardTrack>>;
  variants?: Maybe<DesCadBoardVariants>;
  vias?: Maybe<Array<DesCadBoardVia>>;
  workflowState: DesCadWorkflowState;
};

export type DesCadDesignInput = {
  boardAreas?: InputMaybe<Array<DesCadBoardAreaInput>>;
  boardBendingLines?: InputMaybe<Array<DesCadBendingLineInput>>;
  boardColor?: InputMaybe<Scalars["Long"]["input"]>;
  boardCoreColor?: InputMaybe<Scalars["Long"]["input"]>;
  boardCoreOpacity?: InputMaybe<Scalars["Float"]["input"]>;
  boardLayers?: InputMaybe<Array<DesCadBoardLayerInput>>;
  boardOffsetMcadToEcadOrigin?: InputMaybe<DesCadBoardPointInput>;
  boardOrigin?: InputMaybe<DesCadBoardPointInput>;
  /** JSON serialized `ComplexShape`. */
  boardOutlineJson?: InputMaybe<Scalars["String"]["input"]>;
  boardRegions?: InputMaybe<Array<DesCadBoardRegionInput>>;
  boardSplitLines?: InputMaybe<Array<DesCadSplitLineInput>>;
  boardThickness?: InputMaybe<Scalars["Int"]["input"]>;
  collaborationFlags?: InputMaybe<Array<DesCadBoardCollaborationFlag>>;
  componentTypes?: InputMaybe<Array<DesCadBoardComponentTypeInput>>;
  coordinateSystemTranslation?: InputMaybe<DesCadBoardPointInput>;
  copperExportFeatures?: InputMaybe<Array<DesCadBoardCopperExportFeature>>;
  copperLayers?: InputMaybe<Array<DesCadBoardCopperLayerInput>>;
  copperRegions?: InputMaybe<Array<DesCadBoardCopperRegionInput>>;
  cutouts?: InputMaybe<Array<DesCadBoardCutoutInput>>;
  designFileName?: InputMaybe<Scalars["String"]["input"]>;
  designVariantId?: InputMaybe<Scalars["String"]["input"]>;
  designVariantName?: InputMaybe<Scalars["String"]["input"]>;
  hasHatchedCopperPolygons?: InputMaybe<Scalars["Boolean"]["input"]>;
  holes?: InputMaybe<Array<DesCadBoardHoleInput>>;
  isRF20Design?: InputMaybe<Scalars["Boolean"]["input"]>;
  layersExportMode?: InputMaybe<DesCadLayersExportMode>;
  messages?: InputMaybe<Array<Scalars["String"]["input"]>>;
  minimalHeightComponentsShown?: InputMaybe<Scalars["Int"]["input"]>;
  tracks?: InputMaybe<Array<DesCadBoardTrackInput>>;
  variants?: InputMaybe<DesCadBoardVariantsInput>;
  vias?: InputMaybe<Array<DesCadBoardViaInput>>;
  workflowState?: InputMaybe<DesCadWorkflowState>;
};

export enum DesCadHoleType {
  Circular = "CIRCULAR",
  Rectangular = "RECTANGULAR",
  Slot = "SLOT",
  Unknown = "UNKNOWN",
}

export enum DesCadLayersExportMode {
  AllLayers = "ALL_LAYERS",
  NoLayers = "NO_LAYERS",
  OuterSignalLayersOnly = "OUTER_SIGNAL_LAYERS_ONLY",
}

export type DesCadPoint = {
  __typename?: "DesCadPoint";
  x: Scalars["Int"]["output"];
  y: Scalars["Int"]["output"];
  z: Scalars["Int"]["output"];
};

export type DesCadProperty = {
  __typename?: "DesCadProperty";
  name: Scalars["String"]["output"];
  value?: Maybe<Scalars["String"]["output"]>;
};

export type DesCadPropertyInput = {
  name: Scalars["String"]["input"];
  value?: InputMaybe<Scalars["String"]["input"]>;
};

export type DesCadSplitLine = {
  __typename?: "DesCadSplitLine";
  endPoint: DesCadPoint;
  leftRegionName?: Maybe<Scalars["String"]["output"]>;
  rightRegionName?: Maybe<Scalars["String"]["output"]>;
  /** JSON serialized `ComplexShape`. */
  shapeJson?: Maybe<Scalars["String"]["output"]>;
  startPoint: DesCadPoint;
};

export type DesCadSplitLineInput = {
  endPoint?: InputMaybe<DesCadBoardPointInput>;
  leftRegionName?: InputMaybe<Scalars["String"]["input"]>;
  rightRegionName?: InputMaybe<Scalars["String"]["input"]>;
  /** JSON serialized `ComplexShape`. */
  shapeJson?: InputMaybe<Scalars["String"]["input"]>;
  startPoint?: InputMaybe<DesCadBoardPointInput>;
};

export enum DesCadWorkflowState {
  None = "NONE",
  ReadyToSendOrReceiveChanges = "READY_TO_SEND_OR_RECEIVE_CHANGES",
  ReceivedProposedChanges = "RECEIVED_PROPOSED_CHANGES",
  SentProposedChanges = "SENT_PROPOSED_CHANGES",
}

/** Specifies ECAD or MCAD domain. */
export enum DesCollaborationDomain {
  Ecad = "ECAD",
  Mcad = "MCAD",
}

/** ECAD or MCAD revision data. */
export type DesCollaborationRevision = {
  __typename?: "DesCollaborationRevision";
  /** Revision comment. */
  comment: Scalars["String"]["output"];
  /** Creation time. */
  createdAt: Scalars["DateTime"]["output"];
  /** The user who created this revision. */
  createdBy: DesUser;
  /** *PROTOTYPE, SUBJECT TO CHANGE* */
  design: DesCadDesign;
  /** Revision download data. */
  downloadableFile: DesDownloadableFile;
};

/** A connection to a list of items. */
export type DesCollaborationRevisionConnection = {
  __typename?: "DesCollaborationRevisionConnection";
  /** A list of edges. */
  edges?: Maybe<Array<DesCollaborationRevisionEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<DesCollaborationRevision>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars["Int"]["output"];
};

/** An edge in a connection. */
export type DesCollaborationRevisionEdge = {
  __typename?: "DesCollaborationRevisionEdge";
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge. */
  node: DesCollaborationRevision;
};

/** *PROTOTYPE, SUBJECT TO CHANGE* */
export type DesCollaborationSimulationFile = {
  __typename?: "DesCollaborationSimulationFile";
  downloadUrl: Scalars["String"]["output"];
  fileTypeName: Scalars["String"]["output"];
};

export type DesCollaborationSimulationFileInput = {
  fileId: Scalars["String"]["input"];
  fileName: Scalars["String"]["input"];
  fileType: Scalars["String"]["input"];
};

/** *PROTOTYPE, SUBJECT TO CHANGE* */
export type DesCollaborationSimulationRevision = {
  __typename?: "DesCollaborationSimulationRevision";
  createdAt: Scalars["DateTime"]["output"];
  createdBy: DesUser;
  files: Array<DesCollaborationSimulationFile>;
  metadata: Scalars["String"]["output"];
};

/** A connection to a list of items. */
export type DesCollaborationSimulationRevisionConnection = {
  __typename?: "DesCollaborationSimulationRevisionConnection";
  /** A list of edges. */
  edges?: Maybe<Array<DesCollaborationSimulationRevisionEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<DesCollaborationSimulationRevision>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars["Int"]["output"];
};

/** An edge in a connection. */
export type DesCollaborationSimulationRevisionEdge = {
  __typename?: "DesCollaborationSimulationRevisionEdge";
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge. */
  node: DesCollaborationSimulationRevision;
};

/** A comment is one of remarks associated with a comment thread or task. */
export type DesComment = {
  __typename?: "DesComment";
  /** The comment reference ID. */
  commentId: Scalars["String"]["output"];
  /** The creation date. */
  createdAt: Scalars["DateTime"]["output"];
  /** The user who created the comment. */
  createdBy: DesUser;
  /** The users mentioned by this comment. */
  mentions: Array<DesMention>;
  /** The last modification date. */
  modifiedAt: Scalars["DateTime"]["output"];
  /** The user who modified the comment. */
  modifiedBy: DesUser;
  /** The comment text. */
  text: Scalars["String"]["output"];
};

/** A comment context provides additional information about associations for a comment thread. */
export type DesCommentContext = {
  __typename?: "DesCommentContext";
  /** The area associated with a comment thread. */
  area: DesRectangle;
  /** The reference identifier for the document associated with a comment thread. */
  documentId?: Maybe<Scalars["String"]["output"]>;
  /** The reference identifier for an object associated with a comment thread. */
  objectId?: Maybe<Scalars["String"]["output"]>;
  /** The release identifier associated with a comment thread. */
  releaseId?: Maybe<Scalars["String"]["output"]>;
};

export enum DesCommentContextType {
  Area = "AREA",
  Component = "COMPONENT",
  None = "NONE",
  Track = "TRACK",
  Via = "VIA",
}

export type DesCommentNotification = {
  __typename?: "DesCommentNotification";
  action: Scalars["String"]["output"];
  data: DesCommentNotificationData;
};

export type DesCommentNotificationData = {
  __typename?: "DesCommentNotificationData";
  commentAuthor?: Maybe<Scalars["String"]["output"]>;
  commentDate: Scalars["String"]["output"];
  commentId: Scalars["String"]["output"];
  commentText?: Maybe<Scalars["String"]["output"]>;
  commentThreadId: Scalars["String"]["output"];
  documentId?: Maybe<Scalars["String"]["output"]>;
  documentName?: Maybe<Scalars["String"]["output"]>;
  projectId: Scalars["String"]["output"];
  threadData?: Maybe<Scalars["String"]["output"]>;
  threadDate: Scalars["String"]["output"];
  threadStatus?: Maybe<Scalars["String"]["output"]>;
};

/** A comment thread contains an initial remark associated with the design and a collection of replies. */
export type DesCommentThread = {
  __typename?: "DesCommentThread";
  /** The account information for the owner of any action or response to this comment thread. */
  assignedTo?: Maybe<DesUser>;
  /** The reference identifier for this comment thread (used by `desCreateComment`, `desDeleteComment`, `desUpdateComment`). */
  commentThreadId: Scalars["String"]["output"];
  /** The list of replies associated with this comment thread. */
  comments: Array<DesComment>;
  /** The information about properties related to this comment thread. */
  context: DesCommentContext;
  /** The `DateTime` for the creation of this comment thread. */
  createdAt: Scalars["DateTime"]["output"];
  /** The account information for who created this comment thread. */
  createdBy: DesUser;
  /** The `DateTime` for the most recent modification of this comment thread. */
  modifiedAt: Scalars["DateTime"]["output"];
  /** The account information for who most recently modified this comment thread. */
  modifiedBy: DesUser;
  /** The web address to download the screenshot associated with the creation of this comment thread. */
  originalStateScreenshotUrl?: Maybe<Scalars["String"]["output"]>;
  status: Scalars["Int"]["output"];
  /** The sequence number of this comment thread. */
  threadNumber: Scalars["Int"]["output"];
};

/** A component contains the parametric details of a PCB part. */
export type DesComponent = Node & {
  __typename?: "DesComponent";
  /** The additional information for this component. */
  comment: Scalars["String"]["output"];
  /** The summary of function or other performance details for this component. */
  description: Scalars["String"]["output"];
  /** More component data, consider using only with `desComponentById`. */
  details: DesComponentDetails;
  /** The component folder. */
  folder?: Maybe<DesFolder>;
  /** The node ID used by `desComponentById`. Unmanaged components may be not found. */
  id: Scalars["ID"]["output"];
  /** Gets true if the component is managed. */
  isManaged: Scalars["Boolean"]["output"];
  /** The list of the part choices associated with this component. */
  manufacturerParts: Array<DesManufacturerPart>;
  model3D?: Maybe<DesModel3D>;
  /** The library label for this component. */
  name: Scalars["String"]["output"];
  /** The component revision. */
  revision: DesRevision;
};

/** A connection to a list of items. */
export type DesComponentConnection = {
  __typename?: "DesComponentConnection";
  /** A list of edges. */
  edges?: Maybe<Array<DesComponentEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<DesComponent>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars["Int"]["output"];
};

export type DesComponentDetails = {
  __typename?: "DesComponentDetails";
  /** The list of component footprints. */
  footprints: Array<DesFootprint>;
  /** The list of item level parameters. */
  itemParameters: Array<DesComponentParameter>;
  /** The list of revision level parameters from the latest revision. Parameter types are unknown (`NONE`) for unmanaged components. */
  parameters: Array<DesComponentParameter>;
  /** The list of component simuation models. */
  simulations: Array<DesSimulation>;
  /** The list of component symbols. */
  symbols: Array<DesSymbol>;
};

/** An edge in a connection. */
export type DesComponentEdge = {
  __typename?: "DesComponentEdge";
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge. */
  node: DesComponent;
};

/** A component contains the parametric details of a PCB part. */
export type DesComponentFilterInput = {
  and?: InputMaybe<Array<DesComponentFilterInput>>;
  /** The additional information for this component. */
  comment?: InputMaybe<StringOperationFilterInput>;
  /** The summary of function or other performance details for this component. */
  description?: InputMaybe<StringOperationFilterInput>;
  /** Gets true if the component is managed. */
  isManaged?: InputMaybe<BooleanOperationFilterInput>;
  /** The library label for this component. */
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<DesComponentFilterInput>>;
};

export type DesComponentItemParameterInput = {
  name: Scalars["String"]["input"];
  value: Scalars["String"]["input"];
};

export type DesComponentParameter = {
  __typename?: "DesComponentParameter";
  name: Scalars["String"]["output"];
  type: DesParameterType;
  value: Scalars["String"]["output"];
};

export type DesComponentTemplate = Node & {
  __typename?: "DesComponentTemplate";
  description: Scalars["String"]["output"];
  folder?: Maybe<DesFolder>;
  /** The node ID (used by `desComponentTemplateById`). */
  id: Scalars["ID"]["output"];
  latestRevision: DesComponentTemplateRevision;
  name: Scalars["String"]["output"];
};

/** A connection to a list of items. */
export type DesComponentTemplateConnection = {
  __typename?: "DesComponentTemplateConnection";
  /** A list of edges. */
  edges?: Maybe<Array<DesComponentTemplateEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<DesComponentTemplate>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars["Int"]["output"];
};

/** An edge in a connection. */
export type DesComponentTemplateEdge = {
  __typename?: "DesComponentTemplateEdge";
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge. */
  node: DesComponentTemplate;
};

export type DesComponentTemplateRevision = {
  __typename?: "DesComponentTemplateRevision";
  comment: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  description: Scalars["String"]["output"];
  downloadableFile: DesDownloadableFile;
  name: Scalars["String"]["output"];
};

export enum DesContentTypeKind {
  BinaryFile = "BINARY_FILE",
  BmsAutoGeneratedComponents = "BMS_AUTO_GENERATED_COMPONENTS",
  BomTemplate = "BOM_TEMPLATE",
  Component = "COMPONENT",
  ComponentTemplate = "COMPONENT_TEMPLATE",
  DataClass = "DATA_CLASS",
  DataSheet = "DATA_SHEET",
  DeviceClass = "DEVICE_CLASS",
  DraftsmanDocumentTemplate = "DRAFTSMAN_DOCUMENT_TEMPLATE",
  DraftsmanSheetTemplate = "DRAFTSMAN_SHEET_TEMPLATE",
  DxpAddon = "DXP_ADDON",
  DxpPlatform = "DXP_PLATFORM",
  DxpPlugin = "DXP_PLUGIN",
  DxpSdk = "DXP_SDK",
  EmbeddedDesign = "EMBEDDED_DESIGN",
  FabricationFile = "FABRICATION_FILE",
  FpgaDesign = "FPGA_DESIGN",
  HarnessConnectivity = "HARNESS_CONNECTIVITY",
  HarnessLayout = "HARNESS_LAYOUT",
  HarnessLayoutTemplate = "HARNESS_LAYOUT_TEMPLATE",
  HarnessWiringTemplate = "HARNESS_WIRING_TEMPLATE",
  LayerStack = "LAYER_STACK",
  ManagedBom = "MANAGED_BOM",
  Model3D = "MODEL3D",
  MorfikPackage = "MORFIK_PACKAGE",
  MorfikWebResource = "MORFIK_WEB_RESOURCE",
  MorfikXAppDesign = "MORFIK_X_APP_DESIGN",
  MorfikXAppImage = "MORFIK_X_APP_IMAGE",
  MorfikXAppSet = "MORFIK_X_APP_SET",
  OpenBus = "OPEN_BUS",
  OrcadProject = "ORCAD_PROJECT",
  OutputJob = "OUTPUT_JOB",
  PartChoiceList = "PART_CHOICE_LIST",
  PcbAssembly = "PCB_ASSEMBLY",
  PcbBlank = "PCB_BLANK",
  PcbBlock = "PCB_BLOCK",
  PcbComponent = "PCB_COMPONENT",
  PcbDesign = "PCB_DESIGN",
  PcbDocument = "PCB_DOCUMENT",
  PcbModel3D = "PCB_MODEL3D",
  PcbSnippet = "PCB_SNIPPET",
  PlmInstance = "PLM_INSTANCE",
  PlmPublishTemplate = "PLM_PUBLISH_TEMPLATE",
  Preferences = "PREFERENCES",
  Project = "PROJECT",
  ProjectReviewPackage = "PROJECT_REVIEW_PACKAGE",
  ProjectTemplate = "PROJECT_TEMPLATE",
  RichText = "RICH_TEXT",
  SchematicSheet = "SCHEMATIC_SHEET",
  SchematicSnippet = "SCHEMATIC_SNIPPET",
  SchematicTemplate = "SCHEMATIC_TEMPLATE",
  Script = "SCRIPT",
  SimulationModel = "SIMULATION_MODEL",
  SiModel = "SI_MODEL",
  Symbol = "SYMBOL",
  WebItem = "WEB_ITEM",
}

export type DesCreateCommentInput = {
  commentThreadId: Scalars["String"]["input"];
  entityId: Scalars["ID"]["input"];
  text: Scalars["String"]["input"];
};

export type DesCreateCommentPayload = {
  __typename?: "DesCreateCommentPayload";
  commentId: Scalars["String"]["output"];
  errors: Array<DesPayloadError>;
};

export type DesCreateCommentThreadInput = {
  area?: InputMaybe<DesRectangleInput>;
  commentContextType: DesCommentContextType;
  documentId: Scalars["String"]["input"];
  documentName?: InputMaybe<Scalars["String"]["input"]>;
  documentType: DesDocumentType;
  entityId: Scalars["ID"]["input"];
  itemAsDesignItemId?: InputMaybe<Scalars["ID"]["input"]>;
  itemAsInternalObjectId?: InputMaybe<Scalars["String"]["input"]>;
  releaseId?: InputMaybe<Scalars["String"]["input"]>;
  text: Scalars["String"]["input"];
};

export type DesCreateCommentThreadPayload = {
  __typename?: "DesCreateCommentThreadPayload";
  commentId: Scalars["String"]["output"];
  commentThreadId: Scalars["String"]["output"];
  errors: Array<DesPayloadError>;
};

export type DesCreateManufacturePackageInput = {
  /** A webhook URL that will receive a POST request when the manufacture package has been created and shared. */
  callbackUrl?: InputMaybe<Scalars["String"]["input"]>;
  /** A description for the package. */
  description?: InputMaybe<Scalars["String"]["input"]>;
  /** The name for the package. */
  name: Scalars["String"]["input"];
  /** The ID of the project to create a manufacture package from. */
  projectId: Scalars["ID"]["input"];
  /** The email addresses of the manufacturers to share the package with. */
  shareWith: Array<Scalars["String"]["input"]>;
  /** The project variant to use when creating the package. If not provided, the default variant is used. */
  variantName?: InputMaybe<Scalars["String"]["input"]>;
  /** The Git commit which determines the version of the project to use. If not provided, the latest version is used. */
  vcsRevisionId?: InputMaybe<Scalars["String"]["input"]>;
};

export type DesCreateManufacturePackagePayload = {
  __typename?: "DesCreateManufacturePackagePayload";
  errors: Array<DesPayloadError>;
  jobId: Scalars["ID"]["output"];
};

export type DesCreateProjectExportJobInput = {
  /** Tells to export any data specified by the input. */
  exportAny?: InputMaybe<DesProjectExportAnyInput>;
  /** Tells to export Gerber and specifies the options. */
  exportGerber?: InputMaybe<DesProjectExportGerberInput>;
  /** Tells to export GerberX2 and specifies the options. */
  exportGerberX2?: InputMaybe<DesProjectExportGerberX2Input>;
  /** Tells to export IDF and specifies the options. */
  exportIdf?: InputMaybe<DesProjectExportIdfInput>;
  /** Tells to export NCDrill and specifies the options. */
  exportNCDrill?: InputMaybe<DesProjectExportNcDrillInput>;
  /** The project node ID. */
  projectId: Scalars["ID"]["input"];
  /** The project variant to use when creating the package. If not provided, the default variant is used. */
  variantName?: InputMaybe<Scalars["String"]["input"]>;
  /** The Git commit which determines the version of the project to use. If not provided, the latest version is used. */
  vcsRevisionId?: InputMaybe<Scalars["String"]["input"]>;
};

export type DesCreateProjectExportJobPayload = {
  __typename?: "DesCreateProjectExportJobPayload";
  errors: Array<DesPayloadError>;
  /** The job ID to be used by `desProjectExportJob`. */
  projectExportJobId?: Maybe<Scalars["String"]["output"]>;
};

export type DesCreateProjectTaskInput = {
  /** The project node ID. */
  projectId: Scalars["ID"]["input"];
  /** The new task data. */
  task: DesCreateTaskInput;
};

export type DesCreateTaskCommentInput = {
  /** The task node ID. */
  taskId: Scalars["ID"]["input"];
  /** The comment text. */
  text: Scalars["String"]["input"];
};

export type DesCreateTaskCommentPayload = {
  __typename?: "DesCreateTaskCommentPayload";
  comment?: Maybe<DesComment>;
  errors: Array<DesPayloadError>;
};

export type DesCreateTaskInput = {
  /** New task description. */
  description: Scalars["String"]["input"];
  /** New task name. */
  name: Scalars["String"]["input"];
  /** Optional task priority. */
  priority?: InputMaybe<DesTaskPriority>;
  /** Optional task status. */
  status?: InputMaybe<DesTaskStatus>;
};

export type DesCreateTaskPayload = {
  __typename?: "DesCreateTaskPayload";
  errors: Array<DesPayloadError>;
  /** The created task. */
  task: DesTask;
};

export type DesCreateUserGroupInput = {
  name: Scalars["String"]["input"];
  workspaceUrl: Scalars["String"]["input"];
};

export type DesCreateUserGroupPayload = {
  __typename?: "DesCreateUserGroupPayload";
  id: Scalars["ID"]["output"];
};

export type DesCreateUserInput = {
  email: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  lastName: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  userName: Scalars["String"]["input"];
  workspaceUrl: Scalars["String"]["input"];
};

export type DesCreateUserPayload = {
  __typename?: "DesCreateUserPayload";
  userId: Scalars["String"]["output"];
};

export type DesCreateWorkspaceTaskInput = {
  /** The new task data. */
  task: DesCreateTaskInput;
  /** The workspace URL. */
  workspaceUrl: Scalars["String"]["input"];
};

export type DesDeleteCommentInput = {
  commentId: Scalars["String"]["input"];
  commentThreadId: Scalars["String"]["input"];
  entityId: Scalars["ID"]["input"];
};

export type DesDeleteCommentPayload = {
  __typename?: "DesDeleteCommentPayload";
  errors: Array<DesPayloadError>;
};

export type DesDeleteCommentThreadInput = {
  commentThreadId: Scalars["String"]["input"];
  entityId: Scalars["ID"]["input"];
};

export type DesDeleteCommentThreadPayload = {
  __typename?: "DesDeleteCommentThreadPayload";
  errors: Array<DesPayloadError>;
};

export type DesDeleteTaskCommentInput = {
  /** The comment ID. */
  commentId: Scalars["String"]["input"];
  /** The task node ID. */
  taskId: Scalars["ID"]["input"];
};

export type DesDeleteTaskCommentPayload = {
  __typename?: "DesDeleteTaskCommentPayload";
  errors: Array<DesPayloadError>;
};

export type DesDeleteTaskInput = {
  /** The task node ID. */
  taskId: Scalars["ID"]["input"];
};

export type DesDeleteTaskPayload = {
  __typename?: "DesDeleteTaskPayload";
  errors: Array<DesPayloadError>;
};

export type DesDeleteUserGroupInput = {
  /** The group node ID. */
  id: Scalars["ID"]["input"];
};

export type DesDeleteUserGroupPayload = {
  __typename?: "DesDeleteUserGroupPayload";
  errors: Array<DesPayloadError>;
};

export type DesDeleteUserInput = {
  userId: Scalars["String"]["input"];
  workspaceUrl: Scalars["String"]["input"];
};

export type DesDeleteUserPayload = {
  __typename?: "DesDeleteUserPayload";
  errors: Array<DesPayloadError>;
};

/** A design manages all of the schematic, PCB, and BOM content for a project. */
export type DesDesign = {
  __typename?: "DesDesign";
  /** The list of published versions of the design grouped into pages. */
  releases?: Maybe<DesReleaseConnection>;
  /** The list of variations contained in this design. */
  variants: Array<DesWipVariant>;
  /** @deprecated Use `variants` instead. */
  workInProgress: DesWorkInProgress;
};

/** A design manages all of the schematic, PCB, and BOM content for a project. */
export type DesDesignReleasesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<DesReleaseFilterInput>;
};

/** A design manages all of the schematic, PCB, and BOM content for a project. */
export type DesDesignVariantsArgs = {
  where?: InputMaybe<DesWipVariantFilterInput>;
};

export type DesDesignExchange = {
  __typename?: "DesDesignExchange";
  downloadableFile: DesDownloadableFile;
  models3D: Array<DesModel3D>;
};

/** A design item is a specific instance of a part used in the design. */
export type DesDesignItem = Node & {
  __typename?: "DesDesignItem";
  /** @deprecated Use `boundingBox`. */
  area?: Maybe<DesRectangle>;
  /** The axis-aligned bounding box. */
  boundingBox?: Maybe<DesRectangle>;
  /** The additional information for this design item. */
  comment: Scalars["String"]["output"];
  /** The list of all comment threads related to this design item. */
  commentThreads?: Maybe<Array<DesCommentThread>>;
  /** The detailed component information for this design item. */
  component?: Maybe<DesComponent>;
  /** The summary of function or other performance details for this design item. */
  description: Scalars["String"]["output"];
  /** The unique label for this design item. */
  designator: Scalars["String"]["output"];
  footprintName: Scalars["String"]["output"];
  /** The node identifier for this project (used by `DesDesignItemById`). */
  id: Scalars["ID"]["output"];
  /** The layer(side) placement for this design item. */
  layer?: Maybe<DesLayer>;
  /** *PROTOTYPE, SUBJECT TO CHANGE* */
  mesh3D?: Maybe<DesMesh3D>;
  /** The list of connection targets for this design item. */
  pads: Array<DesPad>;
  /** The list of design item parameters. */
  parameters: Array<DesDesignItemParameter>;
  /** The planar location for this design item. */
  position: DesPosition2D;
  /** The rotation in degrees. */
  rotation?: Maybe<Scalars["Decimal"]["output"]>;
  /** The list of conductor segments for this design item. */
  tracks: Array<DesTrack>;
  /** The list of multiple layer connections for this design item. */
  vias: Array<DesVia>;
};

/** A design item is a specific instance of a part used in the design. */
export type DesDesignItemTracksArgs = {
  where?: InputMaybe<DesTrackFilterInput>;
};

/** A connection to a list of items. */
export type DesDesignItemConnection = {
  __typename?: "DesDesignItemConnection";
  /** A list of edges. */
  edges?: Maybe<Array<DesDesignItemEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<DesDesignItem>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars["Int"]["output"];
};

/** An edge in a connection. */
export type DesDesignItemEdge = {
  __typename?: "DesDesignItemEdge";
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge. */
  node: DesDesignItem;
};

/** A design item is a specific instance of a part used in the design. */
export type DesDesignItemFilterInput = {
  and?: InputMaybe<Array<DesDesignItemFilterInput>>;
  /** The unique label for this design item. */
  designator?: InputMaybe<StringOperationFilterInput>;
  /** The layer(side) placement for this design item. */
  layer?: InputMaybe<DesLayerFilterInput>;
  or?: InputMaybe<Array<DesDesignItemFilterInput>>;
  /** The list of design item parameters. */
  parameters?: InputMaybe<ListFilterInputTypeOfDesDesignItemParameterFilterInput>;
};

export type DesDesignItemParameter = {
  __typename?: "DesDesignItemParameter";
  name: Scalars["String"]["output"];
  value: Scalars["String"]["output"];
};

export type DesDesignItemParameterFilterInput = {
  and?: InputMaybe<Array<DesDesignItemParameterFilterInput>>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<DesDesignItemParameterFilterInput>>;
  value?: InputMaybe<StringOperationFilterInput>;
};

export enum DesDocumentType {
  Pcb = "PCB",
  Schematic = "SCHEMATIC",
}

export type DesDownloadableFile = {
  __typename?: "DesDownloadableFile";
  downloadUrl: Scalars["String"]["output"];
  fileName: Scalars["String"]["output"];
  relativePath: Scalars["String"]["output"];
};

export type DesErrorPayload = {
  __typename?: "DesErrorPayload";
  message: Scalars["String"]["output"];
};

export type DesFolder = Node & {
  __typename?: "DesFolder";
  /** The `DateTime` this folder was created. */
  createdAt: Scalars["DateTime"]["output"];
  /** The `DesUser` this folder was created by. */
  createdBy: DesUser;
  description: Scalars["String"]["output"];
  folderPermissions: Array<DesFolderPermission>;
  folderType: DesFolderType;
  id: Scalars["ID"]["output"];
  itemNamingSchemeTemplate?: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  parent?: Maybe<DesFolder>;
  path: Scalars["String"]["output"];
  /** The `DateTime` this folder was last updated at. */
  updatedAt: Scalars["DateTime"]["output"];
  /** The `DesUser` this folder was last updated by. */
  updatedBy: DesUser;
};

export type DesFolderPermission = {
  __typename?: "DesFolderPermission";
  /** Tells if this permission allows creation of objects within the associated folder. */
  canCreate: Scalars["Boolean"]["output"];
  /** Tells if this permission allows deletion of the associated folder. */
  canDelete: Scalars["Boolean"]["output"];
  /** Tells if this permission allows editing the associated folder. */
  canEdit: Scalars["Boolean"]["output"];
  /** Tells if this permission allows reading of the associated folder. */
  canRead: Scalars["Boolean"]["output"];
  /** The `DesUserGroup` this permission is associated with. */
  group?: Maybe<DesUserGroup>;
  /** The name of this permission. */
  name: Scalars["String"]["output"];
  /** The permission scope to differentiate different permission types. */
  scope: DesPermissionScope;
  /** The `DesUser` this permission is associated with. */
  user?: Maybe<DesUser>;
};

export enum DesFolderType {
  AltiumDesignerPluginZone = "ALTIUM_DESIGNER_PLUGIN_ZONE",
  BinaryCatalog = "BINARY_CATALOG",
  BomTemplateCatalog = "BOM_TEMPLATE_CATALOG",
  ComponentLibrary = "COMPONENT_LIBRARY",
  ComponentManagementZone = "COMPONENT_MANAGEMENT_ZONE",
  ComponentTemplatesCatalog = "COMPONENT_TEMPLATES_CATALOG",
  ContentCart = "CONTENT_CART",
  DatasheetCatalog = "DATASHEET_CATALOG",
  DataClassCatalog = "DATA_CLASS_CATALOG",
  DataClassZone = "DATA_CLASS_ZONE",
  DesignContentManagementZone = "DESIGN_CONTENT_MANAGEMENT_ZONE",
  DesignReuseBlocksCatalog = "DESIGN_REUSE_BLOCKS_CATALOG",
  DesignTemplatesCatalog = "DESIGN_TEMPLATES_CATALOG",
  DeviceClassCatalog = "DEVICE_CLASS_CATALOG",
  DeviceClassZone = "DEVICE_CLASS_ZONE",
  DraftsmanCatalog = "DRAFTSMAN_CATALOG",
  GenericFolder = "GENERIC_FOLDER",
  LayerStackCatalog = "LAYER_STACK_CATALOG",
  Library3D = "LIBRARY3_D",
  ManagedBomCatalog = "MANAGED_BOM_CATALOG",
  MorfikAppCatalog = "MORFIK_APP_CATALOG",
  MorfikAppSetCatalog = "MORFIK_APP_SET_CATALOG",
  MorfikPackageCatalog = "MORFIK_PACKAGE_CATALOG",
  MorfikPackageZone = "MORFIK_PACKAGE_ZONE",
  OutputjobsCatalog = "OUTPUTJOBS_CATALOG",
  PartChoiceList = "PART_CHOICE_LIST",
  Pcb3DModelLibrary = "PCB3D_MODEL_LIBRARY",
  PcbComponentLibrary = "PCB_COMPONENT_LIBRARY",
  PcbSnippetsCatalog = "PCB_SNIPPETS_CATALOG",
  PreferencesCatalog = "PREFERENCES_CATALOG",
  ProductionReleaseZone = "PRODUCTION_RELEASE_ZONE",
  Project = "PROJECT",
  ProjectCatalog = "PROJECT_CATALOG",
  ProjectTemplateCatalog = "PROJECT_TEMPLATE_CATALOG",
  SchematicSheetsCatalog = "SCHEMATIC_SHEETS_CATALOG",
  SchematicSnippetsCatalog = "SCHEMATIC_SNIPPETS_CATALOG",
  SchematicSymbolLibrary = "SCHEMATIC_SYMBOL_LIBRARY",
  SchematicTemplatesCatalog = "SCHEMATIC_TEMPLATES_CATALOG",
  ScriptCatalog = "SCRIPT_CATALOG",
  SharedFolder = "SHARED_FOLDER",
  SignalIntegrityModelsLibrary = "SIGNAL_INTEGRITY_MODELS_LIBRARY",
  SimulationModelsLibrary = "SIMULATION_MODELS_LIBRARY",
  TextDocumentLibrary = "TEXT_DOCUMENT_LIBRARY",
  WebApplicationDeploymentZone = "WEB_APPLICATION_DEPLOYMENT_ZONE",
  WebContentLibrary = "WEB_CONTENT_LIBRARY",
}

export type DesFootprint = {
  __typename?: "DesFootprint";
  comment: Scalars["String"]["output"];
  dataDownloadUrl: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  folder?: Maybe<DesFolder>;
  guid: Scalars["String"]["output"];
  imageFullSizeUrl: Scalars["String"]["output"];
  imageThumbnailUrl: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  /** @deprecated Not implemented and may be removed. */
  pins: Array<DesPin>;
};

export type DesGerber = {
  __typename?: "DesGerber";
  downloadUrl?: Maybe<Scalars["String"]["output"]>;
  gerberFiles: Array<DesDownloadableFile>;
  packageName?: Maybe<Scalars["String"]["output"]>;
};

export type DesGerberX2 = {
  __typename?: "DesGerberX2";
  downloadUrl?: Maybe<Scalars["String"]["output"]>;
  gerberX2Files: Array<DesDownloadableFile>;
  packageName?: Maybe<Scalars["String"]["output"]>;
};

export type DesIpc2581 = {
  __typename?: "DesIpc2581";
  downloadUrl?: Maybe<Scalars["String"]["output"]>;
  ipc2581Files: Array<DesDownloadableFile>;
  packageName?: Maybe<Scalars["String"]["output"]>;
};

export enum DesJobStatus {
  Done = "DONE",
  Error = "ERROR",
  Pending = "PENDING",
  Processing = "PROCESSING",
}

export type DesLaunchWorkflowInput = {
  /** The attachment variables. */
  attachments?: InputMaybe<Array<DesWorkflowAttachmentVariableInput>>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  /** The string variables. */
  variables: Array<DesWorkflowVariableInput>;
  workflowDefinitionId: Scalars["String"]["input"];
  workspaceUrl: Scalars["String"]["input"];
};

export type DesLaunchWorkflowPayload = {
  __typename?: "DesLaunchWorkflowPayload";
  id: Scalars["String"]["output"];
  status: Scalars["Int"]["output"];
};

export type DesLayer = {
  __typename?: "DesLayer";
  /** The copper area. */
  copperArea?: Maybe<DesArea>;
  /** The ratio of copper area to PCB area. */
  copperRatio?: Maybe<Scalars["Decimal"]["output"]>;
  copperWeight?: Maybe<DesWeight>;
  dielectricConstant?: Maybe<Scalars["Decimal"]["output"]>;
  layerProperties: Array<DesLayerProperty>;
  layerType: DesLayerType;
  material?: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  nets: Array<DesNet>;
  thickness?: Maybe<DesSize>;
};

export type DesLayerFilterInput = {
  and?: InputMaybe<Array<DesLayerFilterInput>>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<DesLayerFilterInput>>;
};

export type DesLayerProperty = {
  __typename?: "DesLayerProperty";
  name: Scalars["String"]["output"];
  size?: Maybe<DesSize>;
  text: Scalars["String"]["output"];
};

export enum DesLayerType {
  Abstract = "ABSTRACT",
  Adhesive = "ADHESIVE",
  BikiniCoverlay = "BIKINI_COVERLAY",
  Conductive = "CONDUCTIVE",
  Core = "CORE",
  Dielectric = "DIELECTRIC",
  Foil = "FOIL",
  Mechanical = "MECHANICAL",
  Misc = "MISC",
  NonConductive = "NON_CONDUCTIVE",
  Overlay = "OVERLAY",
  PasteMask = "PASTE_MASK",
  PeLayer = "PE_LAYER",
  Physical = "PHYSICAL",
  Plane = "PLANE",
  Plating = "PLATING",
  Prepreg = "PREPREG",
  Signal = "SIGNAL",
  SolderMask = "SOLDER_MASK",
  Stiffener = "STIFFENER",
  SurfaceFinish = "SURFACE_FINISH",
  Unknown = "UNKNOWN",
}

export type DesLibrary = {
  __typename?: "DesLibrary";
  /** Gets library component templates. */
  componentTemplates?: Maybe<DesComponentTemplateConnection>;
  /** Gets library components. */
  components?: Maybe<DesComponentConnection>;
  /** Gets library folders. */
  folders: Array<DesFolder>;
  /** Gets library reuse blocks. */
  reuseBlocks?: Maybe<DesReuseBlockConnection>;
};

export type DesLibraryComponentTemplatesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

export type DesLibraryComponentsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<DesComponentFilterInput>;
};

export type DesLibraryReuseBlocksArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

/** Revision naming scheme details obtained by `desLibrary/lifeCycleDefinitions`. */
export type DesLifeCycleDefinition = {
  __typename?: "DesLifeCycleDefinition";
  /** The `DesContentTypeKind` list for this lifecycle definition. */
  contentTypes: Array<DesContentTypeKind>;
  /** The `DateTime` this lifecycle definition was created. */
  createdAt: Scalars["DateTime"]["output"];
  /** The `DesUser` this lifecycle definition was created by. */
  createdBy: DesUser;
  /** Tells if this lifecycle definition is automatically assigned the first `DesLifeCycleState` when a revision is released. */
  isRevisionSchemeAssigned: Scalars["Boolean"]["output"];
  /** The reference ID for this lifecycle definition. */
  lifeCycleDefinitionId: Scalars["String"]["output"];
  lifeCycleManagementType: DesLifeCycleManagementType;
  /** The name of this lifecycle definition. */
  name: Scalars["String"]["output"];
  /** The `DesLifeCycleStage` list for this lifecycle definition. */
  stages: Array<Maybe<DesLifeCycleStage>>;
  /** The `DesLifeCycleStateTransition` list for this lifecycle definition. */
  stateTransitions: Array<Maybe<DesLifeCycleStateTransition>>;
  /** The `DateTime` this lifecycle definition was last updated. */
  updatedAt: Scalars["DateTime"]["output"];
  /** The `DesUser` this lifecycle definition was last updated by. */
  updatedBy: DesUser;
};

export enum DesLifeCycleManagementType {
  Simple = "SIMPLE",
  Structured = "STRUCTURED",
}

export type DesLifeCycleStage = {
  __typename?: "DesLifeCycleStage";
  /** The `DateTime` this lifecycle stage was created. */
  createdAt: Scalars["DateTime"]["output"];
  /** The `DesUser` this lifecycle stage was created by. */
  createdBy: DesUser;
  /** The reference ID for this lifecycle stage. */
  lifeCycleStageId: Scalars["String"]["output"];
  /** The name of this lifecycle stage. */
  name: Scalars["String"]["output"];
  /** The stage index for this lifecycle stage. */
  stageIndex: Scalars["Int"]["output"];
  /** The `DesLifeCycleState` list for this lifecycle stage. */
  states: Array<DesLifeCycleState>;
  /** The `DateTime` this lifecycle stage was last updated at. */
  updatedAt: Scalars["DateTime"]["output"];
  /** The `DesUser` this lifecycle stage was last updated by. */
  updatedBy: DesUser;
};

export type DesLifeCycleState = {
  __typename?: "DesLifeCycleState";
  /** The `DateTime` this lifecycle state was created. */
  createdAt: Scalars["DateTime"]["output"];
  /** The `DesUser` this lifecycle state was created by. */
  createdBy: DesUser;
  /** The description of this lifecycle state. */
  description: Scalars["String"]["output"];
  /** The reference ID for this lifecycle state. */
  lifeCycleStateId: Scalars["String"]["output"];
  /** The name of this lifecycle state. */
  name: Scalars["String"]["output"];
  /** The state index for this lifecycle state. */
  stateIndex: Scalars["Int"]["output"];
  /** The `DateTime` this lifecycle state was last updated at. */
  updatedAt: Scalars["DateTime"]["output"];
  /** The `DesUser` this lifecycle state was last updated by. */
  updatedBy: DesUser;
};

export type DesLifeCycleStateTransition = {
  __typename?: "DesLifeCycleStateTransition";
  /** The `DateTime` this lifecycle state transition was created. */
  createdAt: Scalars["DateTime"]["output"];
  /** The `DesUser` this lifecycle state transition was created by. */
  createdBy: DesUser;
  /** The `DesLifeCycleState` after the transition is applied. */
  lifeCycleStateAfter?: Maybe<DesLifeCycleState>;
  /** The `DesLifeCycleState` before the transition is applied. */
  lifeCycleStateBefore?: Maybe<DesLifeCycleState>;
  /** The reference ID for this lifecycle state transition. */
  lifeCycleStateTransitionId: Scalars["String"]["output"];
  /** The name of this lifecycle state transition. */
  name: Scalars["String"]["output"];
  /** The `DateTime` this lifecycle state transition was last updated at. */
  updatedAt: Scalars["DateTime"]["output"];
  /** The `DesUser` this lifecycle state transition was last updated by. */
  updatedBy: DesUser;
};

export type DesManufacturePackage = Node & {
  __typename?: "DesManufacturePackage";
  downloadUrl: Scalars["String"]["output"];
  /** The node identifier for this project (used by `desManufacturePackageById`). */
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

export type DesManufacturePackageCreationJob = {
  __typename?: "DesManufacturePackageCreationJob";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["String"]["output"];
  payload: DesManufacturePackageCreationJobPayload;
  status: DesJobStatus;
};

export type DesManufacturePackageCreationJobPayload = {
  __typename?: "DesManufacturePackageCreationJobPayload";
  errors: Array<DesPayloadError>;
  packageId?: Maybe<Scalars["ID"]["output"]>;
};

export type DesManufacturerPart = {
  __typename?: "DesManufacturerPart";
  /** The manufacturer company name. */
  companyName: Scalars["String"]["output"];
  /** The Octopart ID. */
  octopartId?: Maybe<Scalars["String"]["output"]>;
  /** The part number (MPN). */
  partNumber: Scalars["String"]["output"];
  priority: Scalars["Int"]["output"];
  supplierParts: Array<DesSupplierPart>;
};

/** A reference to a user in a comment. */
export type DesMention = {
  __typename?: "DesMention";
  /** The mentioned user. */
  user: DesUser;
};

export type DesMesh3D = {
  __typename?: "DesMesh3D";
  glbFile?: Maybe<DesDownloadableFile>;
};

export type DesModel3D = {
  __typename?: "DesModel3D";
  parasolidFile?: Maybe<DesDownloadableFile>;
};

export type DesNcDrill = {
  __typename?: "DesNcDrill";
  downloadUrl?: Maybe<Scalars["String"]["output"]>;
  ncDrillFiles: Array<DesDownloadableFile>;
  packageName?: Maybe<Scalars["String"]["output"]>;
};

export type DesNet = {
  __typename?: "DesNet";
  cumulativeLength: DesSize;
  layers: Array<DesLayer>;
  name: Scalars["String"]["output"];
  pads: Array<DesPad>;
  tracks: Array<DesTrack>;
  vias: Array<DesVia>;
};

export type DesNetTracksArgs = {
  where?: InputMaybe<DesTrackFilterInput>;
};

export type DesOdb = {
  __typename?: "DesOdb";
  downloadUrl?: Maybe<Scalars["String"]["output"]>;
  odbFiles: Array<DesDownloadableFile>;
  packageName?: Maybe<Scalars["String"]["output"]>;
};

export type DesOnCommentUpdatedInput = {
  token: Scalars["String"]["input"];
  workspaceUrl: Scalars["String"]["input"];
};

export type DesPad = {
  __typename?: "DesPad";
  designator?: Maybe<Scalars["String"]["output"]>;
  globalDesignator?: Maybe<Scalars["String"]["output"]>;
  holeSize: DesSize;
  isPlated?: Maybe<Scalars["Boolean"]["output"]>;
  layer?: Maybe<DesLayer>;
  net?: Maybe<DesNet>;
  padType: DesPadType;
  position: DesPosition2D;
  radius?: Maybe<Scalars["Int"]["output"]>;
  rotation?: Maybe<Scalars["Decimal"]["output"]>;
  shape?: Maybe<DesPrimitiveShape>;
  size: DesSize2D;
};

export enum DesPadType {
  Free = "FREE",
  Smd = "SMD",
}

export enum DesParameterType {
  Capacitance = "CAPACITANCE",
  Charge = "CHARGE",
  Conductance = "CONDUCTANCE",
  Current = "CURRENT",
  Decibels = "DECIBELS",
  Frequency = "FREQUENCY",
  Impedance = "IMPEDANCE",
  Inductance = "INDUCTANCE",
  Length = "LENGTH",
  Mass = "MASS",
  None = "NONE",
  Percent = "PERCENT",
  Power = "POWER",
  Resistance = "RESISTANCE",
  Temperature = "TEMPERATURE",
  Text = "TEXT",
  Time = "TIME",
  Voltage = "VOLTAGE",
}

export type DesPartChoiceInput = {
  companyName: Scalars["String"]["input"];
  partNumber: Scalars["String"]["input"];
};

export type DesPayloadError = {
  __typename?: "DesPayloadError";
  message: Scalars["String"]["output"];
};

/** A PCB contains design details of the physical product. */
export type DesPcb = {
  __typename?: "DesPcb";
  /** The total area contained by the PCB outline. */
  area: DesArea;
  /** The list of all comment threads related to this PCB. */
  commentThreads: Array<DesCommentThread>;
  /** PCB items, instances of `DesComponent`, returned by pages. */
  designItems?: Maybe<DesDesignItemConnection>;
  /** The reference identifier for this PCB. */
  documentId: Scalars["String"]["output"];
  /** The document file name. */
  documentName: Scalars["String"]["output"];
  /** The details of the layer structure of this PCB. */
  layerStack?: Maybe<DesStackup>;
  /** *PROTOTYPE, SUBJECT TO CHANGE* */
  mesh3D?: Maybe<DesMesh3D>;
  /** The list of all electrically connected regions in this PCB. */
  nets: Array<DesNet>;
  /** The location of the coordinate system origin. */
  origin: DesPosition2D;
  /** The outline of this PCB. */
  outline: DesPolygon;
  /** The list of all part connection targets in this PCB. */
  pads: Array<DesPad>;
  /** The dimensions of the PCB outline. */
  size: DesSize2D;
  /** The list of all conductor segments in this PCB. */
  tracks: Array<DesTrack>;
  /** The list of all multiple layer connections in this PCB. */
  vias: Array<DesVia>;
};

/** A PCB contains design details of the physical product. */
export type DesPcbDesignItemsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  designators?: InputMaybe<Array<Scalars["String"]["input"]>>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<DesDesignItemFilterInput>;
};

/** A PCB contains design details of the physical product. */
export type DesPcbNetsArgs = {
  names?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

/** A PCB contains design details of the physical product. */
export type DesPcbTracksArgs = {
  where?: InputMaybe<DesTrackFilterInput>;
};

export type DesPcbAssembly = {
  __typename?: "DesPcbAssembly";
  assemblyDrawings: DesAssemblyDrawings;
  downloadUrl: Scalars["String"]["output"];
  lifeCycleStateName: Scalars["String"]["output"];
  packageName: Scalars["String"]["output"];
  pickAndPlace: DesPickAndPlace;
  version: Scalars["String"]["output"];
};

export type DesPcbFabrication = {
  __typename?: "DesPcbFabrication";
  downloadUrl: Scalars["String"]["output"];
  gerber: DesGerber;
  gerberX2: DesGerberX2;
  ipc2581: DesIpc2581;
  lifeCycleStateName: Scalars["String"]["output"];
  ncDrill: DesNcDrill;
  odb: DesOdb;
  packageName: Scalars["String"]["output"];
  testPoints: DesTestPoints;
  version: Scalars["String"]["output"];
};

export enum DesPermissionScope {
  Anyone = "ANYONE",
  Collaborator = "COLLABORATOR",
  Group = "GROUP",
  Organisation = "ORGANISATION",
  Owner = "OWNER",
  User = "USER",
}

export type DesPickAndPlace = {
  __typename?: "DesPickAndPlace";
  downloadUrl?: Maybe<Scalars["String"]["output"]>;
  packageName?: Maybe<Scalars["String"]["output"]>;
  pickAndPlaceFiles: Array<DesDownloadableFile>;
};

export type DesPin = {
  __typename?: "DesPin";
  description: Scalars["String"]["output"];
  designator: Scalars["String"]["output"];
  electricalType: DesPinElectricalType;
  name: Scalars["String"]["output"];
};

export enum DesPinElectricalType {
  HiZ = "HI_Z",
  Input = "INPUT",
  Io = "IO",
  OpenCollector = "OPEN_COLLECTOR",
  OpenEmitter = "OPEN_EMITTER",
  Output = "OUTPUT",
  Passive = "PASSIVE",
  Power = "POWER",
}

export type DesPolygon = {
  __typename?: "DesPolygon";
  vertices: Array<DesPosition2D>;
};

export type DesPosition2D = {
  __typename?: "DesPosition2D";
  x: Scalars["Int"]["output"];
  xMils: Scalars["Decimal"]["output"];
  xMm: Scalars["Decimal"]["output"];
  y: Scalars["Int"]["output"];
  yMils: Scalars["Decimal"]["output"];
  yMm: Scalars["Decimal"]["output"];
};

export type DesPosition2DInput = {
  x: Scalars["Int"]["input"];
  y: Scalars["Int"]["input"];
};

export enum DesPrimitiveShape {
  Arc = "ARC",
  Circle = "CIRCLE",
  Custom = "CUSTOM",
  None = "NONE",
  Octagon = "OCTAGON",
  Rectangle = "RECTANGLE",
  RotatedRectangle = "ROTATED_RECTANGLE",
  Round = "ROUND",
  RoundedRectangle = "ROUNDED_RECTANGLE",
  RoundRectangle = "ROUND_RECTANGLE",
  Terminator = "TERMINATOR",
}

/** A project manages all development stages of the PCB/PCA product lifecycle. */
export type DesProject = Node & {
  __typename?: "DesProject";
  /** The latest ECAD or MCAD revision. See also `desProjectCollaborationLatestRevision`. */
  collaborationLatestRevision?: Maybe<DesCollaborationRevision>;
  /** ECAD or MCAD revisions returned by pages. See also `desProjectCollaborationRevisions`. */
  collaborationRevisions?: Maybe<DesCollaborationRevisionConnection>;
  /** The `DateTime` when this project was created. */
  createdAt: Scalars["DateTime"]["output"];
  /** The account information for who created this project. */
  createdBy: DesUser;
  /** The summary of this project content or purpose. */
  description?: Maybe<Scalars["String"]["output"]>;
  /** The detailed design information for this project. */
  design: DesDesign;
  /** The node identifier for this project (used by `desProjectById`). */
  id: Scalars["ID"]["output"];
  /** The latest VCS revision. */
  latestRevision: DesVcsRevision;
  /** The assigned name for this project. */
  name?: Maybe<Scalars["String"]["output"]>;
  /** The list of the parameters describing this project. */
  parameters: Array<DesProjectParameter>;
  /** The web address to download a preview image for this project. */
  previewUrl: Scalars["String"]["output"];
  /** The reference identifier for this project. */
  projectId: Scalars["String"]["output"];
  projectPermissions: Array<DesProjectPermission>;
  /** The list of VCS revisions. */
  revisions?: Maybe<DesVcsRevisionConnection>;
  /** The list of project tasks. For a particular project consider using the more effective query `desProjectTasks`. */
  tasks?: Maybe<Array<DesTask>>;
  /** The `DateTime` when this project was last modified. */
  updatedAt: Scalars["DateTime"]["output"];
  /** The account information for who last modified this project. */
  updatedBy: DesUser;
  /** The Altium 365 web address. */
  url: Scalars["String"]["output"];
  /** The list of workflows associated with this project. */
  workflows?: Maybe<Array<DesWorkflow>>;
  /** The Altium 365 workspace URL. */
  workspaceUrl: Scalars["String"]["output"];
};

/** A project manages all development stages of the PCB/PCA product lifecycle. */
export type DesProjectCollaborationLatestRevisionArgs = {
  domain: DesCollaborationDomain;
};

/** A project manages all development stages of the PCB/PCA product lifecycle. */
export type DesProjectCollaborationRevisionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  domain: DesCollaborationDomain;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

/** A project manages all development stages of the PCB/PCA product lifecycle. */
export type DesProjectParametersArgs = {
  names?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

/** A project manages all development stages of the PCB/PCA product lifecycle. */
export type DesProjectRevisionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

/** A project manages all development stages of the PCB/PCA product lifecycle. */
export type DesProjectWorkflowsArgs = {
  isClosed?: Scalars["Boolean"]["input"];
  modifiedAfter?: InputMaybe<Scalars["DateTime"]["input"]>;
  where?: InputMaybe<DesWorkflowFilterInput>;
};

/** A connection to a list of items. */
export type DesProjectConnection = {
  __typename?: "DesProjectConnection";
  /** A list of edges. */
  edges?: Maybe<Array<DesProjectEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<DesProject>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars["Int"]["output"];
};

/** An edge in a connection. */
export type DesProjectEdge = {
  __typename?: "DesProjectEdge";
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge. */
  node: DesProject;
};

export type DesProjectExportAnyInput = {
  /** A suggested result file name. Default: `Export.zip`. */
  fileName?: InputMaybe<Scalars["String"]["input"]>;
  /** The content of Altium Designer `OutJob` file. */
  outJobContent: Scalars["String"]["input"];
};

export type DesProjectExportGerberInput = {
  /** A suggested result file name. Default: `Gerber.zip`. */
  fileName?: InputMaybe<Scalars["String"]["input"]>;
};

export type DesProjectExportGerberX2Input = {
  /** A suggested result file name. Default: `GerberX2.zip`. */
  fileName?: InputMaybe<Scalars["String"]["input"]>;
};

export type DesProjectExportIdfInput = {
  /** A suggested result file name. Default: `IDF.zip`. */
  fileName?: InputMaybe<Scalars["String"]["input"]>;
};

export type DesProjectExportJob = {
  __typename?: "DesProjectExportJob";
  /** When the job status is `DONE`, the result zip file download URL. */
  downloadUrl?: Maybe<Scalars["String"]["output"]>;
  /** Whet the job status is `ERROR`, the error message. */
  reason?: Maybe<Scalars["String"]["output"]>;
  /** The job current status. */
  status: DesJobStatus;
};

export type DesProjectExportNcDrillInput = {
  /** A suggested result file name. Default: `NCDrill.zip`. */
  fileName?: InputMaybe<Scalars["String"]["input"]>;
};

/** A project manages all development stages of the PCB/PCA product lifecycle. */
export type DesProjectFilterInput = {
  and?: InputMaybe<Array<DesProjectFilterInput>>;
  /** The `DateTime` when this project was created. */
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  /** The summary of this project content or purpose. */
  description?: InputMaybe<StringOperationFilterInput>;
  /** The assigned name for this project. */
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<DesProjectFilterInput>>;
  /** The reference identifier for this project. */
  projectId?: InputMaybe<StringOperationFilterInput>;
  /** The `DateTime` when this project was last modified. */
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
  /** The Altium 365 web address. */
  url?: InputMaybe<StringOperationFilterInput>;
  /** The Altium 365 workspace URL. */
  workspaceUrl?: InputMaybe<StringOperationFilterInput>;
};

export type DesProjectIdPayload = {
  __typename?: "DesProjectIdPayload";
  id: Scalars["ID"]["output"];
};

export type DesProjectParameter = {
  __typename?: "DesProjectParameter";
  name: Scalars["String"]["output"];
  value: Scalars["String"]["output"];
};

export type DesProjectPermission = {
  __typename?: "DesProjectPermission";
  /** Tells if this permission allows creation of objects within the associated project. */
  canCreate: Scalars["Boolean"]["output"];
  /** Tells if this permission allows deletion of the associated project. */
  canDelete: Scalars["Boolean"]["output"];
  /** Tells if this permission allows editing the associated project. */
  canEdit: Scalars["Boolean"]["output"];
  /** Tells if this permission allows reading of the associated project. */
  canRead: Scalars["Boolean"]["output"];
  /** The `DesUserGroup` this permission is associated with. */
  group?: Maybe<DesUserGroup>;
  /** The name of this permission. */
  name: Scalars["String"]["output"];
  /** The permission scope to differentiate different permission types. */
  scope: DesPermissionScope;
  /** The `DesUser` this permission is associated with. */
  user?: Maybe<DesUser>;
};

export type DesRectangle = {
  __typename?: "DesRectangle";
  pos1: DesPosition2D;
  pos2: DesPosition2D;
};

export type DesRectangleInput = {
  pos1: DesPosition2DInput;
  pos2: DesPosition2DInput;
};

/** A release is a published version of a design with additional generated files for manufacturing. */
export type DesRelease = Node & {
  __typename?: "DesRelease";
  /** The `DateTime` when this release was created. */
  createdAt: Scalars["DateTime"]["output"];
  /** The summary of this release content or purpose. */
  description: Scalars["String"]["output"];
  /** The node identifier for this release (used by `desReleaseById`). */
  id: Scalars["ID"]["output"];
  manufacturePackages: Array<DesManufacturePackage>;
  /** The reference identifier for this release. */
  releaseId: Scalars["String"]["output"];
  /** The list of variations contained in this release. */
  variants: Array<DesReleaseVariant>;
};

/** A release is a published version of a design with additional generated files for manufacturing. */
export type DesReleaseVariantsArgs = {
  where?: InputMaybe<DesReleaseVariantFilterInput>;
};

export type DesReleaseComponentFileInput = {
  /** Uploaded file ID. */
  fileId: Scalars["String"]["input"];
  /** Relative path of the source file. */
  relativePath: Scalars["String"]["input"];
};

export type DesReleaseComponentInput = {
  componentComment?: InputMaybe<Scalars["String"]["input"]>;
  componentDescription?: InputMaybe<Scalars["String"]["input"]>;
  componentItemName: Scalars["String"]["input"];
  componentLifeCycleDefinitionId?: InputMaybe<Scalars["String"]["input"]>;
  componentReleaseFolder: Scalars["String"]["input"];
  componentRevisionNamingSchemeId?: InputMaybe<Scalars["String"]["input"]>;
  footprintFiles: Array<DesReleaseComponentFileInput>;
  /** The footprint name. Use null to be generated. */
  footprintItemName?: InputMaybe<Scalars["String"]["input"]>;
  footprintLifeCycleDefinitionId?: InputMaybe<Scalars["String"]["input"]>;
  /** The footprint folder path, existing or to be created. */
  footprintReleaseFolder: Scalars["String"]["input"];
  footprintRevisionNamingSchemeId?: InputMaybe<Scalars["String"]["input"]>;
  parameters: Array<DesRevisionParameterInput>;
  symbolFiles: Array<DesReleaseComponentFileInput>;
  /** The symbol name. Use null to be generated. */
  symbolItemName?: InputMaybe<Scalars["String"]["input"]>;
  symbolLifeCycleDefinitionId?: InputMaybe<Scalars["String"]["input"]>;
  /** The symbol folder path, existing or to be created. */
  symbolReleaseFolder: Scalars["String"]["input"];
  symbolRevisionNamingSchemeId?: InputMaybe<Scalars["String"]["input"]>;
  workspaceUrl: Scalars["String"]["input"];
};

export type DesReleaseComponentPayload = {
  __typename?: "DesReleaseComponentPayload";
  errors: Array<DesPayloadError>;
};

/** Input parameters for `desReleaseComponentTemplate`. */
export type DesReleaseComponentTemplateInput = {
  /** Optional comment. */
  comment?: InputMaybe<Scalars["String"]["input"]>;
  /** The component template content (CMPT format JSON string). */
  contentAsText: Scalars["String"]["input"];
  /** Optional description. */
  description?: InputMaybe<Scalars["String"]["input"]>;
  /** The target folder path, existing or to be created. */
  folder: Scalars["String"]["input"];
  /** Optional life cycle ID. */
  lifeCycleDefinitionId?: InputMaybe<Scalars["String"]["input"]>;
  /** The component template name. */
  name: Scalars["String"]["input"];
  /** Optional parameters. */
  parameters?: InputMaybe<Array<DesRevisionParameterInput>>;
  /** Optional naming scheme ID. */
  revisionNamingSchemeId?: InputMaybe<Scalars["String"]["input"]>;
  /** The target workspace URL. */
  workspaceUrl: Scalars["String"]["input"];
};

export type DesReleaseComponentTemplatePayload = {
  __typename?: "DesReleaseComponentTemplatePayload";
  componentTemplateId: Scalars["ID"]["output"];
  errors: Array<DesPayloadError>;
};

/** A connection to a list of items. */
export type DesReleaseConnection = {
  __typename?: "DesReleaseConnection";
  /** A list of edges. */
  edges?: Maybe<Array<DesReleaseEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<DesRelease>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars["Int"]["output"];
};

/** An edge in a connection. */
export type DesReleaseEdge = {
  __typename?: "DesReleaseEdge";
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge. */
  node: DesRelease;
};

/** A release is a published version of a design with additional generated files for manufacturing. */
export type DesReleaseFilterInput = {
  and?: InputMaybe<Array<DesReleaseFilterInput>>;
  /** The `DateTime` when this release was created. */
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  /** The summary of this release content or purpose. */
  description?: InputMaybe<StringOperationFilterInput>;
  /** The node identifier for this release (used by `desReleaseById`). */
  id?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<DesReleaseFilterInput>>;
  /** The reference identifier for this release. */
  releaseId?: InputMaybe<StringOperationFilterInput>;
};

/** A variant contains a specific configuration of a base design. */
export type DesReleaseVariant = {
  __typename?: "DesReleaseVariant";
  /** The Bill of Materials (BOM) for this published design variant. */
  bom?: Maybe<DesBom>;
  /** The descriptive label for this design variant. */
  name: Scalars["String"]["output"];
  /** The PCB document for this design variant. */
  pcb?: Maybe<DesPcb>;
  /** The data needed for assembly of this published design variant. */
  pcbAssembly?: Maybe<DesPcbAssembly>;
  /** The data needed for fabrication of this published design variant. */
  pcbFabrication?: Maybe<DesPcbFabrication>;
  /** The list of schematic documents for this design variant. */
  schematics: Array<DesSchematic>;
};

/** A variant contains a specific configuration of a base design. */
export type DesReleaseVariantSchematicsArgs = {
  where?: InputMaybe<DesSchematicFilterInput>;
};

/** A variant contains a specific configuration of a base design. */
export type DesReleaseVariantFilterInput = {
  and?: InputMaybe<Array<DesReleaseVariantFilterInput>>;
  /** The descriptive label for this design variant. */
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<DesReleaseVariantFilterInput>>;
};

export type DesRemoveComponentPartChoicesInput = {
  componentId: Scalars["ID"]["input"];
  manufacturerParts?: InputMaybe<Array<DesPartChoiceInput>>;
};

export type DesRemoveComponentPartChoicesPayload = {
  __typename?: "DesRemoveComponentPartChoicesPayload";
  errors: Array<DesPayloadError>;
};

export type DesRemoveUsersFromGroupInput = {
  /** The group node ID. */
  id: Scalars["ID"]["input"];
  /** User IDs. */
  userIds: Array<Scalars["String"]["input"]>;
};

export type DesRemoveUsersFromGroupPayload = {
  __typename?: "DesRemoveUsersFromGroupPayload";
  errors: Array<DesPayloadError>;
};

export type DesReuseBlock = Node & {
  __typename?: "DesReuseBlock";
  description: Scalars["String"]["output"];
  /** The node identifier for this reuse block (used by `desReuseBlockById`). */
  id: Scalars["ID"]["output"];
  latestRevision: DesReuseBlockRevision;
  name: Scalars["String"]["output"];
  revisions: Array<DesReuseBlockRevision>;
};

/** A connection to a list of items. */
export type DesReuseBlockConnection = {
  __typename?: "DesReuseBlockConnection";
  /** A list of edges. */
  edges?: Maybe<Array<DesReuseBlockEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<DesReuseBlock>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars["Int"]["output"];
};

/** An edge in a connection. */
export type DesReuseBlockEdge = {
  __typename?: "DesReuseBlockEdge";
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge. */
  node: DesReuseBlock;
};

export type DesReuseBlockRevision = Node & {
  __typename?: "DesReuseBlockRevision";
  comment: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  /** The node identifier for this reuse block (used by `desReuseBlockRevisionById`). */
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  pcbSnippet: DesDownloadableFile;
  schematicSnippet: DesDownloadableFile;
};

/** Revision details ID for later use or full details. */
export type DesRevision = {
  __typename?: "DesRevision";
  /** The revision details or null for unmanaged components. */
  details?: Maybe<DesRevisionDetails>;
  /** The revision details ID for `desRevisionDetailsById`. The instance may not exist for unmanaged components. */
  id: Scalars["ID"]["output"];
};

/** Revision details. */
export type DesRevisionDetails = {
  __typename?: "DesRevisionDetails";
  childCount: Scalars["Int"]["output"];
  comment?: Maybe<Scalars["String"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  /** The node ID. */
  id: Scalars["ID"]["output"];
  lifeCycleState: DesLifeCycleState;
  parentCount: Scalars["Int"]["output"];
  references: Array<DesDownloadableFile>;
};

export type DesRevisionNameLevel = {
  __typename?: "DesRevisionNameLevel";
  /** The `DateTime` this revision name level was created. */
  createdAt: Scalars["DateTime"]["output"];
  /** The `DesUser` this revision name level was created by. */
  createdBy: DesUser;
  /** The level index of this revision name level. */
  levelIndex: Scalars["Int"]["output"];
  /** The level separator of this revision name level. */
  levelSeparator: Scalars["String"]["output"];
  /** The level sequence of this revision name level. */
  levelSequence: Scalars["String"]["output"];
  /** The minimum width of this revision name level. */
  minimumWidth: Scalars["Int"]["output"];
  /** The name of this revision name level. */
  name: Scalars["String"]["output"];
  /** The reference ID for this revision name level. */
  revisionNameLevelId: Scalars["String"]["output"];
  /** The `DateTime` this revision name level was last updated at. */
  updatedAt: Scalars["DateTime"]["output"];
  /** The `DesUser` this revision name level was last updated by. */
  updatedBy: DesUser;
};

/** Revision naming scheme details obtained by `desLibrary/revisionNamingSchemes`. */
export type DesRevisionNamingScheme = {
  __typename?: "DesRevisionNamingScheme";
  /** The `DesContentTypeKind` list for this revision naming scheme. */
  contentTypes: Array<DesContentTypeKind>;
  /** The `DateTime` this revision naming scheme was created. */
  createdAt: Scalars["DateTime"]["output"];
  /** The `DesUser` this revision naming scheme was created by. */
  createdBy: DesUser;
  /** The revision separator of this revision naming scheme. */
  itemRevisionSeparator: Scalars["String"]["output"];
  /** The `DesRevisionNameLevel` list for this revision naming scheme. */
  levels: Array<DesRevisionNameLevel>;
  /** The name of this revision naming scheme. */
  name: Scalars["String"]["output"];
  /** The reference ID for this revision naming scheme. */
  revisionNamingSchemeId: Scalars["String"]["output"];
  /** The `DateTime` this revision naming scheme was last updated at. */
  updatedAt: Scalars["DateTime"]["output"];
  /** The `DesUser` this revision naming scheme was last updated by. */
  updatedBy: DesUser;
};

export type DesRevisionParameterInput = {
  name: Scalars["String"]["input"];
  value: Scalars["String"]["input"];
};

/** A schematic contains the design parts and logical connections. */
export type DesSchematic = {
  __typename?: "DesSchematic";
  /** The list of all comment threads related to this schematic. */
  commentThreads: Array<DesCommentThread>;
  /** The list of all part instances used in this schematic grouped into pages. */
  designItems?: Maybe<DesDesignItemConnection>;
  /** The reference identifier for this schematic. */
  documentId: Scalars["String"]["output"];
  /** The document file name. */
  documentName: Scalars["String"]["output"];
};

/** A schematic contains the design parts and logical connections. */
export type DesSchematicDesignItemsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<DesDesignItemFilterInput>;
};

/** A schematic contains the design parts and logical connections. */
export type DesSchematicFilterInput = {
  and?: InputMaybe<Array<DesSchematicFilterInput>>;
  /** The reference identifier for this schematic. */
  documentId?: InputMaybe<StringOperationFilterInput>;
  /** The document file name. */
  documentName?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<DesSchematicFilterInput>>;
};

export type DesSharedWithMe = {
  __typename?: "DesSharedWithMe";
  manufacturePackages: Array<DesManufacturePackage>;
  projects?: Maybe<DesSharedWithMeProjectInfoConnection>;
};

export type DesSharedWithMeProjectsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<DesSharedWithMeProjectInfoFilterInput>;
};

export type DesSharedWithMeProjectInfo = {
  __typename?: "DesSharedWithMeProjectInfo";
  /** The project description. */
  description: Scalars["String"]["output"];
  /** The project name. */
  name: Scalars["String"]["output"];
  /** The project or null if its workspace is deleted. Avoid this field on getting many projects at once. Consider using `id` and `desProjectById`. */
  project?: Maybe<DesProject>;
  /** The project node ID. Use it for getting the project by `desProjectById`. */
  projectId: Scalars["ID"]["output"];
};

/** A connection to a list of items. */
export type DesSharedWithMeProjectInfoConnection = {
  __typename?: "DesSharedWithMeProjectInfoConnection";
  /** A list of edges. */
  edges?: Maybe<Array<DesSharedWithMeProjectInfoEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<DesSharedWithMeProjectInfo>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars["Int"]["output"];
};

/** An edge in a connection. */
export type DesSharedWithMeProjectInfoEdge = {
  __typename?: "DesSharedWithMeProjectInfoEdge";
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge. */
  node: DesSharedWithMeProjectInfo;
};

export type DesSharedWithMeProjectInfoFilterInput = {
  and?: InputMaybe<Array<DesSharedWithMeProjectInfoFilterInput>>;
  /** The project description. */
  description?: InputMaybe<StringOperationFilterInput>;
  /** The project name. */
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<DesSharedWithMeProjectInfoFilterInput>>;
};

export type DesSimulation = {
  __typename?: "DesSimulation";
  comment: Scalars["String"]["output"];
  dataDownloadUrl: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  folder?: Maybe<DesFolder>;
  guid: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
};

export type DesSize = {
  __typename?: "DesSize";
  x: Scalars["Decimal"]["output"];
  xMils: Scalars["Decimal"]["output"];
  xMm: Scalars["Decimal"]["output"];
};

export type DesSize2D = {
  __typename?: "DesSize2D";
  x: Scalars["Int"]["output"];
  xMils: Scalars["Decimal"]["output"];
  xMm: Scalars["Decimal"]["output"];
  y: Scalars["Int"]["output"];
  yMils: Scalars["Decimal"]["output"];
  yMm: Scalars["Decimal"]["output"];
};

export type DesStack = {
  __typename?: "DesStack";
  layers: Array<DesLayer>;
  name: Scalars["String"]["output"];
};

export type DesStackup = {
  __typename?: "DesStackup";
  layerTypes: Array<DesLayerType>;
  roughnessFactorRF: Scalars["String"]["output"];
  roughnessFactorSR: Scalars["String"]["output"];
  roughnessType: Scalars["String"]["output"];
  stacks: Array<DesStack>;
  stackupType: Scalars["String"]["output"];
};

export type DesSupplierPart = {
  __typename?: "DesSupplierPart";
  /** The supplier company name. */
  companyName: Scalars["String"]["output"];
  /** The part number (SKU). */
  partNumber: Scalars["String"]["output"];
  /** Use `prices` and `stocks` with library components only, e.g. `desLibrary/components`, `desComponentById`. */
  prices?: Maybe<Array<DesSupplierPrice>>;
  /** Use `prices` and `stocks` with library components only, e.g. `desLibrary/components`, `desComponentById`. */
  stocks?: Maybe<Array<DesSupplierStock>>;
};

export type DesSupplierPrice = {
  __typename?: "DesSupplierPrice";
  breakQuantity: Scalars["Int"]["output"];
  currency: Scalars["String"]["output"];
  price: Scalars["Decimal"]["output"];
};

export type DesSupplierStock = {
  __typename?: "DesSupplierStock";
  locationName: Scalars["String"]["output"];
  quantity: Scalars["Decimal"]["output"];
};

export type DesSymbol = {
  __typename?: "DesSymbol";
  comment: Scalars["String"]["output"];
  dataDownloadUrl: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  folder?: Maybe<DesFolder>;
  guid: Scalars["String"]["output"];
  imageFullSizeUrl: Scalars["String"]["output"];
  imageThumbnailUrl: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  /** The list of pins. */
  pins: Array<DesPin>;
};

export type DesTask = Node & {
  __typename?: "DesTask";
  /** The assigned user. */
  assignee: DesUser;
  /** The list of task comments. */
  comments: Array<DesComment>;
  /** The creation date. */
  createdAt: Scalars["DateTime"]["output"];
  /** The user who created the task. */
  createdBy: DesUser;
  /** The task description. */
  description: Scalars["String"]["output"];
  /** The node ID. */
  id: Scalars["ID"]["output"];
  /** The last modification date. */
  modifiedAt: Scalars["DateTime"]["output"];
  /** The user who modified the task. */
  modifiedBy: DesUser;
  /** The task name. */
  name: Scalars["String"]["output"];
  /** The task priority. */
  priority: DesTaskPriority;
  /** The task ID shown in Altium 365. */
  refId: Scalars["String"]["output"];
  /** The task status. */
  status: DesTaskStatus;
};

/** A connection to a list of items. */
export type DesTaskConnection = {
  __typename?: "DesTaskConnection";
  /** A list of edges. */
  edges?: Maybe<Array<DesTaskEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<DesTask>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars["Int"]["output"];
};

/** An edge in a connection. */
export type DesTaskEdge = {
  __typename?: "DesTaskEdge";
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge. */
  node: DesTask;
};

export enum DesTaskPriority {
  High = "HIGH",
  Highest = "HIGHEST",
  Low = "LOW",
  Medium = "MEDIUM",
  Undefined = "UNDEFINED",
}

export enum DesTaskStatus {
  InProgress = "IN_PROGRESS",
  Resolved = "RESOLVED",
  ToDo = "TO_DO",
  Undefined = "UNDEFINED",
}

export type DesTeam = {
  __typename?: "DesTeam";
  groups: Array<DesUserGroup>;
  users: Array<DesUser>;
};

export type DesTerminateWorkflowsError = {
  __typename?: "DesTerminateWorkflowsError";
  id: Scalars["String"]["output"];
  message: Scalars["String"]["output"];
};

export type DesTerminateWorkflowsInput = {
  workflowIds: Array<Scalars["String"]["input"]>;
  workspaceUrl: Scalars["String"]["input"];
};

export type DesTerminateWorkflowsPayload = {
  __typename?: "DesTerminateWorkflowsPayload";
  errors: Array<DesTerminateWorkflowsError>;
};

export type DesTestPoints = {
  __typename?: "DesTestPoints";
  downloadUrl?: Maybe<Scalars["String"]["output"]>;
  packageName?: Maybe<Scalars["String"]["output"]>;
  testPointFiles: Array<DesDownloadableFile>;
};

export type DesTrack = {
  __typename?: "DesTrack";
  begin: DesPosition2D;
  end: DesPosition2D;
  layer?: Maybe<DesLayer>;
  net?: Maybe<DesNet>;
  width: DesSize;
};

export type DesTrackFilterInput = {
  and?: InputMaybe<Array<DesTrackFilterInput>>;
  layer?: InputMaybe<DesLayerFilterInput>;
  or?: InputMaybe<Array<DesTrackFilterInput>>;
};

export type DesUnionPayload = DesComponent | DesErrorPayload;

export type DesUpdateCommentInput = {
  commentId: Scalars["String"]["input"];
  commentThreadId: Scalars["String"]["input"];
  entityId: Scalars["ID"]["input"];
  text: Scalars["String"]["input"];
};

export type DesUpdateCommentPayload = {
  __typename?: "DesUpdateCommentPayload";
  errors: Array<DesPayloadError>;
};

export type DesUpdateComponentItemParametersInput = {
  componentId: Scalars["ID"]["input"];
  parameters: Array<DesComponentItemParameterInput>;
  /** Tells to replace all existing parameters. By default parameters are added to existing. */
  replaceExisting?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type DesUpdateComponentItemParametersPayload = {
  __typename?: "DesUpdateComponentItemParametersPayload";
  componentId: Scalars["ID"]["output"];
  errors: Array<DesPayloadError>;
};

export type DesUpdateComponentRevisionParametersInput = {
  componentId: Scalars["ID"]["input"];
  componentRevisionNamingSchemeId?: InputMaybe<Scalars["String"]["input"]>;
  parameters: Array<DesRevisionParameterInput>;
  releaseNote?: InputMaybe<Scalars["String"]["input"]>;
  /** Tells to replace all existing parameters. By default parameters are added to existing. */
  replaceExisting?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type DesUpdateComponentRevisionParametersPayload = {
  __typename?: "DesUpdateComponentRevisionParametersPayload";
  componentId: Scalars["ID"]["output"];
  errors: Array<DesPayloadError>;
};

/** Input parameters for `desUpdateComponentTemplate`. */
export type DesUpdateComponentTemplateInput = {
  /** Optional comment. */
  comment?: InputMaybe<Scalars["String"]["input"]>;
  /** The node ID. */
  componentTemplateId: Scalars["ID"]["input"];
  /** The component template content (CMPT format JSON string). */
  contentAsText: Scalars["String"]["input"];
  /** Optional description. */
  description?: InputMaybe<Scalars["String"]["input"]>;
};

export type DesUpdateComponentTemplatePayload = {
  __typename?: "DesUpdateComponentTemplatePayload";
  errors: Array<DesPayloadError>;
};

export type DesUpdateFolderPermissionInput = {
  /** Allows updating, deleting and creating when set, otherwise only read permissions will be allowed. */
  canModify: Scalars["Boolean"]["input"];
  groupId?: InputMaybe<Scalars["ID"]["input"]>;
  scope: DesPermissionScope;
  userId?: InputMaybe<Scalars["String"]["input"]>;
};

export type DesUpdateFolderPermissionsInput = {
  /** Tells to apply the permissions update to all child objects. By default permissions are only set for the folder itself. */
  applyToChildren?: InputMaybe<Scalars["Boolean"]["input"]>;
  folderId: Scalars["ID"]["input"];
  permissions: Array<DesUpdateFolderPermissionInput>;
  /** Tells to replace all existing permissions. By default permissions are added to existing. */
  replaceExisting?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type DesUpdateFolderPermissionsPayload = {
  __typename?: "DesUpdateFolderPermissionsPayload";
  folderId: Scalars["ID"]["output"];
};

export type DesUpdateProjectPermissionInput = {
  /** Allows updating, deleting and creating when set, otherwise only read permissions will be allowed. */
  canModify: Scalars["Boolean"]["input"];
  groupId?: InputMaybe<Scalars["ID"]["input"]>;
  scope: DesPermissionScope;
  userId?: InputMaybe<Scalars["String"]["input"]>;
};

export type DesUpdateProjectPermissionsInput = {
  /** Tells to apply the permissions update to all child objects. By default permissions are only set for the project itself. */
  applyToChildren?: InputMaybe<Scalars["Boolean"]["input"]>;
  permissions: Array<DesUpdateProjectPermissionInput>;
  projectId: Scalars["ID"]["input"];
  /** Tells to replace all existing permissions. By default permissions are added to existing. */
  replaceExisting?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type DesUpdateProjectPermissionsPayload = {
  __typename?: "DesUpdateProjectPermissionsPayload";
  projectId: Scalars["ID"]["output"];
};

export type DesUpdateReuseBlockInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type DesUpdateReuseBlockPayload = {
  __typename?: "DesUpdateReuseBlockPayload";
  errors: Array<DesPayloadError>;
};

export type DesUpdateTaskCommentInput = {
  /** The comment ID. */
  commentId: Scalars["String"]["input"];
  /** The task node ID. */
  taskId: Scalars["ID"]["input"];
  /** New comment text. */
  text: Scalars["String"]["input"];
};

export type DesUpdateTaskCommentPayload = {
  __typename?: "DesUpdateTaskCommentPayload";
  errors: Array<DesPayloadError>;
};

export type DesUpdateTaskInput = {
  /** New task description or null to keep old. */
  description?: InputMaybe<Scalars["String"]["input"]>;
  /** New task name or null to keep old. */
  name?: InputMaybe<Scalars["String"]["input"]>;
  /** New task priority or null to keep old. */
  priority?: InputMaybe<DesTaskPriority>;
  /** New task status or null to keep old. */
  status?: InputMaybe<DesTaskStatus>;
  /** The task node ID. */
  taskId: Scalars["ID"]["input"];
};

export type DesUpdateTaskPayload = {
  __typename?: "DesUpdateTaskPayload";
  errors: Array<DesPayloadError>;
};

export type DesUpdateUserGroupInput = {
  /** The group node ID. */
  id: Scalars["ID"]["input"];
  /** The group name. */
  name: Scalars["String"]["input"];
};

export type DesUpdateUserGroupPayload = {
  __typename?: "DesUpdateUserGroupPayload";
  errors: Array<DesPayloadError>;
};

export type DesUpdateUserInput = {
  firstName?: InputMaybe<Scalars["String"]["input"]>;
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  userId: Scalars["String"]["input"];
  workspaceUrl: Scalars["String"]["input"];
};

export type DesUpdateUserPayload = {
  __typename?: "DesUpdateUserPayload";
  errors: Array<DesPayloadError>;
};

export type DesUploadCollaborationInput = {
  /** The uploaded file comment. */
  comment: Scalars["String"]["input"];
  /** *PROTOTYPE, SUBJECT TO CHANGE* */
  design?: InputMaybe<DesCadDesignInput>;
  /** The ECAD or MCAD domain. */
  domain: DesCollaborationDomain;
  /** The uploaded file ID. Either the file ID or design must be given. */
  fileId?: InputMaybe<Scalars["String"]["input"]>;
  /** The project node ID. */
  projectId: Scalars["ID"]["input"];
};

export type DesUploadCollaborationPayload = {
  __typename?: "DesUploadCollaborationPayload";
  errors: Array<DesPayloadError>;
};

export type DesUploadCollaborationSimulationInput = {
  comment: Scalars["String"]["input"];
  domain: Scalars["String"]["input"];
  files: Array<DesCollaborationSimulationFileInput>;
  projectId: Scalars["ID"]["input"];
  projectType: Scalars["String"]["input"];
  revision: Scalars["String"]["input"];
};

export type DesUploadCollaborationSimulationPayload = {
  __typename?: "DesUploadCollaborationSimulationPayload";
  errors: Array<DesPayloadError>;
};

export type DesUploadProjectInput = {
  /** The project description. */
  description?: InputMaybe<Scalars["String"]["input"]>;
  /** The uploaded zip file ID. */
  fileId: Scalars["String"]["input"];
  /** The project target folder path. */
  folderPath?: InputMaybe<Scalars["String"]["input"]>;
  /** The project name. */
  name: Scalars["String"]["input"];
  /** The workspace URL. */
  workspaceUrl: Scalars["String"]["input"];
};

export type DesUploadProjectPayload = {
  __typename?: "DesUploadProjectPayload";
  errors: Array<DesPayloadError>;
  /** The project ID. */
  projectId: Scalars["ID"]["output"];
};

/** User details with the identifier and nullable extra fields. */
export type DesUser = {
  __typename?: "DesUser";
  /** Null if the user no longer exists. */
  email?: Maybe<Scalars["String"]["output"]>;
  /** Null if the user no longer exists. */
  firstName?: Maybe<Scalars["String"]["output"]>;
  /** Null if the user no longer exists. */
  groups?: Maybe<Array<DesUserGroup>>;
  /** Null if the user no longer exists. */
  lastName?: Maybe<Scalars["String"]["output"]>;
  /** Null if the user no longer exists. */
  pictureUrl?: Maybe<Scalars["String"]["output"]>;
  /** The internal user ID. */
  userId: Scalars["String"]["output"];
  /** Null if the user no longer exists. */
  userName?: Maybe<Scalars["String"]["output"]>;
};

/** User details with the identifier and nullable extra fields. */
export type DesUserPictureUrlArgs = {
  size?: InputMaybe<DesUserPictureSize>;
};

/** A user group information. */
export type DesUserGroup = Node & {
  __typename?: "DesUserGroup";
  /** The node ID. */
  id: Scalars["ID"]["output"];
  /** The group name. */
  name: Scalars["String"]["output"];
};

export enum DesUserPictureSize {
  Original = "ORIGINAL",
  Size48X48 = "SIZE48X48",
  Size70X70 = "SIZE70X70",
  Size128X128 = "SIZE128X128",
}

/** Describes VCS item change kind. */
export enum DesVcsChangeKind {
  Added = "ADDED",
  Deleted = "DELETED",
  Modified = "MODIFIED",
  None = "NONE",
}

/** VCS revision/commit information. */
export type DesVcsRevision = {
  __typename?: "DesVcsRevision";
  author: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  files: Array<DesVcsRevisionFileChange>;
  message: Scalars["String"]["output"];
  revisionId: Scalars["String"]["output"];
};

/** A connection to a list of items. */
export type DesVcsRevisionConnection = {
  __typename?: "DesVcsRevisionConnection";
  /** A list of edges. */
  edges?: Maybe<Array<DesVcsRevisionEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<DesVcsRevision>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars["Int"]["output"];
};

/** An edge in a connection. */
export type DesVcsRevisionEdge = {
  __typename?: "DesVcsRevisionEdge";
  /** A cursor for use in pagination. */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge. */
  node: DesVcsRevision;
};

/** Describes the file affected by a VCS revision. */
export type DesVcsRevisionFileChange = {
  __typename?: "DesVcsRevisionFileChange";
  kind: DesVcsChangeKind;
  path: Scalars["String"]["output"];
};

export type DesVia = {
  __typename?: "DesVia";
  beginLayer?: Maybe<DesLayer>;
  endLayer?: Maybe<DesLayer>;
  holeDiameter: DesSize;
  layer?: Maybe<DesLayer>;
  name?: Maybe<Scalars["String"]["output"]>;
  net?: Maybe<DesNet>;
  padDiameter: DesSize;
  position: DesPosition2D;
  shape?: Maybe<DesPrimitiveShape>;
};

export type DesWeight = {
  __typename?: "DesWeight";
  gram: Scalars["Decimal"]["output"];
  ounce: Scalars["Decimal"]["output"];
  x: Scalars["Decimal"]["output"];
};

/** A variant contains a specific configuration of a base design. */
export type DesWipVariant = {
  __typename?: "DesWipVariant";
  /** The Bill of Materials (BOM) for this design variant. */
  bom?: Maybe<DesBom>;
  designExchange?: Maybe<DesDesignExchange>;
  /** The descriptive label for this design variant. */
  name: Scalars["String"]["output"];
  /** The PCB document for this design variant. */
  pcb?: Maybe<DesPcb>;
  /** The list of schematic documents for this design variant. */
  schematics: Array<DesSchematic>;
};

/** A variant contains a specific configuration of a base design. */
export type DesWipVariantSchematicsArgs = {
  where?: InputMaybe<DesSchematicFilterInput>;
};

/** A variant contains a specific configuration of a base design. */
export type DesWipVariantFilterInput = {
  and?: InputMaybe<Array<DesWipVariantFilterInput>>;
  /** The descriptive label for this design variant. */
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<DesWipVariantFilterInput>>;
};

/** The most recent version of a design. */
export type DesWorkInProgress = {
  __typename?: "DesWorkInProgress";
  /** The list of variations contained in this design. */
  variants: Array<DesWipVariant>;
};

/** The most recent version of a design. */
export type DesWorkInProgressVariantsArgs = {
  where?: InputMaybe<DesWipVariantFilterInput>;
};

/** A workflow manages the execution of a logical sequence of tasks. */
export type DesWorkflow = {
  __typename?: "DesWorkflow";
  /** The account information for the owner of any action or response needed for this workflow. */
  assignee: Scalars["String"]["output"];
  /** The `DateTime` for the creation of this workflow. */
  createdAt: Scalars["DateTime"]["output"];
  /** The account information for who created this workflow. */
  createdBy: Scalars["String"]["output"];
  /** The `DateTime` for the completion of this workflow. */
  endedAt?: Maybe<Scalars["DateTime"]["output"]>;
  /** The `DateTime` for the most recent changes for this workflow. */
  modifiedAt: Scalars["DateTime"]["output"];
  /** The label for this workflow. */
  name: Scalars["String"]["output"];
  /** The reference identifier for definition of this workflow. */
  processDefinitionId: Scalars["String"]["output"];
  /** The label for the definition of this workflow. */
  processDefinitionName: Scalars["String"]["output"];
  /** The name of the active task(s) for this workflow. */
  state?: Maybe<Scalars["String"]["output"]>;
  /** The current condition of this workflow. */
  status: Scalars["String"]["output"];
  /** The list of variables defined for this workflow. */
  variables: Array<DesWorkflowVariable>;
  /** The reference identifier for this workflow. */
  workflowId: Scalars["String"]["output"];
};

/** A workflow manages the execution of a logical sequence of tasks. */
export type DesWorkflowVariablesArgs = {
  names?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type DesWorkflowAttachmentVariableInput = {
  /** Uploaded file references. */
  files: Array<Scalars["String"]["input"]>;
  /** The variable name. */
  name: Scalars["String"]["input"];
};

/** A workflow definition contains a logical sequence of tasks. */
export type DesWorkflowDefinition = {
  __typename?: "DesWorkflowDefinition";
  /** The `DateTime` for the creation of this workflow definition. */
  createdAt: Scalars["DateTime"]["output"];
  /** The account information for who created this workflow definition. */
  createdBy: Scalars["String"]["output"];
  /** The label for this workflow definition. */
  name: Scalars["String"]["output"];
  /** The list of variables need to launch this workflow definition. */
  variables: Array<DesWorkflowVariable>;
  /** The reference identifier for this workflow definition. */
  workflowDefinitionId: Scalars["String"]["output"];
};

/** A workflow definition contains a logical sequence of tasks. */
export type DesWorkflowDefinitionFilterInput = {
  and?: InputMaybe<Array<DesWorkflowDefinitionFilterInput>>;
  /** The `DateTime` for the creation of this workflow definition. */
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  /** The account information for who created this workflow definition. */
  createdBy?: InputMaybe<StringOperationFilterInput>;
  /** The label for this workflow definition. */
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<DesWorkflowDefinitionFilterInput>>;
  /** The reference identifier for this workflow definition. */
  workflowDefinitionId?: InputMaybe<StringOperationFilterInput>;
};

/** A workflow manages the execution of a logical sequence of tasks. */
export type DesWorkflowFilterInput = {
  and?: InputMaybe<Array<DesWorkflowFilterInput>>;
  /** The account information for the owner of any action or response needed for this workflow. */
  assignee?: InputMaybe<StringOperationFilterInput>;
  /** The `DateTime` for the creation of this workflow. */
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  /** The account information for who created this workflow. */
  createdBy?: InputMaybe<StringOperationFilterInput>;
  /** The `DateTime` for the completion of this workflow. */
  endedAt?: InputMaybe<DateTimeOperationFilterInput>;
  /** The label for this workflow. */
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<DesWorkflowFilterInput>>;
  /** The reference identifier for definition of this workflow. */
  processDefinitionId?: InputMaybe<StringOperationFilterInput>;
  /** The label for the definition of this workflow. */
  processDefinitionName?: InputMaybe<StringOperationFilterInput>;
  /** The name of the active task(s) for this workflow. */
  state?: InputMaybe<StringOperationFilterInput>;
  /** The current condition of this workflow. */
  status?: InputMaybe<StringOperationFilterInput>;
  /** The reference identifier for this workflow. */
  workflowId?: InputMaybe<StringOperationFilterInput>;
};

export type DesWorkflowVariable = {
  __typename?: "DesWorkflowVariable";
  constraint?: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  value: Scalars["String"]["output"];
  valueType?: Maybe<Scalars["String"]["output"]>;
};

export type DesWorkflowVariableInput = {
  constraint?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  value: Scalars["String"]["input"];
  valueType?: InputMaybe<Scalars["String"]["input"]>;
};

/** A workspace provides a flexible and secure method for managing design, manufacturing and supply content. */
export type DesWorkspace = Node & {
  __typename?: "DesWorkspace";
  /** The summary of this workspace content or purpose. */
  description?: Maybe<Scalars["String"]["output"]>;
  /** The node identifier for the workspace (used by `DesWorkspaceById`). */
  id: Scalars["ID"]["output"];
  /** Tells if the workspace is the current user default. */
  isDefault: Scalars["Boolean"]["output"];
  /** The resource managing components for this workspace. */
  library: DesLibrary;
  /** The location of this workspace. */
  location: DesWorkspaceLocation;
  /** The descriptive label for this workspace. */
  name: Scalars["String"]["output"];
  /** The list of projects managed in this workspace. */
  projects: Array<DesProject>;
  /** The list of workspace tasks. For a particular workspace consider using the more effective query `desWorkspaceTasks`. */
  tasks?: Maybe<Array<DesTask>>;
  /** The list of members authorized for this workspace. */
  team: DesTeam;
  /** The web address of this workspace. */
  url: Scalars["String"]["output"];
  /** The list of workflow definitions in this workspace. */
  workflowDefinitions?: Maybe<Array<DesWorkflowDefinition>>;
  /** The list of workflows in this workspace. */
  workflows?: Maybe<Array<DesWorkflow>>;
};

/** A workspace provides a flexible and secure method for managing design, manufacturing and supply content. */
export type DesWorkspaceProjectsArgs = {
  where?: InputMaybe<DesProjectFilterInput>;
};

/** A workspace provides a flexible and secure method for managing design, manufacturing and supply content. */
export type DesWorkspaceWorkflowDefinitionsArgs = {
  where?: InputMaybe<DesWorkflowDefinitionFilterInput>;
};

/** A workspace provides a flexible and secure method for managing design, manufacturing and supply content. */
export type DesWorkspaceWorkflowsArgs = {
  where?: InputMaybe<DesWorkflowFilterInput>;
};

/** A workspace provides a flexible and secure method for managing design, manufacturing and supply content. */
export type DesWorkspaceFilterInput = {
  and?: InputMaybe<Array<DesWorkspaceFilterInput>>;
  /** The summary of this workspace content or purpose. */
  description?: InputMaybe<StringOperationFilterInput>;
  /** Tells if the workspace is the current user default. */
  isDefault?: InputMaybe<BooleanOperationFilterInput>;
  /** The descriptive label for this workspace. */
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<DesWorkspaceFilterInput>>;
  /** The web address of this workspace. */
  url?: InputMaybe<StringOperationFilterInput>;
};

export type DesWorkspaceLocation = {
  __typename?: "DesWorkspaceLocation";
  /** The preferred Nexar API URL to use for this location. */
  apiServiceUrl: Scalars["String"]["output"];
  /** The preferred files service URL to use for this location. */
  filesServiceUrl: Scalars["String"]["output"];
  /** The name of the location. */
  name: Scalars["String"]["output"];
};

export type ListFilterInputTypeOfDesDesignItemParameterFilterInput = {
  all?: InputMaybe<DesDesignItemParameterFilterInput>;
  any?: InputMaybe<Scalars["Boolean"]["input"]>;
  none?: InputMaybe<DesDesignItemParameterFilterInput>;
  some?: InputMaybe<DesDesignItemParameterFilterInput>;
};

export type ManAabb = {
  __typename?: "ManAABB";
  area?: Maybe<ManArea>;
  bottomRight?: Maybe<ManPoint2D>;
  topLeft?: Maybe<ManPoint2D>;
};

export type ManAabbInput = {
  bottomRight?: InputMaybe<ManPoint2DInput>;
  topLeft?: InputMaybe<ManPoint2DInput>;
};

export enum ManAccess {
  AllowMpn = "ALLOW_MPN",
  IsCreator = "IS_CREATOR",
  IsEms = "IS_EMS",
}

export type ManAngle = {
  __typename?: "ManAngle";
  degrees?: Maybe<Scalars["Float"]["output"]>;
  native?: Maybe<Scalars["Int"]["output"]>;
  radians?: Maybe<Scalars["Float"]["output"]>;
};

export type ManArea = {
  __typename?: "ManArea";
  inSq?: Maybe<Scalars["Float"]["output"]>;
  mil2?: Maybe<Scalars["Float"]["output"]>;
  mm2?: Maybe<Scalars["Float"]["output"]>;
  native?: Maybe<Scalars["Int"]["output"]>;
};

export type ManAssembly = {
  __typename?: "ManAssembly";
  boardMeta?: Maybe<ManBoardMeta>;
  bomSelection?: Maybe<Scalars["ID"]["output"]>;
  commitId?: Maybe<Scalars["ID"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  package?: Maybe<ManPackageJob>;
  projectId?: Maybe<Scalars["ID"]["output"]>;
  variant?: Maybe<Scalars["String"]["output"]>;
};

export type ManBoardDetails = {
  __typename?: "ManBoardDetails";
  aabb?: Maybe<ManAabb>;
  path?: Maybe<Array<Maybe<ManPathSegment>>>;
  polygon?: Maybe<Array<Maybe<ManPoint2D>>>;
};

export type ManBoardDetailsPolygonArgs = {
  quant: Scalars["Int"]["input"];
};

export type ManBoardMeta = {
  __typename?: "ManBoardMeta";
  boardDetails?: Maybe<ManBoardDetails>;
  bomIssues: ManBomIssues;
  consignmentCount: Scalars["Int"]["output"];
  id?: Maybe<Scalars["ID"]["output"]>;
  minAnnularRing?: Maybe<ManLength>;
  minClearance?: Maybe<ManLength>;
  parts?: Maybe<Array<Maybe<ManPart>>>;
  placementStats?: Maybe<ManPlacementInfo>;
  projectId?: Maybe<Scalars["String"]["output"]>;
  stackUp?: Maybe<Array<Maybe<ManLayer>>>;
};

export type ManBoardMetaInput = {
  boardOutline?: InputMaybe<Array<InputMaybe<ManPathSegmentInput>>>;
  minAnnularRing?: InputMaybe<Scalars["Int"]["input"]>;
  minClearance?: InputMaybe<Scalars["Int"]["input"]>;
  parts?: InputMaybe<Array<InputMaybe<ManPartInput>>>;
  projectId?: InputMaybe<Scalars["String"]["input"]>;
  stackUp?: InputMaybe<Array<InputMaybe<ManLayerInput>>>;
};

export type ManBomIssues = {
  __typename?: "ManBomIssues";
  issueCount: Scalars["Int"]["output"];
  warningCount: Scalars["Int"]["output"];
};

export type ManBomResolution = {
  __typename?: "ManBomResolution";
  parts: Array<ManPart>;
};

export type ManConsignmentDocs = {
  __typename?: "ManConsignmentDocs";
  html: Scalars["String"]["output"];
  pdf: Scalars["String"]["output"];
};

export type ManCreateAssemblyResponse = {
  __typename?: "ManCreateAssemblyResponse";
  assembly?: Maybe<ManAssembly>;
};

export type ManCreateOrderResponse = {
  __typename?: "ManCreateOrderResponse";
  order?: Maybe<ManOrder>;
};

export enum ManCurrency {
  Usd = "USD",
}

export type ManFeatures = {
  __typename?: "ManFeatures";
  availablePaymentOptions: Array<ManPaymentMethod>;
};

export type ManLayer = {
  __typename?: "ManLayer";
  copperWeight?: Maybe<Scalars["Float"]["output"]>;
  maskColour?: Maybe<ManSolderMaskColour>;
  material?: Maybe<Scalars["String"]["output"]>;
  overlayColour?: Maybe<ManSilkScreenColour>;
  process?: Maybe<Scalars["String"]["output"]>;
  thickness?: Maybe<ManLength>;
  type?: Maybe<ManLayerType>;
};

export type ManLayerInput = {
  copperWeight?: InputMaybe<Scalars["Float"]["input"]>;
  maskColour?: InputMaybe<ManSolderMaskColour>;
  material?: InputMaybe<Scalars["String"]["input"]>;
  overlayColour?: InputMaybe<ManSilkScreenColour>;
  process?: InputMaybe<Scalars["String"]["input"]>;
  thickness?: InputMaybe<Scalars["Int"]["input"]>;
  type?: InputMaybe<ManLayerType>;
};

export enum ManLayerType {
  Core = "CORE",
  Coverlay = "COVERLAY",
  Overlay = "OVERLAY",
  Plane = "PLANE",
  PrePreg = "PRE_PREG",
  Signal = "SIGNAL",
  SolderMask = "SOLDER_MASK",
  SurfaceFinish = "SURFACE_FINISH",
}

export type ManLength = {
  __typename?: "ManLength";
  inch?: Maybe<Scalars["Float"]["output"]>;
  mil?: Maybe<Scalars["Float"]["output"]>;
  mm?: Maybe<Scalars["Float"]["output"]>;
  /** native units of 1/10000 of a mil */
  native?: Maybe<Scalars["Int"]["output"]>;
};

export enum ManMountingType {
  SurfaceMount = "SURFACE_MOUNT",
  ThroughHole = "THROUGH_HOLE",
}

export type ManOffer = {
  __typename?: "ManOffer";
  minQty?: Maybe<Scalars["Int"]["output"]>;
  price?: Maybe<ManPrice>;
};

export type ManOfferInput = {
  minQty?: InputMaybe<Scalars["Int"]["input"]>;
  price?: InputMaybe<ManPriceInput>;
};

export type ManOrder = {
  __typename?: "ManOrder";
  assembly?: Maybe<ManAssembly>;
  boardName?: Maybe<Scalars["String"]["output"]>;
  boardPreview?: Maybe<Scalars["String"]["output"]>;
  checkoutURL?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  createdBy?: Maybe<ManUser>;
  events?: Maybe<Array<Maybe<ManOrderEvent>>>;
  id?: Maybe<Scalars["ID"]["output"]>;
  rapidQuote?: Maybe<ManQuoteInfo>;
  reference?: Maybe<Scalars["String"]["output"]>;
  shipDate?: Maybe<Scalars["DateTime"]["output"]>;
  shipping?: Maybe<ManShippingDetails>;
  status?: Maybe<ManOrderStatus>;
  stripeSecret?: Maybe<Scalars["ID"]["output"]>;
};

export type ManOrderAcceptedEvent = ManOrderEvent & {
  __typename?: "ManOrderAcceptedEvent";
  eventType: ManOrderEventType;
  id: Scalars["ID"]["output"];
  order: ManOrder;
  paymentSelection: ManPaymentSelection;
  timestamp: Scalars["Int"]["output"];
};

export type ManOrderBatchedEvent = ManOrderEvent & {
  __typename?: "ManOrderBatchedEvent";
  eventType: ManOrderEventType;
  id: Scalars["ID"]["output"];
  order: ManOrder;
  timestamp: Scalars["Int"]["output"];
};

export type ManOrderBatchedInput = {
  orderId: Scalars["ID"]["input"];
};

export type ManOrderCancelEvent = ManOrderEvent & {
  __typename?: "ManOrderCancelEvent";
  eventType: ManOrderEventType;
  id: Scalars["ID"]["output"];
  order: ManOrder;
  timestamp: Scalars["Int"]["output"];
};

export type ManOrderConsignmentDetailsEvent = ManOrderEvent & {
  __typename?: "ManOrderConsignmentDetailsEvent";
  consignmentId: Scalars["ID"]["output"];
  documents: ManConsignmentDocs;
  eventType: ManOrderEventType;
  id: Scalars["ID"]["output"];
  order: ManOrder;
  parts: Array<ManPartQuantity>;
  receiveBy: Scalars["DateTime"]["output"];
  shipping: ManShippingDetails;
  timestamp: Scalars["Int"]["output"];
};

export type ManOrderConsignmentDetailsInput = {
  consignmentId: Scalars["ID"]["input"];
  orderId: Scalars["ID"]["input"];
  partQuantities: Array<ManPartQuantityInput>;
  receiveBy: Scalars["DateTime"]["input"];
  shipping: ManShippingDetailsInput;
};

export type ManOrderCreatedEvent = ManOrderEvent & {
  __typename?: "ManOrderCreatedEvent";
  eventType: ManOrderEventType;
  id: Scalars["ID"]["output"];
  order: ManOrder;
  timestamp: Scalars["Int"]["output"];
};

export type ManOrderEmsAcceptInput = {
  emsReference?: InputMaybe<Scalars["String"]["input"]>;
  orderId: Scalars["ID"]["input"];
};

export type ManOrderEmsAcceptedEvent = ManOrderEvent & {
  __typename?: "ManOrderEmsAcceptedEvent";
  eventType: ManOrderEventType;
  id: Scalars["ID"]["output"];
  order: ManOrder;
  timestamp: Scalars["Int"]["output"];
};

export type ManOrderEvent = {
  eventType: ManOrderEventType;
  id: Scalars["ID"]["output"];
  order: ManOrder;
  timestamp: Scalars["Int"]["output"];
};

export enum ManOrderEventType {
  Accepted = "ACCEPTED",
  Batched = "BATCHED",
  Cancel = "CANCEL",
  ConsignmentDetails = "CONSIGNMENT_DETAILS",
  Created = "CREATED",
  EmsAccepted = "EMS_ACCEPTED",
  Invoiced = "INVOICED",
  Paid = "PAID",
  PartsOrdered = "PARTS_ORDERED",
  PartsReceived = "PARTS_RECEIVED",
  PcbsOrdered = "PCBS_ORDERED",
  PcbsReceived = "PCBS_RECEIVED",
  ProcessStart = "PROCESS_START",
  Received = "RECEIVED",
  Reviewed = "REVIEWED",
  Shipped = "SHIPPED",
  TimeEstimation = "TIME_ESTIMATION",
}

export type ManOrderInvoicedEvent = ManOrderEvent & {
  __typename?: "ManOrderInvoicedEvent";
  eventType: ManOrderEventType;
  id: Scalars["ID"]["output"];
  invoiceId: Scalars["String"]["output"];
  order: ManOrder;
  poReference: Scalars["String"]["output"];
  timestamp: Scalars["Int"]["output"];
};

export type ManOrderPaidEvent = ManOrderEvent & {
  __typename?: "ManOrderPaidEvent";
  eventType: ManOrderEventType;
  id: Scalars["ID"]["output"];
  order: ManOrder;
  timestamp: Scalars["Int"]["output"];
};

export type ManOrderPartsOrderedEvent = ManOrderEvent & {
  __typename?: "ManOrderPartsOrderedEvent";
  eventType: ManOrderEventType;
  id: Scalars["ID"]["output"];
  order: ManOrder;
  timestamp: Scalars["Int"]["output"];
};

export type ManOrderPartsOrderedInput = {
  orderId: Scalars["ID"]["input"];
};

export type ManOrderPartsReceivedEvent = ManOrderEvent & {
  __typename?: "ManOrderPartsReceivedEvent";
  eventType: ManOrderEventType;
  id: Scalars["ID"]["output"];
  order: ManOrder;
  timestamp: Scalars["Int"]["output"];
};

export type ManOrderPartsReceivedInput = {
  orderId: Scalars["ID"]["input"];
};

export type ManOrderPcbsOrderedEvent = ManOrderEvent & {
  __typename?: "ManOrderPcbsOrderedEvent";
  eventType: ManOrderEventType;
  id: Scalars["ID"]["output"];
  order: ManOrder;
  timestamp: Scalars["Int"]["output"];
};

export type ManOrderPcbsOrderedInput = {
  orderId: Scalars["ID"]["input"];
};

export type ManOrderPcbsReceivedEvent = ManOrderEvent & {
  __typename?: "ManOrderPcbsReceivedEvent";
  eventType: ManOrderEventType;
  id: Scalars["ID"]["output"];
  order: ManOrder;
  timestamp: Scalars["Int"]["output"];
};

export type ManOrderPcbsReceivedInput = {
  orderId: Scalars["ID"]["input"];
};

export type ManOrderProcessStartEvent = ManOrderEvent & {
  __typename?: "ManOrderProcessStartEvent";
  eventType: ManOrderEventType;
  id: Scalars["ID"]["output"];
  order: ManOrder;
  timestamp: Scalars["Int"]["output"];
};

export type ManOrderProcessStartInput = {
  orderId: Scalars["ID"]["input"];
};

export type ManOrderReceivedEvent = ManOrderEvent & {
  __typename?: "ManOrderReceivedEvent";
  eventType: ManOrderEventType;
  id: Scalars["ID"]["output"];
  order: ManOrder;
  timestamp: Scalars["Int"]["output"];
};

export type ManOrderReviewInput = {
  orderId: Scalars["ID"]["input"];
};

export type ManOrderReviewedEvent = ManOrderEvent & {
  __typename?: "ManOrderReviewedEvent";
  eventType: ManOrderEventType;
  id: Scalars["ID"]["output"];
  order: ManOrder;
  timestamp: Scalars["Int"]["output"];
};

export type ManOrderShipEstimateEvent = ManOrderEvent & {
  __typename?: "ManOrderShipEstimateEvent";
  eventType: ManOrderEventType;
  id: Scalars["ID"]["output"];
  order: ManOrder;
  timestamp: Scalars["Int"]["output"];
};

export type ManOrderShipEstimateInput = {
  estimateDate: Scalars["DateTime"]["input"];
  orderId: Scalars["ID"]["input"];
};

export type ManOrderShippedEvent = ManOrderEvent & {
  __typename?: "ManOrderShippedEvent";
  carrier: ManShippingCarrier;
  eventType: ManOrderEventType;
  id: Scalars["ID"]["output"];
  order: ManOrder;
  timestamp: Scalars["Int"]["output"];
  trackingLink: Scalars["String"]["output"];
  trackingNumber: Scalars["String"]["output"];
};

export type ManOrderShippedInput = {
  carrier?: InputMaybe<ManShippingCarrier>;
  orderId: Scalars["ID"]["input"];
  trackingNumber?: InputMaybe<Scalars["String"]["input"]>;
};

export enum ManOrderStatus {
  Cancelled = "CANCELLED",
  Complete = "COMPLETE",
  Manufacturing = "MANUFACTURING",
  PaymentProcessing = "PAYMENT_PROCESSING",
  Placed = "PLACED",
  Processing = "PROCESSING",
  Quoting = "QUOTING",
  Shipping = "SHIPPING",
}

export type ManPackageJob = {
  __typename?: "ManPackageJob";
  errors?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  id?: Maybe<Scalars["ID"]["output"]>;
  status?: Maybe<Scalars["String"]["output"]>;
};

export type ManPart = {
  __typename?: "ManPart";
  comment?: Maybe<Scalars["String"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  issues: Array<ManPartIssue>;
  name?: Maybe<Scalars["String"]["output"]>;
  partChoices?: Maybe<Array<Maybe<ManPartChoice>>>;
  pinCount?: Maybe<Scalars["Int"]["output"]>;
  placementCount?: Maybe<Scalars["Int"]["output"]>;
  placements?: Maybe<Array<Maybe<ManPlacement>>>;
  selectedChoice?: Maybe<ManPartChoice>;
  sourcing: ManSourcing;
  status?: Maybe<ManPartStatus>;
  type?: Maybe<ManMountingType>;
};

export type ManPartChoice = {
  __typename?: "ManPartChoice";
  description?: Maybe<Scalars["String"]["output"]>;
  image?: Maybe<Scalars["String"]["output"]>;
  lifecycle?: Maybe<Scalars["String"]["output"]>;
  manufacturer?: Maybe<Scalars["String"]["output"]>;
  mpn?: Maybe<Scalars["String"]["output"]>;
  octopartId?: Maybe<Scalars["String"]["output"]>;
  octopartUrl?: Maybe<Scalars["String"]["output"]>;
  suppliers?: Maybe<Array<Maybe<ManPurchaseOption>>>;
};

export type ManPartChoiceInput = {
  manufacturer?: InputMaybe<Scalars["String"]["input"]>;
  mpn?: InputMaybe<Scalars["String"]["input"]>;
  octopartId?: InputMaybe<Scalars["String"]["input"]>;
  suppliers?: InputMaybe<Array<InputMaybe<ManPurchaseOptionInput>>>;
};

export type ManPartInput = {
  componentId?: InputMaybe<Scalars["ID"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  partChoices?: InputMaybe<Array<InputMaybe<ManPartChoiceInput>>>;
  pinCount?: InputMaybe<Scalars["Int"]["input"]>;
  placements?: InputMaybe<Array<InputMaybe<ManPlacementInput>>>;
  type?: InputMaybe<ManMountingType>;
};

export enum ManPartIssue {
  BadLifecycle = "BAD_LIFECYCLE",
  InsufficientStock = "INSUFFICIENT_STOCK",
  NotFound = "NOT_FOUND",
  NoSelection = "NO_SELECTION",
  StockLow = "STOCK_LOW",
  Unavailable = "UNAVAILABLE",
}

export type ManPartQuantity = {
  __typename?: "ManPartQuantity";
  linkedPart?: Maybe<ManPartChoice>;
  placements: Array<ManPlacement>;
  quantity: Scalars["Int"]["output"];
  reference: Scalars["String"]["output"];
};

export type ManPartQuantityInput = {
  amount: Scalars["Int"]["input"];
  id: Scalars["ID"]["input"];
};

export type ManPartSelectionInput = {
  part: Scalars["ID"]["input"];
  selection: Scalars["ID"]["input"];
  sourcing: ManSourcing;
};

export enum ManPartStatus {
  Good = "GOOD",
  Issue = "ISSUE",
  Warn = "WARN",
}

export type ManPathSegment = {
  __typename?: "ManPathSegment";
  endAngle?: Maybe<ManAngle>;
  radius?: Maybe<ManLength>;
  startAngle?: Maybe<ManAngle>;
  type?: Maybe<ManPathType>;
  vertex?: Maybe<ManPoint2D>;
};

export type ManPathSegmentInput = {
  /** end point of arc in billionth of a rotation (range from 0 to 999999999) */
  endAngle?: InputMaybe<Scalars["Int"]["input"]>;
  /** radius of the circle if an arc */
  radius?: InputMaybe<Scalars["Int"]["input"]>;
  /** start point of arc in billionth of a rotation (range from 0 to 999999999) */
  startAngle?: InputMaybe<Scalars["Int"]["input"]>;
  type?: InputMaybe<ManPathType>;
  /** Either center of a circle for the arc, or the vertex location */
  vertex?: InputMaybe<ManPoint2DInput>;
};

export enum ManPathType {
  Arc = "ARC",
  Vertex = "VERTEX",
}

export enum ManPaymentMethod {
  CreditCard = "CREDIT_CARD",
  DirectApproval = "DIRECT_APPROVAL",
}

export type ManPaymentSelection = {
  __typename?: "ManPaymentSelection";
  method: ManPaymentMethod;
  purchaseOrderReference?: Maybe<Scalars["String"]["output"]>;
};

export type ManPaymentSelectionInput = {
  method: ManPaymentMethod;
  purchaseOrderReference?: InputMaybe<Scalars["String"]["input"]>;
};

export type ManPlacement = {
  __typename?: "ManPlacement";
  aabb?: Maybe<ManAabb>;
  location?: Maybe<ManPoint2D>;
  refdes?: Maybe<Scalars["String"]["output"]>;
  side?: Maybe<ManSide>;
  size?: Maybe<ManPoint2D>;
};

export type ManPlacementInfo = {
  __typename?: "ManPlacementInfo";
  bomLines?: Maybe<Scalars["Int"]["output"]>;
  botPlacements?: Maybe<Scalars["Int"]["output"]>;
  dualSided?: Maybe<Scalars["Boolean"]["output"]>;
  smtPlacements?: Maybe<Scalars["Int"]["output"]>;
  thPlacements?: Maybe<Scalars["Int"]["output"]>;
  topPlacements?: Maybe<Scalars["Int"]["output"]>;
  totalPlacements?: Maybe<Scalars["Int"]["output"]>;
};

export type ManPlacementInput = {
  /** aabb of the part */
  aabb?: InputMaybe<ManAabbInput>;
  /** Location of the part */
  location?: InputMaybe<ManPoint2DInput>;
  /** schematic refdes */
  refdes?: InputMaybe<Scalars["String"]["input"]>;
  /** Side of the board */
  side?: InputMaybe<ManSide>;
};

export type ManPoint2D = {
  __typename?: "ManPoint2D";
  x?: Maybe<ManLength>;
  y?: Maybe<ManLength>;
};

export type ManPoint2DInput = {
  x: Scalars["Int"]["input"];
  y: Scalars["Int"]["input"];
};

export type ManPrice = {
  __typename?: "ManPrice";
  amount?: Maybe<Scalars["Decimal"]["output"]>;
  currency?: Maybe<ManCurrency>;
};

export type ManPriceInput = {
  amount?: InputMaybe<Scalars["Decimal"]["input"]>;
};

export type ManProjectFeatureInput = {
  projectId: Scalars["ID"]["input"];
};

export type ManPurchaseOption = {
  __typename?: "ManPurchaseOption";
  inventory?: Maybe<Scalars["Int"]["output"]>;
  offers?: Maybe<Array<Maybe<ManOffer>>>;
  sku?: Maybe<Scalars["String"]["output"]>;
  supplier?: Maybe<Scalars["String"]["output"]>;
};

export type ManPurchaseOptionInput = {
  inventory?: InputMaybe<Scalars["Int"]["input"]>;
  offers?: InputMaybe<Array<InputMaybe<ManOfferInput>>>;
  supplier?: InputMaybe<Scalars["String"]["input"]>;
};

export type ManQuote = {
  __typename?: "ManQuote";
  id: Scalars["ID"]["output"];
  items?: Maybe<Array<Maybe<ManQuoteItem>>>;
  leadtime?: Maybe<Scalars["Int"]["output"]>;
  total?: Maybe<Scalars["Decimal"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
  valid?: Maybe<Scalars["Boolean"]["output"]>;
  violations?: Maybe<Array<Maybe<ManViolation>>>;
};

export enum ManQuoteCategory {
  Assembly = "ASSEMBLY",
  Bom = "BOM",
  Fabrication = "FABRICATION",
  Nre = "NRE",
  Shipping = "SHIPPING",
}

export type ManQuoteInfo = {
  __typename?: "ManQuoteInfo";
  quoteRequest?: Maybe<ManRapidQuoteRequest>;
  response?: Maybe<ManRapidQuoteResponse>;
  selectedQuote?: Maybe<ManQuote>;
};

export type ManQuoteInput = {
  id: Scalars["ID"]["input"];
  /** the quote line items */
  items?: InputMaybe<Array<InputMaybe<ManQuoteInputItem>>>;
  /** leadtime in business days */
  leadtime?: InputMaybe<Scalars["Int"]["input"]>;
  type?: InputMaybe<Scalars["String"]["input"]>;
  /** any parameter violation which invalidate the quote */
  violations?: InputMaybe<Array<InputMaybe<ManViolationInput>>>;
};

export type ManQuoteInputItem = {
  amount?: InputMaybe<Scalars["Decimal"]["input"]>;
  category?: InputMaybe<ManQuoteCategory>;
  ident?: InputMaybe<Scalars["String"]["input"]>;
};

export type ManQuoteItem = {
  __typename?: "ManQuoteItem";
  amount?: Maybe<Scalars["Decimal"]["output"]>;
  category?: Maybe<ManQuoteCategory>;
  ident?: Maybe<Scalars["String"]["output"]>;
};

export type ManRapidQuoteRequest = {
  __typename?: "ManRapidQuoteRequest";
  bomResolutionUrl?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  meta?: Maybe<ManBoardMeta>;
  qty?: Maybe<Scalars["Int"]["output"]>;
  requestorId?: Maybe<Scalars["ID"]["output"]>;
  shipping?: Maybe<ManShippingDetails>;
};

export type ManRapidQuoteResponse = {
  __typename?: "ManRapidQuoteResponse";
  id?: Maybe<Scalars["ID"]["output"]>;
  quotes?: Maybe<Array<Maybe<ManQuote>>>;
  request?: Maybe<ManRapidQuoteRequest>;
};

export type ManRapidQuoteResponseQuotesArgs = {
  wait?: InputMaybe<Scalars["Int"]["input"]>;
};

export enum ManShippingCarrier {
  Ups = "UPS",
  Usps = "USPS",
}

export type ManShippingDetails = {
  __typename?: "ManShippingDetails";
  city?: Maybe<Scalars["String"]["output"]>;
  country?: Maybe<Scalars["String"]["output"]>;
  email?: Maybe<Scalars["String"]["output"]>;
  line1?: Maybe<Scalars["String"]["output"]>;
  line2?: Maybe<Scalars["String"]["output"]>;
  method?: Maybe<ManShippingMethod>;
  name?: Maybe<Scalars["String"]["output"]>;
  phone?: Maybe<Scalars["String"]["output"]>;
  postal?: Maybe<Scalars["String"]["output"]>;
  state?: Maybe<Scalars["String"]["output"]>;
};

export type ManShippingDetailsInput = {
  city?: InputMaybe<Scalars["String"]["input"]>;
  country?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  line1?: InputMaybe<Scalars["String"]["input"]>;
  line2?: InputMaybe<Scalars["String"]["input"]>;
  method?: InputMaybe<ManShippingMethodInput>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  phone?: InputMaybe<Scalars["String"]["input"]>;
  postal?: InputMaybe<Scalars["String"]["input"]>;
  state?: InputMaybe<Scalars["String"]["input"]>;
};

export type ManShippingMethod = {
  __typename?: "ManShippingMethod";
  carrier?: Maybe<Scalars["String"]["output"]>;
  service?: Maybe<Scalars["String"]["output"]>;
};

export type ManShippingMethodInput = {
  carrier?: InputMaybe<Scalars["String"]["input"]>;
  service?: InputMaybe<Scalars["String"]["input"]>;
};

export enum ManSide {
  Bottom = "BOTTOM",
  Top = "TOP",
}

export enum ManSilkScreenColour {
  Black = "BLACK",
  Blue = "BLUE",
  Green = "GREEN",
  Red = "RED",
  White = "WHITE",
  Yellow = "YELLOW",
}

export enum ManSolderMaskColour {
  Black = "BLACK",
  Blue = "BLUE",
  DarkBrown = "DARK_BROWN",
  Green = "GREEN",
  LightGreen = "LIGHT_GREEN",
  MatteBlack = "MATTE_BLACK",
  MatteGreen = "MATTE_GREEN",
  Red = "RED",
  Transparent = "TRANSPARENT",
  White = "WHITE",
  Yellow = "YELLOW",
}

export enum ManSourcing {
  Altimade = "ALTIMADE",
  Consign = "CONSIGN",
  Dnp = "DNP",
}

export type ManUser = {
  __typename?: "ManUser";
  /** Null if the user no longer exists. */
  email?: Maybe<Scalars["String"]["output"]>;
  /** Null if the user no longer exists. */
  firstName?: Maybe<Scalars["String"]["output"]>;
  /** Null if the user no longer exists. */
  lastName?: Maybe<Scalars["String"]["output"]>;
  /** The internal user ID. */
  userId: Scalars["String"]["output"];
  /** Null if the user no longer exists. */
  userName?: Maybe<Scalars["String"]["output"]>;
};

export type ManViolation = {
  __typename?: "ManViolation";
  description?: Maybe<Scalars["String"]["output"]>;
  /**
   * dot delimited string describing location of issue
   * layers.[1].process
   */
  field?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<ManViolationType>;
};

export type ManViolationInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  /**
   * dot delimited string describing location of issue
   * layers.[1].process
   */
  field?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<ManViolationType>;
};

export enum ManViolationType {
  Inconsistent = "INCONSISTENT",
  TooBig = "TOO_BIG",
  TooSmall = "TOO_SMALL",
  Unknown = "UNKNOWN",
  Unsupported = "UNSUPPORTED",
}

export type Mutation = {
  __typename?: "Mutation";
  /** Send a message to another application. */
  admEvtSendAppNotification: AdmEvtSendAppNotificationPayload;
  /** Create a new SCR processing run for a given CSV file. */
  datScrCreateJob: DatScrCreateJobPayload;
  /** Delete an SCR job and any corresponding reports. */
  datScrDeleteJob: DatScrDeleteJobPayload;
  /** Adds users to the specified group. */
  desAddUsersToGroup: DesAddUsersToGroupPayload;
  desCreateComment: DesCreateCommentPayload;
  desCreateCommentThread: DesCreateCommentThreadPayload;
  /** Creates a manufacture package. */
  desCreateManufacturePackage: DesCreateManufacturePackagePayload;
  /** Creates a job that exports the specified project data. */
  desCreateProjectExportJob: DesCreateProjectExportJobPayload;
  /** Creates a project task. */
  desCreateProjectTask: DesCreateTaskPayload;
  /** Creates a new comment for the specified task. */
  desCreateTaskComment: DesCreateTaskCommentPayload;
  /** Creates a user. */
  desCreateUser: DesCreateUserPayload;
  /** Creates a new user group. */
  desCreateUserGroup: DesCreateUserGroupPayload;
  /** Creates a workspace task. */
  desCreateWorkspaceTask: DesCreateTaskPayload;
  desDeleteComment: DesDeleteCommentPayload;
  desDeleteCommentThread: DesDeleteCommentThreadPayload;
  /** Deletes the task specified by its node ID. */
  desDeleteTask: DesDeleteTaskPayload;
  /** Deletes the specified task comment. */
  desDeleteTaskComment: DesDeleteTaskCommentPayload;
  /** Deletes the specified user. */
  desDeleteUser: DesDeleteUserPayload;
  /** Deletes the specified user group. */
  desDeleteUserGroup: DesDeleteUserGroupPayload;
  desLaunchWorkflow: DesLaunchWorkflowPayload;
  /** Releases the specified component. */
  desReleaseComponent: DesReleaseComponentPayload;
  /** Creates and releases the specified component template. */
  desReleaseComponentTemplate: DesReleaseComponentTemplatePayload;
  /** Removes part choices of the specified component. */
  desRemoveComponentPartChoices: DesRemoveComponentPartChoicesPayload;
  /** Removes users from the specified group. */
  desRemoveUsersFromGroup: DesRemoveUsersFromGroupPayload;
  desTerminateWorkflows: DesTerminateWorkflowsPayload;
  desUpdateComment: DesUpdateCommentPayload;
  /** Updates item parameters for the specified component (does not affect the revision). */
  desUpdateComponentItemParameters: DesUpdateComponentItemParametersPayload;
  /** Updates parameters for the specified component (creates a new revision). */
  desUpdateComponentRevisionParameters: DesUpdateComponentRevisionParametersPayload;
  /** Updates the specified component template. */
  desUpdateComponentTemplate: DesUpdateComponentTemplatePayload;
  /** Updates the permissions for the associated folder. */
  desUpdateFolderPermissions: DesUpdateFolderPermissionsPayload;
  /** Updates the permissions for the associated project. */
  desUpdateProjectPermissions: DesUpdateProjectPermissionsPayload;
  /** Updates a specific result block. */
  desUpdateReuseBlock: DesUpdateReuseBlockPayload;
  /** Updates the specified task. */
  desUpdateTask: DesUpdateTaskPayload;
  /** Updates the specified task comment. */
  desUpdateTaskComment: DesUpdateTaskCommentPayload;
  /** Updates the specified user properties. */
  desUpdateUser: DesUpdateUserPayload;
  /** Updates the specified user group. */
  desUpdateUserGroup: DesUpdateUserGroupPayload;
  /** Uploads the specified collaboration. */
  desUploadCollaboration: DesUploadCollaborationPayload;
  /** *PROTOTYPE, SUBJECT TO CHANGE* */
  desUploadCollaborationSimulation: DesUploadCollaborationSimulationPayload;
  /** Uploads the project zip file. */
  desUploadProject: DesUploadProjectPayload;
  /** accept quote, confirm order as placed.  */
  manAcceptOrderQuote?: Maybe<ManOrder>;
  manCreateAssembly?: Maybe<ManCreateAssemblyResponse>;
  manCreateOrder?: Maybe<ManCreateOrderResponse>;
  manCreateRapidQuoteRequest?: Maybe<ManRapidQuoteResponse>;
  manInsertOrderBatchedEvent?: Maybe<ManOrder>;
  manInsertOrderConsignmentDetailsEvent?: Maybe<ManOrder>;
  manInsertOrderEmsAcceptEvent?: Maybe<ManOrder>;
  manInsertOrderEvent?: Maybe<ManOrder>;
  manInsertOrderPartsOrderedEvent?: Maybe<ManOrder>;
  manInsertOrderPartsReceivedEvent?: Maybe<ManOrder>;
  manInsertOrderPcbsOrderedEvent?: Maybe<ManOrder>;
  manInsertOrderPcbsReceivedEvent?: Maybe<ManOrder>;
  manInsertOrderProcessStartEvent?: Maybe<ManOrder>;
  manInsertOrderReviewEvent?: Maybe<ManOrder>;
  manInsertOrderShipUpdateEvent?: Maybe<ManOrder>;
  manInsertOrderShippedEvent?: Maybe<ManOrder>;
  manRespondBulkRapidQuoteRequest: Scalars["ID"]["output"];
  /** for a manufacturer to return a rapid quote reponse */
  manRespondRapidQuoteRequest: Scalars["ID"]["output"];
  manUpdateBomResolution?: Maybe<ManBomResolution>;
  manUpdateOrderQty?: Maybe<ManOrder>;
  manUpdateOrderShipping?: Maybe<ManOrder>;
};

export type MutationAdmEvtSendAppNotificationArgs = {
  input: AdmEvtSendAppNotificationInput;
};

export type MutationDatScrCreateJobArgs = {
  input: DatScrCreateJobInput;
};

export type MutationDatScrDeleteJobArgs = {
  input: DatScrDeleteJobInput;
};

export type MutationDesAddUsersToGroupArgs = {
  input: DesAddUsersToGroupInput;
};

export type MutationDesCreateCommentArgs = {
  input: DesCreateCommentInput;
};

export type MutationDesCreateCommentThreadArgs = {
  input: DesCreateCommentThreadInput;
};

export type MutationDesCreateManufacturePackageArgs = {
  input: DesCreateManufacturePackageInput;
};

export type MutationDesCreateProjectExportJobArgs = {
  input: DesCreateProjectExportJobInput;
};

export type MutationDesCreateProjectTaskArgs = {
  input: DesCreateProjectTaskInput;
};

export type MutationDesCreateTaskCommentArgs = {
  input: DesCreateTaskCommentInput;
};

export type MutationDesCreateUserArgs = {
  input: DesCreateUserInput;
};

export type MutationDesCreateUserGroupArgs = {
  input: DesCreateUserGroupInput;
};

export type MutationDesCreateWorkspaceTaskArgs = {
  input: DesCreateWorkspaceTaskInput;
};

export type MutationDesDeleteCommentArgs = {
  input: DesDeleteCommentInput;
};

export type MutationDesDeleteCommentThreadArgs = {
  input: DesDeleteCommentThreadInput;
};

export type MutationDesDeleteTaskArgs = {
  input: DesDeleteTaskInput;
};

export type MutationDesDeleteTaskCommentArgs = {
  input: DesDeleteTaskCommentInput;
};

export type MutationDesDeleteUserArgs = {
  input: DesDeleteUserInput;
};

export type MutationDesDeleteUserGroupArgs = {
  input: DesDeleteUserGroupInput;
};

export type MutationDesLaunchWorkflowArgs = {
  input: DesLaunchWorkflowInput;
};

export type MutationDesReleaseComponentArgs = {
  input: DesReleaseComponentInput;
};

export type MutationDesReleaseComponentTemplateArgs = {
  input: DesReleaseComponentTemplateInput;
};

export type MutationDesRemoveComponentPartChoicesArgs = {
  input: DesRemoveComponentPartChoicesInput;
};

export type MutationDesRemoveUsersFromGroupArgs = {
  input: DesRemoveUsersFromGroupInput;
};

export type MutationDesTerminateWorkflowsArgs = {
  input: DesTerminateWorkflowsInput;
};

export type MutationDesUpdateCommentArgs = {
  input: DesUpdateCommentInput;
};

export type MutationDesUpdateComponentItemParametersArgs = {
  input: DesUpdateComponentItemParametersInput;
};

export type MutationDesUpdateComponentRevisionParametersArgs = {
  input: DesUpdateComponentRevisionParametersInput;
};

export type MutationDesUpdateComponentTemplateArgs = {
  input: DesUpdateComponentTemplateInput;
};

export type MutationDesUpdateFolderPermissionsArgs = {
  input: DesUpdateFolderPermissionsInput;
};

export type MutationDesUpdateProjectPermissionsArgs = {
  input: DesUpdateProjectPermissionsInput;
};

export type MutationDesUpdateReuseBlockArgs = {
  input: DesUpdateReuseBlockInput;
};

export type MutationDesUpdateTaskArgs = {
  input: DesUpdateTaskInput;
};

export type MutationDesUpdateTaskCommentArgs = {
  input: DesUpdateTaskCommentInput;
};

export type MutationDesUpdateUserArgs = {
  input: DesUpdateUserInput;
};

export type MutationDesUpdateUserGroupArgs = {
  input: DesUpdateUserGroupInput;
};

export type MutationDesUploadCollaborationArgs = {
  input: DesUploadCollaborationInput;
};

export type MutationDesUploadCollaborationSimulationArgs = {
  input: DesUploadCollaborationSimulationInput;
};

export type MutationDesUploadProjectArgs = {
  input: DesUploadProjectInput;
};

export type MutationManAcceptOrderQuoteArgs = {
  orderId: Scalars["ID"]["input"];
  paymentOptions?: InputMaybe<ManPaymentSelectionInput>;
  quoteId: Scalars["ID"]["input"];
};

export type MutationManCreateAssemblyArgs = {
  commitId?: InputMaybe<Scalars["ID"]["input"]>;
  projectId: Scalars["ID"]["input"];
  quoteRequest: Scalars["ID"]["input"];
};

export type MutationManCreateOrderArgs = {
  assemblyId: Scalars["ID"]["input"];
  qty?: InputMaybe<Scalars["Int"]["input"]>;
};

export type MutationManCreateRapidQuoteRequestArgs = {
  meta: ManBoardMetaInput;
  qty: Scalars["Int"]["input"];
  shipping?: InputMaybe<ManShippingDetailsInput>;
};

export type MutationManInsertOrderBatchedEventArgs = {
  input: ManOrderBatchedInput;
};

export type MutationManInsertOrderConsignmentDetailsEventArgs = {
  input: ManOrderConsignmentDetailsInput;
};

export type MutationManInsertOrderEmsAcceptEventArgs = {
  input: ManOrderEmsAcceptInput;
};

export type MutationManInsertOrderEventArgs = {
  attributes?: InputMaybe<Scalars["String"]["input"]>;
  event?: InputMaybe<ManOrderEventType>;
  id: Scalars["ID"]["input"];
};

export type MutationManInsertOrderPartsOrderedEventArgs = {
  input: ManOrderPartsOrderedInput;
};

export type MutationManInsertOrderPartsReceivedEventArgs = {
  input: ManOrderPartsReceivedInput;
};

export type MutationManInsertOrderPcbsOrderedEventArgs = {
  input: ManOrderPcbsOrderedInput;
};

export type MutationManInsertOrderPcbsReceivedEventArgs = {
  input: ManOrderPcbsReceivedInput;
};

export type MutationManInsertOrderProcessStartEventArgs = {
  input: ManOrderProcessStartInput;
};

export type MutationManInsertOrderReviewEventArgs = {
  input: ManOrderReviewInput;
};

export type MutationManInsertOrderShipUpdateEventArgs = {
  input: ManOrderShipEstimateInput;
};

export type MutationManInsertOrderShippedEventArgs = {
  input: ManOrderShippedInput;
};

export type MutationManRespondBulkRapidQuoteRequestArgs = {
  id: Scalars["ID"]["input"];
  quotes: Array<ManQuoteInput>;
};

export type MutationManRespondRapidQuoteRequestArgs = {
  id: Scalars["ID"]["input"];
  quote: ManQuoteInput;
};

export type MutationManUpdateBomResolutionArgs = {
  newSelections?: InputMaybe<Array<ManPartSelectionInput>>;
  projectId: Scalars["ID"]["input"];
  quoteRequestId: Scalars["ID"]["input"];
};

export type MutationManUpdateOrderQtyArgs = {
  orderId: Scalars["ID"]["input"];
  qty: Scalars["Int"]["input"];
};

export type MutationManUpdateOrderShippingArgs = {
  orderId: Scalars["ID"]["input"];
  shipping: ManShippingDetailsInput;
};

/** The node interface is implemented by entities that have a global unique identifier. */
export type Node = {
  id: Scalars["ID"]["output"];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: "PageInfo";
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars["String"]["output"]>;
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars["Boolean"]["output"];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars["Boolean"]["output"];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars["String"]["output"]>;
};

export type Query = {
  __typename?: "Query";
  /** Gets a single application by its unique identifier. */
  admApplicationById?: Maybe<AdmApplication>;
  /** Get details about the organization(s) the current user belongs to. */
  admOrganizations: Array<AdmOrganization>;
  datBomAnalyses: Array<DatBomAnalysis>;
  datBomCategoryIdsByDesignator: Array<Maybe<DatBomCategory>>;
  datBomDuplicateAnalyses: Array<DatBomAnalysis>;
  datBomPart: DatBomPartsResult;
  datBomPartHistories: Array<Maybe<DatBomPartHistory>>;
  datBomParts: Array<DatBomPartsResult>;
  datEddiEditions: Array<DatEddiEdition>;
  datEddiLatestEdition: DatEddiEdition;
  /** Grouped SCR historical procurability data for parts. */
  datScrIpnPartInfo: DatScrIpnPartInfo;
  /** Get an SCR Job with a specific id */
  datScrJob: DatScrJob;
  /** Get a list of SCR jobs. */
  datScrJobs: Array<DatScrJob>;
  /** Information about the model parameters involved in SCR calculations. */
  datScrModelInfo: DatScrModelInfo;
  /** SCR data, including historical procurability, recent market availability and future prediction, for a set of parts. */
  datScrPartInfos: Array<Maybe<DatScrPartInfo>>;
  /** Get link to a downloadable SCR report. */
  datScrReport: DatScrReport;
  /** Get current metered usage statistics. */
  datScrUsage?: Maybe<DatScrUsage>;
  /** Gets the BOM by its identifier. */
  desBomById?: Maybe<DesBom>;
  /** Search for a specific comment thread associated with a project. */
  desCommentThread?: Maybe<DesCommentThread>;
  /** Search for comment threads associated with a project. */
  desCommentThreads: Array<DesCommentThread>;
  desComponentById?: Maybe<DesComponent>;
  desComponentTemplateById?: Maybe<DesComponentTemplate>;
  desComponentsByIds: Array<DesUnionPayload>;
  desDesignItemById?: Maybe<DesDesignItem>;
  desLibrary: DesLibrary;
  /** Gets the first allowed life cycle by the content kind. */
  desLifeCycleDefinitionByContentTypeKind: DesLifeCycleDefinition;
  /** Gets life cycle definitions. */
  desLifeCycleDefinitions: Array<DesLifeCycleDefinition>;
  desManufacturePackageById?: Maybe<DesManufacturePackage>;
  desManufacturePackageCreationJob?: Maybe<DesManufacturePackageCreationJob>;
  desManufacturePackages: Array<DesManufacturePackage>;
  /** Search a specific project by its unique identifier. */
  desProjectById?: Maybe<DesProject>;
  /** The project latest ECAD or MCAD revision. */
  desProjectCollaborationLatestRevision?: Maybe<DesCollaborationRevision>;
  /** The project ECAD or MCAD revisions returned by pages. */
  desProjectCollaborationRevisions?: Maybe<DesCollaborationRevisionConnection>;
  /** *PROTOTYPE, SUBJECT TO CHANGE* */
  desProjectCollaborationSimulationLatestRevision?: Maybe<DesCollaborationSimulationRevision>;
  /** *PROTOTYPE, SUBJECT TO CHANGE* */
  desProjectCollaborationSimulationRevisions?: Maybe<DesCollaborationSimulationRevisionConnection>;
  /** Gets the specified project export job. */
  desProjectExportJob: DesProjectExportJob;
  /** Gets the project node ID from its internal ID. */
  desProjectIdFromAfsId: DesProjectIdPayload;
  /** The list of project tasks. */
  desProjectTasks?: Maybe<DesTaskConnection>;
  /** Search projects within a workspace with results in paged groups. */
  desProjects?: Maybe<DesProjectConnection>;
  desReleaseById?: Maybe<DesRelease>;
  /** Find a specific reuse block by its unique identifier. */
  desReuseBlockById?: Maybe<DesReuseBlock>;
  /** Find a specific reuse block revision by its unique identifier. */
  desReuseBlockRevisionById?: Maybe<DesReuseBlockRevision>;
  desRevisionDetailsById?: Maybe<DesRevisionDetails>;
  /** Gets the first allowed naming scheme by the content kind. */
  desRevisionNamingSchemeByContentTypeKind: DesRevisionNamingScheme;
  /** Gets revision naming schemes. */
  desRevisionNamingSchemes: Array<DesRevisionNamingScheme>;
  /** Gets the specified settings. */
  desSettings: Array<Maybe<Scalars["String"]["output"]>>;
  desSharedWithMe: DesSharedWithMe;
  /** Gets the specified workspace team. */
  desTeam: DesTeam;
  /** Gets the authorized user. */
  desUserByAuth: DesUser;
  /** Gets a user by the specified global ID. */
  desUserByGlobalId?: Maybe<DesUser>;
  /** Gets the specified workspace users by IDs. */
  desUsers: Array<Maybe<DesUser>>;
  /** Search a specific workspace by its unique identifier. */
  desWorkspaceById?: Maybe<DesWorkspace>;
  /** Search a specific workspace by its URL. */
  desWorkspaceByUrl?: Maybe<DesWorkspace>;
  /** Get a list of workspace locations. */
  desWorkspaceLocations: Array<DesWorkspaceLocation>;
  /** The list of workspace tasks. */
  desWorkspaceTasks?: Maybe<DesTaskConnection>;
  /** Search for workspaces associated with this account. */
  desWorkspaces: Array<DesWorkspace>;
  manAltimadeLogin?: Maybe<Scalars["String"]["output"]>;
  manAssembly?: Maybe<ManAssembly>;
  manBomResolution?: Maybe<ManBomResolution>;
  manListProjectOrders?: Maybe<Array<Maybe<ManOrder>>>;
  manOrder?: Maybe<ManOrder>;
  manOrderEventById?: Maybe<ManOrderEvent>;
  manProjectFeatures?: Maybe<ManFeatures>;
  manRapidQuoteRequest?: Maybe<ManRapidQuoteRequest>;
  /** get a the quotes from previously submitted metadata */
  manRapidQuotes?: Maybe<ManRapidQuoteResponse>;
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Lookup nodes by a list of IDs. */
  nodes: Array<Maybe<Node>>;
  /** Get all attributes */
  supAttributes: Array<SupAttribute>;
  /** Get categories */
  supCategories: Array<SupCategory>;
  /** Nexar infrastructure, subject to change. */
  supCiivaIdFromPartId?: Maybe<Scalars["String"]["output"]>;
  /** Get manufacturer companies */
  supManufacturers: Array<SupCompany>;
  /** Match multiple manufacturer + mpn pairs at once.  Useful for when you have a list of parts, as with a BOM (Bill of Materials) */
  supMultiMatch: Array<SupPartMatch>;
  supOctocart: Array<SupOctocartLink>;
  /** @deprecated Use `supPartIdFromCiivaId`. */
  supOctopartIdFromCiivaId?: Maybe<Scalars["String"]["output"]>;
  /** Nexar supply part data for internal use only. */
  supPartExtrasByPartId?: Maybe<SupPartExtras>;
  /** Nexar supply part data for internal use only. */
  supPartExtrasByPartIds: Array<SupUnionPayload>;
  /** Nexar infrastructure, subject to change. */
  supPartIdFromCiivaId?: Maybe<Scalars["String"]["output"]>;
  /** Nexar infrastructure, subject to change. */
  supPartIdsFromCiivaIds: Array<Maybe<Scalars["String"]["output"]>>;
  /** Get parts by ID. */
  supParts: Array<Maybe<SupPart>>;
  /** Search parts, including filters, pagination, aggregation, sorting */
  supSearch: SupPartResultSet;
  /** Search parts by mpn only, including filters, pagination, aggregation, sorting */
  supSearchMpn: SupPartResultSet;
  /** Get seller companies (distributors) */
  supSellers: Array<SupCompany>;
  /** Suggest an alternate `q` when no results are found */
  supSpellingCorrection: Array<SupSpellingCorrection>;
  /** Attempt to complete a partial query string.  Used for autosuggest / typeahead text inputs. */
  supSuggest: Array<SupSuggestion>;
};

export type QueryAdmApplicationByIdArgs = {
  id: Scalars["String"]["input"];
};

export type QueryDatBomAnalysesArgs = {
  items: Array<DatBomPartItemInput>;
};

export type QueryDatBomCategoryIdsByDesignatorArgs = {
  designators: Array<Scalars["String"]["input"]>;
};

export type QueryDatBomDuplicateAnalysesArgs = {
  items: Array<DatBomPartItemInput>;
};

export type QueryDatBomPartArgs = {
  item: DatBomItemInput;
};

export type QueryDatBomPartHistoriesArgs = {
  partIds: Array<Scalars["String"]["input"]>;
};

export type QueryDatBomPartsArgs = {
  items: Array<DatBomItemInput>;
};

export type QueryDatEddiEditionsArgs = {
  where?: InputMaybe<DatEddiEditionFilterInput>;
};

export type QueryDatScrIpnPartInfoArgs = {
  eau: Scalars["Long"]["input"];
  partIds: Array<Scalars["String"]["input"]>;
};

export type QueryDatScrJobArgs = {
  jobId: Scalars["String"]["input"];
};

export type QueryDatScrJobsArgs = {
  jobIds?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type QueryDatScrPartInfosArgs = {
  parts: Array<DatScrPartInfoInput>;
};

export type QueryDatScrReportArgs = {
  jobId: Scalars["String"]["input"];
};

export type QueryDesBomByIdArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryDesCommentThreadArgs = {
  projectId: Scalars["ID"]["input"];
  threadId: Scalars["String"]["input"];
};

export type QueryDesCommentThreadsArgs = {
  projectId: Scalars["ID"]["input"];
};

export type QueryDesComponentByIdArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryDesComponentTemplateByIdArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryDesComponentsByIdsArgs = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type QueryDesDesignItemByIdArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryDesLibraryArgs = {
  workspaceUrl: Scalars["String"]["input"];
};

export type QueryDesLifeCycleDefinitionByContentTypeKindArgs = {
  kind: DesContentTypeKind;
  workspaceUrl: Scalars["String"]["input"];
};

export type QueryDesLifeCycleDefinitionsArgs = {
  workspaceUrl: Scalars["String"]["input"];
};

export type QueryDesManufacturePackageByIdArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryDesManufacturePackageCreationJobArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryDesProjectByIdArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryDesProjectCollaborationLatestRevisionArgs = {
  domain: DesCollaborationDomain;
  projectId: Scalars["ID"]["input"];
};

export type QueryDesProjectCollaborationRevisionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  domain: DesCollaborationDomain;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  projectId: Scalars["ID"]["input"];
};

export type QueryDesProjectCollaborationSimulationLatestRevisionArgs = {
  domainName: Scalars["String"]["input"];
  projectId: Scalars["ID"]["input"];
  projectTypeName: Scalars["String"]["input"];
};

export type QueryDesProjectCollaborationSimulationRevisionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  domainName: Scalars["String"]["input"];
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  projectId: Scalars["ID"]["input"];
};

export type QueryDesProjectExportJobArgs = {
  projectExportJobId: Scalars["String"]["input"];
};

export type QueryDesProjectIdFromAfsIdArgs = {
  afsId: Scalars["String"]["input"];
  isSharedProject?: InputMaybe<Scalars["Boolean"]["input"]>;
  workspaceUrl: Scalars["String"]["input"];
};

export type QueryDesProjectTasksArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  projectId: Scalars["ID"]["input"];
};

export type QueryDesProjectsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<DesProjectFilterInput>;
  workspaceUrl: Scalars["String"]["input"];
};

export type QueryDesReleaseByIdArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryDesReuseBlockByIdArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryDesReuseBlockRevisionByIdArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryDesRevisionDetailsByIdArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryDesRevisionNamingSchemeByContentTypeKindArgs = {
  kind: DesContentTypeKind;
  workspaceUrl: Scalars["String"]["input"];
};

export type QueryDesRevisionNamingSchemesArgs = {
  workspaceUrl: Scalars["String"]["input"];
};

export type QueryDesSettingsArgs = {
  names: Array<Scalars["String"]["input"]>;
  workspaceUrl: Scalars["String"]["input"];
};

export type QueryDesTeamArgs = {
  workspaceUrl: Scalars["String"]["input"];
};

export type QueryDesUserByGlobalIdArgs = {
  id: Scalars["String"]["input"];
};

export type QueryDesUsersArgs = {
  ids: Array<Scalars["String"]["input"]>;
  workspaceUrl: Scalars["String"]["input"];
};

export type QueryDesWorkspaceByIdArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryDesWorkspaceByUrlArgs = {
  workspaceUrl: Scalars["String"]["input"];
};

export type QueryDesWorkspaceTasksArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  workspaceUrl: Scalars["String"]["input"];
};

export type QueryDesWorkspacesArgs = {
  where?: InputMaybe<DesWorkspaceFilterInput>;
};

export type QueryManAltimadeLoginArgs = {
  gsid?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryManAssemblyArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryManBomResolutionArgs = {
  projectId: Scalars["ID"]["input"];
  quoteRequestId: Scalars["ID"]["input"];
};

export type QueryManListProjectOrdersArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryManOrderArgs = {
  orderId: Scalars["ID"]["input"];
};

export type QueryManOrderEventByIdArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryManProjectFeaturesArgs = {
  input: ManProjectFeatureInput;
};

export type QueryManRapidQuoteRequestArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryManRapidQuotesArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryNodeArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryNodesArgs = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type QuerySupCategoriesArgs = {
  ids?: InputMaybe<Array<Scalars["String"]["input"]>>;
  paths?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type QuerySupCiivaIdFromPartIdArgs = {
  partId: Scalars["String"]["input"];
};

export type QuerySupManufacturersArgs = {
  ids?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type QuerySupMultiMatchArgs = {
  country?: Scalars["String"]["input"];
  currency?: Scalars["String"]["input"];
  customPricingCredentials?: InputMaybe<Array<SupApiCredentials>>;
  distributorApi?: InputMaybe<Scalars["Boolean"]["input"]>;
  distributorApiTimeout?: Scalars["String"]["input"];
  options?: InputMaybe<SupPartMatchOptions>;
  queries: Array<SupPartMatchQuery>;
};

export type QuerySupOctocartArgs = {
  country?: InputMaybe<Scalars["String"]["input"]>;
  currency?: InputMaybe<Scalars["String"]["input"]>;
  items: Array<SupOctocartPartsBySellerInput>;
};

export type QuerySupOctopartIdFromCiivaIdArgs = {
  ciivaId: Scalars["String"]["input"];
  workspaceUrl: Scalars["String"]["input"];
};

export type QuerySupPartExtrasByPartIdArgs = {
  partId: Scalars["String"]["input"];
};

export type QuerySupPartExtrasByPartIdsArgs = {
  partIds: Array<Scalars["String"]["input"]>;
};

export type QuerySupPartIdFromCiivaIdArgs = {
  ciivaId: Scalars["String"]["input"];
};

export type QuerySupPartIdsFromCiivaIdsArgs = {
  ciivaIds: Array<Scalars["String"]["input"]>;
};

export type QuerySupPartsArgs = {
  country?: Scalars["String"]["input"];
  currency?: Scalars["String"]["input"];
  customPricingCredentials?: InputMaybe<Array<SupApiCredentials>>;
  distributorApi?: InputMaybe<Scalars["Boolean"]["input"]>;
  distributorApiTimeout?: Scalars["String"]["input"];
  ids: Array<Scalars["String"]["input"]>;
};

export type QuerySupSearchArgs = {
  country?: Scalars["String"]["input"];
  currency?: Scalars["String"]["input"];
  customPricingCredentials?: InputMaybe<Array<SupApiCredentials>>;
  distributorApi?: InputMaybe<Scalars["Boolean"]["input"]>;
  distributorApiTimeout?: Scalars["String"]["input"];
  filters?: InputMaybe<Scalars["Map"]["input"]>;
  inStockOnly?: InputMaybe<Scalars["Boolean"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  q?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Scalars["String"]["input"]>;
  sortDir?: InputMaybe<SupSortDirection>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QuerySupSearchMpnArgs = {
  country?: Scalars["String"]["input"];
  currency?: Scalars["String"]["input"];
  customPricingCredentials?: InputMaybe<Array<SupApiCredentials>>;
  distributorApi?: InputMaybe<Scalars["Boolean"]["input"]>;
  distributorApiTimeout?: Scalars["String"]["input"];
  filters?: InputMaybe<Scalars["Map"]["input"]>;
  inStockOnly?: InputMaybe<Scalars["Boolean"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  q?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Scalars["String"]["input"]>;
  sortDir?: InputMaybe<SupSortDirection>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QuerySupSellersArgs = {
  ids?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type QuerySupSpellingCorrectionArgs = {
  q: Scalars["String"]["input"];
};

export type QuerySupSuggestArgs = {
  categoryId?: InputMaybe<Scalars["String"]["input"]>;
  partNumbersOnly?: InputMaybe<Scalars["Boolean"]["input"]>;
  q: Scalars["String"]["input"];
};

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars["String"]["input"]>;
  endsWith?: InputMaybe<Scalars["String"]["input"]>;
  eq?: InputMaybe<Scalars["String"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  ncontains?: InputMaybe<Scalars["String"]["input"]>;
  nendsWith?: InputMaybe<Scalars["String"]["input"]>;
  neq?: InputMaybe<Scalars["String"]["input"]>;
  nin?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  nstartsWith?: InputMaybe<Scalars["String"]["input"]>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars["String"]["input"]>;
};

export type Subscription = {
  __typename?: "Subscription";
  desOnCommentUpdated: DesCommentNotification;
};

export type SubscriptionDesOnCommentUpdatedArgs = {
  input: DesOnCommentUpdatedInput;
};

export type SupApiCredentials = {
  /** Authentication details. `apiKey` should be given when an API requires it. */
  apiKey?: InputMaybe<Scalars["String"]["input"]>;
  /** The name of the API that you are providing credentials for. An Octopart representative will give this value to you if needed. */
  apiName: Scalars["String"]["input"];
  /** Authentication details. `clientId` and `clientSecret` should be given together when an API requires them. */
  clientId?: InputMaybe<Scalars["String"]["input"]>;
  /** Authentication details. `clientId` and `clientSecret` should be given together when an API requires them. */
  clientSecret?: InputMaybe<Scalars["String"]["input"]>;
  /** Authentication details. `username` and `password` should be given together when an API requires them. */
  password?: InputMaybe<Scalars["String"]["input"]>;
  /** Authentication details. `username` and `password` should be given together when an API requires them. */
  username?: InputMaybe<Scalars["String"]["input"]>;
};

/** Used to show the filters that are applied to current search. */
export type SupAppliedFilter = {
  __typename?: "SupAppliedFilter";
  /** human readable values to display in the UI */
  displayValues: Array<Scalars["String"]["output"]>;
  /** human readable name to display in the UI */
  name: Scalars["String"]["output"];
  /** shortname is the key in the filters Map.  Usually an attribute shortname, or `manufacturerId`, `distributorId`, etc. */
  shortname: Scalars["String"]["output"];
  /** values in the filter Map. */
  values: Array<Scalars["String"]["output"]>;
};

/** Defines an attribute like Capacitance or Resistance. */
export type SupAttribute = {
  __typename?: "SupAttribute";
  /** use to group together similar attributes, e.g. Technical, Physical, Compliance */
  group: Scalars["String"]["output"];
  /** Internal Octopart ID */
  id: Scalars["ID"]["output"];
  /** display name */
  name: Scalars["String"]["output"];
  /** use as key for `sort` or `filter` in part search */
  shortname: Scalars["String"]["output"];
  /** The short name of the units */
  unitsName: Scalars["String"]["output"];
  /** The symbol of the units */
  unitsSymbol: Scalars["String"]["output"];
  /** The type of the value */
  valueType: Scalars["String"]["output"];
};

/** Groups similar attributes together, as can be seen with column groups in specs view */
export type SupAttributeGroup = {
  __typename?: "SupAttributeGroup";
  /** Attributes in group */
  attributes: Array<SupAttribute>;
  /** Name of group, e.g. Technical, Physical, Compliance */
  name: Scalars["String"]["output"];
};

/** Information for use on /electronic-parts Category pages. */
export type SupBlurb = {
  __typename?: "SupBlurb";
  /** Longer description of Category. */
  content: Scalars["String"]["output"];
  /** Short description of Category. */
  description: Scalars["String"]["output"];
  /** Category name. */
  name: Scalars["String"]["output"];
  /** Path to /electronic-parts Category page. */
  pathName: Scalars["String"]["output"];
};

/** cadAgg produces a CadBucket with the count of parts that have CAD Symbol + Footprint and 3D model */
export type SupCadBucket = {
  __typename?: "SupCadBucket";
  cadState: Scalars["String"]["output"];
  count?: Maybe<Scalars["Int"]["output"]>;
};

/**
 * A Category exists in a Category tree.  Examples include Passive Components or Capacitors.  The `path` field is helpful to see where a category is in the tree.
 * Category id `4161` is the root of tree.
 */
export type SupCategory = {
  __typename?: "SupCategory";
  /** List of all ancestor in category tree. */
  ancestors: Array<SupCategory>;
  /** Blurb for Category, used on /electronic-parts pages. */
  blurb?: Maybe<SupBlurb>;
  /** List of direct children in category tree. */
  children: Array<SupCategory>;
  /** Octopart internal id.  Root id is 4161 */
  id: Scalars["ID"]["output"];
  /** Display name */
  name: Scalars["String"]["output"];
  /** Number of parts in Category. */
  numParts: Scalars["Int"]["output"];
  /** ID of parent category. */
  parentId: Scalars["ID"]["output"];
  /** Slash separated path.  Can be used to visit URL for category page.  (e.g. `/electronic-parts/circuit-protection/esd-and-circuit-protection-ics`) */
  path: Scalars["String"]["output"];
  /** List of Attributes deemed to be relevant to this category.  (e.g. Resistance for Resistor category).  Useful for showing contextual filters in UI. */
  relevantAttributes: Array<SupAttribute>;
};

/** categoryAgg produces a CategoryBucket with category + counts */
export type SupCategoryBucket = {
  __typename?: "SupCategoryBucket";
  category: SupCategory;
  count?: Maybe<Scalars["Int"]["output"]>;
};

/** A company record represents a manufacturer or distributor, depending on context. */
export type SupCompany = {
  __typename?: "SupCompany";
  /** Aliases of company */
  aliases: Array<Scalars["String"]["output"]>;
  /** The country code for the display flag */
  displayFlag?: Maybe<Scalars["String"]["output"]>;
  /** Homepage URL of company */
  homepageUrl?: Maybe<Scalars["String"]["output"]>;
  /** Octopart internal id */
  id: Scalars["ID"]["output"];
  /**
   * True if a distributor is a broker.  See [authorized](https://octopart.com/authorized) for more information.
   * @deprecated use `PartSeller.is_broker` instead
   */
  isBroker: Scalars["Boolean"]["output"];
  /** True if a distributor has an API integration with Octopart to provide latest pricing and stock data. */
  isDistributorApi: Scalars["Boolean"]["output"];
  /** True if a manufacturer participates in Octopart's Verified Manufacturer program.  See [verified](https://octopart.com/verified) for more information. */
  isVerified: Scalars["Boolean"]["output"];
  /** Display name of company */
  name: Scalars["String"]["output"];
  /** Used for URLs like `/manufacturers/aimtec` or `/distributors/digi-key` */
  slug: Scalars["String"]["output"];
};

/** manufacturerAgg and distributorAgg produce a CompanyBucket with company + counts */
export type SupCompanyBucket = {
  __typename?: "SupCompanyBucket";
  company: SupCompany;
  count?: Maybe<Scalars["Int"]["output"]>;
};

/** A country's name, country code, and continent code. */
export type SupCountry = {
  __typename?: "SupCountry";
  continentCode: Scalars["String"]["output"];
  countryCode: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
};

/** Textual description of a part */
export type SupDescription = {
  __typename?: "SupDescription";
  /** Source of description.  Used for attribution. */
  creditString: Scalars["String"]["output"];
  /** Source URL of description.  Used for attribution. */
  creditUrl: Scalars["String"]["output"];
  /** Description text */
  text: Scalars["String"]["output"];
};

/** Document represents a PDF file and can be a Datasheet, Compliance Document, PCN, etc. */
export type SupDocument = {
  __typename?: "SupDocument";
  createdAt?: Maybe<Scalars["Time"]["output"]>;
  creditString: Scalars["String"]["output"];
  creditUrl: Scalars["String"]["output"];
  mimeType: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  pageCount?: Maybe<Scalars["Int"]["output"]>;
  url: Scalars["String"]["output"];
};

/** DocumentCollection groups documents together by type: Datasheets, Compliance Statements. */
export type SupDocumentCollection = {
  __typename?: "SupDocumentCollection";
  /** List of Documents in group */
  documents: Array<SupDocument>;
  /** Name of group, e.g. Datasheets */
  name: Scalars["String"]["output"];
};

export type SupErrorPayload = {
  __typename?: "SupErrorPayload";
  message: Scalars["String"]["output"];
};

/** Image of a part.  In the case of some symbol and footprint images, the scaled version may not actually be scaled and cropped, and may need to be scaled using CSS or other techniques. */
export type SupImage = {
  __typename?: "SupImage";
  /** Source of description.  Used for attribution. */
  creditString: Scalars["String"]["output"];
  /** Source URL of description.  Used for attribution. */
  creditUrl: Scalars["String"]["output"];
  /** Image URL */
  url: Scalars["String"]["output"];
  /** @deprecated use `url` instead */
  url55px: Scalars["String"]["output"];
  /** @deprecated use `url` instead */
  url75px: Scalars["String"]["output"];
  /** @deprecated use `url` instead */
  url90px: Scalars["String"]["output"];
  /** @deprecated use `url` instead */
  urlLargest: Scalars["String"]["output"];
};

export enum SupNexarFeatureId {
  CadModels = "CAD_MODELS",
  Datasheets = "DATASHEETS",
  InventoryHistory = "INVENTORY_HISTORY",
  LeadTime = "LEAD_TIME",
  Lifecycle = "LIFECYCLE",
  SimilarParts = "SIMILAR_PARTS",
  SpellingCorrections = "SPELLING_CORRECTIONS",
  Suggestions = "SUGGESTIONS",
  TechSpecs = "TECH_SPECS",
}

export type SupOctocartItemInput = {
  offerId: Scalars["String"]["input"];
  partId: Scalars["String"]["input"];
  quantity: Scalars["Int"]["input"];
};

export type SupOctocartLink = {
  __typename?: "SupOctocartLink";
  cartUrl?: Maybe<Scalars["String"]["output"]>;
  /** @deprecated Error messages have been moved to the root `errors` object */
  messages: Array<Scalars["String"]["output"]>;
  sellerId: Scalars["String"]["output"];
};

export type SupOctocartPartsBySellerInput = {
  items: Array<SupOctocartItemInput>;
  sellerId: Scalars["String"]["input"];
};

/** An offer is a specific buyable part from a distributor, with specific packaging, pricing, stock, moq. */
export type SupOffer = {
  __typename?: "SupOffer";
  /** Cache ID */
  _cacheId: Scalars["String"]["output"];
  /** The URL to view offer on distributor website.  This will redirect via Octopart's server. */
  clickUrl: Scalars["String"]["output"];
  /** The code indicating the region(s) for which offer is valid */
  eligibleRegion?: Maybe<Scalars["String"]["output"]>;
  /** Number of days to acquire parts from factory. */
  factoryLeadDays?: Maybe<Scalars["Int"]["output"]>;
  /** Order multiple for factory orders. */
  factoryPackQuantity?: Maybe<Scalars["Int"]["output"]>;
  /** Octopart internal ID for this offer */
  id: Scalars["ID"]["output"];
  /** Octopart internal URL for this offer. */
  internalUrl: Scalars["String"]["output"];
  /** Number of units available to be shipped.  (aka Stock, Quantity) */
  inventoryLevel: Scalars["Int"]["output"];
  /** Whether this offer is specific to the customer making the request. */
  isCustomPricing: Scalars["Boolean"]["output"];
  /** Minimum Order Quantity: smallest number of parts that can be purchased */
  moq?: Maybe<Scalars["Int"]["output"]>;
  /** The quantity of parts as packaged by the seller. */
  multipackQuantity?: Maybe<Scalars["Int"]["output"]>;
  /** Number of parts on order from factory. */
  onOrderQuantity?: Maybe<Scalars["Int"]["output"]>;
  /** Number of items which must be ordered together. */
  orderMultiple?: Maybe<Scalars["Int"]["output"]>;
  /** Packaging of parts (eg Tape, Reel) */
  packaging?: Maybe<Scalars["String"]["output"]>;
  prices: Array<SupPricePoint>;
  /** Stock Keeping Unit used by internally by distributor */
  sku: Scalars["String"]["output"];
  /** The last time data was received from distributor feed or API for this offer. */
  updated: Scalars["Time"]["output"];
};

/** Part model contains the relevant data around a part, including: datasheets, specs, sellers + offers, images, etc. */
export type SupPart = {
  __typename?: "SupPart";
  /** Cache ID */
  _cacheId: Scalars["String"]["output"];
  /** This part might be known by these alternate MPNs */
  akaMpns: Array<Scalars["String"]["output"]>;
  /** The average stock level at each distributor */
  avgAvail: Scalars["Float"]["output"];
  bestDatasheet?: Maybe<SupDocument>;
  bestImage?: Maybe<SupImage>;
  /** Data about part's CAD model.  If null `cadRequestUrl` can be used to request a CAD model be made. */
  cad?: Maybe<SupPartCad>;
  /** URL to request a CAD model from eeconcierge if a part doesn't already have a CAD model.  Will be null part is not eligible, e.g. a multimeter */
  cadRequestUrl?: Maybe<Scalars["String"]["output"]>;
  category?: Maybe<SupCategory>;
  /** Parts identified by the manufacturer as companion products. */
  companionProducts: Array<SupSponsoredPart>;
  /** A [Map](#map) of number of related objects.  Can be used to know the number of `images` or `descriptions` without having to request those related objects. */
  counts: Scalars["Map"]["output"];
  /** All part descriptions from sources */
  descriptions: Array<SupDescription>;
  /** Documents including Datasheets, Compliance Documents, PCNs */
  documentCollections: Array<SupDocumentCollection>;
  /** The estimated factory lead time in days derived from trusted distributor offers. */
  estimatedFactoryLeadDays?: Maybe<Scalars["Int"]["output"]>;
  /** Nexar supply part data for internal use only. */
  extras?: Maybe<SupPartExtras>;
  /** A link to a manufacturer page to request free sample kits for this part. */
  freeSampleUrl?: Maybe<Scalars["String"]["output"]>;
  /** Best guess at a generic MPN */
  genericMpn: Scalars["String"]["output"];
  /** Octopart internal ID for this part.  Appears at the end of PDP URL / `slug` field. */
  id: Scalars["ID"]["output"];
  /** All part images */
  images: Array<SupImage>;
  /** Company that manufactures this part */
  manufacturer: SupCompany;
  /** A link to the manufacturer detail page for this part or series. */
  manufacturerUrl?: Maybe<Scalars["String"]["output"]>;
  /** The median USD price at quantity 1,000, discarding outliers.  A reasonable estimate of average price for a part. */
  medianPrice1000?: Maybe<SupPricePoint>;
  /** Manufacturer Part Number */
  mpn: Scalars["String"]["output"];
  /** manufacturer + mpn for easy display */
  name: Scalars["String"]["output"];
  /** A link to the part page on Octopart. Do not include `rel="nofollow"` when linking to this URL. */
  octopartUrl: Scalars["String"]["output"];
  referenceDesigns: Array<SupReferenceDesign>;
  /** Companies with Offers for this part */
  sellers: Array<SupPartSeller>;
  series?: Maybe<SupPartSeries>;
  /** Best description around 110 characters long, as can be seen on SERP or PDP.  May need truncation if all descriptions are long. */
  shortDescription: Scalars["String"]["output"];
  /** Parts identified by Octopart to be similar in specs and functionality. */
  similarParts: Array<SupPart>;
  /** Path component of PDP URL (e.g. `/ad7792bruz-analog+devices-402798`) */
  slug: Scalars["String"]["output"];
  /** Attribute values for this part */
  specs: Array<SupSpec>;
  /** Sum of stock available across all distributors */
  totalAvail: Scalars["Int"]["output"];
  /** The UID from Octopart APIv3.  Provided for backwards compatibility, in general ID should be used. */
  v3uid: Scalars["ID"]["output"];
};

/** Part model contains the relevant data around a part, including: datasheets, specs, sellers + offers, images, etc. */
export type SupPartSellersArgs = {
  authorizedOnly?: Scalars["Boolean"]["input"];
  includeBrokers?: Scalars["Boolean"]["input"];
};

export type SupPartCad = {
  __typename?: "SupPartCad";
  /** URL to add this part to your Upverter library. Requires an Upverter account. */
  addToLibraryUrl?: Maybe<Scalars["String"]["output"]>;
  downloadUrlAltium: Scalars["String"]["output"];
  downloadUrlEagle: Scalars["String"]["output"];
  downloadUrlKicad: Scalars["String"]["output"];
  downloadUrlOrcad: Scalars["String"]["output"];
  footprintImageUrl?: Maybe<Scalars["String"]["output"]>;
  /** If true, a STEP model will be included with the tool-specific downloads. */
  has3dModel: Scalars["Boolean"]["output"];
  hasAltium: Scalars["Boolean"]["output"];
  hasEagle: Scalars["Boolean"]["output"];
  hasKicad: Scalars["Boolean"]["output"];
  hasOrcad: Scalars["Boolean"]["output"];
  symbolImageUrl?: Maybe<Scalars["String"]["output"]>;
};

/** Nexar supply part data for internal use only. */
export type SupPartExtras = {
  __typename?: "SupPartExtras";
  alternatives: Array<SupPartExtras>;
  confidence?: Maybe<Scalars["Float"]["output"]>;
  datasheetUrls?: Maybe<Array<Scalars["String"]["output"]>>;
  description?: Maybe<Scalars["String"]["output"]>;
  isRohsCompliant?: Maybe<Scalars["Boolean"]["output"]>;
  lifeCycle: SupPartLifeCycle;
  parameters?: Maybe<Array<SupPartExtrasParameter>>;
  partId: Scalars["String"]["output"];
  /** @deprecated Use `parameters`. */
  technicalDetails?: Maybe<Array<SupPartExtrasTechnicalDetail>>;
};

/** Nexar supply part data for internal use only. */
export type SupPartExtrasAlternativesArgs = {
  first?: Scalars["Int"]["input"];
};

export type SupPartExtrasParameter = {
  __typename?: "SupPartExtrasParameter";
  name: Scalars["String"]["output"];
  unit?: Maybe<Scalars["String"]["output"]>;
  value?: Maybe<Array<Scalars["String"]["output"]>>;
};

export type SupPartExtrasTechnicalDetail = {
  __typename?: "SupPartExtrasTechnicalDetail";
  name: Scalars["String"]["output"];
  value: Scalars["String"]["output"];
};

export enum SupPartLifeCycle {
  Active = "ACTIVE",
  ActiveUnconfirmed = "ACTIVE_UNCONFIRMED",
  ContactMfr = "CONTACT_MFR",
  Discontinued = "DISCONTINUED",
  DiscontinuedUnconfirmed = "DISCONTINUED_UNCONFIRMED",
  Eol = "EOL",
  New = "NEW",
  Nrfnd = "NRFND",
  Transferred = "TRANSFERRED",
  Unknown = "UNKNOWN",
}

export type SupPartMatch = {
  __typename?: "SupPartMatch";
  /** Possible error message */
  error?: Maybe<Scalars["String"]["output"]>;
  /** Number of parts matched */
  hits: Scalars["Int"]["output"];
  /** Matched parts (may be subset, based on start + limit) */
  parts: Array<SupPart>;
  /** Will match `reference` supplied in PartMatchQuery. */
  reference?: Maybe<Scalars["String"]["output"]>;
};

export type SupPartMatchOptions = {
  /** a key: value map of filters. See [filter values](https://octopart.com/api/v4/values#attributes) */
  filters?: InputMaybe<Scalars["Map"]["input"]>;
  /** If true, only parts with at least one authorized seller will be returned. */
  requireAuthorizedSellers?: InputMaybe<Scalars["Boolean"]["input"]>;
  /** If true, only parts with stock available will be returned. */
  requireStockAvailable?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type SupPartMatchQuery = {
  limit?: Scalars["Int"]["input"];
  manufacturer?: InputMaybe<Scalars["String"]["input"]>;
  mpn?: InputMaybe<Scalars["String"]["input"]>;
  mpnOrSku?: InputMaybe<Scalars["String"]["input"]>;
  reference?: InputMaybe<Scalars["String"]["input"]>;
  seller?: InputMaybe<Scalars["String"]["input"]>;
  sku?: InputMaybe<Scalars["String"]["input"]>;
  start?: Scalars["Int"]["input"];
};

export type SupPartResult = {
  __typename?: "SupPartResult";
  /** Cache ID */
  _cacheId: Scalars["String"]["output"];
  /** If the search `q` is an alternate MPN for this part, the `akaMpn` will be populated with this alternate MPN. */
  akaMpn?: Maybe<Scalars["String"]["output"]>;
  /**
   * Description with query terms highlighted.  Often this is the same as part.shortDescription,
   * but if the search `q` matched on a different description it may be longer than part.shortDescription and require truncation.
   */
  description: Scalars["String"]["output"];
  /** @deprecated always empty */
  explain: Scalars["String"]["output"];
  /** The part object */
  part: SupPart;
};

/** Result of part search. */
export type SupPartResultSet = {
  __typename?: "SupPartResultSet";
  /** Full list of available Attributes in the result set */
  allFilters: Array<SupAttribute>;
  /** If a Category filter is applied, this will be the Category */
  appliedCategory?: Maybe<SupCategory>;
  /** If filters are applied, this will contain display information */
  appliedFilters: Array<SupAppliedFilter>;
  /** Aggregate on the availability of CAD models for the result set */
  cadAgg: Array<SupCadBucket>;
  /** Aggregate on categories for this result set */
  categoryAgg: Array<SupCategoryBucket>;
  /** Aggregate on distributors for this result set */
  distributorAgg: Array<SupCompanyBucket>;
  /** Number of parts in result set */
  hits: Scalars["Int"]["output"];
  /** Aggregate on manufacturers for this result set */
  manufacturerAgg: Array<SupCompanyBucket>;
  /** Contains nested part along side some fields specific to the query that explain reason for match. */
  results?: Maybe<Array<SupPartResult>>;
  /**
   * Perform aggregations on Spec values across multiple Attributes.
   * You *must* specify `attributeNames` for this field to be populated.
   * `attributeNames` should be a list of Attribute.shortname values (e.g. `capacitance` or `voltageRatingDc`)
   */
  specAggs: Array<SupSpecAgg>;
  /** Grouped attributes used to render the columns in specs view. */
  specsViewAttributeGroups: Array<SupAttributeGroup>;
  /** Categories that are determined by search algo to be related to the search term.  Useful for suggesting a Category filter in the search UI. */
  suggestedCategories: Array<SupCategoryBucket>;
  /** Attributes that are determined by search algo to be related to the search term.  Useful for suggesting most relevant filters in the search UI. */
  suggestedFilters: Array<SupAttribute>;
  /** @deprecated use `hits` instead */
  total: Scalars["Int"]["output"];
  /** If an invalid query was modified or rejected, warnings indicate this fact to the user.  For example if query contained too many tokens, some tokens may be ignored. */
  warnings?: Maybe<Array<Scalars["String"]["output"]>>;
};

/** Result of part search. */
export type SupPartResultSetCategoryAggArgs = {
  size?: Scalars["Int"]["input"];
};

/** Result of part search. */
export type SupPartResultSetDistributorAggArgs = {
  size?: Scalars["Int"]["input"];
};

/** Result of part search. */
export type SupPartResultSetManufacturerAggArgs = {
  size?: Scalars["Int"]["input"];
};

/** Result of part search. */
export type SupPartResultSetSpecAggsArgs = {
  attributeNames: Array<Scalars["String"]["input"]>;
  size?: Scalars["Int"]["input"];
};

/** A company with offers for a given part */
export type SupPartSeller = {
  __typename?: "SupPartSeller";
  /** Cache ID */
  _cacheId: Scalars["String"]["output"];
  /** The distributor */
  company: SupCompany;
  /** Distributor's country */
  country?: Maybe<Scalars["String"]["output"]>;
  /** True if the distributor is an authorized distributor for this manufacturer.  See [authorized](https://octopart.com/authorized) for more information. */
  isAuthorized: Scalars["Boolean"]["output"];
  /** True if the distributor is a Non-Authorized Dealer.  See [authorized](https://octopart.com/authorized) for more information. */
  isBroker: Scalars["Boolean"]["output"];
  /** True if you can request a quote from this seller. */
  isRfq: Scalars["Boolean"]["output"];
  /**
   * List of offers.  Multiple offers may exist in different packaging.
   * While multiple geo-targeted offers may exist, currently the API only exposes one geo-targeted offer at a time based on `country` parameter.
   * Please contact us if you have a need to see all geo-targeted offer variants.
   */
  offers: Array<SupOffer>;
  /** List of countries the seller ships to. An empty list represents zero shipping restrictions. */
  shipsToCountries: Array<SupCountry>;
};

/**
 * A Part can be a member of a PartSeries, which represents a product line or "family" of parts from the manufacturer.
 *
 * See [series](https://octopart.com/series) page for examples.
 */
export type SupPartSeries = {
  __typename?: "SupPartSeries";
  /** Octopart internal ID for this series */
  id: Scalars["ID"]["output"];
  /** Name of the part series */
  name: Scalars["String"]["output"];
  /** Octopart URL for this series, specific to the parent part */
  url: Scalars["String"]["output"];
};

export enum SupPlanTier {
  Basic = "BASIC",
  Enterprise = "ENTERPRISE",
  Free = "FREE",
  Pro = "PRO",
}

/** Price in a specific currency + quantity.  By supplying a `currency` parameter the API will populate an estimated convertedPrice in the user's desired currency. */
export type SupPricePoint = {
  __typename?: "SupPricePoint";
  /** Cache ID */
  _cacheId: Scalars["String"]["output"];
  /** The exchange rate used to calculate convertedPrice */
  conversionRate: Scalars["Float"]["output"];
  /** Currency for `convertedPrice`.  Will match value of `currency` argument. */
  convertedCurrency: Scalars["String"]["output"];
  /**
   * Price converted to user's currency using foreign exchange rates.
   *
   * Since this is an estimate, an indicator should be shown to user if currency != convertedCurrency.
   */
  convertedPrice: Scalars["Float"]["output"];
  /** Currency for price */
  currency: Scalars["String"]["output"];
  /** Price in currency */
  price: Scalars["Float"]["output"];
  /** Minimum purchase quantity to get this price (aka price break) */
  quantity: Scalars["Int"]["output"];
};

export type SupReferenceDesign = {
  __typename?: "SupReferenceDesign";
  name: Scalars["String"]["output"];
  url: Scalars["String"]["output"];
};

export enum SupRole {
  Cadmodels = "CADMODELS",
  Distributor = "DISTRIBUTOR",
  Internal = "INTERNAL",
  Nexarinternal = "NEXARINTERNAL",
}

export enum SupSortDirection {
  Asc = "asc",
  Desc = "desc",
}

/** Represents a specific value of an Attribute for a given Part */
export type SupSpec = {
  __typename?: "SupSpec";
  attribute: SupAttribute;
  /** The formatted display value */
  displayValue: Scalars["String"]["output"];
  /** The value of the spec in SI base units */
  siValue: Scalars["String"]["output"];
  /** The units of the value */
  units: Scalars["String"]["output"];
  /** The short name of the units */
  unitsName: Scalars["String"]["output"];
  /** The symbol of the units */
  unitsSymbol: Scalars["String"]["output"];
  /** The actual value */
  value: Scalars["String"]["output"];
  /** The type of the value */
  valueType: Scalars["String"]["output"];
};

export type SupSpecAgg = {
  __typename?: "SupSpecAgg";
  attribute: SupAttribute;
  buckets: Array<SupSpecBucket>;
  /** displayMax is the formatted string of max */
  displayMax?: Maybe<Scalars["String"]["output"]>;
  /** displayMin is the formatted string of min */
  displayMin?: Maybe<Scalars["String"]["output"]>;
  /** max is the greatest spec value in this result set for numerical attributes */
  max?: Maybe<Scalars["Float"]["output"]>;
  /** min is the lowest spec value in this result set for numerical attributes */
  min?: Maybe<Scalars["Float"]["output"]>;
  /** The max value in SI base units */
  siMax?: Maybe<Scalars["String"]["output"]>;
  /** The min value in SI base units */
  siMin?: Maybe<Scalars["String"]["output"]>;
  /** The units of the spec */
  units?: Maybe<Scalars["String"]["output"]>;
  /** The short name of the units */
  unitsName?: Maybe<Scalars["String"]["output"]>;
  /** The symbol of the units */
  unitsSymbol?: Maybe<Scalars["String"]["output"]>;
  /** The type of the value */
  valueType: Scalars["String"]["output"];
};

export type SupSpecBucket = {
  __typename?: "SupSpecBucket";
  /** count will be null if aggregation timed out */
  count?: Maybe<Scalars["Int"]["output"]>;
  /** displayValue is the string value. For numerical attributes it is the formatted version of floatValue */
  displayValue: Scalars["String"]["output"];
  /** floatValue is populated if the attribute is numeric */
  floatValue?: Maybe<Scalars["Float"]["output"]>;
};

export type SupSpellingCorrection = {
  __typename?: "SupSpellingCorrection";
  correctionString: Scalars["String"]["output"];
  hits: Scalars["Int"]["output"];
};

/** Part identified by manufacturer as being a companion part, for instance a mated connector pair. */
export type SupSponsoredPart = {
  __typename?: "SupSponsoredPart";
  /** Cache ID */
  _cacheId: Scalars["String"]["output"];
  /** Related part */
  part: SupPart;
  /** @deprecated use part.id instead */
  ppid: Scalars["ID"]["output"];
  /** @deprecated unused */
  sourceId: Scalars["ID"]["output"];
  /** URL to visit for related part */
  url: Scalars["String"]["output"];
};

/** Suggests a query based on partial query input.  Used for autocomplete / typeahead UIs. */
export type SupSuggestion = {
  __typename?: "SupSuggestion";
  /** If the suggestion should also apply a categoryId filter, this is the Category ID */
  inCategoryId: Scalars["String"]["output"];
  /** If the suggestion should also apply a categoryId filter, this is the category name */
  inCategoryName: Scalars["String"]["output"];
  /** Suggested text of longer query */
  text: Scalars["String"]["output"];
};

export type SupUnionPayload = SupErrorPayload | SupPartExtras;

export type SpecAttributesQueryVariables = Exact<{
  search: Scalars["String"]["input"];
}>;

export type SpecAttributesQuery = {
  __typename?: "Query";
  supSearchMpn: {
    __typename?: "SupPartResultSet";
    hits: number;
    results?: Array<{
      __typename?: "SupPartResult";
      part: {
        __typename?: "SupPart";
        name: string;
        bestDatasheet?: {
          __typename?: "SupDocument";
          name: string;
          url: string;
        } | null;
        manufacturer: { __typename?: "SupCompany"; name: string };
        bestImage?: { __typename?: "SupImage"; url: string } | null;
        descriptions: Array<{ __typename?: "SupDescription"; text: string }>;
        sellers: Array<{
          __typename?: "SupPartSeller";
          country?: string | null;
          company: { __typename?: "SupCompany"; name: string };
        }>;
        specs: Array<{
          __typename?: "SupSpec";
          displayValue: string;
          attribute: { __typename?: "SupAttribute"; name: string };
        }>;
        medianPrice1000?: {
          __typename?: "SupPricePoint";
          convertedPrice: number;
          convertedCurrency: string;
          currency: string;
        } | null;
      };
    }> | null;
  };
};

export const SpecAttributesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "specAttributes" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "search" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "supSearchMpn" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "q" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "search" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "filters" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "case_package" },
                      value: {
                        kind: "ListValue",
                        values: [
                          { kind: "StringValue", value: "DIP", block: false },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: { kind: "IntValue", value: "1" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "country" },
                value: { kind: "StringValue", value: "DE", block: false },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "currency" },
                value: { kind: "StringValue", value: "EUR", block: false },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "inStockOnly" },
                value: { kind: "BooleanValue", value: true },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "hits" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "results" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "part" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "bestDatasheet" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "url" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "manufacturer" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "bestImage" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "url" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "descriptions" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "text" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "sellers" },
                              arguments: [
                                {
                                  kind: "Argument",
                                  name: {
                                    kind: "Name",
                                    value: "includeBrokers",
                                  },
                                  value: { kind: "BooleanValue", value: false },
                                },
                                {
                                  kind: "Argument",
                                  name: {
                                    kind: "Name",
                                    value: "authorizedOnly",
                                  },
                                  value: { kind: "BooleanValue", value: true },
                                },
                              ],
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "company" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "name" },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "country" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "specs" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "attribute" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "name" },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "displayValue",
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "medianPrice1000" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "convertedPrice",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "convertedCurrency",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "currency" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SpecAttributesQuery, SpecAttributesQueryVariables>;
