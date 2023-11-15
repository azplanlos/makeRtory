import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import ItemRowOverview from "./Item";
import { ElectronicItem } from "./model/ElectronicItem";
import {
  CssBaseline,
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

initDB(DBConfig);

function styledHeaderCell(caption: string, selectedItem: string, align: "left" | "center" | "right" | "justify" | "inherit" | undefined = "left") {
  return <TableCell style={{fontWeight: "bolder"}} align={align}>{ caption }</TableCell>
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {
  const item: ElectronicItem = {
    title: "ATTINY85",
    stock: 5,
    datasheetUrl: "http://zbahn.de",
    storage: { box: 1, row: 1, col: 1 },
    manufactorer: "Atmel",
    partNumber: "ATTINY85-20PU",
    price: 2.5,
  };
  const { getAll } = useIndexedDB("parts");
  const [parts, setParts] = useState<ElectronicItem[]>();
  var [selectedItem, setSelectedItem] = useState<string>("");

  useEffect(() => {
    getAll().then((partsFromDB) => {
      return setParts(partsFromDB);
    });
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    <div className="App">
      <TableContainer component={Paper} style={{marginBottom: "1%", height: "90%"}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader style={{overflow: "scroll"}}>
          <TableHead style={{fontWeight: "bolder"}}>
            <TableRow>
              { styledHeaderCell("Teil", selectedItem) }
              { styledHeaderCell("Teilenummer", selectedItem) }
              { styledHeaderCell("Hersteller", selectedItem) }
              { styledHeaderCell("Bestand", selectedItem, "right") }
              { styledHeaderCell("Lager", selectedItem) }
              { styledHeaderCell("Preis/Stück", selectedItem, "right") }
              { styledHeaderCell("Datenblatt", selectedItem) }
            </TableRow>
          </TableHead>
          <TableBody>
            {parts?.map((part) => (
              <ItemRowOverview
                item={part}
                key={part.partNumber}
                selected={selectedItem == part.partNumber}
                setSel={setSelectedItem}
              ></ItemRowOverview>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ImportCsv update={setParts} getAll={getAll}></ImportCsv>
    </div>
    </ThemeProvider>
  );
}

export default App;
