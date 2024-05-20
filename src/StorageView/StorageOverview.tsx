import { useEffect, useState } from "react";
import { StorageItem } from "../model/ElectronicItem";
import {
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  TextField,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import AddIcon from "@mui/icons-material/Add";
import AddDialog, { generateShortName } from "./AddDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { useIndexedDB } from "react-indexed-db-hook";
import DeleteDialog from "../ItemOverview/DeleteDialog";

export type NestedStorageItem = StorageItem & {
  children: NestedStorageItem[];
};

function buildTree(items: StorageItem[]): NestedStorageItem[] {
  const boxes = [...new Set(items.map((item) => item.box))];
  return boxes
    .map((box) => {
      return {
        box: box,
        boxName: items.find((item) => item.box === box)?.boxName,
        shortName: items.find((item) => item.box === box)?.boxName,
        row: -1,
        col: -1,
        children: items
          .filter((item) => item.box === box)
          .sort((a, b) => (a.row !== b.row ? a.row - b.row : a.col - b.col)),
      } as NestedStorageItem;
    })
    .sort((a, b) => a.box - b.box);
}

type StorageOverviewProps = {
  storageItems: StorageItem[];
  addItem: boolean;
  setAddItem: (addItem: boolean) => void;
  setStorageItems: (items: StorageItem[]) => void;
};

export default function StorageOverview(props: StorageOverviewProps) {
  const [openEntries, setOpenEntries] = useState<number[]>([]);
  const [addEntry, setAddEntry] = useState<NestedStorageItem | null>(null);
  const [boxName, setBoxName] = useState("");
  const [deleteItem, setDeleteItem] = useState<NestedStorageItem | null>(null);
  const { add, deleteRecord, getByIndex } = useIndexedDB("storage");

  useEffect(() => {
    setBoxName("");
  }, [props.addItem]);

  const itemEntry = (item: NestedStorageItem) => {
    return (
      <>
        <ListItemButton
          onClick={() => {
            if (openEntries.find((it) => it === item.box)) {
              setOpenEntries(openEntries.filter((it) => it !== item.box));
            } else {
              setOpenEntries([...openEntries, item.box]);
            }
          }}
          key={`${item.box}.${item.row}.${item.col}`}
        >
          <ListItemIcon>
            <Inventory2Icon />
          </ListItemIcon>
          <ListItemText
            primary={
              item.row === -1
                ? item.boxName
                : `${item.boxName} (Fach ${item.row}/${item.col})`
            }
          />
          {!openEntries.find((it) => it === item.box) ? (
            <ExpandLess />
          ) : (
            <ExpandMore />
          )}
        </ListItemButton>
        <Collapse
          in={openEntries.find((it) => it === item.box) === undefined}
          timeout="auto"
          unmountOnExit
        >
          <List component="div" disablePadding>
            {item.children.map((fach) => (
              <ListItem
                sx={{ pl: 4 }}
                secondaryAction={
                  <IconButton
                    onClick={() => setDeleteItem(fach)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemButton>
                  <ListItemIcon>
                    <AllInboxIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${fach.boxName} (Fach ${fach.row}/${fach.col})`}
                  />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItemButton sx={{ pl: 4 }} onClick={() => setAddEntry(item)}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Fach hinzufügen" />
            </ListItemButton>
          </List>
        </Collapse>
      </>
    );
  };

  const treeStorageItems = buildTree(props.storageItems);

  return (
    <>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Lagerplätze
          </ListSubheader>
        }
      >
        {props.addItem && (
          <ListItem
            secondaryAction={
              <IconButton
                onClick={() => {
                  const boxNum =
                    props.storageItems.reduce(
                      (max, entry) => (entry.box > max ? entry.box : max),
                      0,
                    ) + 1;
                  const fach = {
                    box: boxNum,
                    boxName: boxName,
                    shortName: generateShortName(boxName, 1, 1),
                    row: 1,
                    col: 1,
                  } as StorageItem;
                  props.setStorageItems([...props.storageItems, fach]);
                  props.setAddItem(false);
                  add(fach);
                }}
              >
                <SaveIcon />
              </IconButton>
            }
            key="newBox"
          >
            <ListItemIcon>
              <Inventory2Icon />
            </ListItemIcon>
            <TextField
              size="small"
              label="Name der Box"
              autoFocus
              value={boxName}
              onChange={(e) => setBoxName(e.target.value)}
            ></TextField>
          </ListItem>
        )}
        {treeStorageItems.map((item) => itemEntry(item))}
      </List>
      <AddDialog
        entry={addEntry}
        setAddEntry={setAddEntry}
        onAddEntry={(entry) => {
          props.setStorageItems([...props.storageItems, entry]);
          add(entry);
        }}
      />
      <DeleteDialog
        item={deleteItem}
        itemName={`${deleteItem?.boxName} (Fach ${deleteItem?.row}/${deleteItem?.col})` || ""}
        open={deleteItem !== null}
        onClose={() => setDeleteItem(null)}
        onDelete={(item: NestedStorageItem) => {
          props.setStorageItems(props.storageItems.filter((e) => e !== item));
          getByIndex("box", item.box).then((entries: any) => {
            (Array.isArray(entries) ? entries : [entries])
              .filter(
                (entry: any) =>
                  entry.row === item.row && entry.col === item.col,
              )
              .forEach((entry: any) => deleteRecord(entry.id));
          });
        }}
      >
        Dies wird alle Elemente dieses Fachs in den 'unbekannten Lagerort'
        verschieben{props.storageItems.filter(item => item.box === deleteItem?.box).length === 1 ? ` und die Box '${deleteItem?.boxName}' ebenfalls löschen, da diese kein weiteres
        Fach enthält` : ''}.
      </DeleteDialog>
    </>
  );
}
