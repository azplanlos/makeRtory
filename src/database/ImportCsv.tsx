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
  if (files !== null && files.length === 2) {
    [...files].forEach((file) => {
      console.log("parsing " + file.name);
      Papa.parse<CsvElectronicItem, File>(files[0], {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: (header, index) => {
          return camelCase(header);
        },
        step: (result, parser) => {
          parser.pause();
          if (
            result.data.partNumber !== undefined &&
            result.data.partNumber !== null
          ) {
            add({
              partNumber: result.data.partNumber,
              title: result.data.title,
              manufactorer: result.data.manufactorer,
              price: result.data.price,
              stock: result.data.stock,
              storage: result.data.storage,
              datasheetUrl: result.data.datasheetUrl,
              packageFormat: result.data.packageFormat,
              value: result.data.value,
            }).then(
              (event) => {
                console.log("ID Generated: ", event);
                parser.resume();
              },
              (error) => {
                console.log(error);
                parser.abort();
              },
            );
            console.log(result.data);
          } else if (result.data.box !== undefined) {
            addStorage({
              box: result.data.box,
              boxName: result.data.boxName,
              shortName: result.data.shortName,
              row: result.data.row,
              col: result.data.col,
            }).then(
              (event) => {
                console.log("ID Generated: ", event);
                parser.resume();
              },
              (error) => {
                console.log(error);
                parser.abort();
              },
            );
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
      <IconButton onClick={() => fileUp?.click()} disabled={props.disabled}>
        <CloudUploadIcon />
        <VisuallyHiddenInput
          type="file"
          multiple
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
