import React from "react";
import { Grid, Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import validateArtistEditData from "../../utils/validateArtistEditData";

const ArtistEditForm = ({ artistData, cancelHandler, applyCallback }) => {
    const formik = useFormik({
        initialValues: {
            name: artistData.name,
            country: artistData.country,
            city: artistData.city,
            about_artist: artistData.about_artist,
        },

        validate: validateArtistEditData,
        onSubmit: async (values) => {
            const updatedArtistData = {
                id: artistData.id,
                name: values.name,
                country: values.country !== "" ? values.country : null,
                city: values.city !== "" ? values.city : null,
                about_artist: values.about_artist !== "" ? values.about_artist : null,
            };

            applyCallback(updatedArtistData);
        },
    });

    return (
        
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <Grid
                container
                item
                flexDirection={"column"}
                mt={"20px"}
                gap={"10px"}
                sx={{
                    width: { xs: "290px", md: "570px", lg: "768px" },
                    paddingLeft: { xs: "31px", md: "46px", lg: 0 },
                }}
            >        
                <Typography variant="h2" height={"69px"} display={"flex"} alignItems={"center"}>
                    Данные профиля
                </Typography>
                <Grid container item maxWidth={"768px"} columnGap={"15px"} rowGap={"20px"}>
                    <Grid container item sx={{ maxWidth: { xs: "259px", md: "246px" } }}>
                    <TextField
                        id="name"
                        name="name"
                        fullWidth
                        variant="outlined"
                        label="Имя"
                        value={formik.values.name ?? ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && formik.errors.name !== undefined}
                        helperText={formik.touched.name && formik.errors.name !== undefined ? formik.errors.name : ""}
                        required
                    ></TextField>
                    <TextField
                        id="country"
                        name="country"
                        fullWidth
                        variant="outlined"
                        label="Страна"
                        value={formik.values.country ?? ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.country && formik.errors.country !== undefined}
                        helperText={
                            formik.touched.country && formik.errors.country !== undefined ? formik.errors.country : ""
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
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.city && formik.errors.city !== undefined}
                        helperText={formik.touched.city && formik.errors.city !== undefined ? formik.errors.city : ""}
                        required
                    ></TextField>
                     <TextField
                        id="about_artist"
                        name="about_artist"
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={4}
                        label="О художнике"
                        value={formik.values.about_artist ?? ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.about_artist && formik.errors.about_artist !== undefined}
                        helperText={
                            formik.touched.about_artist && formik.errors.about_artist !== undefined
                                ? formik.errors.about_artist
                                : ""
                        }
                    ></TextField>
                    </Grid>
                    <Grid container item gap={"15px"}>
                    <Grid container item gap={"15px"}>
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
            </Grid>
        </form>
    );
};

export default ArtistEditForm;