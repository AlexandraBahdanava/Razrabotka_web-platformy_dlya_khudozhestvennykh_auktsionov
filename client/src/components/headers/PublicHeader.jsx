import React from "react";
import { Grid,Divider } from "@mui/material";
import { useTheme } from "@emotion/react";
import Logo from "./Logo.png";
import { Icon } from '@iconify/react';

const PublicHeader = () => {
    const theme = useTheme();

    return (
        <Grid 
        width={"100%"}
        paddingLeft={"0"}>
        <Grid
            container
            width={"100%"}
            height={"78px"}
            bgcolor={theme.palette.primary.main}
            pl={"50px"}
            justifyContent={"center"}
            alignItems={"center"}
            paddingBottom={"0"}
        >
            <img src={Logo} alt="Logo" width={"100px"}/>
        </Grid>
         <Divider sx={{ width: '100%', backgroundColor: '#b3b9c4', paddingBottom: '0px', marginBottom:'0px'}} />
         </Grid>
    );
};

export default PublicHeader;