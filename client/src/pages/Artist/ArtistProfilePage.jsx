import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import {
  Avatar,
  Grid,
  IconButton,
  Stack,
  Rating,
  Typography,
  Alert,
  Snackbar,
  Button,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ArtistHeader from "./../../components/headers/ArtistHeader";
import { Icon } from "@iconify/react";
import { useParams } from "react-router-dom";
import { getArtist, updateArtist } from "../../api/artistApi";
import { addPortfolio } from "../../api/portfolioApi";
import ArtistEditForm from "./../../components/forms/ArtistEditForm";
import Footer from "../../components/Footer";
import AddPortfolioForm from "../../components/forms/AddPortfolioForm";

const ArtistProfilePage = () => {
  const theme = useTheme();

  const { id } = useParams();

  const [readonly, setReadonly] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [artistData, setArtistData] = useState({});
  const [showAddPortfolioForm, setShowAddPortfolioForm] = useState(false);


  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const response = await getArtist(id);

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

  const createPortfolio = async (portfolioData) => {
    const response = await addPortfolio(portfolioData);

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
      displayError("Ошибка при создании аукциона. Код: " + response.status);
      return;
    }

    // navigate("/");
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
  };

  const displayAddPortfolioForm = () => {
    setShowAddPortfolioForm(true);
  };
  return (
    <Grid
      container
      item
      flexDirection={"column"}
      alignItems={"flex-start"}
      maxWidth={"100%"}
      bgcolor={"#FFFFFF"}
    >
      <ArtistHeader />
      <Grid container item flexDirection={"column"} alignItems={"flex-start"}>
        <Grid
          item
          mt={"40px"}
          pb={"46px"}
          width={"100%"}
          sx={{
            paddingLeft: { xs: "1px", md: "33px", lg: "30px" },
          }}
        >
          <Grid
            container
            direction="row"
            alignItems={editMode ? "center" : "flex-start"}
            sx={{
              paddingLeft: { xs: "1px", md: "46px", lg: "30px" },
              gap: { xs: "5px", md: "50px" },
            }}
          >
            <Avatar
              src={
                artistData.id !== undefined
                  ? artistData.photo
                  : "" /* Путь к стандартной иконке, если нет аватара */
              }
              variant="circular"
              sx={{
                width: { xs: 80, md: 120 } /* Размеры круглого аватара */,
                height: { xs: 80, md: 120 },
                marginRight: "20px" /* Отступ между аватаром и именем */,
              }}
            />
            <Grid padding="30px 0">
              {/* Имя художника */}
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "24px", md: "30px" },
                  fontWeight: "medium",
                }}
              >
                {artistData.name}
              </Typography>
              {/* Страна и город */}
              <Typography variant="h1" sx={{ color: "#7A8699" }}>
                {`${artistData.country}, ${artistData.city}`}
              </Typography>
            </Grid>
            {localStorage.getItem("role") === "artist" ? (
              <IconButton
                style={{ padding: 0, color: "#000000" }}
                onClick={() => setEditMode(true)}
              >
                <Typography variant="h1" textAlign={"top"}>
                  <Grid
                    container
                    height={"100%"}
                    alignItems={"center"}
                    border={"1px solid #b3b9c4"}
                    marginLeft={"20px"}
                    marginTop={"30px"}
                    borderRadius={"31px"}
                    paddingLeft={"10px"}
                    paddingRight={"10px"}
                    paddingTop={"10px"}
                    paddingBottom={"10px"}
                  >
                    <Icon
                      icon="uil:setting"
                      color="#b3b9c4"
                      width="24"
                      height="24"
                    />
                    Настройки
                  </Grid>
                </Typography>
              </IconButton>
            ) : (
              <></>
            )}
          </Grid>
          {!editMode ? (
            <>
              <Grid
                container
                item
                flexDirection={"column"}
                justifyContent="center"
                alignItems="center"
                sx={{
                  maxWidth: "100%",
                  paddingLeft: { xs: "1px", md: "46px", lg: "0px" },
                  marginTop: { xs: "10px", md: "50px" },
                }}
              >
                <Grid
                  container
                  item
                  flexDirection={"column"}
                  gap={"25px"}
                  maxWidth={"100%"}
                  marginTop={"20px"}
                  marginBottom={"50px"}
                >
                  <Typography
                    fullWidth // Растягивает на всю ширину контейнера
                    multiline // Позволяет вводить многострочный текст
                    marginRight={"30px"}
                  >
                    {`${artistData.about_artist}`}
                  </Typography>
                </Grid>
              </Grid>
              <div
                id="portfolio"
                className="scroll-section"
                justifyContent="center"
                alignItems="center"
                sx={{
                  maxWidth: "100%",
                }}
              >
                <Typography
                  variant="h2"
                  className="section-heading"
                  margin={"30px 0"}
                >
                  Портфолио
                </Typography>
                {showAddPortfolioForm ? (
                  <AddPortfolioForm
                    submitHandler={createPortfolio}
                    showAddPortfolioForm={setShowAddPortfolioForm}
                    cancelHandler={() => setShowAddPortfolioForm(true)}
                  />
                ) : (
                  <Grid
                    width={"100%"}
                    justifyContent="center"
                    alignItems="center"
                  >
                    {localStorage.getItem("role") === "artist" ? (
                      <Button
                        onClick={displayAddPortfolioForm}
                        variant="outlined"
                        sx={{
                          color: "#7A8699",
                          border: "2px solid #000000", // Ширина и цвет обводки
                          borderRadius: "4px", // Закругление углов (по желанию)
                        }}
                      >
                        Добавить работу в портфолио
                      </Button>
                    ) : (
                      <></>
                    )}
                    
                  </Grid>
                )}
                {artistData.Portfolios && artistData.Portfolios.length > 0 ? (
                  <Grid
                    container
                    item
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                    sx={{ maxWidth: "100%", marginY: theme.spacing(2) }}
                  >
                    {artistData.Portfolios.map((item) => (
                      <Grid key={item.id} item xs={6} md={4} lg={3}>
                        <img
                          src={item.photo}
                          alt={`Портфолио ${item.id}`}
                          style={{
                            width: "100%",
                            height: "400px",
                            objectFit: "cover",
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <div>
                    <Typography>Здесь пока ничего нет</Typography>
                  </div>
                )}
                <Typography
                  variant="h2"
                  className="section-heading"
                  width={"100%"}
                  textAlign={"center"}
                  margin={"50px 0"}
                >
                  Отзывы
                </Typography>
                {artistData.Reviews && artistData.Reviews.length > 0 ? (
                  <Grid
                    container
                    item
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                    sx={{ maxWidth: "100%", marginY: theme.spacing(2) }}
                  >
                    {artistData.Reviews.map((item) => (
                      <Grid
                        key={item.id}
                        item
                        xs={6}
                        md={4}
                        lg={4}
                        container
                        margin={"0 50px"}
                        padding={"15px"}
                        gap={"8px"}
                        style={{
                          border: "1px solid #667085",
                          borderRadius: "10px",
                        }}
                      >
                        <Stack
                          direction={"row"}
                          justifyContent={"space-between"}
                          flexGrow={1}
                          sx={{ flexDirection: { xs: "column", md: "row" } }}
                        >
                          <Avatar
                            variant="circular"
                            sx={{ width: 30, height: 30 }}
                          />

                          <Typography
                            variant="h3"
                            height={"35px"}
                            sx={{ fontSize: { xs: "20px", md: "24px" } }}
                          >
                            {item.Collector.email}
                          </Typography>
                          <Rating
                            name="read-only"
                            value={item.rating}
                            readOnly
                            icon={<StarIcon style={{ color: "#091E42" }} />} // устанавливаем цвет заполненной звезды
                            emptyIcon={
                              <StarBorderIcon style={{ color: "#091E42" }} />
                            }
                          />
                        </Stack>
                        <Typography
                          variant="h1"
                          pl={"67px"}
                          width={"100%"}
                          sx={{ paddingLeft: { xs: "0", md: "67px" } }}
                        >
                          {item.text}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <div>
                    <Typography>Здесь пока ничего нет</Typography>
                  </div>
                )}
              </div>{" "}
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
      <Footer />
    </Grid>
  );
};
export default ArtistProfilePage;
