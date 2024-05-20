import Papa from "papaparse";
import { IconButton } from "@mui/material";
import { ElectronicItem, StorageItem } from "../model/ElectronicItem";
import { CloudDownload } from "@mui/icons-material";
import { Pages } from "../pages";

type CsvElectronicItem = ElectronicItem & {
  storage?: string;
};

function exportCsv(getAll: () => Promise<ElectronicItem[]>) {
  console.log("exporting");
  getAll().then((data) => {
    const text = Papa.unparse<CsvElectronicItem>(
      data
        .map((item) => {
          const { storage, image, ...itemStoreData } = item as ElectronicItem;
          return {
            ...itemStoreData,
            storage: `${item.storage?.box}.${item.storage?.row}.${item.storage?.col}`,
          } as CsvElectronicItem;
        })
        .sort((a, b) => (a.partNumber ?? "").localeCompare(b.partNumber ?? "")),
      {
        header: true,
        skipEmptyLines: true,
      },
    );
    const file = new Blob([text], { type: "text/plain" });
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = "makeRtory.csv";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  });
}

function exportStorageCsv(getAll: () => Promise<StorageItem[]>) {
  console.log("exporting storage");
  getAll().then((data) => {
    const text = Papa.unparse<StorageItem>(
      data.sort((a, b) => (a.boxName ?? "").localeCompare(b.boxName ?? "")),
      {
        header: true,
        skipEmptyLines: true,
      },
    );
    const file = new Blob([text], { type: "text/plain" });
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = "makeRtoryStorage.csv";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  });
}

export type ExportCsvProps = {
  getAll: () => Promise<ElectronicItem[]>;
  getAllStorage: () => Promise<StorageItem[]>;
  exportType: Pages;
  disabled: boolean;
};

export default function ExportCsv(props: ExportCsvProps) {
  return (
    <IconButton
      onClick={() => {
        if (props.exportType === Pages.STORAGE) {
          exportStorageCsv(props.getAllStorage);
        } else {
          exportCsv(props.getAll);
        }
      }}
      disabled={props.disabled}
    >
      <CloudDownload />
    </IconButton>
  );
}
