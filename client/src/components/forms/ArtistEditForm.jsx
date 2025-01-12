import React, { useState } from "react";
import { Grid, Typography, TextField, Button, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../buttons/ImageUploaderButton";

const ArtistEditForm = ({ artistData, cancelHandler, applyCallback }) => {
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState({});

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: artistData.name,
    surname: artistData.surname,
    country: artistData.country,
    city: artistData.city,
    avatar: artistData.avatar,
    bio: artistData.bio,
    email: artistData.email,
    login: artistData.login,
    password: artistData.password,
  });

  const formik = useFormik({
    initialValues: {
      name: artistData.name,
      surname: artistData.surname,
      country: artistData.country,
      city: artistData.city,
      avatar: artistData.avatar,
      bio: artistData.bio,
      email: artistData.email,
      login: artistData.login,
      password: artistData.password,
    },

    onSubmit: async (values) => {
      if (!formik.isValid) {
        return; // Не продолжаем выполнение, если есть ошибки
      }
      const updatedArtistData = {
        name: values.name,
        surname: values.surname !== "" ? values.surname : null,
        country: values.country !== "" ? values.country : null,
        city: values.city !== "" ? values.city : null,
        avatar: values.avatar,
        bio: values.bio !== "" ? values.bio : null,
        email: values.email !== "" ? values.email : null,
        login: values.login !== "" ? values.login : null,
        password: values.password !== "" ? values.password : null,
      };

      applyCallback(updatedArtistData);
      navigate("/");
    },
  });

  const handleChangeWithLogging = (e) => {
    formik.handleChange(e);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  return (
    <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
      <Grid
        container
        spacing={2}
        sx={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Grid container flexDirection="column">
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#091E42",
              fontSize: "18px",
              marginBottom: "5px",
            }}
          >
            Личные данные
          </Typography>
          <Typography
            sx={{ fontSize: "14px", color: "#98A1B0", marginBottom: "40px" }}
          >
            Данные аккаунта, не отображаемые на странице.
          </Typography>
        </Grid>

        <Grid container flexDirection="column" gap="10px">
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#091E42",
              fontSize: "14px",
            }}
          >
            *Логин:
          </Typography>
          <TextField
            id="login"
            name="login"
            fullWidth
            variant="outlined"
            label="Введите логин"
            InputLabelProps={{
              sx: {
                color: "#42526D", // Цвет текста метки
                "&.Mui-focused": {
                  color: "#42526D", // Цвет текста активной метки
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <Tooltip
                  title="Введите новый логин. Логин должен состоять не более чем из 20 символов, а также содержать только цифры от 0 до 9 и латинские буквы."
                  PopperProps={{
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, 8], // Смещение подсказки, если нужно
                        },
                      },
                    ],
                  }}
                  componentsProps={{
                    tooltip: {
                      sx: {
                        backgroundColor: "#ffffff", // Белый фон
                        color: "#42526D", // Цвет текста
                        padding: "10px", // Внутренние отступы
                        fontSize: "14px", // Размер шрифта
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)", // Тень
                      },
                    },
                  }}
                >
                  <InfoIcon sx={{ color: "#b3b9c4" }} />
                </Tooltip>
              ),
            }}
            value={formData.login}
            onChange={(e) => {
              const { value } = e.target;

              if (!value.trim()) {
                setValidationErrors((prev) => ({
                  ...prev,
                  login: "Логин не может быть пустым",
                }));
              } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
                setValidationErrors((prev) => ({
                  ...prev,
                  login: "Логин может содержать только латинские буквы и цифры",
                }));
              } else if (value.length > 20) {
                setValidationErrors((prev) => ({
                  ...prev,
                  login: "Логин не может быть длиннее 20 символов",
                }));
              } else {
                setValidationErrors((prev) => ({
                  ...prev,
                  login: "",
                }));
              }

              setFormData((prev) => ({
                ...prev,
                login: value,
              }));
            }}
            onBlur={formik.handleBlur}
            error={!!validationErrors.login}
            helperText={validationErrors.login || " "}
            sx={{
              borderRadius: "8px",
              "& .MuiInputLabel-root": {
                fontSize: "14px", // Укажите размер шрифта
              },
            }}
          />
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#091E42",
              fontSize: "14px",
            }}
          >
            *Пароль:
          </Typography>
          <TextField
            id="password"
            name="password"
            fullWidth
            variant="outlined"
            label="Введите пароль"
            InputLabelProps={{
              sx: {
                color: "#42526D", // Цвет текста метки
                "&.Mui-focused": {
                  color: "#42526D", // Цвет текста активной метки
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <Tooltip
                  title="Введите новый пароль для аккаунта. Пароль должен состоять не более чем из 20 символов, а также содержать цифры от 0 до 9 и латинские буквы. Запомните свой пароль!"
                  PopperProps={{
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, 8], // Смещение подсказки, если нужно
                        },
                      },
                    ],
                  }}
                  componentsProps={{
                    tooltip: {
                      sx: {
                        backgroundColor: "#ffffff", // Белый фон
                        color: "#42526D", // Цвет текста
                        padding: "10px", // Внутренние отступы
                        fontSize: "0.875rem", // Размер шрифта
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)", // Тень
                      },
                    },
                  }}
                >
                  <InfoIcon sx={{ color: "#b3b9c4" }} />
                </Tooltip>
              ),
            }}
            value={formData.password}
            onChange={(e) => {
              const value = e.target.value;

              let error = "";
              if (!value.trim()) {
                error = "Пароль не может быть пустым";
              } else if (value.length > 20) {
                error = "Пароль не может быть длиннее 20 символов";
              } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
                error = "Пароль может содержать только латинские буквы и цифры";
              }

              setValidationErrors((prev) => ({
                ...prev,
                password: error,
              }));
              setFormData((prev) => ({
                ...prev,
                password: value,
              }));
            }}
            onBlur={formik.handleBlur}
            error={!!validationErrors.password}
            helperText={validationErrors.password || " "}
            sx={{
              borderRadius: "8px",
              "& .MuiInputLabel-root": {
                fontSize: "14px",
              },
            }}
          />
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#091E42",
              fontSize: "14px",
            }}
          >
            *Email:
          </Typography>
          <TextField
            id="email"
            name="email"
            fullWidth
            variant="outlined"
            label="Введите email"
            onBlur={formik.handleBlur}
            sx={{
              borderRadius: "8px",
              "& .MuiInputLabel-root": {
                fontSize: "14px", // Укажите размер шрифта
              },
            }}
            value={formData.email}
            onChange={(e) => {
              const { value } = e.target;

              if (!value.trim()) {
                setValidationErrors((prev) => ({
                  ...prev,
                  email: "Email не может быть пустым",
                }));
              } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                setValidationErrors((prev) => ({
                  ...prev,
                  email: "Введите корректный адрес электронной почты",
                }));
              } else {
                setValidationErrors((prev) => ({
                  ...prev,
                  email: "",
                }));
              }

              setFormData((prev) => ({
                ...prev,
                email: value,
              }));
            }}
            error={!!validationErrors.email}
            helperText={validationErrors.email || " "}
          />
          <Grid container justifyContent="center" alignItems="center">
            <Typography
              sx={{
                fontWeight: "bold",
                color: "#091E42",
                fontSize: "18px",
                marginTop: "10px",
                textAlign: "center", // Выравнивание текста по центру
              }}
            >
              Данные профиля
            </Typography>
          </Grid>

          <Typography
            sx={{
              fontWeight: "bold",
              color: "#091E42",
              fontSize: "14px",
            }}
          >
            *Имя:
          </Typography>
          <TextField
            id="name"
            name="name"
            fullWidth
            variant="outlined"
            label="Введите имя пользователя"
            onBlur={formik.handleBlur}
            sx={{
              borderRadius: "8px",
              "& .MuiInputLabel-root": {
                fontSize: "14px", // Укажите размер шрифта
              },
            }}
            value={formData.name}
            onChange={(e) => {
              const { value } = e.target;

              if (!value.trim()) {
                setValidationErrors((prev) => ({
                  ...prev,
                  name: "Имя не может быть пустым",
                }));
              } else if (!/^[а-яА-ЯёЁa-zA-Z]+$/.test(value)) {
                setValidationErrors((prev) => ({
                  ...prev,
                  name: "Имя может содержать только буквы",
                }));
              } else {
                setValidationErrors((prev) => ({
                  ...prev,
                  name: "",
                }));
              }

              setFormData((prev) => ({
                ...prev,
                name: value,
              }));
            }}
            error={!!validationErrors.name}
            helperText={validationErrors.name || " "}
          />
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#091E42",
              fontSize: "14px"
            }}
          >
            *Фамилия:
          </Typography>
          <TextField
            id="surname"
            name="surname"
            fullWidth
            variant="outlined"
            label="Введите фамилию"
            onBlur={formik.handleBlur}
            error={!!validationErrors.surname}
            helperText={validationErrors.surname || " "}
            sx={{
              borderRadius: "8px",
              "& .MuiInputLabel-root": {
                fontSize: "14px",
              },
            }}
            value={formData.surname}
            onChange={(e) => {
              const { value } = e.target;

              if (!value.trim()) {
                setValidationErrors((prev) => ({
                  ...prev,
                  surname: "Фамилия не может быть пустой",
                }));
              } else if (!/^[а-яА-ЯёЁa-zA-Z]+$/.test(value)) {
                setValidationErrors((prev) => ({
                  ...prev,
                  surname: "Фамилия может содержать только буквы",
                }));
              } else {
                setValidationErrors((prev) => ({
                  ...prev,
                  surname: "",
                }));
              }

              setFormData((prev) => ({
                ...prev,
                surname: value,
              }));
            }}
          />
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#091E42",
              fontSize: "14px",
            }}
          >
            *Страна:
          </Typography>
          <TextField
            id="country"
            name="country"
            fullWidth
            variant="outlined"
            label="Введите страну"
            onBlur={formik.handleBlur}
            error={!!validationErrors.country}
            helperText={validationErrors.country || " "}
            sx={{
              borderRadius: "8px",
              "& .MuiInputLabel-root": {
                fontSize: "14px", // Укажите размер шрифта
              },
            }}
            value={formData.country}
            onChange={(e) => {
              const { value } = e.target;

              if (!value.trim()) {
                setValidationErrors((prev) => ({
                  ...prev,
                  country: "Страна не может быть пустой",
                }));
              } else if (!/^[а-яА-ЯёЁa-zA-Z\s-]+$/.test(value)) {
                setValidationErrors((prev) => ({
                  ...prev,
                  country:
                    "Страна может содержать только буквы, пробелы и дефисы",
                }));
              } else {
                setValidationErrors((prev) => ({
                  ...prev,
                  country: "",
                }));
              }

              setFormData((prev) => ({
                ...prev,
                country: value,
              }));
            }}
          />
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#091E42",
              fontSize: "14px",
            
            }}
          >
            *Город:
          </Typography>
          <TextField
            id="city"
            name="city"
            fullWidth
            variant="outlined"
            label="Введите город"
            onBlur={formik.handleBlur}
            error={!!validationErrors.city}
            helperText={validationErrors.city || " "}
            sx={{
              borderRadius: "8px",
              "& .MuiInputLabel-root": {
                fontSize: "14px", // Укажите размер шрифта
              },
            }}
            value={formData.city}
            onChange={(e) => {
              const { value } = e.target;

              if (!value.trim()) {
                setValidationErrors((prev) => ({
                  ...prev,
                  city: "Город не может быть пустым",
                }));
              } else if (!/^[а-яА-ЯёЁa-zA-Z\s-]+$/.test(value)) {
                setValidationErrors((prev) => ({
                  ...prev,
                  city: "Город может содержать только буквы, пробелы и дефисы",
                }));
              } else {
                setValidationErrors((prev) => ({
                  ...prev,
                  city: "",
                }));
              }

              setFormData((prev) => ({
                ...prev,
                city: value,
              }));
            }}
          />

          <Typography
            sx={{
              fontWeight: "bold",
              color: "#091E42",
              fontSize: "14px",
            }}
          >
            О себе:
          </Typography>
          <TextField
            id="bio"
            name="bio"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            label="О себе"
            value={formik.values.bio ?? ""}
            onChange={handleChangeWithLogging}
            onBlur={formik.handleBlur}
            error={formik.touched.bio && formik.errors.bio !== undefined}
            helperText={
              formik.touched.bio && formik.errors.bio !== undefined
                ? formik.errors.bio
                : ""
            }
            sx={{
              background: "#F9FAFB",
              borderRadius: "8px",
              "& .MuiInputLabel-root": {
                fontSize: "14px", // Укажите размер шрифта
              },
            }}
          />
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#091E42",
              fontSize: "14px",
            }}
          >
            Аватар:
          </Typography>
          <ImageUploader
            onSaveImage={(imagePath) => {
              if (imagePath) {
                formik.setFieldValue("avatar", imagePath);
              }
            }}
          />
        </Grid>
        <Grid container sx={{ marginTop: "20px" }}>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#98A1B0",
              marginBottom: "24px",
              marginLeft: "10px",
              marginTop: "10px",
            }}
          >
            Поля, помеченные "*" обязательно должны быть заполнены
          </Typography>

          {error && (
            <Typography
              variant="body2"
              color="error"
              sx={{ marginBottom: "16px" }}
            >
              {errorMessage}
            </Typography>
          )}

          <Grid container justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              sx={{
                borderColor: "#dcdcdc",
                color: "#333",
                borderRadius: "8px",
                padding: "10px 20px",
                textTransform: "none",
                marginRight: "10px",
              }}
            >
              Сохранить
            </Button>
            <Button
              variant="contained"
              onClick={() => cancelHandler()}
              sx={{
                borderColor: "#dcdcdc",
                color: "#333",
                borderRadius: "8px",
                padding: "10px 20px",
                textTransform: "none",
              }}
            >
              Отмена
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default ArtistEditForm;
