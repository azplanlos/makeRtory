import React, { useEffect, useState } from "react";
import {
  Grid,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import ItemRowOverview from "./Item";
import { useIndexedDB } from "react-indexed-db-hook";
import ItemDetailCard from "./ItemDetailCard";
import { ElectronicItem, StorageItem } from "../model/ElectronicItem";
import { styledHeaderCell } from "../StyledHeaderCell";

type ItemOverviewProps = {
  parts?: ElectronicItem[];
  setParts: (parts: ElectronicItem[]) => void;
  selectedItem: string;
  setSelectedItem: (item: string) => void;
  searchString: string;
  showAddRow: boolean;
  onCloseEdit: () => void;
  storages: StorageItem[];
};

export default function ItemOverview(props: ItemOverviewProps) {
  const { getAll, deleteRecord, add, getByIndex } = useIndexedDB("parts");
  var [editedItem, setEditedItem] = useState<string>("");

  let emptyItem: ElectronicItem = {
    partNumber: "",
    stock: 0,
    price: 0.0,
  };

  useEffect(() => {
    getAll().then((partsFromDB) => {
      return props.setParts(partsFromDB);
    });
  }, [getAll, props.setParts, props]);

  const deleteItem = (item: ElectronicItem) => {
    if (item.partNumber) {
      props.setParts(
        props.parts?.filter((part) => part.partNumber !== item.partNumber) ||
          [],
      );
      props.setSelectedItem("");
      deleteRecord(item.partNumber);
    }
  };

  const updateItem = (item: ElectronicItem, originalPartNumber?: string) => {
    var newItems = props.parts?.filter(
      (eitem) => eitem.partNumber !== item.partNumber,
    );
    if (newItems === undefined) {
      newItems = [];
    }
    newItems.push(item);
    props.setParts(
      newItems.sort((a, b) =>
        (a.partNumber ?? "").localeCompare(b.partNumber ?? ""),
      ),
    );
    props.onCloseEdit();
    setEditedItem("");
    getByIndex("partNumber", originalPartNumber || item.partNumber!!).then(
      (storedItem) => {
        if (storedItem) deleteRecord(storedItem.partNumber);
        add(item);
      },
      (error) => {
        console.log(error);
        add(item);
      },
    );
  };

  const detail =
    props.selectedItem !== "" && editedItem === "" ? (
      <Grid item xs={4}>
        <ItemDetailCard
          item={
            props.parts?.filter((p) => p.partNumber === props.selectedItem)[0]
          }
          setItem={(item) => updateItem(item, item.partNumber)}
          cardClose={() => props.setSelectedItem("")}
        />
      </Grid>
    ) : (
      ""
    );

  return (
    <Grid container height="100%">
      <Grid item xs={props.selectedItem === "" ? 12 : 8} height="100%">
        <TableContainer
          component={Paper}
          style={{ marginBottom: "1%", height: "100%" }}
        >
          <Table
            sx={{ minWidth: 650, height: "100%" }}
            aria-label="simple table"
            stickyHeader
            style={{ overflow: "scroll" }}
          >
            <TableHead style={{ fontWeight: "bolder" }}>
              <TableRow>
                {styledHeaderCell("Teil", props.selectedItem)}
                {styledHeaderCell("Teilenummer", props.selectedItem)}
                {styledHeaderCell("Hersteller", props.selectedItem)}
                {styledHeaderCell("Bestand", props.selectedItem, "right")}
                {styledHeaderCell("Lager", props.selectedItem)}
                {styledHeaderCell("Preis/Stück", props.selectedItem, "right")}
                {styledHeaderCell("Datenblatt", props.selectedItem)}
                {styledHeaderCell("Aktion", props.selectedItem)}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.parts
                ?.filter(
                  (part) =>
                    part.partNumber
                      ?.toUpperCase()
                      ?.includes(props.searchString.toUpperCase()) ||
                    part.title
                      ?.toUpperCase()
                      ?.includes(props.searchString.toUpperCase()) ||
                    part.manufactorer
                      ?.toUpperCase()
                      ?.includes(props.searchString.toUpperCase()),
                )
                ?.map((part) => (
                  <ItemRowOverview
                    item={part}
                    key={part.partNumber}
                    selected={props.selectedItem === part.partNumber}
                    setSel={props.setSelectedItem}
                    deleteItem={(item) => deleteItem(item)}
                    edit={
                      editedItem === part.partNumber &&
                      part.partNumber !== "" &&
                      part.partNumber !== undefined
                    }
                    setEditItem={setEditedItem}
                    storages={props.storages}
                    setItem={updateItem}
                  ></ItemRowOverview>
                ))}
              {editedItem === "" && props.showAddRow === true ? (
                <ItemRowOverview
                  edit={true}
                  key="edit"
                  item={emptyItem}
                  setItem={(item) => updateItem(item)}
                  storages={props.storages}
                />
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      {detail}
    </Grid>
  );
}
