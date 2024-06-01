import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Switch,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PasswordIcon from "@mui/icons-material/Password";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import PrintIcon from '@mui/icons-material/Print';

type SettingsTableProps = {
  setDark: (dark: boolean) => void;
  dark: boolean;
};

export default function SettingsTable(props: SettingsTableProps) {
  const [clientId, setClientId] = useState(
    localStorage.getItem("nexar-clientid") || "",
  );
  const [clientSecret, setClientSecret] = useState(
    localStorage.getItem("nexar-clientsecret") || "",
  );
  const [labelPrintUrl, setLabelPrintUrl] = useState(
    localStorage.getItem("niimbot-server-url") || "",
  );

  return (
    <List
      sx={{ width: "100%", bgcolor: "background.paper" }}
      subheader={<ListSubheader>DigiKey API Settings</ListSubheader>}
    >
      <ListItem>
        <ListItemIcon>
          <PermIdentityIcon />
        </ListItemIcon>
        <ListItemText id="client-id" primary="Client Id" />
        <TextField
          variant="standard"
          sx={{ width: "80%" }}
          value={clientId}
          onChange={(event) => {
            setClientId(event.target.value);
            localStorage.setItem("nexar-clientid", event.target.value);
          }}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <PasswordIcon />
        </ListItemIcon>
        <ListItemText id="client-secret" primary="Client Secret" />
        <TextField
          type="password"
          variant="standard"
          sx={{ width: "80%" }}
          value={clientSecret}
          onChange={(event) => {
            setClientSecret(event.target.value);
            localStorage.setItem("nexar-clientsecret", event.target.value);
          }}
        />
      </ListItem>
      <ListSubheader>Anzeige</ListSubheader>
      <ListItem>
        <ListItemIcon>
          <DarkModeIcon />
        </ListItemIcon>
        <ListItemText id="dark" primary="Dunkler Modus" />
        <Switch
          checked={props.dark}
          onChange={(e) => props.setDark(e.target.checked)}
        />
      </ListItem>
      <ListSubheader>Label Drucker</ListSubheader>
      <ListItem>
        <ListItemIcon> 
          <PrintIcon />
        </ListItemIcon>
        <ListItemText primary="Niimbot Printserver URL" />
        <TextField
          type="text"
          variant="standard"
          sx={{ width: "80%" }}
          value={labelPrintUrl}
          onChange={(event) => {
            setLabelPrintUrl(event.target.value);
            localStorage.setItem("niimbot-server-url", event.target.value);
          }}
        />
        </ListItem>
    </List>
  );
}
