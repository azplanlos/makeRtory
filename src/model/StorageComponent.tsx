import QRCode from "react-qr-code";
import { StorageItem } from "./ElectronicItem";
import React from 'react';

type StorageProps = Readonly<{storage: StorageItem;}>;

export default function StorageComponent(props: StorageProps) {
  return <><QRCode value={props.storage.box.toString()} size={20}></QRCode></>;
}