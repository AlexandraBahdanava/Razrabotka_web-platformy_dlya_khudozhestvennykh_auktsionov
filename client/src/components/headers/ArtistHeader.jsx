import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import Logo from "./Logo";
import HeaderIcons from "./HeaderIcons";

const ArtistHeader = () => {
    const theme = useTheme();

    return (
        <Grid
            container
            width={"100%"}
            height={"160px"}
            bgcolor={theme.palette.primary.main}
            pl={"42px"}
            justifyContent={"space-between"}
            alignItems={"center"}
        >
            <Stack gap={"93px"} direction={"row"}>
                <Logo />
                <Typography variant="h1" textAlign={"center"}>
                    <Grid container item height={"100%"} alignItems={"center"}>
                        <Link to={"/auction/create"} style={{ textDecoration: "none", color: "#000000" }}>
                            Создать аукцион
                        </Link>
                    </Grid>
                </Typography>
            </Stack>
            <Stack gap={"50px"} direction={"row"} mr={"50px"}>
                <Typography variant="h1" textAlign={"center"}>
                    <Grid container item height={"100%"} alignItems={"center"}>
                        <Link to={"/orders/create"} style={{ textDecoration: "none", color: "#000000" }}>
                            Профиль
                        </Link>
                    </Grid>
                </Typography>
                <HeaderIcons />
            </Stack>
        </Grid>
    );
};

export default ArtistHeader;