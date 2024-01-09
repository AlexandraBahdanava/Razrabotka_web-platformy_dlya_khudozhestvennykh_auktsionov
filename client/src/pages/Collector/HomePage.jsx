import React from "react";
import { Button, Grid } from "@mui/material";
import CollectorHeader from "../../components/headers/CollectorHeader";
import Footer from "../../components/Footer";
import AllAuctions from "../../components/AllAuctions";

const HomePage = () => {
    return (
        <Grid container width={"100%"} height={"100%"}>
         <CollectorHeader/>
         <Grid>
<AllAuctions/>
         </Grid>
         <Grid>
         </Grid>
         <Footer/>
        </Grid>
    );
};

export default HomePage;