import QRCode from "react-qr-code";
import { StorageItem } from "./ElectronicItem";
import React from 'react';
import { Grid, Paper, Stack } from "@mui/material";

type StorageProps = Readonly<{storage: StorageItem;}>;

export default function StorageComponent(props: StorageProps) {
  return <Grid container spacing={2}>
    <Grid item xs={3}>
      <QRCode value={props.storage.box.toString() + "." + props.storage.row.toString() + "." + props.storage.col.toString()} size={20}></QRCode>
    </Grid>
    <Grid item xs={5}>{props.storage.shortName}</Grid>
    </Grid>;
}