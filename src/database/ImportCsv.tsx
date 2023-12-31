import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { Button, styled } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ElectronicItem } from "../model/ElectronicItem";
import { camelCase } from "change-case";
import { useIndexedDB } from "react-indexed-db-hook";

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
  update: (parts: ElectronicItem[]) => void,
  getAll: () => Promise<ElectronicItem[]>
) {
  if (files !== null) {
    [...files].forEach((file) => {
      console.log("parsing " + file.name);
      Papa.parse<ElectronicItem, File>(files[0], {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: (header, index) => {
          return camelCase(header);
        },
        step: (result) => {
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
              value: result.data.value
            }).then(
              (event) => {
                console.log("ID Generated: ", event);
              },
              (error) => {
                console.log(error);
              }
            );
            console.log(result.data);
          }
        },
        complete: function (results) {
          console.log("finished.");
          getAll().then((partsFromDB) => {
            return update(partsFromDB);
          });
        },
      });
    });
  }
}

export type ImportCsvProps = {
  update: (parts: ElectronicItem[]) => void;
  getAll: () => Promise<ElectronicItem[]>;
};

export default function ImportCsv(props: ImportCsvProps) {
  const [file, setFile] = useState();
  const { add, clear } = useIndexedDB("parts");
  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
    >
      Upload file
      <VisuallyHiddenInput
        type="file"
        onChange={(e) => {
          clear();
          parseCsv(e.target.files, add, props.update, props.getAll);
          e.target.value = "";
        }}
      />
    </Button>
  );
}
