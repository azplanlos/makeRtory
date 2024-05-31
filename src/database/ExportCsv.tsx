import Papa from "papaparse";
import { IconButton } from "@mui/material";
import {
  ElectronicItem,
  StorageItem,
  isElectronicItem,
} from "../model/ElectronicItem";
import { CloudDownload } from "@mui/icons-material";

export type CsvElectronicItem = ElectronicItem &
  StorageItem & {
    attributes?: string;
    storage?: string;
    tags?: string;
    box?: number;
    shortName?: string;
    row?: number;
    col?: number;
  };

function exportCsv(
  getAll: () => Promise<ElectronicItem[]>,
  getAllStorage: () => Promise<StorageItem[]>,
) {
  console.log("exporting");
  getAll().then((itemData) => {
    getAllStorage().then((storageData) => {
      const text = Papa.unparse<CsvElectronicItem>(
        [...storageData, ...itemData]
          .map((item) => {
            if (isElectronicItem(item)) {
              const { attributes, tags, storage, image, ...itemStoreData } =
                item as ElectronicItem;
              const part = item as ElectronicItem;
              return {
                ...itemStoreData,
                attributes: [...(attributes?.entries() || [])]
                  .map((entry) => `${entry[0]}=${entry[1]}`)
                  .join("|"),
                tags: tags?.join(","),
                storage: `${part.storage?.box}.${part.storage?.row}.${part.storage?.col}`,
              } as CsvElectronicItem;
            } else {
              const { id, ...itemStoreData } = item as StorageItem;
              return {
                ...itemStoreData,
              } as CsvElectronicItem;
            }
          })
          .sort((a, b) =>
            (a.partNumber ?? "").localeCompare(b.partNumber ?? ""),
          ),
        {
          quotes: true,
          header: true,
          skipEmptyLines: true,
          columns: [
            ...new Set(
              [...storageData, ...itemData]
                .flatMap((it) => Object.keys(it))
                .filter((it) => it !== "id"),
            ),
          ],
        },
      );
      const file = new Blob([text], { type: "text/plain" });
      const element = document.createElement("a");
      element.href = URL.createObjectURL(file);
      element.download = "makeRtory.csv";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    });
  });
}

export type ExportCsvProps = {
  getAll: () => Promise<ElectronicItem[]>;
  getAllStorage: () => Promise<StorageItem[]>;
  disabled: boolean;
};

export default function ExportCsv(props: ExportCsvProps) {
  return (
    <IconButton
      onClick={() => exportCsv(props.getAll, props.getAllStorage)}
      disabled={props.disabled}
      color="inherit"
    >
      <CloudDownload />
    </IconButton>
  );
}
