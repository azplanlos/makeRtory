import React, { PropsWithChildren } from "react";
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
  item?: any;
  open: boolean;
  onClose: () => void;
  onDelete: (item: any) => void;
};

export default function DeleteDialog(
  props: PropsWithChildren<DeleteDialogProps>,
) {
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
        {props.children && (
          <DialogContentText
            id="alert-dialog-note"
            style={{ fontSize: "small", marginTop: "1%" }}
          >
            {props.children}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Abbrechen</Button>
        <Button
          onClick={() => {
            props.onClose();
            props.onDelete(props.item);
          }}
          autoFocus
        >
          Löschen
        </Button>
      </DialogActions>
    </Dialog>
  );
}
