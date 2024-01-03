import React from "react";
import { Grid, TextField, Typography, Button,Radio, RadioGroup, FormControlLabel,  Select, MenuItem, FormControl, InputLabel  } from "@mui/material";
import { useFormik } from "formik";
import validateAuctionData from "../../utils/validateAuctionData";

const CreateAuctionForm = ({ submitHandler }) => {
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            genre: "",
            material: "",
            color: "",
            duration: "",
            starting_price: "",
            rate_step: "",
            bidding_rate: "",
            auto_renewal: "",
            tags: "",
        },
        validate: validateAuctionData,
        onSubmit: (values) => {
            submitHandler(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container item maxWidth={"500px"} width={"500px"} gap={"15px"} mt={"50px"}>
                <Grid container item height={"69px"} justifyContent={"center"} alignItems={"center"}>
                    <Typography variant="h2" textAlign={"center"}>
                        Создание аукциона
                    </Typography>
                </Grid>
                <TextField
                    id="title"
                    name="title"
                    fullWidth
                    variant="outlined"
                    label="Название"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && formik.errors.title !== undefined}
                    helperText={
                        formik.touched.title && formik.errors.title !== undefined ? formik.errors.title : ""
                    }
                    required
                />
                <TextField
                    id="description"
                    name="description"
                    fullWidth
                    variant="outlined"
                    label="Описание"
                    multiline
                    minRows={2}
                    maxRows={7}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.description && formik.errors.description !== undefined}
                    helperText={
                        formik.touched.description && formik.errors.description !== undefined
                            ? formik.errors.description
                            : ""
                    }
                />
                 <FormControl fullWidth>
                    <InputLabel id="genre-label">Жанр</InputLabel>
                    <Select
                        labelId="genre-label"
                        id="genre"
                        name="genre"
                        value={formik.values.genre}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.genre && formik.errors.genre !== undefined}
                        label="Жанр"
                    >
                        <MenuItem value="жанр1">Жанр 1</MenuItem>
                        <MenuItem value="жанр2">Жанр 2</MenuItem>
                        <MenuItem value="жанр3">Жанр 3</MenuItem>
                        <MenuItem value="жанр4">Жанр 4</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="material-label">Материал</InputLabel>
                    <Select
                        labelId="material-label"
                        id="material"
                        name="material"
                        value={formik.values.material}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.material && formik.errors.material !== undefined}
                        label="Материал"
                    >
                        <MenuItem value="жанр1">Материал 1</MenuItem>
                        <MenuItem value="жанр2">Материал 2</MenuItem>
                        <MenuItem value="жанр3">Материал 3</MenuItem>
                        <MenuItem value="жанр4">Материал 4</MenuItem>
                    </Select>
                </FormControl>
               <RadioGroup
                    aria-label="color"
                    name="color"
                    value={formik.values.color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.color && formik.errors.color !== undefined}
                >
                    <Typography variant="body1">Цвет:</Typography>
                    <FormControlLabel value="цвет1" control={<Radio />} label="Цвет 1" />
                    <FormControlLabel value="цвет2" control={<Radio />} label="Цвет 2" />
                    <FormControlLabel value="цвет3" control={<Radio />} label="Цвет 3" />
                    <FormControlLabel value="цвет4" control={<Radio />} label="Цвет 4" />
                </RadioGroup>
                    <RadioGroup
                    aria-label="duration"
                    name="duration"
                    value={formik.values.duration}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.duration && formik.errors.duration !== undefined}
                >
                    <Typography variant="body1">Длительность:</Typography>
                    <FormControlLabel value="1" control={<Radio />} label="1 день" />
                    <FormControlLabel value="3" control={<Radio />} label="3 дня" />
                    <FormControlLabel value="7" control={<Radio />} label="7 дней" />
                    <FormControlLabel value="12" control={<Radio />} label="12 дней" />
                </RadioGroup>
                <TextField
                    id="starting_price"
                    name="starting_price"
                    fullWidth
                    variant="outlined"
                    label="Начальная цена"
                    type="number"
                    value={formik.values.starting_price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.starting_price && formik.errors.starting_price !== undefined}
                    helperText={
                        formik.touched.starting_price && formik.errors.starting_price !== undefined
                            ? formik.errors.starting_price
                            : ""
                    }
                    required
                />
                <TextField
                    id="rate_step"
                    name="rate_step"
                    fullWidth
                    variant="outlined"
                    label="Шаг ставки"
                    type="number"
                    value={formik.values.rate_step}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.rate_step && formik.errors.rate_step !== undefined}
                    helperText={formik.touched.rate_step && formik.errors.rate_step !== undefined ? formik.errors.rate_step : ""}
                    required
                />
                <TextField
                    id="bidding_rate"
                    name="bidding_rate"
                    fullWidth
                    variant="outlined"
                    label="Ставка участника"
                    type="number"
                    value={formik.values.bidding_rate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.bidding_rate && formik.errors.bidding_rate !== undefined}
                    helperText={
                        formik.touched.bidding_rate && formik.errors.bidding_rate !== undefined
                            ? formik.errors.bidding_rate
                            : ""
                    }
                />
                <TextField
                    id="auto_renewal"
                    name="auto_renewal"
                    fullWidth
                    variant="outlined"
                    label="Автоматическое продление"
                    type="number"
                    value={formik.values.auto_renewal}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.auto_renewal && formik.errors.auto_renewal !== undefined}
                    helperText={
                        formik.touched.auto_renewal && formik.errors.auto_renewal !== undefined
                            ? formik.errors.auto_renewal
                            : ""
                    }
                />
                <TextField
                    id="tags"
                    name="tags"
                    fullWidth
                    variant="outlined"
                    label="Теги (через запятую)"
                    value={formik.values.tags}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.tags && formik.errors.tags !== undefined}
                    helperText={formik.touched.tags && formik.errors.tags !== undefined ? formik.errors.tags : ""}
                    required
                />
                <Button type="submit" variant="contained" fullWidth>
                    Создать аукцион
                </Button>
            </Grid>
        </form>
    );
};

export default CreateAuctionForm;
