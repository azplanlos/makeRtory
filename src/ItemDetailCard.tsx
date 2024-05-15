import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ElectronicItem } from './model/ElectronicItem';
import { Avatar, Box, Chip, Dialog, DialogTitle, ExtendButtonBase, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { ConstructionOutlined, Info, Print, Refresh } from '@mui/icons-material';
import UpdateAttributesFromOkopart from './UpdateAttributes';
import { useIndexedDB } from 'react-indexed-db-hook';
import { CSSProperties } from 'react';
import { ComponentType } from "react";
import { FixedSizeList as _FixedSizeList, FixedSizeListProps, ListChildComponentProps } from "react-window";
import { JSX } from 'react/jsx-runtime';
import AutoSizer, { Size } from 'react-virtualized-auto-sizer';
import StockCounter from './StockCounter';

const FixedSizeList = _FixedSizeList as ComponentType<FixedSizeListProps>;


export type ItemDetailProps = {
  item: ElectronicItem | undefined,
  setItem: (item: ElectronicItem) => void
}

async function saveImage(ref: React.RefObject<HTMLImageElement>, setItem: (item: ElectronicItem) => void, item?: ElectronicItem) {
  if (item !== undefined && (item.image === undefined || item.image.size === 0) && item.imageUrl !== undefined && ref.current !== undefined && ref.current !== null && !ref.current.src.includes("image-solid.png")) {
    console.log("save image");
    fetch(ref.current.src, {method: 'GET'}).then(resp => {
        resp.blob().then((blob) => {
          console.log(blob);
          if (item !== undefined && blob !== undefined && blob !== null) item.image = blob
          setItem(item);
        });
    });
  }
}

const Row: React.FC<ListChildComponentProps<Map<string, string>>> = ({ index, style, data }) => {
  return <Grid container key={Array.from(data.values())[index]} style={style}>
      <Grid item xs={12}>
        <Box>
          <ListItem>
            <ListItemIcon>
              <Avatar variant="rounded"></Avatar>
            </ListItemIcon>
            <ListItemText
              primary={Array.from(data.values())[index]}
              secondary={Array.from(data.keys())[index]} />
          </ListItem>
        </Box>
      </Grid>
    </Grid>

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

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Neue Kategorie</DialogTitle>
    </Dialog>
  );
}

export default function ItemDetailCard(props: ItemDetailProps) {
  const { update } = useIndexedDB("parts");
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

  const blobUrl = item?.image !== undefined && item?.image?.size > 0 ? URL.createObjectURL(item.image) : 
    item?.imageUrl === undefined ? "/image-solid.png" : undefined;
  function updateItem(newItem: ElectronicItem): void {
    console.log("update item");
    setItem(newItem);
    update(newItem);
  }

  var listItems: JSX.Element[] = [];

  item?.attributes?.forEach((key, value) => {
    listItems.push();
  })

  return (
    <Card sx={{ maxWidth: "100%", height: "100%" }}>
      <CardMedia
        component="img" 
        sx={{ height: "200px"}}
        image={blobUrl ?? "https://corsproxy.io/?" + encodeURI(item?.imageUrl ?? "https://placehold.co/300x300")}
        title={item?.title ?? item?.partNumber}
        onLoad={(event) => saveImage(printRef, updateItem, item)}
        ref={printRef}
        crossOrigin='anonymous'
      />
      <CardContent>
        <List>
          { item?.tags?.map( tag => <ListItem key={tag}>
            <Chip
              label={tag}
              onDelete={elem => console.log('delete')}
            />
          </ListItem>)}
          <ListItem>
            <Button onClick={handleClickOpen}>hinzufügen</Button>
            <AddTagDialog
        open={open}
        onClose={handleClose}
      />
          </ListItem>
        </List>
        <Typography gutterBottom variant="h5" component="div">
          {item?.title ?? item?.partNumber}
        </Typography>
        {item?.description}
        <StockCounter count={item?.stock || 0} setCount={(count) => { console.log("new count: " + count); item!!.stock = count; updateItem(item!!) }} />
        <FixedSizeList itemData={item?.attributes} itemSize={50} height={300} itemCount={item?.attributes?.size || 0} width={'100%'}>
          {Row}
        </FixedSizeList>
      </CardContent>
      <CardActions>
        <IconButton aria-label="print label">
          <Print />
        </IconButton>
        <UpdateAttributesFromOkopart item={item} onUpdate={(newItem: ElectronicItem) => updateItem(newItem)} />
      </CardActions>
    </Card>
  );
}