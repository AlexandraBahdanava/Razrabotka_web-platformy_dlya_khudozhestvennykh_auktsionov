import React from "react";
import { Grid } from "@mui/material";
import { useTheme } from "@emotion/react";

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
        </Grid>
    );
};

export default PublicHeader;