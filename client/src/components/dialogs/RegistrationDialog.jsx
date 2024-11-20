// components/RegistrationDialog.js
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Button,
  TextField,
  Typography,
  IconButton,
  Grid,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";
import { registerArtist, registerCollector } from "../../api/authApi";

const RegistrationDialog = ({
  isOpen,
  onClose,
  onLoginClick,
}) => {
  const [validationErrors, setValidationErrors] = useState({});

  const [role, setRole] = useState("collector");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    surname: "",
    name: "",
    country: "",
    city: "",
    bio: "",
    login: "",
    email: "",
    password: "",
  });

  const handleRoleChange = (_event, newRole) => {
    setRole(newRole);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const displayError = (message) => {
    setErrorMessage(message);
    setError(true);
  };

  const onFinish = async () => {
    const userData = { role, ...formData };

    try {
      let response;
      if (role === "artist") {
        response = await registerArtist(userData);
      } else if (role === "collector") {
        response = await registerCollector(userData);
      }

      if (response && response.status === 201) {
        setErrorMessage("Регистрация успешно завершена!");
      } else {
        const errorMessage = response?.data?.error || "Ошибка регистрации!";
        displayError(errorMessage);
      }
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      const serverError =
        error.response?.data?.error ||
        "Ошибка при регистрации, попробуйте снова.";
      displayError(serverError);
    }
  };

  const isFormValid = 
  Object.values(validationErrors).every((error) => error === "") && // Все ошибки пусты
  Object.values(formData).every((value) => value.trim() !== "");    // Все поля заполнены

  const handleCancel = () => {
    setFormData({
      surname: "",
      name: "",
      country: "",
      city: "",
      bio: "",
      login: "",
      email: "",
      password: "",
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent
        sx={{
          padding: "24px",
          position: "relative",
          backgroundColor: "#f6f8fa",
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: "16px", top: "16px" }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", marginBottom: "8px" }}
        >
          Регистрация
        </Typography>
        <Typography variant="body2">
          Уже есть аккаунт?{" "}
          <Button
            onClick={onLoginClick}
            sx={{
              color: "#091E42",
              textTransform: "none",
              fontWeight: "bold",
              padding: 0,
            }}
          >
            Войти
          </Button>
        </Typography>

        <Tabs value={role} onChange={handleRoleChange} centered>
          <Tab value="artist" label="Художник" />
          <Tab value="collector" label="Коллекционер" />
        </Tabs>
        <Divider
          sx={{
            width: "100%",
            backgroundColor: "#b3b9c4",
            paddingBottom: "0px",
            marginBottom: "16px",
          }}
        />
        {/* Форма для Коллекционера и Художника */}
        <TextField
          fullWidth
          variant="outlined"
          label="Фамилия*"
          name="surname"
          error={!!validationErrors.surname}
          helperText={validationErrors.surname || " "}
          InputProps={{
            endAdornment: (
              <Tooltip
                title="Введите свою фамилию."
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
          value={formData.surname}
          onChange={(e) => {
            const { value } = e.target;

            // Пример встроенной валидации
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
                surname: "", // Сбрасываем ошибку, если валидация успешна
              }));
            }

            setFormData((prev) => ({
              ...prev,
              surname: value,
            }));
          }}
          sx={{ marginBottom: "16px" }}
        />

        <TextField
          fullWidth
          variant="outlined"
          label="Имя*"
          name="name"
          error={!!validationErrors.name}
          helperText={validationErrors.name || " "}
          InputProps={{
            endAdornment: (
              <Tooltip
                title="Введите свое имя."
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
          value={formData.name}
          onChange={(e) => {
            const { value } = e.target;

            // Пример встроенной валидации
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
                name: "", // Сбрасываем ошибку, если валидация успешна
              }));
            }

            setFormData((prev) => ({
              ...prev,
              name: value,
            }));
          }}
          sx={{ marginBottom: "16px" }}
        />
        {role === "collector" ? (
          <></>
        ) : (
          <>
            <TextField
  fullWidth
  variant="outlined"
  label="Страна*"
  name="country"
  error={!!validationErrors.country}
  helperText={validationErrors.country || " "}
  InputProps={{
    endAdornment: (
      <Tooltip
        title="Введите страну, где вы проживаете."
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
  value={formData.country}
  onChange={(e) => {
    const { value } = e.target;

    // Пример встроенной валидации
    if (!value.trim()) {
      setValidationErrors((prev) => ({
        ...prev,
        country: "Страна не может быть пустой",
      }));
    } else if (!/^[а-яА-ЯёЁa-zA-Z\s-]+$/.test(value)) {
      setValidationErrors((prev) => ({
        ...prev,
        country: "Страна может содержать только буквы, пробелы и дефисы",
      }));
    } else {
      setValidationErrors((prev) => ({
        ...prev,
        country: "", // Сбрасываем ошибку, если валидация успешна
      }));
    }

    setFormData((prev) => ({
      ...prev,
      country: value,
    }));
  }}
  sx={{ marginBottom: "16px" }}
/>

<TextField
  fullWidth
  variant="outlined"
  label="Город*"
  name="city"
  error={!!validationErrors.city}
  helperText={validationErrors.city || " "}
  InputProps={{
    endAdornment: (
      <Tooltip
        title="Введите город, в котором вы проживаете."
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
  value={formData.city}
  onChange={(e) => {
    const { value } = e.target;

    // Валидация города
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
        city: "", // Сбрасываем ошибку, если валидация успешна
      }));
    }

    setFormData((prev) => ({
      ...prev,
      city: value,
    }));
  }}
  sx={{ marginBottom: "16px" }}
/>

            <TextField
              fullWidth
              variant="outlined"
              label="Расскажите о себе"
              name="bio"
              multiline
              rows={3}
              InputProps={{
                endAdornment: (
                  <Tooltip
                    title="Напишите пару предложений о себе для зрителей."
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
              value={formData.bio}
              onChange={handleInputChange}
              sx={{ marginBottom: "16px" }}
            />
          </>
        )}

        {/* Поля для ввода логина, email и пароля */}
        <TextField
  fullWidth
  variant="outlined"
  label="Логин*"
  name="login"
  error={!!validationErrors.login}
  helperText={validationErrors.login || " "}
  InputProps={{
    endAdornment: (
      <Tooltip
        title="Придумайте уникальный логин. Логин должен состоять не более чем из 20 символов, а также содержать только цифры от 0 до 9 и латинские буквы."
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
  value={formData.login}
  onChange={(e) => {
    const { value } = e.target;

    // Валидация логина
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
        login: "", // Сбрасываем ошибку, если валидация успешна
      }));
    }

    setFormData((prev) => ({
      ...prev,
      login: value,
    }));
  }}
  sx={{ marginBottom: "16px" }}
/>

<TextField
  fullWidth
  variant="outlined"
  label="Email*"
  name="email"
  type="email"
  error={!!validationErrors.email}
  helperText={validationErrors.email || " "}
  InputProps={{
    endAdornment: (
      <Tooltip
        title="Введите свой адрес электронной почты (он должен использоваться на платформе впервые)."
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
  value={formData.email}
  onChange={(e) => {
    const { value } = e.target;

    // Валидация email
    if (!value.trim()) {
      setValidationErrors((prev) => ({
        ...prev,
        email: "Email не может быть пустым",
      }));
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) // Регулярное выражение для проверки email
    ) {
      setValidationErrors((prev) => ({
        ...prev,
        email: "Введите корректный адрес электронной почты",
      }));
    } else {
      setValidationErrors((prev) => ({
        ...prev,
        email: "", // Сбрасываем ошибку, если валидация успешна
      }));
    }

    setFormData((prev) => ({
      ...prev,
      email: value,
    }));
  }}
  sx={{ marginBottom: "16px" }}
/>

<TextField
  fullWidth
  variant="outlined"
  label="Пароль*"
  name="password"
  type="password"
  error={!!validationErrors.password}
  helperText={validationErrors.password || " "}
  InputProps={{
    endAdornment: (
      <Tooltip
        title="Придумайте уникальный пароль. Пароль должен состоять не более чем из 20 символов, а также содержать цифры от 0 до 9 и латинские буквы. Запомните свой пароль!"
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
    const { value } = e.target;

    // Валидация пароля
    if (!value.trim()) {
      setValidationErrors((prev) => ({
        ...prev,
        password: "Пароль не может быть пустым",
      }));
    } else if (value.length > 20) {
      setValidationErrors((prev) => ({
        ...prev,
        password: "Пароль не может быть длиннее 20 символов",
      }));
    } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
      setValidationErrors((prev) => ({
        ...prev,
        password: "Пароль может содержать только латинские буквы и цифры",
      }));
    } else {
      setValidationErrors((prev) => ({
        ...prev,
        password: "", // Сбрасываем ошибку, если валидация успешна
      }));
    }

    setFormData((prev) => ({
      ...prev,
      password: value,
    }));
  }}
  sx={{ marginBottom: "16px" }}
/>

        <Typography
          variant="body2"
          sx={{
            marginBottom: "24px",
            fontSize: "12px",
            marginLeft: "10px",
            marginTop: "10px",
            color: "#42526D",
          }}
        >
          Поля, помеченные "*" обязательны для заполнения
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

        <Grid container justifyContent="space-between">
          <Button
            variant="outlined"
            onClick={handleCancel}
            sx={{ borderColor: "#dcdcdc", color: "#333" }}
          >
            Отмена
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onFinish}
            
            sx={{ color: "#fff", backgroundColor: "#091E42" }}
          >
            Создать
          </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationDialog;
