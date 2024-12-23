import React, { useEffect, useState, useRef } from "react";
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
  Divider,
  Button,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ArtistHeader from "./../../components/headers/ArtistHeader";
import PublicHeader from "../../components/headers/PublicHeader";
import CollectorHeader from "../../components/headers/CollectorHeader";
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
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    const handleRoleChange = () => {
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("storage", handleRoleChange);
    return () => window.removeEventListener("storage", handleRoleChange);
  }, []);

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

  const renderHeader = () => {
    if (!role) {
      return <PublicHeader />;
    } else if (role === "artist") {
      return <ArtistHeader />;
    } else if (role === "collector") {
      return <CollectorHeader />;
    }
    return <PublicHeader />;
  };

  const [activeSection, setActiveSection] = useState("about"); // Активный пункт меню
  const [clicked, setClicked] = useState(false); // Статус, был ли клик
  const menuRef = useRef(null);

  const sections = [
    { id: "about", label: "Об авторе" },
    { id: "portfolio", label: "Портфолио" },
    // { id: "auctions", label: "Аукционы" },
    { id: "reviews", label: "Отзывы" },
  ];

  // Обработчик прокрутки
  const handleScroll = () => {
    if (clicked) return; // Если кнопка была нажата, не обновляем активную секцию при прокрутке

    const scrollPosition = window.scrollY;
    const sectionOffsets = sections.map(({ id }) => {
      const element = document.getElementById(id);
      return element ? element.offsetTop : 0;
    });

    const closestSectionIndex = sectionOffsets
      .reverse()
      .findIndex((offset) => scrollPosition >= offset);

    setActiveSection(
      closestSectionIndex === -1
        ? sections[0].id
        : sections.reverse()[closestSectionIndex].id
    );
  };

  // Устанавливаем состояние клика на кнопку
  const handleClick = (id) => {
    setActiveSection(id);
    setClicked(true); // Устанавливаем флаг клика
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections, clicked]); // Добавляем зависимость от clicked

  return (
    <Grid
      container
      item
      flexDirection={"column"}
      alignItems={"flex-start"}
      maxWidth={"100%"}
      bgcolor={"#FFFFFF"}
    >
      {renderHeader()}
      <Grid container item flexDirection={"column"} alignItems={"flex-start"}>
        <Grid item mt={"40px"} pb={"46px"} width={"100%"}>
          <Grid
            container
            direction="row"
            alignItems={editMode ? "center" : "flex-start"}
            sx={{
              paddingLeft: { xs: "1px", md: "20px", lg: "30px" },
              gap: { xs: "5px", md: "50px" },
            }}
          >
            <Avatar
              src={
                artistData.id !== undefined
                  ? artistData.avatar
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
                style={{
                  padding: "10px 20px", // Убираем лишние отступы внутри кнопки
                  color: "#000000",
                  border: "1px solid #b3b9c4", // Граница
                  borderRadius: "31px", // Закругление
                  marginLeft: "20px", // Внешний отступ слева
                  marginTop: "30px", // Внешний отступ сверху
                }}
                onClick={() => setEditMode(true)}
                sx={{
                  display: "flex", // Для выравнивания контента кнопки
                  alignItems: "center",
                  gap: "10px", // Расстояние между иконкой и текстом
                  "&:hover": {
                    backgroundColor: "rgba(179, 185, 196, 0.2)", // Полупрозрачный серый фон при наведении
                    borderColor: "#091E42", // Изменение цвета границы при наведении
                  },
                }}
              >
                <Icon
                  icon="uil:setting"
                  color="#b3b9c4"
                  width="24"
                  height="24"
                />
                <Typography fontSize={"14px"} color="#091E42">
                  Настройки
                </Typography>
              </IconButton>
            ) : (
              <></>
            )}
          </Grid>

          <div
            style={{
              position: "sticky",
              top: 0,
              margin: 0,
              padding: 0,
              zIndex: 1000, // Меню отображается поверх всех остальных элементов
            }}
          >
            {/* Фиксированное меню */}
            <nav
              ref={menuRef}
              style={{
                width: "100%",
                backgroundColor: "white",
              }}
            >
              <ul
                style={{
                  display: "flex",
                  justifyContent: "center", // Центрируем элементы по горизонтали
                  listStyle: "none",
                  margin: 0,
                  padding: "10px 0",
                }}
              >
                {sections.map(({ id, label }) => (
                  <li key={id} style={{ margin: "0 15px" }}>
                    {" "}
                    {/* Добавим отступы между кнопками */}
                    <a
                      href={`#${id}`}
                      style={{
                        textDecoration: "none",
                        color: activeSection === id ? "#091E42" : "#b3b9c4",
                        fontWeight: activeSection === id ? "bold" : "normal",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        backgroundColor:
                          activeSection === id
                            ? "rgba(9, 30, 66, 0.1)"
                            : "transparent",
                      }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <Divider
              sx={{
                width: "100%",
                backgroundColor: "#b3b9c4",
              }}
            />
          </div>
          {!editMode ? (
            <>
              {artistData.bio && (
                <Grid
                  container
                  item
                  id={"about"}
                  flexDirection={"column"}
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    paddingLeft: { xs: "1px", md: "20px", lg: "30px" },
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
                      {artistData.bio}
                    </Typography>
                  </Grid>
                </Grid>
              )}
              <div
                id="portfolio"
                className="scroll-section"
                justifyContent="center"
                alignItems="center"
                sx={{
                  maxWidth: "100%",
                  paddingLeft: { xs: "1px", md: "20px", lg: "30px" },
                }}
              >
                <Typography
                  variant="h2"
                  className="section-heading"
                  margin={"30px"}
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
                    sx={{
                      paddingLeft: { xs: "1px", md: "20px", lg: "30px" },
                    }}
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
                    sx={{
                      maxWidth: "100%",
                      marginY: theme.spacing(2),
                      paddingLeft: { xs: "1px", md: "20px", lg: "30px" },
                    }}
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
              </div>{" "}
              <div id="reviews">
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
                    sx={{
                      maxWidth: "100%",
                      marginY: theme.spacing(2),
                      paddingLeft: { xs: "1px", md: "20px", lg: "30px" },
                    }}
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
                    <Typography
                      sx={{
                        paddingLeft: { xs: "1px", md: "20px", lg: "30px" },
                      }}
                    >
                      Здесь пока ничего нет
                    </Typography>
                  </div>
                )}
              </div>
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
