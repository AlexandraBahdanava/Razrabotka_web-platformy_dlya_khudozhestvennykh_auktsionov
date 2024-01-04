import React from "react";
import { Grid } from "@mui/material";
import ArtistHeader from './../../components/headers/ArtistHeader';

const ArtistProfilePage = () => {
    return (
        <Grid
            container
            width={"100%"}
            height={"100vh"}
            flexDirection={"column"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            bgcolor={"#E7E7E7"}
        >
            <ArtistHeader />
            <Grid
                container
                item
                flexDirection={"column"}
                alignItems={"center"}
                maxWidth={"1300px"}
                flexGrow={1}
                bgcolor={"#FFFFFF"}
            >
                <h1>This is artist profile page</h1>
            </Grid>
        </Grid>
    );
};

export default ArtistProfilePage;