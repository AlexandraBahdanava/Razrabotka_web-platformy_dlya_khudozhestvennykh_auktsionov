import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import { TextField, Button, Grid, Typography, IconButton } from "@mui/material";
import { useFormik } from "formik";
import { addPortfolio, deletePortfolio } from "../../api/portfolioApi";
import { Icon } from "@iconify/react";
import ImageUploader from "../buttons/ImageUploaderButton";
import DeleteConfirmationDialog from "../dialogs/DeleteConfirmationDialog";

const EditPortfolioForm = ({ cancelHandler, refreshPortfolio, portfolios }) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [portfolioToDelete, setPortfolioToDelete] = useState(null);
    const isPortfolioFull = portfolios.length >= 12;
    const theme = useTheme();

    const displayError = (message) => {
      alert(message);
    };
  
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

        await refreshPortfolio(); 
        cancelHandler(); 
      } catch (error) {
        displayError("Произошла ошибка: " + error.message);
      }
    };
  
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

        await refreshPortfolio(); 
        setShowDeleteDialog(false); 
      } catch (error) {
        displayError("Произошла ошибка: " + error.message);
      }
    };
  
    const formik = useFormik({
      initialValues: {
        photo: "",
      },
      onSubmit: (values) => {
        createPortfolio(values);
      },
    });
  
    const baseURL = "http://localhost:3000";
  
    return (
      <form onSubmit={formik.handleSubmit}>
        {isPortfolioFull ? (
          <Grid
            container
            item
            gap={"15px"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
            margin={"30px"}
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
          <Grid margin={"30px"}>
            <ImageUploader
              maxImages={1}
              onSaveImage={(imagePath) =>
                formik.setFieldValue("photo", imagePath)
              }
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
                  НАЗАД
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
            {portfolios.map((item) => {
              const fullImageUrl = `${baseURL}${item.photo}`;
              return (
                <Grid key={item.id} item xs={6} md={4} lg={3}>
                  <div style={{ position: "relative" }}>
                    <img
                      src={fullImageUrl}
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
              );
            })}
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
  