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
import React from "react";
import * as Yup from "yup";
import ImageUploader from "../buttons/ImageUploaderButton";

const CreateAuctionForm = ({ submitHandler }) => {
  const validationSchema = Yup.object({
    title: Yup.string()

      .required("Название не может быть пустым")
      .min(3, "Название должно быть не менее 3 символов")
      .max(50, "Название не должно превышать 50 символов"),

    description: Yup.string()
      .min(10, "Описание должно быть не менее 10 символов")
      .max(200, "Описание не должно превышать 200 символов"),

    genre: Yup.string()
      .required("Выберите жанр")
      .notOneOf([""], "Выберите жанр из списка"),

    material: Yup.string()
      .required("Выберите материал")
      .notOneOf([""], "Выберите материал из списка"),

    color: Yup.string()
      .required("Выберите цвет")
      .notOneOf([""], "Выберите цвет"),

    duration: Yup.number()
      .required("Введите длительность")
      .min(1, "Длительность должна быть больше 0")
      .nullable()
      .typeError("Длительность должна быть числом"),

    starting_price: Yup.number()
      .required("Введите начальную цену")
      .min(1, "Цена должна быть больше 0")
      .typeError("Цена должна быть числом"),

    rate_step: Yup.number()
      .required("Введите шаг ставки")
      .min(1, "Шаг ставки должен быть больше 0")
      .max(100, "Шаг ставки должен быть не больше 100")
      .typeError("Шаг ставки должен быть числом"),

    bidding: Yup.string().required("Выберите возможность биддинга"),
    
    bidding_rate: Yup.number()
    .typeError("Цена должна быть числом"),
    
    auto_renewal: Yup.boolean().required("Выберите возможность автообновления"),

    tags: Yup.string()
      .required("Введите теги")
      .matches(
        /^[a-zA-Z0-9, ]+$/,
        "Теги могут содержать только буквы, цифры и запятые"
      ),

    photo: Yup.mixed().required("Загрузите фото"),
  });

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
    validationSchema,
    onSubmit: (values) => {
      submitHandler(values);
    },
  });

  const textFieldStyles = {
    borderRadius: "8px",
    "& .MuiInputLabel-root": {
      fontSize: "14px", // Размер шрифта метки
    },
    "& .MuiInputBase-root": {
      fontSize: "14px", // Размер текста ввода
    },
  };

  const labelStyles = {
    fontWeight: "bold",
    color: "#091E42",
    fontSize: "14px",
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        flexDirection="column"
        gap="10px"
        style={{ width: "800px", marginBottom: "50px" }}
      >
        <Grid
          container
          item
          height={"69px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#091E42",
              fontSize: "22px",
              marginTop: "20px",
            }}
            textAlign={"center"}
          >
            Создание аукциона
          </Typography>
        </Grid>
        <Typography sx={labelStyles}>Заголовок*:</Typography>
        <TextField
          id="title"
          name="title"
          fullWidth
          variant="outlined"
          InputLabelProps={{
            sx: {
              color: "#42526D", // Цвет текста метки
              "&.Mui-focused": {
                color: "#42526D", // Цвет текста активной метки
              },
            },
          }}
          sx={textFieldStyles}
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
        <Typography sx={labelStyles}>Теги*:</Typography>
        <TextField
          id="tags"
          name="tags"
          fullWidth
          variant="outlined"
          InputLabelProps={{
            sx: {
              color: "#42526D", // Цвет текста метки
              "&.Mui-focused": {
                color: "#42526D", // Цвет текста активной метки
              },
            },
          }}
          sx={textFieldStyles}
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
        <Typography sx={labelStyles}>Описание:</Typography>
        <TextField
          id="description"
          name="description"
          fullWidth
          variant="outlined"
          InputLabelProps={{
            sx: {
              color: "#42526D", // Цвет текста метки
              "&.Mui-focused": {
                color: "#42526D", // Цвет текста активной метки
              },
            },
          }}
          sx={textFieldStyles}
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
          <Typography sx={labelStyles}>Жанр*:</Typography>
          <Select
            id="genre"
            name="genre"
            value={formik.values.genre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.genre && formik.errors.genre !== undefined}
            label="Жанр"
          >
            <MenuItem value="Мифологический" sx={{ fontSize: "14px" }}>
              Мифологический
            </MenuItem>
            <MenuItem value="Портрет" sx={{ fontSize: "14px" }}>
              Портрет
            </MenuItem>
            <MenuItem value="Анималистический" sx={{ fontSize: "14px" }}>
              Анималистический
            </MenuItem>
            <MenuItem value="Бытовой" sx={{ fontSize: "14px" }}>
              Бытовой
            </MenuItem>
            <MenuItem value="Пейзаж" sx={{ fontSize: "14px" }}>
              Пейзаж
            </MenuItem>
          </Select>
        </FormControl>
        <Typography sx={labelStyles}>Материал*:</Typography>
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
            <MenuItem value="Цифровое" sx={{ fontSize: "14px" }}>
              Цифровое
            </MenuItem>
            <MenuItem value="Акрил" sx={{ fontSize: "14px" }}>
              Акрил
            </MenuItem>
            <MenuItem value="Карандаш" sx={{ fontSize: "14px" }}>
              Карандаш
            </MenuItem>
            <MenuItem value="Акварель" sx={{ fontSize: "14px" }}>
              Акварель
            </MenuItem>
          </Select>
        </FormControl>
        <Typography sx={labelStyles}>Цвет*:</Typography>
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
              control={
                <Radio
                  sx={{
                    "&.Mui-checked": {
                      color: "#091E42",
                    },
                  }}
                />
              }
              label={<span style={{ fontSize: "14px" }}>Пастельное</span>}
            />
            <FormControlLabel
              value="Черно-белое"
              control={
                <Radio
                  sx={{
                    "&.Mui-checked": {
                      color: "#091E42",
                    },
                  }}
                />
              }
              label={<span style={{ fontSize: "14px" }}>Черно-белое</span>}
            />
            <FormControlLabel
              value="Яркое"
              control={
                <Radio
                  sx={{
                    "&.Mui-checked": {
                      color: "#091E42",
                    },
                  }}
                />
              }
              label={<span style={{ fontSize: "14px" }}>Яркое</span>}
            />
          </RadioGroup>
        </Grid>

        <Typography sx={labelStyles}>Продолжительность аукциона*:</Typography>
        <Grid container direction="row" alignItems="center">
          <RadioGroup
            id="duration"
            name="duration"
            value={formik.values.duration}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ display: "flex", flexDirection: "row" }}
          >
            <FormControlLabel
              value="1"
              control={
                <Radio
                  sx={{
                    "&.Mui-checked": {
                      color: "#091E42",
                    },
                  }}
                />
              }
              label={<span style={{ fontSize: "14px" }}>1 день</span>}
            />
            <FormControlLabel
              value="3"
              control={
                <Radio
                  sx={{
                    "&.Mui-checked": {
                      color: "#091E42",
                    },
                  }}
                />
              }
              label={<span style={{ fontSize: "14px" }}>3 дня</span>}
            />
            <FormControlLabel
              value="7"
              control={
                <Radio
                  sx={{
                    "&.Mui-checked": {
                      color: "#091E42",
                    },
                  }}
                />
              }
              label={<span style={{ fontSize: "14px" }}>7 дней</span>}
            />
            <FormControlLabel
              value="12"
              control={
                <Radio
                  sx={{
                    "&.Mui-checked": {
                      color: "#091E42",
                    },
                  }}
                />
              }
              label={<span style={{ fontSize: "14px" }}>12 дней</span>}
            />
          </RadioGroup>
        </Grid>
        <Typography sx={labelStyles}>Начальная цена*:</Typography>
        <TextField
          id="starting_price"
          name="starting_price"
          fullWidth
          variant="outlined"
          InputLabelProps={{
            sx: {
              color: "#42526D", // Цвет текста метки
              "&.Mui-focused": {
                color: "#42526D", // Цвет текста активной метки
              },
            },
          }}
          sx={textFieldStyles}
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
        <Typography sx={labelStyles}>Шаг ставки*:</Typography>
        <TextField
          id="rate_step"
          name="rate_step"
          fullWidth
          variant="outlined"
          InputLabelProps={{
            sx: {
              color: "#42526D", // Цвет текста метки
              "&.Mui-focused": {
                color: "#42526D", // Цвет текста активной метки
              },
            },
          }}
          sx={textFieldStyles}
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
        <Typography sx={labelStyles}>Возможность биддинга*:</Typography>
        <Grid container direction="row" alignItems="center">
          <RadioGroup
            id="bidding"
            name="bidding"
            value={formik.values.bidding}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ display: "flex", flexDirection: "row" }}
          >
            <FormControlLabel
              value="1"
              control={
                <Radio
                  sx={{
                    "&.Mui-checked": {
                      color: "#091E42",
                    },
                  }}
                />
              }
              label={<span style={{ fontSize: "14px" }}>Да</span>}
            />
            <FormControlLabel
              value="0"
              control={
                <Radio
                  sx={{
                    "&.Mui-checked": {
                      color: "#091E42",
                    },
                  }}
                />
              }
              label={<span style={{ fontSize: "14px" }}>Нет</span>}
            />
          </RadioGroup>
          {formik.touched.bidding && formik.errors.bidding && (
            <Typography variant="body2" color="error">
              {formik.errors.bidding}
            </Typography>
          )}
        </Grid>
        {formik.values.bidding === "1" && (
          <Typography sx={labelStyles}>Сумма биддинга*:</Typography>
        )}
        {formik.values.bidding === "1" && (
          <TextField
            id="bidding_rate"
            name="bidding_rate"
            fullWidth
            variant="outlined"
            sx={textFieldStyles}
            InputLabelProps={{
              sx: {
                color: "#42526D", // Цвет текста метки
                "&.Mui-focused": {
                  color: "#42526D", // Цвет текста активной метки
                },
              },
            }}
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
        <Typography sx={labelStyles}>Автопродление*:</Typography>
        <Grid container direction="row" alignItems="center">
          <RadioGroup
            id="auto_renewal"
            name="auto_renewal"
            value={formik.values.auto_renewal}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ display: "flex", flexDirection: "row" }}
          >
            <FormControlLabel
              value="1"
              control={
                <Radio
                  sx={{
                    "&.Mui-checked": {
                      color: "#091E42",
                    },
                  }}
                />
              }
              label={<span style={{ fontSize: "14px" }}>Да</span>}
            />
            <FormControlLabel
              value="0"
              control={
                <Radio
                  sx={{
                    "&.Mui-checked": {
                      color: "#091E42",
                    },
                  }}
                />
              }
              label={<span style={{ fontSize: "14px" }}>Нет</span>}
            />
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
          style={{ marginTop: "20px", width: "100%" }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              borderColor: "#dcdcdc",
              color: "#333",
              borderRadius: "8px",
              padding: "10px 20px",
              textTransform: "none",
              marginRight: "10px",
              width: "100%",
            }}
          >
            Сохранить аукцион
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateAuctionForm;
