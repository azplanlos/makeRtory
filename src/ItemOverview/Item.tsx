import React, { InputHTMLAttributes, Ref, useState } from "react";
import { ElectronicItem, StorageItem } from "../model/ElectronicItem";
import {
  TableRow,
  TableCell,
  Button,
  Input,
  TextField,
  InputAdornment,
  Select,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { PropaneSharp, TextSnippet } from "@mui/icons-material";
import StorageComponent from "../model/StorageComponent";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CurrencyTextField from "@puhl/mui-currency-textfield";
import DeleteDialog from "./DeleteDialog";

export type ElectronicItemProps = {
  item: ElectronicItem;
  selected?: boolean;
  setSel?: (val: string) => void;
  edit?: boolean;
  setEditItem?: (partNo: string) => void;
  setItem?: (item: ElectronicItem, originalPartNumber?: string) => void;
  deleteItem?: (item: ElectronicItem) => void;
  storages: StorageItem[];
};

function deleteItem(
  item: ElectronicItem,
  delItem?: (item: ElectronicItem) => void,
) {
  if (delItem !== undefined) {
    delItem(item);
  }
}

export default function ItemRowOverview(item: ElectronicItemProps) {
  const [title, setTitle] = useState(item.item.title || "");
  const [partNo, setPartNo] = useState(item.item.partNumber || "");
  const [manufactorer, setManufactorer] = useState(
    item.item.manufactorer || "",
  );
  const [stock, setStock] = useState(item.item.stock || 0);
  const [stor, setStor] = useState(
    item.item.storage ||
      ({ box: 1, shortName: "Box", row: 1, col: 1 } as StorageItem),
  );
  const [price, setPrice] = useState(item.item.price || 0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const saveItem = (newItem: ElectronicItem) => {
    if (item.setItem !== undefined) {
      item.setItem(newItem, item.item.partNumber);
    }
  };

  const button = item.item?.datasheetUrl ? (
    <Button
      variant="contained"
      onClick={(e) => (window.location.href = item.item?.datasheetUrl || "")}
      startIcon={<TextSnippet />}
    >
      Datenblatt
    </Button>
  ) : (
    ""
  );
  const buttonSave = (
    <IconButton
      onClick={(e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        if (item.item) {
          const newItem = {
            ...item.item,
            title: title,
            partNumber: partNo,
            manufactorer: manufactorer,
            stock: stock,
            storage: stor,
            price: price,
          } as ElectronicItem;
          saveItem(newItem);
        }
      }}
    >
      <SaveIcon />
    </IconButton>
  );
  const buttonDelete = (
    <>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
          setDeleteDialogOpen(true);
        }}
      >
        <DeleteIcon />
      </IconButton>
      <DeleteDialog
        itemName={item.item.title || item.item.partNumber!!}
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onDelete={() => {
          if (item.item) deleteItem(item.item, item.deleteItem);
          if (item.setSel) item.setSel("");
        }}
      />
    </>
  );
  const buttonEdit = (
    <IconButton
      onClick={(e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        if (item.setSel) item.setSel("");
        if (item.setEditItem && item.item.partNumber !== undefined)
          item.setEditItem(item.item.partNumber);
      }}
    >
      <ModeEditIcon />
    </IconButton>
  );
  const storage =
    item.item?.storage != undefined ? (
      <StorageComponent storage={item.item?.storage} />
    ) : (
      ""
    );
  return (
    <TableRow
      key={
        item.item?.partNumber !== undefined ? item.item.partNumber : "newItem"
      }
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      selected={item.selected}
      onClick={(e) => {
        if (item.setSel !== undefined && !item.edit)
          item.setSel(item.item?.partNumber || "");
      }}
    >
      <TableCell component="th" scope="row">
        {item.edit !== true ? (
          item.item?.title
        ) : (
          <TextField
            label="Teil"
            id="name"
            size="small"
            variant="standard"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            inputRef={(input) => {
              if (
                input != null &&
                title === "" &&
                partNo === "" &&
                manufactorer === ""
              ) {
                input.focus();
              }
            }}
          />
        )}
      </TableCell>
      <TableCell>
        {item.edit !== true ? (
          item.item?.partNumber
        ) : (
          <TextField
            label="Teilenummer"
            id="part"
            size="small"
            variant="standard"
            value={partNo}
            onChange={(event) => {
              setPartNo(event.target.value);
            }}
            key="PartNumberInput"
          />
        )}
      </TableCell>
      <TableCell>
        {item.edit !== true ? (
          item.item?.manufactorer
        ) : (
          <TextField
            label="Hersteller"
            id="manufactorer"
            size="small"
            variant="standard"
            value={manufactorer}
            onChange={(event) => {
              setManufactorer(event.target.value);
            }}
          />
        )}
      </TableCell>
      <TableCell align="right">
        {item.edit !== true ? (
          item.item?.stock
        ) : (
          <TextField
            label="Bestand"
            id="count"
            size="small"
            variant="standard"
            value={stock}
            onChange={(event) => {
              setStock(parseInt(event.target.value));
            }}
          />
        )}
      </TableCell>
      <TableCell>
        {item.edit !== true ? (
          storage
        ) : (
          <Select
            label="Lager"
            id="storage"
            size="small"
            variant="standard"
            value={stor.box + "." + stor.row + "." + stor.col}
            onChange={(e) => {
              const [box, row, col] = e.target.value.split('.');
              const assignedStorage = item.storages.find(strg => strg.box === parseInt(box) && strg.row === parseInt(row) && strg.col === parseInt(col));
              if (assignedStorage) setStor(assignedStorage);
              console.log(assignedStorage);
            }}
          >
            { item.storages
            .sort((a, b) => a.box === b.box ? (a.row === b.row ? a.col - b.col : a.row - b.row) : a.box - b.box)
            .map(strg => <MenuItem value={`${strg.box}.${strg.row}.${strg.col}`}>{`${strg.boxName} (Fach ${strg.row}/${strg.col})`}</MenuItem>) }
          </Select>
        )}
      </TableCell>
      <TableCell align="right">
        {item.edit !== true ? (
          (item.item?.price !== undefined
            ? item.item?.price?.toFixed(2)
            : "0.00") + " EUR"
        ) : (
          <CurrencyTextField
            label="Preis"
            variant="standard"
            value={price}
            currencySymbol="€"
            //minimumValue="0"
            outputFormat="number"
            decimalCharacter=","
            digitGroupSeparator="."
            onChange={(event: Event, value: number) => {
              setPrice(value);
            }}
          />
        )}
      </TableCell>
      <TableCell>{button}</TableCell>
      <TableCell>
        {item.edit ? (
          buttonSave
        ) : (
          <>
            {buttonDelete}
            {buttonEdit}
          </>
        )}{" "}
      </TableCell>
    </TableRow>
  );
}
