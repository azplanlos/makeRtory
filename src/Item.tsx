import React, { useState } from 'react';
import { ElectronicItem, StorageItem } from './model/ElectronicItem';
import { TableRow, TableCell, Button } from '@mui/material';
import { TextSnippet } from '@mui/icons-material';
import StorageComponent from './model/StorageComponent';

export type ElectronicItemProps = {
  item?: ElectronicItem
  selected: boolean
  setSel: (val: string) => void
}

export default function ItemRowOverview(item: ElectronicItemProps) {
  const button = item.item?.datasheetUrl ? 
    <Button variant="contained" onClick={(e) => window.location.href = item.item?.datasheetUrl || ""}
      startIcon={<TextSnippet />}>Datenblatt</Button> :
    "";
  const storage = item.item?.storage != undefined ? <StorageComponent storage={item.item?.storage} /> : "";
  return <TableRow
    key={item.item?.title}
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    selected={item.selected}
    onClick={(e) => {item.setSel(item.item?.partNumber || "");}}
  >
    <TableCell component="th" scope="row">
      {item.item?.title}
    </TableCell>
    <TableCell>{item.item?.partNumber}</TableCell>
    <TableCell>{item.item?.manufactorer}</TableCell>
    <TableCell align="right">{item.item?.stock}</TableCell>
    <TableCell>{storage}</TableCell>
    <TableCell align="right">{item.item?.price?.toFixed(2)} EUR</TableCell>
    <TableCell>{button}</TableCell>
  </TableRow>
}