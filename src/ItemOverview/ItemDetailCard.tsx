import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { ElectronicItem } from "../model/ElectronicItem";
import {
  Avatar,
  Box,
  CardHeader,
  Chip,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  ListItem,
  ListItemText,
  Stack,
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

const FixedSizeList = _FixedSizeList as ComponentType<FixedSizeListProps>;

export type ItemDetailProps = {
  item: ElectronicItem | undefined;
  setItem: (item: ElectronicItem) => void;
  cardClose: () => void;
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
}

function AddTagDialog(props: AddTagDialogProps) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose("");
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Neue Kategorie</DialogTitle>
    </Dialog>
  );
}

export default function ItemDetailCard(props: ItemDetailProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
  };

  const item = props.item;
  const setItem = props.setItem;
  const printRef = React.useRef<HTMLImageElement>(null);

  const [blobUrl, setBlobUrl] = useState<string | undefined>(
    "/image-solid.png",
  );
  React.useEffect(() => {
    setBlobUrl(
      item?.image !== undefined && item?.image?.size > 0
        ? URL.createObjectURL(item.image)
        : item?.imageUrl === undefined
          ? "/image-solid.png"
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

  return (
    <AutoSizer>
      {(cardSize: Size) => (
        <Card sx={{ height: cardSize.height, width: cardSize.width }}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe">{item?.storage?.shortName}</Avatar>
            }
            action={
              <>
                <IconButton onClick={handleClickOpen}>
                  <MoreIcon />
                </IconButton>
                <IconButton aria-label="print label">
                  <Print />
                </IconButton>
                <UpdateAttributesFromDigikey
                  item={item}
                  onUpdate={(newItem: ElectronicItem) => updateItem(newItem)}
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
                />
              ))}
            </Stack>

            <AddTagDialog open={open} onClose={handleClose} />
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
  );
}
