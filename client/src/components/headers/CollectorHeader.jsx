import React from "react";
import { IconButton, Grid, Stack, Typography, useMediaQuery, SpeedDial, SpeedDialAction, Divider } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import Logo from "./Logo.png";
import { Icon } from '@iconify/react';
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

const CollectorHeader = () => {
    const theme = useTheme();

    const navigate = useNavigate();
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
            justifyContent={"space-between"}
            alignItems={"center"}
            paddingBottom={"0"}
        >
            <img src={Logo} alt="Logo" />
            <Stack gap={"200px"} 
            direction={"row"}
            justifyContent="flex-end" // Выравнивание вправо
            sx={{ flex: 1 }} // Растягиваем для заполнения доступного пространства
              >
                <Typography variant="h1" textAlign={"top"}>
                    <Grid container item height={"100%"} alignItems={"center"} marginRight= {"100px"}>
                        <Link to={"/artist"} style={{ textDecoration: "none", color: "#000000" }}>
                        <Icon icon="iconamoon:profile-thin" color="#b3b9c4" width="24" height="24" />
                            Профиль
                        </Link>
                    </Grid>
                </Typography>
            </Stack>
            <Stack gap={"93px"} direction={"row"}>
                <Typography variant="h1" textAlign={"center"}>
                    <Grid container item height={"100%"} alignItems={"center"} marginRight= {"100px"}>
                        <Link to={"/auction"} style={{ textDecoration: "none", color: "#000000" }}>
                        <Icon icon="material-symbols:finance" color="#b3b9c4" width="24" height="24" />
                            Активные аукционы
                        </Link>
                    </Grid>
                </Typography>
            </Stack>
            <Stack gap={"93px"} direction={"row"}>
                <Typography variant="h1" textAlign={"center"}>
                    <Grid container  height={"100%"} alignItems={"center"} marginRight= {"20px"}>
                        <Link to={"/auction/create"} style={{ textDecoration: "none", color: "#000000" }}>
                        <Icon icon="uil:setting" color="#b3b9c4" width="24" height="24" />
                            Создать аукцион
                        </Link>
                    </Grid>
                </Typography>
            </Stack>
            
            <IconButton
                    onClick={(e) => {
                        localStorage.removeItem("jwt");
                        localStorage.removeItem("role");
                        window.location.reload();
                    }}
                    style={{ padding: 0, color: "#000000" }}
                >
                     <Typography variant="h1" textAlign={"center"}>                 
                        <Icon icon="solar:exit-bold" color="#b3b9c4" width="24" height="24" />
                           Выйти
                </Typography>
                </IconButton>
            </Grid>
            <Divider sx={{ width: '100%', backgroundColor: '#b3b9c4', paddingBottom: '0px', marginBottom:'0px'}} />
        </Grid>
    );
};

export default CollectorHeader;