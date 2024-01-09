import { Grid, TextField, Typography, Button } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import InputMask from "react-input-mask";
import validateCollectorData from "../../utils/validateCollectorData";
import { useTheme } from "@emotion/react";
import { registerCollector } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

const CollectorInfoForm = ({ authData, errorHandler }) => {
    const theme = useTheme();

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            contactPhone: "",
        },
        validate: validateCollectorData,
        onSubmit: (values) => {
            const collectorData = {
                name: values.name,
                ...authData,
                    phone: values.contactPhone,
            };

            registerCollector(collectorData).then((response) => {
                if (!response) {
                    errorHandler("Сервис временно недоступен");
                    return;
                }

                if (response.status >= 300) {
                    errorHandler("Ошибка при создании компании. Код: " + response.status);
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
                    style={{ height: "580px", width: "100%" }}
                >
                    <Typography variant="h5">Расскажите о себе</Typography>
                    <InputMask
                        mask="+375(99)999-99-99"
                        value={formik.values.contactPhone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        {() => (
                            <TextField
                                sx={{
                                    "& .MuiInput-underline:before": {
                                        borderBottomColor: theme.palette.primary.main,
                                    },
                                    "& .MuiInput-underline:after": {
                                        borderBottomColor: theme.palette.primary.main,
                                    },
                                }}
                                id="contactPhone"
                                name="contactPhone"
                                fullWidth
                                variant="standard"
                                label="Номер телефона"
                                value={formik.values.contactPhone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.contactPhone && formik.errors.contactPhone !== undefined}
                                helperText={
                                    formik.touched.contactPhone && formik.errors.contactPhone !== undefined
                                        ? formik.errors.contactPhone
                                        : ""
                                }
                                required
                            ></TextField>
                        )}
                    </InputMask>
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

export default CollectorInfoForm;