import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { Button, IconButton, Input, styled } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ElectronicItem, StorageItem } from "../model/ElectronicItem";
import { camelCase } from "change-case";
import { useIndexedDB } from "react-indexed-db-hook";
import { CloudDownload } from "@mui/icons-material";
import { Pages } from "../pages";

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

function exportCsv(getAll: () => Promise<ElectronicItem[]>) {
  console.log("exporting");
  getAll().then((data) => {
    const text = Papa.unparse<ElectronicItem>(
      data.sort((a, b) =>
        (a.partNumber ?? "").localeCompare(b.partNumber ?? ""),
      ),
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
