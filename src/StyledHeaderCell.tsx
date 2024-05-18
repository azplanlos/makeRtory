import React from "react";
import { TableCell } from "@mui/material";

export function styledHeaderCell(
  caption: string,
  selectedItem: string,
  align:
    | "left"
    | "center"
    | "right"
    | "justify"
    | "inherit"
    | undefined = "left",
) {
  return (
    <TableCell style={{ fontWeight: "bolder" }} align={align}>
      {caption}
    </TableCell>
  );
}
