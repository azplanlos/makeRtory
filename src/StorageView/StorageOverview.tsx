import React, { useState } from "react";
import { StorageItem } from "../model/ElectronicItem";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import AddIcon from '@mui/icons-material/Add';

type NestedStorageItem = StorageItem & {
    children: NestedStorageItem[];
}

function buildTree(items: StorageItem[]): NestedStorageItem[] {
    const boxes = [...(new Set(items.map(item => item.box)))];
    return boxes.map(box => {return {
        box: box,
        boxName: items.find(item => item.box === box)?.boxName,
        shortName: items.find(item => item.box === box)?.boxName,
        row: -1,
        col: -1,
        children: items.filter(item => item.box === box)
    } as NestedStorageItem});
}

export default function StorageOverview() {
    const items: StorageItem[] = [{
        box: 1,
        boxName: "Kiste klein",
        shortName: "K1.1",
        row: 1,
        col: 1
    } as StorageItem,
    {
        box: 1,
        boxName: "Kiste klein",
        shortName: "K2.1",
        row: 2,
        col: 1
    } as StorageItem,
    {
        box: 2,
        boxName: "Kiste groß",
        shortName: "Z2.1",
        row: 1,
        col: 1
    } as StorageItem
];
    const [openEntries, setOpenEntries] = useState<number[]>([]);

    const itemEntry = (item: NestedStorageItem) => {
        return <>
            <ListItemButton onClick={() => {
                if (openEntries.find((it) => it === item.box)) {
                    setOpenEntries(openEntries.filter(it => it !== item.box));
                } else {
                    setOpenEntries([...openEntries, item.box]);
                }
            }}>
                <ListItemIcon>
                    <Inventory2Icon />
                </ListItemIcon>
                <ListItemText primary={item.row === -1 ? item.boxName : `${item.boxName} (Fach ${item.row}/${item.col})`} />
                {!openEntries.find((it) => it === item.box) ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openEntries.find((it) => it === item.box) === undefined} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    { item.children.map(fach => <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <AllInboxIcon />
                        </ListItemIcon>
                        <ListItemText primary={`${fach.boxName} (Fach ${fach.row}/${fach.col})`} />
                    </ListItemButton>) }
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Fach hinzufügen" />
                    </ListItemButton>
                </List>
            </Collapse>
        </>
    }

    return (<List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
        <ListSubheader component="div" id="nested-list-subheader">
            Lagerplätze
        </ListSubheader>
        }>
            { buildTree(items).map(item => itemEntry(item)) }
    </List>);
}