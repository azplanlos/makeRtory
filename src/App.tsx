import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { ElectronicItem, StorageItem } from "./model/ElectronicItem";
import { CssBaseline, Theme, ThemeProvider, createTheme } from "@mui/material";
import { DBConfig } from "./database/DBSchemaConfig";
import { initDB, useIndexedDB } from "react-indexed-db-hook";
import Menubar from "./Menubar";
import ItemOverview from "./ItemOverview/ItemOverview";
import { Pages } from "./pages";
import SettingsTable from "./Settings/SettingsTable";
import StorageOverview from "./StorageView/StorageOverview";
import { useLocation } from "react-router-dom";
import React from "react";

initDB(DBConfig);

function filterCategories(items: ElectronicItem[]): string[] {
  return [...new Set(items.flatMap((it) => it.tags || []))].sort();
}

function App() {
  const [parts, setParts] = useState<ElectronicItem[]>();
  const [searchString, setSearchString] = useState("");
  const [showAddRow, setShowAddRow] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<Pages>(Pages.OVERVIEW);
  const [storages, setStorages] = useState<StorageItem[]>([]);
  const [dark, setDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );
  const [theme, setTheme] = useState<Theme>(createTheme());
  const [categories, setCategories] = useState<string[]>([]);
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    if (params.get('part')) {
      setCurrentPage(Pages.OVERVIEW);
      setSelectedItem(params.get('part') || "");
    }
  }, [search])


  useEffect(
    () =>
      setTheme(
        createTheme({
          palette: {
            mode: dark ? "dark" : "light",
          },
        }),
      ),
    [dark],
  );

  const { getAll } = useIndexedDB("parts");
  const getAllStorages = useIndexedDB("storage").getAll;

  useEffect(() => {
    getAllStorages().then((dbStorages) => {
      setStorages(dbStorages);
    });
  }, [getAllStorages]);

  useEffect(() => {
    getAll().then((allItems) => setCategories(filterCategories(allItems)));
  }, [getAll]);

  const setPartsCallback = useCallback((prts: ElectronicItem[]) => {
    setParts(prts);
    setCategories(filterCategories(prts || []));
  }, [])

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
        <React.Fragment>
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
        categories={categories}
        applyFilter={setFilter}
      />
      <div
        className="App"
        style={{ height: "90vh", borderColor: "red", border: 5 }}
      >
        {currentPage === Pages.OVERVIEW ? (
          <ItemOverview
            parts={parts}
            setParts={setPartsCallback}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            searchString={searchString}
            showAddRow={showAddRow}
            storages={storages}
            onCloseEdit={() => setShowAddRow(false)}
            categories={categories}
            filter={filter}
          />
        ) : (
          <></>
        )}
        {currentPage === Pages.SETTINGS && (
          <SettingsTable setDark={setDark} dark={dark} />
        )}
        {currentPage === Pages.STORAGE && (
          <StorageOverview
            storageItems={storages}
            addItem={showAddRow}
            setAddItem={setShowAddRow}
            setStorageItems={setStorages}
          />
        )}
      </div>
    </React.Fragment>
    </ThemeProvider>
  );
}

export default App;
