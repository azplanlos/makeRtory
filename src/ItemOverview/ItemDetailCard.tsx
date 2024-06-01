import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { ElectronicItem, StorageItem } from "../model/ElectronicItem";
import {
  Avatar,
  Badge,
  Box,
  Button,
  CardHeader,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import MoreIcon from "@mui/icons-material/More";
import UpdateAttributesFromDigikey from "../UpdateAttributes";
import { useState } from "react";
import { ComponentType } from "react";
import {
  FixedSizeList as _FixedSizeList,
  FixedSizeListProps,
  ListChildComponentProps,
} from "react-window";
import { JSX } from "react/jsx-runtime";
import AutoSizer, { Size } from "react-virtualized-auto-sizer";
import StockCounter from "../StockCounter";
import CloseIcon from "@mui/icons-material/Close";
import Print from "@mui/icons-material/Print";
import { unassignedStorage } from "../model/StorageComponent";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { PrintLabel } from "./PrintLabel";
import html2canvas from "html2canvas";

const FixedSizeList = _FixedSizeList as ComponentType<FixedSizeListProps>;

export type ItemDetailProps = {
  item: ElectronicItem | undefined;
  setItem: (item: ElectronicItem) => void;
  cardClose: () => void;
  storages: StorageItem[];
  categories: string[];
};

async function saveImage(
  ref: React.RefObject<HTMLImageElement>,
  setItem: (item: ElectronicItem) => void,
  item?: ElectronicItem,
) {
  if (
    item !== undefined &&
    (item.image === undefined || item.image.size === 0) &&
    item.imageUrl !== undefined &&
    ref.current !== undefined &&
    ref.current !== null &&
    !ref.current.src.includes("image-solid.png")
  ) {
    console.log("save image");
    fetch(ref.current.src, { method: "GET" }).then((resp) => {
      resp.blob().then((blob) => {
        console.log(blob);
        if (item !== undefined && blob !== undefined && blob !== null)
          item.image = blob;
        setItem(item);
      });
    });
  }
}

const Row: React.FC<ListChildComponentProps<Map<string, string>>> = ({
  index,
  style,
  data,
}) => {
  return (
    <Grid container key={Array.from(data.values())[index]} style={style}>
      <Grid item xs={12}>
        <Box>
          <ListItem>
            <ListItemText
              primary={Array.from(data.values())[index]}
              secondary={Array.from(data.keys())[index]}
            />
          </ListItem>
        </Box>
      </Grid>
    </Grid>
  );
};

export interface AddTagDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  onUpdate: (item: ElectronicItem) => void;
  item: ElectronicItem | undefined;
  categories: string[];
}

