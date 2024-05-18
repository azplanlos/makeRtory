import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type DeleteDialogProps = {
  itemName: string;
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
};

export default function DeleteDialog(props: DeleteDialogProps) {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Wirklich löschen?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Soll der Eintrag <b>{props.itemName}</b> wirklich gelöscht werden?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Abbrechen</Button>
        <Button
          onClick={() => {
            props.onClose();
            props.onDelete();
          }}
          autoFocus
        >
          Löschen
        </Button>
      </DialogActions>
    </Dialog>
  );
}
