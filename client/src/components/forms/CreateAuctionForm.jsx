import {
  Grid,
  TextField,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useFormik } from "formik";
import validateAuctionData from "../../utils/validateAuctionData";
import React from "react";
import * as Yup from "yup";
import ImageUploader from "../buttons/ImageUploaderButton";

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
      bidding: "",
      bidding_rate: "",
      auto_renewal: "",
      tags: "",
      photo: "",
    },
    validate: validateAuctionData,
    onSubmit: (values) => {
      submitHandler(values);
    },
  });

  // Схема валидации
  const validationSchema = Yup.object({
    bidding: Yup.string().required("Выберите возможность биддинга"),
    bidding_rate: Yup.number()
      .when("bidding", {
        is: "1", // Если выбрано "да"
        then: Yup.number()
          .required("Введите цену биддинга")
          .min(1, "Цена должна быть больше 0"),
        otherwise: Yup.number().notRequired(),
      })
      .typeError("Цена должна быть числом"),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        item
        maxWidth={"700px"}
        width={"700px"}
        gap={"15px"}
        mt={"50px"}
        marginBottom={"50px"}
      >
        <Grid
          container
          item
          height={"69px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="h2" textAlign={"center"}>
            Создание аукциона
          </Typography>
        </Grid>
        <Typography variant="body1" style={{ marginRight: "10px" }}>
          Заголовок*:
        </Typography>
        <TextField
          id="title"
          name="title"
          fullWidth
          variant="outlined"
          label="Придумайте заголовок"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && formik.errors.title !== undefined}
          helperText={
            formik.touched.title && formik.errors.title !== undefined
              ? formik.errors.title
              : ""
          }
        />
        <Typography variant="body1" style={{ marginRight: "10px" }}>
          Теги*:
        </Typography>
        <TextField
          id="tags"
          name="tags"
          fullWidth
          variant="outlined"
          label="Начните писать (через запятую)"
          value={formik.values.tags}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.tags && formik.errors.tags !== undefined}
          helperText={
            formik.touched.tags && formik.errors.tags !== undefined
              ? formik.errors.tags
              : ""
          }
          required
        />
        <Typography variant="body1" style={{ marginRight: "10px" }}>
          Описание:
        </Typography>
        <TextField
          id="description"
          name="description"
          fullWidth
          variant="outlined"
          label="Заполните описание"
          multiline
          maxRows={10}
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description &&
            formik.errors.description !== undefined
          }
          helperText={
            formik.touched.description &&
            formik.errors.description !== undefined
              ? formik.errors.description
              : ""
          }
        />
        <FormControl fullWidth>
          <Typography variant="body1" style={{ marginRight: "10px" }}>
            Жанр*:
          </Typography>
          <Select
            id="genre"
            name="genre"
            value={formik.values.genre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.genre && formik.errors.genre !== undefined}
            label="Жанр"
          >
            <MenuItem value="Мифологический">Мифологический</MenuItem>
            <MenuItem value="Портрет">Портрет</MenuItem>
            <MenuItem value="Анималистический">Анималистический</MenuItem>
            <MenuItem value="Бытовой">Бытовой</MenuItem>
            <MenuItem value="Пейзаж">Пейзаж</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="body1" style={{ marginRight: "10px" }}>
          Материал*:
        </Typography>
        <FormControl fullWidth>
          <Select
            id="material"
            name="material"
            value={formik.values.material}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.material && formik.errors.material !== undefined
            }
            label="Материал"
          >
            <MenuItem value="Цифровое">Цифровое</MenuItem>
            <MenuItem value="Акрил">Акрил</MenuItem>
            <MenuItem value="Карандаш">Карандаш</MenuItem>
            <MenuItem value="Акварель">Акварель</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="body1" style={{ marginRight: "10px" }}>
          Цвет*:
        </Typography>
        <Grid container direction="row" alignItems="center">
          <RadioGroup
            id="color"
            name="color"
            value={formik.values.color}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ display: "flex", flexDirection: "row" }}
          >
            <FormControlLabel
              value="Пастельное"
              control={<Radio />}
              label="Пастельное"
            />
            <FormControlLabel
              value="Черно-белое"
              control={<Radio />}
              label="Черно-белое"
            />
            <FormControlLabel value="Яркое" control={<Radio />} label="Яркое" />
          </RadioGroup>
        </Grid>
        <Typography variant="body1">Продолжительность аукциона*:</Typography>
        <Grid container direction="row" alignItems="center">
          <RadioGroup
            id="duration"
            name="duration"
            value={formik.values.duration}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ display: "flex", flexDirection: "row" }}
          >
            <FormControlLabel value="1" control={<Radio />} label="1 день" />
            <FormControlLabel value="3" control={<Radio />} label="3 дня" />
            <FormControlLabel value="7" control={<Radio />} label="7 дней" />
            <FormControlLabel value="12" control={<Radio />} label="12 дней" />
          </RadioGroup>
        </Grid>
        <Typography variant="body1">Начальная цена*:</Typography>
        <TextField
          id="starting_price"
          name="starting_price"
          fullWidth
          variant="outlined"
          label="Введите сумму"
          value={formik.values.starting_price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.starting_price &&
            formik.errors.starting_price !== undefined
          }
          helperText={
            formik.touched.starting_price &&
            formik.errors.starting_price !== undefined
              ? formik.errors.starting_price
              : ""
          }
          required
        />
        <Typography variant="body1">Шаг ставки*:</Typography>
        <TextField
          id="rate_step"
          name="rate_step"
          fullWidth
          variant="outlined"
          label="Введите сумму"
          value={formik.values.rate_step}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.rate_step && formik.errors.rate_step !== undefined
          }
          helperText={
            formik.touched.rate_step && formik.errors.rate_step !== undefined
              ? formik.errors.rate_step
              : ""
          }
          required
        />
        <Typography variant="body1">Возможность биддинга*:</Typography>
        <Grid container direction="row" alignItems="center">
          <RadioGroup
            id="bidding"
            name="bidding"
            value={formik.values.bidding}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ display: "flex", flexDirection: "row" }}
          >
            <FormControlLabel value="1" control={<Radio />} label="да" />
            <FormControlLabel value="0" control={<Radio />} label="нет" />
          </RadioGroup>
          {formik.touched.bidding && formik.errors.bidding && (
            <Typography variant="body2" color="error">
              {formik.errors.bidding}
            </Typography>
          )}
        </Grid>
        {formik.values.bidding === "1" && (
          <Typography variant="body1">Сумма биддинга*:</Typography>
        )}
        {formik.values.bidding === "1" && (
          <TextField
            id="bidding_rate"
            name="bidding_rate"
            fullWidth
            variant="outlined"
            label="Введите сумму"
            value={formik.values.bidding_rate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.bidding_rate &&
              formik.errors.bidding_rate !== undefined
            }
            helperText={
              formik.touched.bidding_rate &&
              formik.errors.bidding_rate !== undefined
                ? formik.errors.bidding_rate
                : ""
            }
            required
          />
        )}
        <Typography variant="body1">Автопродление*:</Typography>
        <Grid container direction="row" alignItems="center">
          <RadioGroup
            id="auto_renewal"
            name="auto_renewal"
            value={formik.values.auto_renewal}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ display: "flex", flexDirection: "row" }}
          >
            <FormControlLabel value="1" control={<Radio />} label="да" />
            <FormControlLabel value="0" control={<Radio />} label="нет" />
          </RadioGroup>
        </Grid>

        <ImageUploader
          maxImages={1}
          onSaveImage={(imagePath) => formik.setFieldValue("photo", imagePath)}
        />

        <Grid
          container
          item
          justifyContent={"center"}
          style={{ marginTop: "20px", width:"100%" }}
        >
          <Button type="submit" variant="contained" color="primary" style={{ width:"100%" }}>
            Сохранить аукцион
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateAuctionForm;