function AddTagDialog(props: AddTagDialogProps) {
  const { onClose, open } = props;
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [newCategory, setNewCategory] = useState<string | undefined>(undefined);

  React.useEffect(() => {
    setNewCategory("");
    setCategory("");
  }, [open]);

  const handleClose = () => {
    onClose("");
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Kategorie hinzufügen</DialogTitle>
      <DialogContent>
        <DialogContentText style={{ marginBottom: "2%" }}>
          Bitte wähle eine neue Kategorie aus oder gib den Namen einer neuen
          Kategorie ein.
        </DialogContentText>
        <FormControl fullWidth>
          <InputLabel id="cat-select-label">Kategorie</InputLabel>
          <Select
            labelId="cat-select-label"
            id="cat-select"
            value={category}
            label="Kategorie"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="-new-">Neue Kategorie</MenuItem>
            {props.categories.map((tag) => (
              <MenuItem value={tag} key={tag}>
                {tag}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {category === "-new-" && (
          <FormControl fullWidth>
            <TextField
              label="Neue Kategorie"
              style={{ marginTop: "2%" }}
              onChange={(e) => setNewCategory(e.target.value)}
              value={newCategory}
            ></TextField>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Abbrechen</Button>
        <Button
          onClick={() => {
            handleClose();
            if (props.item) {
              props.onUpdate({
                ...props.item,
                tags: [
                  ...(props.item.tags || ([] as string[])),
                  category !== "-new-" ? category || "" : newCategory || "",
                ],
              });
              console.log(
                "added category " +
                  (category !== "-new-" ? category : newCategory),
              );
            }
          }}
          disabled={
            !category ||
            category?.length <= 0 ||
            (category === "-new-" && (!newCategory || newCategory.length <= 0))
          }
          autoFocus
        >
          Hinzufügen
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function ItemDetailCard(props: ItemDetailProps) {
  const [open, setOpen] = React.useState(false);
  const [printActive, setPrintActive] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
  };

  const item = props.item;
  const setItem = props.setItem;
  const printRef = React.useRef<HTMLImageElement>(null);
  const labelRef = React.useRef<HTMLDivElement>(null);

  const [blobUrl, setBlobUrl] = useState<string | undefined>("image-solid.png");
  React.useEffect(() => {
    setBlobUrl(
      item?.image !== undefined && item?.image?.size > 0
        ? URL.createObjectURL(item.image)
        : item?.imageUrl === undefined
          ? "image-solid.png"
          : undefined,
    );
  }, [open, props.item?.imageUrl, item?.image, item?.imageUrl]);

  function updateItem(newItem: ElectronicItem): void {
    console.log("update item");
    setItem(newItem);
  }

  var listItems: JSX.Element[] = [];

  item?.attributes?.forEach((key, value) => {
    listItems.push();
  });

  const printLabel = async() => {
    setPrintActive(true);
    setTimeout(async () => {
      if (labelRef.current && localStorage.getItem("niimbot-server-url")) {
        const canvas = await html2canvas(labelRef.current, {width: 380, height: 96, scale: 1});
        setPrintActive(false);
        const data = canvas.toDataURL('image/png');
        fetch(`${localStorage.getItem("niimbot-server-url")}/print`, {method: "post", headers: {"content-type": "application/json"}, body: JSON.stringify({image: data.split(',')[1], density: 2, quantity: 1})});
      }
    }, 1);
    
  }

  const storage =
    props.storages.find(
      (strg) =>
        strg.box === props.item?.storage?.box &&
        strg.row === props.item.storage.row &&
        strg.col === props.item.storage.col,
    ) || unassignedStorage;

  return (
    <>
      {item && (
        <AutoSizer>
          {(cardSize: Size) => (
            <Card sx={{ height: cardSize.height, width: cardSize.width }}>
              <CardHeader
                avatar={
                  <Tooltip title={`${storage.boxName} (Fach ${storage.row}/${storage.col})`}>
                    <Badge
                    overlap="rectangular"
                    badgeContent={storage.shortName}
                    color="primary"
                  >
                    <Avatar alt={storage.boxName}>
                      <Inventory2Icon />
                    </Avatar>
                  </Badge>
                  </Tooltip>
                }
                action={
                  <>
                    {item.datasheetUrl && item.datasheetUrl.length > 0 && (
                      <IconButton
                        onClick={() =>
                          window
                            ?.open(item.datasheetUrl || "", "_blank")
                            ?.focus()
                        }
                      >
                        <AttachFileIcon />
                      </IconButton>
                    )}
                    <IconButton onClick={handleClickOpen}>
                      <MoreIcon />
                    </IconButton>
                    <IconButton aria-label="print label" onClick={async () => await printLabel()} disabled={!localStorage.getItem("niimbot-server-url")}>
                      <Print />
                    </IconButton>
                    <UpdateAttributesFromDigikey
                      item={item}
                      onUpdate={(newItem: ElectronicItem) =>
                        updateItem(newItem)
                      }
                    />
                    <IconButton
                      aria-label="settings"
                      onClick={() => props.cardClose()}
                    >
                      <CloseIcon />
                    </IconButton>
                  </>
                }
                title={item?.title ?? item?.partNumber}
                titleTypographyProps={{
                  variant: "h5",
                  style: { fontWeight: "bolder" },
                }}
                subheader={item?.manufactorer}
              />
              <CardMedia
                component="img"
                sx={{ height: "30%" }}
                image={
                  blobUrl ??
                  "https://corsproxy.io/?" +
                    encodeURI(item?.imageUrl ?? "https://placehold.co/300x300")
                }
                title={item?.title ?? item?.partNumber}
                onLoad={(event) => saveImage(printRef, updateItem, item)}
                ref={printRef}
                crossOrigin="anonymous"
              />
              <CardContent style={{ height: "40%" }}>
                <Stack direction="row" spacing={1}>
                  {item?.tags?.map((tag) => (
                    <Chip
                      label={tag}
                      onDelete={(elem) => {
                        item.tags = item.tags?.filter((tg) => tg !== tag);
                        updateItem(item);
                      }}
                      key={`cat-${tag}`}
                    />
                  ))}
                </Stack>

                <AddTagDialog
                  open={open}
                  onClose={handleClose}
                  onUpdate={props.setItem}
                  item={props.item}
                  categories={props.categories}
                />
                <StockCounter
                  count={item?.stock || 0}
                  setCount={(count) => {
                    console.log("new count: " + count);
                    item!!.stock = count;
                    updateItem(item!!);
                  }}
                />
                {item?.description}
                <AutoSizer>
                  {(size: Size) => (
                    <FixedSizeList
                      itemData={item?.attributes}
                      itemSize={50}
                      height={size.height}
                      itemCount={item?.attributes?.size || 0}
                      width={size.width}
                    >
                      {Row}
                    </FixedSizeList>
                  )}
                </AutoSizer>
              </CardContent>
            </Card>
          )}
        </AutoSizer>
      )}
      <PrintLabel ref={labelRef} visible={printActive} item={item} />
    </>
  );
}
