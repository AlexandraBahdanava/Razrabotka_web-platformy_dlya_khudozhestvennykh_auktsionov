import React from "react";
import { Grid, Typography, TextField, Button, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../buttons/ImageUploaderButton";

const ArtistEditForm = ({ artistData, cancelHandler, applyCallback }) => {
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    login: Yup.string()
      .required("Логин не может быть пустым")
      .matches(
        /^[a-zA-Z0-9]+$/,
        "Логин может содержать только латинские буквы и цифры"
      )
      .max(20, "Логин не может быть длиннее 20 символов"),
    bio: Yup.string().nullable(),
    password: Yup.string()
      .required("Пароль не может быть пустым")
      .max(20, "Пароль не может быть длиннее 20 символов")
      .matches(
        /^[a-zA-Z0-9]+$/,
        "Пароль может содержать только латинские буквы и цифры"
      ),
    email: Yup.string()
      .required("Email не может быть пустым")
      .email("Введите корректный адрес электронной почты"),
    name: Yup.string()
      .required("Имя не может быть пустым")
      .matches(/^[а-яА-ЯёЁa-zA-Z]+$/, "Имя может содержать только буквы"),
    surname: Yup.string()
      .required("Фамилия не может быть пустой")
      .matches(/^[а-яА-ЯёЁa-zA-Z]+$/, "Фамилия может содержать только буквы"),
    country: Yup.string()
      .required("Страна не может быть пустой")
      .matches(
        /^[а-яА-ЯёЁa-zA-Z\s-]+$/,
        "Страна может содержать только буквы, пробелы и дефисы"
      ),
    city: Yup.string()
      .required("Город не может быть пустым")
      .matches(
        /^[а-яА-ЯёЁa-zA-Z\s-]+$/,
        "Город может содержать только буквы, пробелы и дефисы"
      ),
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
    validationSchema,
    onSubmit: async (values) => {
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

  const textFieldStyles = {
    borderRadius: "8px",
    "& .MuiInputLabel-root": {
      fontSize: "14px", // Размер шрифта метки
    },
    "& .MuiInputBase-root": {
      fontSize: "14px", // Размер текста ввода
    },
  };

  const labelStyles = {
    fontWeight: "bold",
    color: "#091E42",
    fontSize: "14px",
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
          <Typography sx={labelStyles}>*Логин:</Typography>
          <TextField
            id="login"
            name="login"
            label="Введите логин"
            fullWidth
            variant="outlined"
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
            value={formik.values.login}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.login && Boolean(formik.errors.login)}
            helperText={formik.touched.login && formik.errors.login}
            sx={textFieldStyles}
          />
          <Typography sx={labelStyles}>*Пароль:</Typography>
          <TextField
            id="password"
            name="password"
            label="Введите пароль"
            fullWidth
            variant="outlined"
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
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={textFieldStyles}
          />
          <Typography sx={labelStyles}>*Email:</Typography>
          <TextField
            id="email"
            name="email"
            label="Введите email"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              sx: {
                color: "#42526D", // Цвет текста метки
                "&.Mui-focused": {
                  color: "#42526D", // Цвет текста активной метки
                },
              },
            }}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={textFieldStyles}
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

          <Typography sx={labelStyles}>*Имя:</Typography>
          <TextField
            id="name"
            name="name"
            label="Введите имя пользователя"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              sx: {
                color: "#42526D", // Цвет текста метки
                "&.Mui-focused": {
                  color: "#42526D", // Цвет текста активной метки
                },
              },
            }}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            sx={textFieldStyles}
          />
          <Typography sx={labelStyles}>*Фамилия:</Typography>
          <TextField
            id="surname"
            name="surname"
            label="Введите фамилию"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              sx: {
                color: "#42526D", // Цвет текста метки
                "&.Mui-focused": {
                  color: "#42526D", // Цвет текста активной метки
                },
              },
            }}
            value={formik.values.surname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.surname && Boolean(formik.errors.surname)}
            helperText={formik.touched.surname && formik.errors.surname}
            sx={textFieldStyles}
          />
          <Typography sx={labelStyles}>*Страна:</Typography>
          <TextField
            id="country"
            name="country"
            label="Введите страну"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              sx: {
                color: "#42526D", // Цвет текста метки
                "&.Mui-focused": {
                  color: "#42526D", // Цвет текста активной метки
                },
              },
            }}
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.country && Boolean(formik.errors.country)}
            helperText={formik.touched.country && formik.errors.country}
            sx={textFieldStyles}
          />
          <Typography sx={labelStyles}>*Город:</Typography>
          <TextField
            id="city"
            name="city"
            label="Введите город"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              sx: {
                color: "#42526D", // Цвет текста метки
                "&.Mui-focused": {
                  color: "#42526D", // Цвет текста активной метки
                },
              },
            }}
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
            sx={textFieldStyles}
          />
          <Typography sx={labelStyles}>О себе:</Typography>
          <TextField
            id="bio"
            name="bio"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            label="О себе"
            value={formik.values.bio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.bio && Boolean(formik.errors.bio)}
            helperText={formik.touched.bio && formik.errors.bio}
            sx={textFieldStyles}
          />
          <Typography sx={labelStyles}>Аватар:</Typography>
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
