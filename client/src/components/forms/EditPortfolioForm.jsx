import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useFormik } from "formik";
import { addPortfolio, deletePortfolio } from "../../api/portfolioApi";
import { Icon } from "@iconify/react";
import DeleteConfirmationDialog from "../dialogs/DeleteConfirmationDialog";

const EditPortfolioForm = ({ cancelHandler, refreshPortfolio, portfolios }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [portfolioToDelete, setPortfolioToDelete] = useState(null);
  const isPortfolioFull = portfolios.length >= 12;
  const theme = useTheme();

  // Метод для отображения ошибки
  const displayError = (message) => {
    alert(message);
  };

  // Метод для создания портфолио
  const createPortfolio = async (portfolioData) => {
    try {
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
        displayError("Ошибка при создании портфолио. Код: " + response.status);
        return;
      }

      alert("Портфолио успешно добавлено!");
      await refreshPortfolio(); // Обновляем данные портфолио
      cancelHandler(); // Закрыть форму после успешного добавления
    } catch (error) {
      displayError("Произошла ошибка: " + error.message);
    }
  };

  // Метод для удаления портфолио
  const handleDeletePortfolio = async () => {
    try {
      const response = await deletePortfolio(portfolioToDelete);

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
        displayError("Ошибка при удалении портфолио. Код: " + response.status);
        return;
      }

      alert("Портфолио успешно удалено!");
      await refreshPortfolio(); // Обновляем данные портфолио
      setShowDeleteDialog(false); // Закрыть окно подтверждения
    } catch (error) {
      displayError("Произошла ошибка: " + error.message);
    }
  };

  // Инициализация Formik
  const formik = useFormik({
    initialValues: {
      photo: "",
    },
    onSubmit: (values) => {
      createPortfolio(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
      {isPortfolioFull ? (
        <Grid
          container
          item
          gap={"15px"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"100%"}
        >
          <Typography variant="body1" color="error">
            Вы не можете добавить больше 12 работ в портфолио.
          </Typography>
          <Grid container item sx={{ width: "136px" }}>
            <Button variant="contained" onClick={() => cancelHandler()}>
              НАЗАД
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Grid>
          <TextField
            id="photo"
            name="photo"
            fullWidth
            variant="outlined"
            label="Вставьте ссылку на изображение"
            value={formik.values.photo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.photo && formik.errors.photo !== undefined}
            helperText={
              formik.touched.photo && formik.errors.photo !== undefined
                ? formik.errors.photo
                : ""
            }
            required
            sx={{ marginBottom: "16px" }}
          />
          <Grid
            container
            item
            gap={"15px"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
          >
            <Grid container item sx={{ width: "136px" }}>
              <Button type="submit" variant="contained">
                СОХРАНИТЬ
              </Button>
            </Grid>
            <Grid container item sx={{ width: "136px" }}>
              <Button variant="contained" onClick={() => cancelHandler()}>
                ОТМЕНА
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}

      {portfolios && portfolios.length > 0 ? (
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
            marginBottom: "50px",
          }}
        >
          {portfolios.map((item) => (
            <Grid key={item.id} item xs={6} md={4} lg={3}>
              <div style={{ position: "relative" }}>
                <img
                  src={item.photo}
                  alt={`Портфолио ${item.id}`}
                  style={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                  }}
                />
                <IconButton
                  onClick={() => {
                    setPortfolioToDelete(item.id);
                    setShowDeleteDialog(true);
                  }}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    backgroundColor: "rgba(255, 255, 255, 0.7)", // Светлый фон
                    color: "black", // Черный цвет иконки
                    padding: "10px",
                    borderRadius: "50%",
                  }}
                >
                  <Icon
                    icon="mdi:delete"
                    color="#42526D"
                    width="18"
                    height="18"
                  />
                </IconButton>
              </div>
            </Grid>
          ))}
        </Grid>
      ) : (
        <div>
          <Typography>Здесь пока ничего нет</Typography>
        </div>
      )}

      <DeleteConfirmationDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeletePortfolio}
      />
    </form>
  );
};

export default EditPortfolioForm;
