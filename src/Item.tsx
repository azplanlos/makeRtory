import React, { InputHTMLAttributes, Ref, useState } from 'react';
import { ElectronicItem, StorageItem } from './model/ElectronicItem';
import { TableRow, TableCell, Button, Input, TextField, InputAdornment, Select, Menu, MenuItem, IconButton } from '@mui/material';
import { TextSnippet } from '@mui/icons-material';
import StorageComponent from './model/StorageComponent';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

export type ElectronicItemProps = {
  item: ElectronicItem;
  selected?: boolean;
  setSel?: (val: string) => void;
  edit?: boolean;
  setItem?: (item: ElectronicItem) => void;
  deleteItem?: (item: ElectronicItem) => void;
  storages: StorageItem[];
}

function saveItem(item: ElectronicItem, setItem?: (item: ElectronicItem) => void) {
  if (setItem !== undefined) {
    setItem(item);
  }
}

function deleteItem(item: ElectronicItem, delItem?: (item: ElectronicItem) => void) {
  if (delItem !== undefined) {
    delItem(item);
  }
}

export default function ItemRowOverview(item: ElectronicItemProps) {
  const [title, setTitle] = useState(item.item.title || "");
  const [partNo, setPartNo] = useState(item.item.partNumber || "");
  const [manufactorer, setManufactorer] = useState(item.item.manufactorer || "");
  const [stock, setStock] = useState(item.item.stock || 0);
  const [stor, setStor] = useState(item.item.storage || {box: 1, shortName: "Box", row: 1, col: 1} as StorageItem);
  const [price, setPrice] = useState(item.item.price || 0);

  const button = item.item?.datasheetUrl ? 
    <Button variant="contained" onClick={(e) => window.location.href = item.item?.datasheetUrl || ""}
      startIcon={<TextSnippet />}>Datenblatt</Button> :
    "";
  const buttonSave = <IconButton onClick={(e) => {
    if (item.item) saveItem({title: title, partNumber: partNo, manufactorer: manufactorer, stock: stock, storage: stor, price: price} as ElectronicItem, item.setItem)}}><SaveIcon /></IconButton>
  const buttonDelete = <IconButton onClick={(e) => {
    if (item.item) deleteItem(item.item, item.deleteItem);
  }}><DeleteIcon /></IconButton>
  const storage = item.item?.storage != undefined ? <StorageComponent storage={item.item?.storage} /> : "";
  return <TableRow
    key={item.item?.partNumber !== undefined ? item.item.partNumber : 'newItem'}
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    selected={item.selected}
    onClick={(e) => {if (item.setSel !== undefined) item.setSel(item.item?.partNumber || "");}}
  >
    <TableCell component="th" scope="row">
      {item.edit !== true ? item.item?.title : <TextField
          label="Teil"
          id="name"
          size="small"
          variant="standard"
          value={title}
          onChange={(event) => {
              setTitle(event.target.value);
          }
        }
        inputRef={(input) => {
          if(input != null) {
             input.focus();
          }
        }}
        />}
    </TableCell>
    <TableCell>{item.edit !== true ? item.item?.partNumber : <TextField
          label="Teilenummer"
          id="part"
          size="small"
          variant="standard"
          value={partNo}
          onChange={(event) => {
            setPartNo(event.target.value);
          }}
          key="PartNumberInput"
        />}</TableCell>
    <TableCell>{item.edit !== true ? item.item?.manufactorer : <TextField
          label="Hersteller"
          id="manufactorer"
          size="small"
          variant="standard"
          value={manufactorer}
          onChange={(event) => {
              setManufactorer(event.target.value);
          }}
        />}</TableCell>
    <TableCell align="right">{item.edit !== true ? item.item?.stock : <TextField
          label="Bestand"
          id="count"
          size="small"
          variant="standard"
          value={stock}
          onChange={(event) => {
            setStock(parseInt(event.target.value));
          }}
        />}</TableCell>
    <TableCell>{item.edit !== true ? storage : <Select
          label="Lager"
          id="storage"
          size="small"
          variant="standard"
          value={stor.box + "." + stor.row + "." + stor.col}>
        <MenuItem></MenuItem>
      </Select>}</TableCell>
    <TableCell align="right">{item.edit !== true ? (item.item?.price !== undefined ? item.item?.price?.toFixed(2) : '0.00') + ' EUR' : <TextField
          label="Preis"
          id="price"
          size="small"
          variant="standard"
          InputProps={{
            endAdornment: <InputAdornment position="end">EUR</InputAdornment>,
          }}
          value={price}
          onChange={(event) => {
            setPrice(parseFloat(event.target.value));
          }}
        />}</TableCell>
    <TableCell>{button}</TableCell><TableCell>{item.edit ? buttonSave : buttonDelete} </TableCell>
  </TableRow>
}