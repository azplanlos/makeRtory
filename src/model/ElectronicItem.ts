export type ElectronicItem = {
  title?: string;
  partNumber?: string;
  packageFormat?: string;
  value?: string;
  stock: number;
  storage?: StorageItem;
  manufactorer?: string;
  price?: number;
  datasheetUrl?: string;
  image?: Blob;
  imageUrl?: string;
  attributes?: Map<string, string>;
  description?: string;
  tags?: string[];
};

export type StorageItem = {
  id?: number;
  box: number;
  boxName?: string;
  shortName: string;
  row: number;
  col: number;
};

export function isElectronicItem(
  item: ElectronicItem | StorageItem,
): item is ElectronicItem {
  return (
    "partNumber" in item &&
    item.partNumber !== undefined &&
    item.partNumber.length > 0
  );
}
