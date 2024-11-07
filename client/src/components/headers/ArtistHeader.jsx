import React from "react";
import {
  IconButton,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import Logo from "./Logo.png";
import { Icon } from "@iconify/react";
import SearchBar from "./SearchBar";

const ArtistHeader = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid width={"100%"} paddingLeft={"0"}>
      <Grid
        container
        width={"100%"}
        height={"78px"}
        bgcolor={theme.palette.primary.main}
        pl={"50px"}
        justifyContent={"space-between"}
        alignItems={"center"}
        paddingBottom={"0"}
        paddingLeft={"50px"}
        paddingRight={"50px"}
      >
        {/* Логотип слева */}
        <Grid item>
          <img src={Logo} alt="Logo" width="100px" />
        </Grid>

        {/* Поисковая строка */}
        <Grid
          item
          sx={{ flexGrow: 1, maxWidth: "600px", mx: 2 }}
        >
          <SearchBar />
        </Grid>

        {/* Кнопки с равными отступами */}
        <Stack direction="row" spacing={5} alignItems="center" justifyContent="flex-end">
          {/* Кнопка Главная */}
          <Link
            to="/home"
            style={{
              textDecoration: "none",
              color: "#42526D",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Icon icon="maki:home" color="#42526D" width="18" height="18" />
            {!isSmallScreen && <span style={{ marginLeft: "8px" }}>Главная</span>}
          </Link>

          {/* Кнопка Профиль */}
          <Link
            to="/artist"
            style={{
              textDecoration: "none",
              color: "#42526D",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Icon icon="solar:user-bold"  color="#42526D" width="20" height="20" strokeWidth={3} />
            {!isSmallScreen && <span style={{ marginLeft: "8px" }}>Профиль</span>}
          </Link>

          {/* Кнопка Активные аукционы */}
          <Link
            to="/auction"
            style={{
              textDecoration: "none",
              color: "#42526D",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Icon icon="material-symbols:finance" color="#42526D" width="18" height="18" />
            {!isSmallScreen && <span style={{ marginLeft: "8px" }}>Активные аукционы</span>}
          </Link>

          {/* Кнопка Создать аукцион */}
          <Link
            to="/auction/create"
            style={{
              textDecoration: "none",
              color: "#42526D",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Icon icon="uil:setting" color="#42526D" width="18" height="18" />
            {!isSmallScreen && <span style={{ marginLeft: "8px" }}>Создать аукцион</span>}
          </Link>

          {/* Кнопка Выйти */}
          <IconButton
            onClick={(e) => {
              localStorage.removeItem("jwt");
              localStorage.removeItem("role");
              window.location.reload();
            }}
            style={{
              padding: 0,
              color: "#000000",
            }}
          >
            <Icon icon="solar:exit-bold" color="#42526D" width="18" height="18" />
            {!isSmallScreen && (
              <Typography style={{ color: "#42526D", fontSize: "14px", marginLeft: "8px" }}>
                Выйти
              </Typography>
            )}
          </IconButton>
        </Stack>
      </Grid>

      <Divider
        sx={{
          width: "100%",
          backgroundColor: "#b3b9c4",
        }}
      />
    </Grid>
  );
};

export default ArtistHeader;
