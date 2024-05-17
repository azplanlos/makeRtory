import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ImportCsv, { ImportCsvProps } from './database/ImportCsv';
import ExportCsv from './database/ExportCsv';
import AddIcon from '@mui/icons-material/Add';
import { Button, Drawer, Icon, ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from '@mui/material';
import { Add, ContentCut } from '@mui/icons-material';
import { useState } from 'react';
import ListIcon from '@mui/icons-material/List';
import StorageIcon from '@mui/icons-material/Storage';
import { Pages } from './pages';
import SettingsIcon from '@mui/icons-material/Settings';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
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
}

export default function Menubar(props: menubarProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const closeMenu = () => {
    setShowMenu(false);
    setMenuAnchor(null);
  };

  return (
    <><Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={(event) => {
              setMenuAnchor(event.currentTarget)
              setShowMenu(true);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            makeRtory
          </Typography>
          <IconButton onClick={props.addItem} disabled={props.currentPage === Pages.SETTINGS}><Add /></IconButton>
          <ExportCsv getAll={props.importCsv.getAll} getAllStorage={props.importCsv.getAllStorage} exportType={props.currentPage} disabled={props.currentPage === Pages.SETTINGS} />
          <ImportCsv update={props.importCsv.update} getAll={props.importCsv.getAll} getAllStorage={props.importCsv.getAllStorage} disabled={props.currentPage === Pages.SETTINGS}></ImportCsv>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
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
      <MenuItem onClick={() => {
        props.setCurrentPage(Pages.OVERVIEW);
        closeMenu();
      }}>
          <ListItemIcon>
            <ListIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Teile</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {
          props.setCurrentPage(Pages.STORAGE);
          closeMenu();
        }}>
          <ListItemIcon>
            <StorageIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Lager</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {
          props.setCurrentPage(Pages.SETTINGS);
          closeMenu();
        }}>
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