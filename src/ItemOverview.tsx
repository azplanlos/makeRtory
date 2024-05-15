import React, { useEffect, useState } from "react";
import { Grid, TableContainer, Paper, Table, TableHead, TableRow, TableBody } from "@mui/material";
import ItemRowOverview from "./Item";
import { useIndexedDB } from "react-indexed-db-hook";
import ItemDetailCard from "./ItemDetailCard";
import { ElectronicItem, StorageItem } from "./model/ElectronicItem";
import { styledHeaderCell } from "./StyledHeaderCell";

type ItemOverviewProps = {
    parts?: ElectronicItem[];
    setParts: (parts: ElectronicItem[]) => void;
    selectedItem: string;
    setSelectedItem: (item: string) => void;
    searchString: string;
    showAddRow: boolean;
    storages: StorageItem[];
}

export default function ItemOverview(props: ItemOverviewProps) {
    const { getAll, deleteRecord } = useIndexedDB("parts");
    var [editedItem, setEditedItem] = useState<string>("");

    let emptyItem: ElectronicItem = {
        partNumber: '',
        stock: 0,
        price: 0.00
      }

    useEffect(() => {
        getAll().then((partsFromDB) => {
          return props.setParts(partsFromDB);
        });
      }, []);

    const deleteItem = (item: ElectronicItem) => {
        if (item.partNumber) {
            deleteRecord(item.partNumber);
            props.setParts(props.parts?.filter(part => part.partNumber !== item.partNumber) || []);
            props.setSelectedItem("");
        }
    }

    const detail = (props.selectedItem !== "") ? <Grid item xs={4}><ItemDetailCard item={props.parts?.filter((p) => p.partNumber === props.selectedItem)[0]} setItem={(item) => updateItem(item, props.parts, props.setParts)} /></Grid> : ""

    return <Grid container>
    <Grid item xs={props.selectedItem === "" ? 12: 8} height="100%">
  <TableContainer component={Paper} style={{marginBottom: "1%", height: "90%"}}>
    <Table sx={{ minWidth: 650, height: "100%" }} aria-label="simple table" stickyHeader style={{overflow: "scroll"}}>
      <TableHead style={{fontWeight: "bolder"}}>
        <TableRow>
          { styledHeaderCell("Teil", props.selectedItem) }
          { styledHeaderCell("Teilenummer", props.selectedItem) }
          { styledHeaderCell("Hersteller", props.selectedItem) }
          { styledHeaderCell("Bestand", props.selectedItem, "right") }
          { styledHeaderCell("Lager", props.selectedItem) }
          { styledHeaderCell("Preis/Stück", props.selectedItem, "right") }
          { styledHeaderCell("Datenblatt", props.selectedItem) }
          { styledHeaderCell("Aktion", props.selectedItem) }
        </TableRow>
      </TableHead>
      <TableBody>
        {props.parts?.filter((part) => part.partNumber?.toUpperCase()?.includes(props.searchString.toUpperCase()) ||
          part.title?.toUpperCase()?.includes(props.searchString.toUpperCase()) || 
          part.manufactorer?.toUpperCase()?.includes(props.searchString.toUpperCase())
        )?.map((part) => (
          <ItemRowOverview
            item={part}
            key={part.partNumber}
            selected={props.selectedItem === part.partNumber}
            setSel={props.setSelectedItem}
            deleteItem={(item) => deleteItem(item)}
            edit={editedItem === part.partNumber && part.partNumber !== '' && part.partNumber !== undefined}
            storages={props.storages}
          ></ItemRowOverview>
        ))}
        {editedItem === '' && props.showAddRow === true ? <ItemRowOverview edit={true} key="edit" item={emptyItem} setItem={(item) => updateItem(item, props.parts, props.setParts, setEditedItem)} storages={props.storages}/> : <></> }
      </TableBody>
    </Table>
  </TableContainer>
  </Grid>
  { detail }
  </Grid>
}

function updateItem(item: ElectronicItem, items: ElectronicItem[] | undefined, setItems: (items: ElectronicItem[]) => void, setEditedItem?: (item: string) => void): void {
    var newItems = items?.filter((eitem) => eitem.partNumber !== item.partNumber);
    if (newItems === undefined) {
      newItems = [];
    }
    newItems.push(item);
    console.log("new item: " + item.partNumber);
    setItems(newItems.sort((a, b) => (a.partNumber ?? '').localeCompare(b.partNumber ?? '')));
    if (setEditedItem !== undefined) setEditedItem(item.partNumber || '');
  }