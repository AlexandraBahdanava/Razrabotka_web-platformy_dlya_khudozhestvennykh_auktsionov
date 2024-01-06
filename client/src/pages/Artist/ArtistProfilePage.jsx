import { useHistory } from 'react-router-dom';
import React, { useEffect, useMemo, useState } from "react";
import { useTheme } from "@emotion/react";
import {  Avatar, Grid, IconButton, TextField, Typography, Alert, Snackbar, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/EditOutlined";
import ArtistHeader from './../../components/headers/ArtistHeader';
import SettingsIcon from '@mui/icons-material/Settings';


import { getArtist,updateArtist, updateAvatar } from '../../api/artistApi';
import ArtistEditForm from "./../../components/forms/ArtistEditForm";

import moment from "moment";
import { useParams } from "react-router-dom";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const ArtistProfilePage = () => {
    const theme = useTheme();

    const { id } = useParams();

    const [readonly, setReadonly] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [artistData, setArtistData] = useState({});

    const [image, setImage] = useState(undefined);

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const loadData = async (id) => {
            const response = await getArtist(id)

            if (!response) {
                displayError("Сервис временно недоступен");
                return;
            }

            if (response.status === 401) {
                localStorage.removeItem("jwt");
                localStorage.removeItem("role");
                window.location.reload();
            }

            if (response.status >= 300) {
                displayError("Ошибка при загрузке профиля. Код: " + response.status);
                console.log(response);
                return;
            }

            setArtistData(response.data);
            setReadonly(id !== undefined);
        };

        loadData();
    }, [id]);

        const history = useHistory();
        const [isEditFormOpen, setIsEditFormOpen] = useState(false);
      
        // Обработчик для открытия страницы редактирования
        const handleOpenEditForm = () => {
          setIsEditFormOpen(true);
        };
      
        // Обработчик для закрытия страницы редактирования
        const handleCloseEditForm = () => {
          setIsEditFormOpen(false);
        };

    const displayError = (message) => {
        setErrorMessage(message);
        setError(true);
    };

    const closeSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setError(false);
    };

    const applyChanges = async (updatedArtistData) => {
        const response = await updateArtist(artistData.id, updatedArtistData);

        if (!response) {
            displayError("Сервис временно недоступен");
            return;
        }

        if (response.status === 401) {
            localStorage.removeItem("jwt");
            localStorage.removeItem("role");
            window.location.reload();
        }

        if (response.status >= 300) {
            displayError("Ошибка при изменении данных. Код: " + response.status);
            return;
        }

        const imageSuccess = await sendImage();

        if (imageSuccess) {
            setArtistData(response.data);
            setEditMode(false);
            window.location.reload();
        }
    };

    const sendImage = async () => {
        if (image === undefined) {
            return true;
        }

        const response = await updateAvatar(artistData.id, image);

        if (!response) {
            displayError("Сервис временно недоступен");
            return false;
        }

        if (response.status === 401) {
            localStorage.removeItem("jwt");
            localStorage.removeItem("role");
            window.location.reload();
        }

        if (response.status >= 300) {
            displayError("Ошибка при отправке изображения. Код: " + response.status);
            console.log(response);
            return false;
        }

        setImage(undefined);

        return true;
    };

    
    return (
        <Grid
          container
          item
          flexDirection={"column"}
          alignItems={"flex-start"}
          maxWidth={"1300px"}
          flexGrow={1}
          bgcolor={"#FFFFFF"}
        >
            <ArtistHeader/>
          {/* Верхняя строка с аватаром, именем, страной и городом */}
          <Grid
            container
            item
            mt={"40px"}
            sx={{
              alignItems: "center",
              paddingLeft: { xs: "23px", lg: "40px" },
              paddingRight: { xs: "23px", lg: "40px" },
            }}
          >
            {/* Аватар художника */}
            <Avatar
              src={artistData.id !== undefined
                ? `http://localhost:3000/api/artist/${artistData.id}/avatar?jwt=${localStorage.getItem("jwt")}`
                : "default-avatar.png" /* Путь к стандартной иконке, если нет аватара */}
              alt={artistData.name}
              variant="circular"
              sx={{
                width: { xs: 80, md: 120 }, /* Размеры круглого аватара */
                height: { xs: 80, md: 120 },
                marginRight: "20px", /* Отступ между аватаром и именем */
              }}
            />
            {/* Блок с именем, страной и городом */}
            <div>
              {/* Имя художника */}
              <Typography
                variant="h2"
                sx={{ fontSize: { xs: "24px", md: "30px" }, fontWeight: "bold" }}
              >
                {artistData.name}
              </Typography>
              {/* Страна и город */}
              <Typography
                variant="subtitle1"
                sx={{ fontSize: { xs: "18px", md: "24px" }, color: "#888888" }}
              >
                {`${artistData.country}, ${artistData.city}`}
              </Typography>
            </div>
      
            {/* Кнопка "Настройки" справа */}
            <Button
              variant="contained"
              color="primary"
              startIcon={<SettingsIcon />}
              sx={{ borderRadius: "20px", marginLeft: "auto" }}
              onClick={handleOpenEditForm}
            >
              Настройки
            </Button>
          </Grid>
      
          {/* ... (Ваш код с остальным контентом) */}
      
          {/* Модальное окно редактирования */}
          <ArtistEditForm open={isEditFormOpen} onClose={handleCloseEditForm} />
        </Grid>
      );     
    };

    export default ArtistProfilePage;