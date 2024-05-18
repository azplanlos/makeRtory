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

export default function SettingsTable() {
  const [clientId, setClientId] = useState(
    localStorage.getItem("nexar-clientid") || "",
  );
  const [clientSecret, setClientSecret] = useState(
    localStorage.getItem("nexar-clientsecret") || "",
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
    </List>
  );
}
