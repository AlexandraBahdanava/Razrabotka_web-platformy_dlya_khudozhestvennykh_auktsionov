import { Grid, TextField, Typography, Button } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import InputMask from "react-input-mask";
import validateArtistData from "../../utils/validateArtistData";
import { useTheme } from "@emotion/react";
import { registerArtist } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

const ArtistInfoForm = ({ authData, errorHandler }) => {
    const theme = useTheme();

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            country: "",
            city: "",
            photo: "",
            about_artist: "",
        },
        validate: validateArtistData,
        onSubmit: (values) => {
            const artistData = {
                ...values,
                ...authData,
            };

            registerArtist(artistData).then((response) => {
                if (!response) {
                    errorHandler("Сервис временно недоступен");
                    return;
                }

                if (response.status >= 300) {
                    errorHandler("Ошибка при создании профиля художника. Код: " + response.status);
                    return;
                }

                navigate("/login");
            })
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container width={500} alignItems={"center"}>
                <Grid
                    container
                    item
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    paddingLeft={"139px"}
                    paddingRight={"139px"}
                    pt={"28px"}
                    pb={"31px"}
                    boxShadow={14}
                    borderRadius={4}
                    style={{ height: "600px", width: "100%" }}
                >
                    <Typography variant="h5">Расскажите о себе</Typography>
                    <TextField
                        sx={{
                            "& .MuiInput-underline:before": {
                                borderBottomColor: theme.palette.primary.main,
                            },
                            "& .MuiInput-underline:after": {
                                borderBottomColor: theme.palette.primary.main,
                            },
                        }}
                        id="name"
                        name="name"
                        fullWidth
                        variant="standard"
                        label="Имя"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && formik.errors.name !== undefined}
                        helperText={formik.touched.name && formik.errors.name !== undefined ? formik.errors.name : ""}
                        required
                    ></TextField>
                    <TextField
                        sx={{
                            "& .MuiInput-underline:before": {
                                borderBottomColor: theme.palette.primary.main,
                            },
                            "& .MuiInput-underline:after": {
                                borderBottomColor: theme.palette.primary.main,
                            },
                        }}
                        id="country"
                        name="country"
                        fullWidth
                        variant="standard"
                        label="Страна"
                        value={formik.values.country}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.country && formik.errors.country !== undefined}
                        helperText={
                            formik.touched.country && formik.errors.country !== undefined ? formik.errors.country : ""
                        }
                        required
                    ></TextField>
                    <TextField
                        sx={{
                            "& .MuiInput-underline:before": {
                                borderBottomColor: theme.palette.primary.main,
                            },
                            "& .MuiInput-underline:after": {
                                borderBottomColor: theme.palette.primary.main,
                            },
                        }}
                        id="city"
                        name="city"
                        fullWidth
                        variant="standard"
                        label="Город"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.city && formik.errors.city !== undefined}
                        helperText={formik.touched.city && formik.errors.city !== undefined ? formik.errors.city : ""}
                        required
                    ></TextField>
                    <TextField
                        sx={{
                            "& .MuiInput-underline:before": {
                                borderBottomColor: theme.palette.primary.main,
                            },
                            "& .MuiInput-underline:after": {
                                borderBottomColor: theme.palette.primary.main,
                            },
                        }}
                        id="photo"
                        name="photo"
                        fullWidth
                        variant="standard"
                        label="Ссылка на фото"
                        value={formik.values.photo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.photo && formik.errors.photo !== undefined}
                        helperText={formik.touched.photo && formik.errors.photo !== undefined ? formik.errors.photo : ""}
                        required
                    ></TextField>
                     <TextField
                        sx={{
                            "& .MuiInput-underline:before": {
                                borderBottomColor: theme.palette.primary.main,
                            },
                            "& .MuiInput-underline:after": {
                                borderBottomColor: theme.palette.primary.main,
                            },
                        }}
                        id="about_artist"
                        name="about_artist"
                        fullWidth
                        variant="standard"
                        multiline
                        rows={4}
                        label="О художнике"
                        value={formik.values.about_artist}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.about_artist && formik.errors.about_artist !== undefined}
                        helperText={
                            formik.touched.about_artist && formik.errors.about_artist !== undefined
                                ? formik.errors.about_artist
                                : ""
                        }
                    ></TextField>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        type="submit"
                        style={{ textTransform: "uppercase" }}
                    >
                        Зарегистрироваться
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default ArtistInfoForm;