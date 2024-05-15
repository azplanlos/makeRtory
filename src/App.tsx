import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import ItemRowOverview from "./Item";
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
import ItemDetailCard from "./ItemDetailCard";
import ItemOverview from "./ItemOverview";
import { Pages } from "./pages";

initDB(DBConfig);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {
  const [parts, setParts] = useState<ElectronicItem[]>();
  const [searchString, setSearchString] = useState('');
  const [showAddRow, setShowAddRow] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<Pages>(Pages.OVERVIEW);
  const [storages, setStorages] = useState<StorageItem[]>([]);

  const { getAll } = useIndexedDB("parts");
  const getAllStorages = useIndexedDB("storage").getAll;

  useEffect(() => {
    getAllStorages().then(dbStorages => {
      setStorages(dbStorages);
    })
  }, [getAllStorages]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Menubar importCsv={{update: setParts, getAll : getAll, getAllStorage: getAllStorages}} 
        searchString={searchString} setSearchString={(search) => {setSearchString(search); setSelectedItem('');}}
        addItem={() => {
          setShowAddRow(true);
        }
      }
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      />
    <div className="App" style={{height: "100%", borderColor: "red", border: 5}}>
      {currentPage === Pages.OVERVIEW ? <ItemOverview parts={parts} setParts={setParts} selectedItem={selectedItem} setSelectedItem={setSelectedItem} 
        searchString={searchString} showAddRow={showAddRow} storages={storages} /> : <></>}
    </div>
    </ThemeProvider>
  );
}

export default App;
