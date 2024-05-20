import QRCode from "react-qr-code";
import { StorageItem } from "./ElectronicItem";
import { Grid } from "@mui/material";
import { generateShortName } from "../StorageView/AddDialog";

type StorageProps = Readonly<{
  storage: StorageItem;
  storages: StorageItem[];
}>;

export const unassignedStorage = {
  box: -1,
  row: 1,
  col: 1,
  boxName: "Unbekannter Lagerort",
  shortName: generateShortName("Unbekannter Lagerort", 1, 1),
} as StorageItem;

export default function StorageComponent(props: StorageProps) {
  const storage =
    props.storages.find(
      (strg) =>
        strg.box === props.storage.box &&
        strg.row === props.storage.row &&
        strg.col === props.storage.col,
    ) || unassignedStorage;
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <QRCode
          value={
            storage.box.toString() +
            "." +
            storage.row.toString() +
            "." +
            storage.col.toString()
          }
          size={20}
        ></QRCode>
      </Grid>
      <Grid item xs={5}>
        {storage.shortName}
      </Grid>
    </Grid>
  );
}
