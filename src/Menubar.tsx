import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ImportCsv, { ImportCsvProps } from "./database/ImportCsv";
import ExportCsv from "./database/ExportCsv";
import {
  FormControl,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Select,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import ListIcon from "@mui/icons-material/List";
import StorageIcon from "@mui/icons-material/Storage";
import { Pages } from "./pages";
import SettingsIcon from "@mui/icons-material/Settings";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export type menubarProps = {
  importCsv: ImportCsvProps;
  searchString: string;
  setSearchString: (search: string) => void;
  addItem: () => void;
  currentPage: Pages;
  setCurrentPage: (page: Pages) => void;
  applyFilter: (tag: string | undefined) => void;
  categories: string[];
};

export default function Menubar(props: menubarProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [filter, setFilter] = useState("-all-");

  const closeMenu = () => {
    setShowMenu(false);
    setMenuAnchor(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={(event) => {
                setMenuAnchor(event.currentTarget);
                setShowMenu(true);
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              makeRtory
            </Typography>
            <Box display='flex' flexGrow={1} marginLeft="2%">
            {props.currentPage === Pages.OVERVIEW && <FormControl><Select color="primary" value={filter} onChange={(e) => {
              setFilter(e.target.value);
              props.applyFilter(e.target.value !== '-all-' ? e.target.value : undefined);
              setTimeout(() => {
                (document?.activeElement as HTMLInputElement)?.blur();
              }, 0);
            }} style={{color: 'white'}} variant="standard">
              <MenuItem value="-all-" key="all">Alle</MenuItem>
              { props.categories.map(cat => 
                <MenuItem value={cat} key={cat}>{cat}</MenuItem>
              ) }
            </Select></FormControl>
            }
            </Box>
            <IconButton
              onClick={props.addItem}
              disabled={props.currentPage === Pages.SETTINGS}
              color="inherit"
            >
              <Add />
            </IconButton>
            <ExportCsv
              getAll={props.importCsv.getAll}
              getAllStorage={props.importCsv.getAllStorage}
              disabled={props.currentPage === Pages.SETTINGS}
            />
            <ImportCsv
              update={props.importCsv.update}
              getAll={props.importCsv.getAll}
              getAllStorage={props.importCsv.getAllStorage}
              disabled={props.currentPage === Pages.SETTINGS}
            ></ImportCsv>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={props.searchString}
                onChange={(event) => props.setSearchString(event.target.value)}
                disabled={props.currentPage !== Pages.OVERVIEW}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
      <Menu open={showMenu} anchorEl={menuAnchor} onClose={closeMenu}>
        <MenuList>
          <MenuItem
            onClick={() => {
              props.setCurrentPage(Pages.OVERVIEW);
              closeMenu();
            }}
          >
            <ListItemIcon>
              <ListIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Teile</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              props.setCurrentPage(Pages.STORAGE);
              closeMenu();
            }}
          >
            <ListItemIcon>
              <StorageIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Lager</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              props.setCurrentPage(Pages.SETTINGS);
              closeMenu();
            }}
          >
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Einstellungen</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
