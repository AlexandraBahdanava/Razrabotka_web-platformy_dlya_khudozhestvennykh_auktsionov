import React from "react";
import { Grid, Stack, Typography, useMediaQuery, SpeedDial, SpeedDialAction } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import Logo from "./Logo.png";
import { Icon } from '@iconify/react';
import SearchBar from '../SearchBar';
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

const ArtistHeader = () => {
    const theme = useTheme();

    const navigate = useNavigate();
    return (
        <Grid
            container
            width={"100%"}
            height={"78px"}
            bgcolor={theme.palette.primary.main}
            pl={"50px"}
            justifyContent={"space-between"}
            alignItems={"center"}
        >
            <img src={Logo} alt="Logo" />
            <SearchBar/>
            <Stack gap={"93px"} direction={"row"}>
                <Typography variant="h1" textAlign={"center"}>
                    <Grid container item height={"100%"} alignItems={"center"}>
                        <Link to={"/artist"} style={{ textDecoration: "none", color: "#000000" }}>
                        <Icon icon="iconamoon:profile-thin" color="#b3b9c4" width="24" height="24" />
                            Профиль
                        </Link>
                    </Grid>
                </Typography>
            </Stack>
            <Stack gap={"50px"} direction={"row"} mr={"50px"}>
                <Typography variant="h1" textAlign={"center"}>
                    <Grid container item height={"100%"} alignItems={"center"}>
                        <Link to={"/orders/create"} style={{ textDecoration: "none", color: "#000000" }}>
                        <Icon icon="solar:home-2-outline" color="#b3b9c4" width="24" height="24" />
                            Главная
                        </Link>
                    </Grid>
                </Typography>
            </Stack>
            <Stack gap={"93px"} direction={"row"}>
                <Typography variant="h1" textAlign={"center"}>
                    <Grid container item height={"100%"} alignItems={"center"}>
                        <Link to={"/auction"} style={{ textDecoration: "none", color: "#000000" }}>
                        <Icon icon="material-symbols:finance" color="#b3b9c4" width="24" height="24" />
                            Активные аукционы
                        </Link>
                    </Grid>
                </Typography>
            </Stack>
            <Stack gap={"93px"} direction={"row"}>
                <Typography variant="h1" textAlign={"center"}>
                    <Grid container item height={"100%"} alignItems={"center"}>
                        <Link to={"/auction/create"} style={{ textDecoration: "none", color: "#000000" }}>
                        <Icon icon="uil:setting" color="#b3b9c4" width="24" height="24" />
                            Создать аукцион
                        </Link>
                    </Grid>
                </Typography>
            </Stack>
        </Grid>
    );
};

export default ArtistHeader;