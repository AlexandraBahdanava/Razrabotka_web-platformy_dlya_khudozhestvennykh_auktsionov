import React from "react";
import { TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";

const AddPortfolioForm = ({ submitHandler,cancelHandler }) => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            photo: "",
        },
        onSubmit: (values) => {
            submitHandler(values);
        },
    });

    return (
        
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
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
                    helperText={formik.touched.photo && formik.errors.photo !== undefined ? formik.errors.photo : ""}
                    required
                />
                <Button type="submit" variant="contained" fullWidth onClick={() => cancelHandler()}>
                <Link to={"/artiste"} style={{ textDecoration: "none", color: "#000000" }}>
                        Добавить в Портфолио
                        </Link>
                  
                </Button>
        </form>
    );
};

export default AddPortfolioForm;