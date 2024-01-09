import { Grid, TextField, Typography, Button } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import validateArtistData from "../../utils/validateArtistData";
import { useTheme } from "@emotion/react";
import { registerArtist } from "../../api/authApi";
import { useNavigate } from "react-router-dom";


const AvatarForm = ({ submitHandler }) => {
    const theme = useTheme();
}
export default AvatarForm;