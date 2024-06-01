import { Chip, Grid, Typography } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { ElectronicItem } from "../model/ElectronicItem";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import SellIcon from '@mui/icons-material/Sell';
import { useLocation } from "react-router-dom";

type PrintLabelProps = {
    visible: boolean;
    item: ElectronicItem | undefined;
}

export const PrintLabel = forwardRef<HTMLDivElement, PrintLabelProps>((props, ref) => {
    const { pathname } = useLocation();
    const [basePath, setBasePath] = useState(window.location.href);

    useEffect(() => {
        const {origin, pathname } = new URL(window.location.href);
        setBasePath(`${origin}${pathname}`);
    }, [pathname])
    
    return <>
        {props.visible && <div style={{width: 380, height: 96}} ref={ref}>
            <Grid container>
                <Grid item xs={4}>
                    <QRCode value={props.item?.partNumber ? `${basePath}?part=${encodeURIComponent(props.item?.partNumber)}` : basePath} size={90} />
                </Grid>
                <Grid item xs={8} paddingX={2} paddingY={2}>
                    <Typography variant="h5" noWrap>{props.item?.title}</Typography>
                    {props.item?.manufactorer && <Chip label={props.item?.manufactorer} variant="outlined" size="small" /> }
                    <Chip icon={<Inventory2Icon />} label={props.item?.storage?.shortName} variant="outlined" size="small" />
                    { props.item?.tags?.map((tag) => <Chip icon={<SellIcon />} label={tag} key={tag} variant="outlined" size="small" />)}
                </Grid>
            </Grid>
        </div>
}
    </>
});