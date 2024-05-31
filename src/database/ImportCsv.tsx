import Papa from "papaparse";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  styled,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ElectronicItem, StorageItem } from "../model/ElectronicItem";
import { camelCase } from "change-case";
import { useIndexedDB } from "react-indexed-db-hook";
import { useState } from "react";
import { CsvElectronicItem } from "./ExportCsv";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function parseCsv(
  files: FileList | null,
  add: (value: any, key?: any) => Promise<number>,
  addStorage: (value: any, key?: any) => Promise<number>,
  update: (parts: ElectronicItem[]) => void,
  getAll: () => Promise<ElectronicItem[]>,
  setAlertOpen: (alert: boolean) => void,
) {
  if (files !== null) {
    [...files].forEach((file) => {
      console.log("parsing " + file.name);
      const storages: StorageItem[] = [];
      Papa.parse<CsvElectronicItem, File>(files[0], {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: (header, index) => {
          return camelCase(header);
        },
        step: (result, parser) => {
          if (
            result.data.partNumber !== undefined &&
            result.data.partNumber !== null &&
            result.data.partNumber.length > 0
          ) {
            const [box, row, col] = result.data.storage
              ?.split(".", 3)
              .map((str) => parseInt(str)) || [-1, -1, -1];
            const storage = storages.filter(
              (stor) =>
                stor.box === box && stor.row === row && stor.col === col,
            )[0];
            add({
              partNumber: result.data.partNumber,
              title: result.data.title,
              manufactorer: result.data.manufactorer,
              price: result.data.price,
              stock: result.data.stock,
              storage: storage,
              datasheetUrl: result.data.datasheetUrl,
              packageFormat: result.data.packageFormat,
              value: result.data.value,
              tags: result.data.tags?.split(","),
              imageUrl: result.data.imageUrl,
              attributes: new Map(
                (result.data.attributes || "")
                  .split("|")
                  .map((keyValue) => [
                    keyValue.split("=")[0],
                    keyValue.split("=")[1],
                  ]),
              ),
            } as ElectronicItem).then(
              (event) => {
                console.log("ID Generated for ElectronicItem: ", event);
              },
              (error) => {
                console.log(error);
                parser.abort();
              },
            );
            console.log(result.data);
          } else if (result.data.box !== undefined && result.data.box > 0) {
            const storage = {
              box: result.data.box,
              boxName: result.data.boxName,
              shortName: result.data.shortName,
              row: result.data.row,
              col: result.data.col,
            } as StorageItem;
            storages.push(storage);
            addStorage(storage).then(
              (event) => {
                console.log("ID Generated for Storage: ", event);
              },
              (error) => {
                console.log(error);
                parser.abort();
              },
            );
            console.log(result.data);
          } else {
            console.warn(
              "unsupported line input: " + JSON.stringify(result.data),
            );
            parser.abort();
          }
        },
        complete: function (results) {
          console.log("finished.");
          getAll().then((partsFromDB) => {
            return update(partsFromDB);
          });
        },
        error: (error) => {
          setAlertOpen(true);
        },
      });
    });
  } else {
    setAlertOpen(true);
  }
}

export type ImportCsvProps = {
  update: (parts: ElectronicItem[]) => void;
  getAll: () => Promise<ElectronicItem[]>;
  getAllStorage: () => Promise<StorageItem[]>;
  disabled?: boolean;
};

export default function ImportCsv(props: ImportCsvProps) {
  const { add, clear } = useIndexedDB("parts");
  const addStorage = useIndexedDB("storage").add;
  const clearStorage = useIndexedDB("storage").clear;
  var fileUp: HTMLInputElement | null;
  const [alertOpen, setAlertOpen] = useState(false);

  return (
    <>
      <IconButton
        onClick={() => fileUp?.click()}
        disabled={props.disabled}
        color="inherit"
      >
        <CloudUploadIcon />
        <VisuallyHiddenInput
          type="file"
          accept=".csv"
          onChange={(e) => {
            clear();
            clearStorage();
            parseCsv(
              e.target.files,
              add,
              addStorage,
              props.update,
              props.getAll,
              setAlertOpen,
            );
            e.target.value = "";
          }}
          ref={(fileUpload) => {
            fileUp = fileUpload;
          }}
        />
      </IconButton>
      <Dialog open={alertOpen} onClose={() => setAlertOpen(false)}>
        <DialogTitle>Fehler</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Für einen erfolgreichen import müssen immer jeweils das
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAlertOpen(false)} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
