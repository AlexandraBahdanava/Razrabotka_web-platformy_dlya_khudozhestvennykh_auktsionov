import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { Avatar, Grid, IconButton, TextField, Typography, Alert, Snackbar, Button, Input } from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/EditOutlined";
import ArtistHeader from './../../components/headers/ArtistHeader';
import { Link } from 'react-router-dom';
import { Icon } from "@iconify/react";
import { useParams } from "react-router-dom";
import { getArtist, updateArtist, updateAvatar } from '../../api/artistApi';
import { addPortfolio } from "../../api/portfolioApi";
import ArtistEditForm from "./../../components/forms/ArtistEditForm";
import ScrollMenu from "../../components/ScrollMenu";

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

const ArtistEditPage = () => {
    const theme = useTheme();

    const { id } = useParams();

    const [readonly, setReadonly] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [artistData, setArtistData] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);

    const [image, setImage] = useState(undefined);

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const loadData = async (id) => {
            const response =  await getArtist(id)

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

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
      };
    
      const handleAddToPortfolio = async () => {
        if (!selectedFile) {
            displayError("Ошибка при загрузке файла");
          return;
        }
    
        const formData = new FormData();
formData.append("artistId", id); // Добавляем artistId
formData.append("photo", selectedFile);

try {
    console.log(formData.append.selectedFile);
    // Выполнить запрос на добавление в портфолио
    await addPortfolio(formData);
    // Обновить данные художника после успешного добавления
    const updatedResponse = await getArtist(id);
    setArtistData(updatedResponse.data);
    // Очистить выбранный файл
    setSelectedFile(null);
} catch (error) {
    console.error("Ошибка при добавлении в портфолио", error);
    // Обработать ошибку (показать сообщение и т. д.)
}
      }

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
      console.log("Applying changes with data:", updatedArtistData);

      console.log(updatedArtistData);
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
            <Grid
                item
                flexDirection={"column"}
                alignItems={"flex-start"}
                maxWidth={"100%"}
                flexGrow={1}
                bgcolor={"#FFFFFF"}
            >
                <Grid
                    item
                    mt={"40px"}
                    pb={"46px"}
                    sx={{
                        paddingLeft: { xs: "1px", md: "33px", lg: "150px" },
                        marginTop: { xs: "0", md: "40px" },
                    }}
                >
                    <Grid
                         container direction="row"
                        alignItems={editMode ? "center" : "flex-start"}
                        sx={{ paddingLeft: { xs: "1px", md: "46px", lg: "0px" }, gap: { xs: "5px", md: "50px" } }}
                    >                 
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
                        {!editMode ? (
                          <Grid  container direction="row">
                              <div >
                              {/* Имя художника */}
                              <Typography
                                variant="h2"
                                sx={{ fontSize: { xs: "24px", md: "30px" }, fontWeight: "medium" }}
                              >
                                {artistData.name}
                              </Typography>
                              {/* Страна и город */}
                              <Typography
                                variant="h1"
                                sx={{ color: "#7A8699" }}
                              >
                                {`${artistData.country}, ${artistData.city}`}
                              </Typography>
                            </div>
                                    <IconButton style={{ padding: 0, color: "#000000" }} onClick={() => setEditMode(true)}>
                                        <Typography variant="h1" textAlign={"top"}>
                                          <Grid container height={"100%"} alignItems={"center"}  border= {"1px solid #b3b9c4"}  
                                          borderRadius= {"31px"} marginLeft= {"100px"} paddingLeft= {"10px"} paddingRight= {"0px"} paddingTop={"10px"} paddingBottom={"10px"}>        
                                              <Icon icon="uil:setting" color="#b3b9c4" width="24" height="24" />
                                              Настройки
                                          </Grid>
                                        </Typography>
                                    </IconButton>
                                </Grid>
                        ) : (
                            <Button 
                             component="label"
                            variant="outlined"
                            sx={{
                              padding: "10px",
                                color: "#000000", // цвет текста
                                borderRadius: "31px", // закругленные углы
                                borderColor: "#000000", // цвет обводки
                                borderWidth: "2px", // толщина обводки
                                '&:hover': {
                                    backgroundColor: "rgba(0, 0, 0, 0.1)", // цвет при наведении
                                },
                            }}>
                                {image !== undefined ? image.name : "ВЫБРАТЬ ФАЙЛ"}
                                <VisuallyHiddenInput
                                    type="file"
                                    name="avatar"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    accept="image/png"
                                />
                            </Button>
                        )}
                    </Grid>
                    {!editMode ? (
                        <>
                            <Grid
                                container
                                item
                                flexDirection={"column"}
                                sx={{
                                    paddingLeft: { xs: "1px", md: "46px", lg: "0px" },
                                    marginTop: { xs: "10px", md: "50px" },
                                }}
                            >
                              <ScrollMenu/>
                                <Grid container item flexDirection={"column"} gap={"25px"} maxWidth={"100%"}>
                                    <TextField
                                        variant="standard"
                                        value={artistData.about_artist ?? ""}
                                        InputProps={{
                                            readOnly: true,
                                            sx: {
                                                fontSize: { xs: "20px", md: "24px" },
                                                borderColor: theme.palette.primary.main,
                                                borderWidth: "2px", // толщина обводки
                                            },
                                        }}
                                        sx={{
                                            "& .MuiInput-underline:before": {
                                                borderBottomColor: theme.palette.primary.main,
                                            },
                                            "& .MuiInput-underline:after": {
                                                borderBottomColor: theme.palette.primary.main,
                                            },
                                        }}
                                    />
                                </Grid>
                                <div id="portfolio" className="scroll-section">
      <Typography variant="h2" className="section-heading">
        Портфолио
      </Typography>
      {artistData.Portfolio && artistData.Portfolio.length > 0 ? (
        <Grid
          container
          item
          spacing={2}
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ maxWidth: "100%", marginY: theme.spacing(2) }}
        >
          {artistData.Portfolios.map((item) => (
            <Grid key={item.id} item xs={6} md={4} lg={3}>
              <img
                src={item.imageUrl}
                alt={`Портфолио ${item.id}`}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div>
          <Typography>Здесь пока ничего нет</Typography>
        </div>
      )}
      <Input
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
        inputProps={{ accept: "image/*" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => document.querySelector("input[type='file']").click()}
      >
        Выбрать файл
      </Button>
      <Button variant="contained" color="primary" onClick={handleAddToPortfolio}>
        Добавить в портфолио
      </Button>
    </div>
                            </Grid>
                            {" "}
                        </>
                    ) : (
                        <ArtistEditForm
                            artistData={artistData}
                            cancelHandler={() => setEditMode(false)}
                            applyCallback={applyChanges}
                        />
                    )}
                </Grid>
            </Grid>
            <Snackbar open={error} autoHideDuration={6000} onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} severity="error" sx={{ width: "100%" }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Grid>
    );
};
export default ArtistEditPage;
