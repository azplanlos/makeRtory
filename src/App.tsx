import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import ItemRowOverview from "./ItemOverview/Item";
import { ElectronicItem, StorageItem } from "./model/ElectronicItem";
import {
  Card,
  CssBaseline,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { DBConfig } from "./database/DBSchemaConfig";
import { initDB, useIndexedDB } from "react-indexed-db-hook";
import ImportCsv from "./database/ImportCsv";
import Menubar from "./Menubar";
import ItemDetailCard from "./ItemOverview/ItemDetailCard";
import ItemOverview from "./ItemOverview/ItemOverview";
import { Pages } from "./pages";
import SettingsTable from "./Settings/SettingsTable";
import StorageOverview from "./StorageView/StorageOverview";

initDB(DBConfig);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [parts, setParts] = useState<ElectronicItem[]>();
  const [searchString, setSearchString] = useState("");
  const [showAddRow, setShowAddRow] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<Pages>(Pages.OVERVIEW);
  const [storages, setStorages] = useState<StorageItem[]>([]);

  const { getAll } = useIndexedDB("parts");
  const getAllStorages = useIndexedDB("storage").getAll;

  useEffect(() => {
    getAllStorages().then((dbStorages) => {
      setStorages(dbStorages);
    });
  }, [getAllStorages]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Menubar
        importCsv={{
          update: setParts,
          getAll: getAll,
          getAllStorage: getAllStorages,
        }}
        searchString={searchString}
        setSearchString={(search) => {
          setSearchString(search);
          setSelectedItem("");
        }}
        addItem={() => {
          setShowAddRow(true);
        }}
        currentPage={currentPage}
        setCurrentPage={(page) => {
          setCurrentPage(page);
          setShowAddRow(false);
        }}
      />
      <div
        className="App"
        style={{ height: "90vh", borderColor: "red", border: 5 }}
      >
        {currentPage === Pages.OVERVIEW ? (
          <ItemOverview
            parts={parts}
            setParts={setParts}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            searchString={searchString}
            showAddRow={showAddRow}
            storages={storages}
            onCloseEdit={() => setShowAddRow(false)}
          />
        ) : (
          <></>
        )}
        {currentPage === Pages.SETTINGS && <SettingsTable />}
        {currentPage === Pages.STORAGE && (
          <StorageOverview storageItems={storages} addItem={showAddRow} setAddItem={setShowAddRow} setStorageItems={setStorages} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
