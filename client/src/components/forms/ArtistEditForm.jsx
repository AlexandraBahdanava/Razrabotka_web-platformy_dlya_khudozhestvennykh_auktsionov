import React from "react";
import { Grid, Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import validateArtistEditData from "../../utils/validateEditData";
import { useNavigate } from "react-router-dom";

const ArtistEditForm = ({ artistData, cancelHandler, applyCallback }) => {
  const navigate = useNavigate();

  // Создаем форму с валидацией
  const formik = useFormik({
    initialValues: {
      name: artistData.name,
      country: artistData.country,
      city: artistData.city,
      bio: artistData.bio,
      avatar: artistData.avatar,
    },

    onSubmit: async (values) => {
      
      const updatedArtistData = {
        name: values.name,
        country: values.country !== "" ? values.country : null,
        city: values.city !== "" ? values.city : null,
        bio: values.bio !== "" ? values.bio : null,
        avatar: values.avatar,
      };
    
        applyCallback(updatedArtistData);
      // Переходим на главную страницу
      navigate("/");
    },
  });

  // Логирование каждого изменения в input полях
  const handleChangeWithLogging = (e) => {
    console.log(`Changed ${e.target.name}:`, e.target.value);
    formik.handleChange(e);
  };

  return (
    <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
      <Grid
        container
        item
        flexDirection={"column"}
        mt={"20px"}
        gap={"10px"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"100%"}
        sx={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          paddingLeft: { xs: "31px", md: "46px", lg: "0px" },
        }}
      >
        <Typography
          variant="h2"
          height={"69px"}
          display={"flex"}
          alignItems={"center"}
        >
          Данные профиля
        </Typography>
        <Grid
          container
          item
          maxWidth={"100%"}
          columnGap={"15px"}
          rowGap={"20px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid
            container
            item
            sx={{
              maxWidth: { xs: "259px", md: "246px", lg: "700px" },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              id="avatar"
              name="avatar"
              fullWidth
              variant="outlined"
              label="Вставьте ссылку на новый аватар"
              value={formik.values.avatar}
              onChange={handleChangeWithLogging}
              onBlur={formik.handleBlur}
              error={formik.touched.avatar && formik.errors.avatar !== undefined}
              helperText={
                formik.touched.avatar && formik.errors.avatar !== undefined
                  ? formik.errors.avatar
                  : ""
              }
              required
            />
            <TextField
              id="name"
              name="name"
              fullWidth
              variant="outlined"
              label="Имя"
              value={formik.values.name ?? ""}
              onChange={handleChangeWithLogging}
              onBlur={formik.handleBlur}
              error={formik.touched.name && formik.errors.name !== undefined}
              helperText={
                formik.touched.name && formik.errors.name !== undefined
                  ? formik.errors.name
                  : ""
              }
              required
            ></TextField>
            <TextField
              id="country"
              name="country"
              fullWidth
              variant="outlined"
              label="Страна"
              value={formik.values.country ?? ""}
              onChange={handleChangeWithLogging}
              onBlur={formik.handleBlur}
              error={formik.touched.country && formik.errors.country !== undefined}
              helperText={
                formik.touched.country && formik.errors.country !== undefined
                  ? formik.errors.country
                  : ""
              }
              required
            ></TextField>
            <TextField
              id="city"
              name="city"
              fullWidth
              variant="outlined"
              label="Город"
              value={formik.values.city ?? ""}
              onChange={handleChangeWithLogging}
              onBlur={formik.handleBlur}
              error={formik.touched.city && formik.errors.city !== undefined}
              helperText={
                formik.touched.city && formik.errors.city !== undefined
                  ? formik.errors.city
                  : ""
              }
              required
            ></TextField>
            <TextField
              id="bio"
              name="bio"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              label="О художнике"
              value={formik.values.bio ?? ""}
              onChange={handleChangeWithLogging}
              onBlur={formik.handleBlur}
              error={formik.touched.bio && formik.errors.bio !== undefined}
              helperText={
                formik.touched.bio && formik.errors.bio !== undefined
                  ? formik.errors.bio
                  : ""
              }
            ></TextField>
          </Grid>

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
      </Grid>
    </form>
  );
};

export default ArtistEditForm;
