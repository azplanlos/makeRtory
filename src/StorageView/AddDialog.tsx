import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { StorageItem } from "../model/ElectronicItem";
import { NestedStorageItem } from "./StorageOverview";

type AddDialogProps = {
  entry?: NestedStorageItem | null;
  setAddEntry: (item: NestedStorageItem | null) => void;
  onAddEntry: (item: StorageItem) => void;
};

export function generateShortName(
  boxName: string,
  row: number,
  col: number,
): string {
  return `${boxName
    .split(" ")
    .map((nm) => nm.charAt(0).toUpperCase())
    .join("")}${row.toString()}.${col.toString()}`;
}

export default function AddDialog(props: AddDialogProps) {
  const [row, setRow] = useState(1);
  const [col, setCol] = useState(1);

  useEffect(() => {
    setRow(
      (props.entry?.children.reduce(
        (maxRow, child) => (child.row > maxRow ? child.row : maxRow),
        1,
      ) || 0) + 1,
    );
    setCol(1);
  }, [props.entry]);

  return (
    <Dialog open={props.entry !== null} onClose={() => props.setAddEntry(null)}>
      <DialogTitle id="alert-dialog-title">
        {`Fach zu '${props.entry?.boxName}' hinzufügen`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Bitte wähle Reihe und Spalte für das neue Fach aus:
        </DialogContentText>
        <p></p>
        <Grid container>
          <Grid item xs={6}>
            <FormControl sx={{ m: 1, minWidth: 120 }} style={{ flex: 1 }}>
              <InputLabel id="row-select-label">Reihe</InputLabel>
              <Select
                id="row-select"
                labelId="row-select-label"
                value={row}
                label="Reihe"
                onChange={(event) => {
                  setRow(event.target.value as number);
                }}
              >
                {Array.from(Array(99).keys()).map((num) => (
                  <MenuItem
                    value={num + 1}
                    key={`row${num}`}
                    disabled={
                      props.entry?.children.find(
                        (child) => child.row === num + 1 && child.col === col,
                      ) !== undefined
                    }
                  >
                    {num + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl sx={{ m: 1, minWidth: 120 }} style={{ flex: 1 }}>
              <InputLabel id="col-select-label">Spalte</InputLabel>
              <Select
                id="col-select"
                labelId="col-select-label"
                value={col}
                label="Spalte"
                onChange={(event) => {
                  setCol(event.target.value as number);
                }}
              >
                {Array.from(Array(99).keys()).map((num) => (
                  <MenuItem
                    value={num + 1}
                    key={`col${num}`}
                    disabled={
                      props.entry?.children.find(
                        (child) => child.row === row && child.col === num + 1,
                      ) !== undefined
                    }
                  >
                    {num + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.setAddEntry(null)}>Abbrechen</Button>
        <Button
          onClick={() => {
            props.setAddEntry(null);
            const entry = { ...props.entry } as NestedStorageItem;
            entry.shortName = generateShortName(
              entry.boxName || "unbekannte Box",
              row,
              col,
            );
            entry.row = row;
            entry.col = col;
            entry.children = [];
            console.log(entry);
            props.onAddEntry(entry as StorageItem);
          }}
          autoFocus
        >
          Hinzufügen
        </Button>
      </DialogActions>
    </Dialog>
  );
}
