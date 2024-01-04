import React from "react";
import { Grid } from "@mui/material";
import { useTheme } from "@emotion/react";
import Logo from "./Logo.png";
import { Icon } from '@iconify/react';
import SearchBar from '../SearchBar';

const PublicHeader = () => {
    const theme = useTheme();

    return (
        <Grid
            container
            width={"100%"}
            height={"160px"}
            bgcolor={theme.palette.primary.main}
            pl={"42px"}
            alignItems={"center"}
        >
            <img src={Logo} alt="Logo" />
            <SearchBar/> 
        </Grid>
    );
};

export default PublicHeader;