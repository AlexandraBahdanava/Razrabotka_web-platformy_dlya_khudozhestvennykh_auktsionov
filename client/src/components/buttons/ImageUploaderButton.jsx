import React, { useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { createImage } from "../../api/artistApi"; // Импорт метода
import { useParams } from "react-router-dom";

const ImageUploaderButton = ({ maxImages, onSaveImage }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState([]); // Массив для хранения изображений
  const { id } = useParams();

  // Функция для выбора файла
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (images.length >= maxImages) {
      alert(`Вы можете загрузить не более ${maxImages} изображений.`);
      return;
    }

    const imageURL = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      const resolution = `${img.width}x${img.height}`; // Ширина и высота изображения

      const fileData = {
        name: file.name,
        size: (file.size / 1024).toFixed(2) + " KB",
        type: file.type,
        resolution,
        path: imageURL, // Временный URL для предпросмотра
      };

      setImages((prevImages) => [...prevImages, fileData]);
      setSelectedFile(file);

      // Освобождаем память после получения информации
      URL.revokeObjectURL(imageURL);
    };

    img.onerror = () => {
      alert("Не удалось загрузить изображение для определения разрешения.");
      URL.revokeObjectURL(imageURL); // Очистка в случае ошибки
    };

    img.src = imageURL; // Устанавливаем источник изображения
  };

  // Функция для удаления изображения
  const handleDelete = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Функция для загрузки файла
  const handleSave = async () => {
    if (!selectedFile) {
      alert("Выберите файл для загрузки.");
      return;
    }

    try {
      const response = await createImage(id, selectedFile);
      const uploadedImagePath = response.path;

      setImages((prevImages) =>
        prevImages.map((image) =>
          image.name === selectedFile.name
            ? { ...image, path: uploadedImagePath }
            : image
        )
      );

      onSaveImage(uploadedImagePath);
      alert("Изображение сохранено.");
    } catch (error) {
      console.error("Ошибка при загрузке изображения:", error);
      alert("Ошибка загрузки изображения.");
    }
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        component="label"
        style={{ marginBottom: "16px" }}
      >
        Загрузить изображение
        <input
          type="file"
          accept="image/png, image/jpeg"
          hidden
          onChange={handleFileChange}
        />
      </Button>

      {images.length > 0 && (
        <Table
          style={{
            padding: "16px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Размер</TableCell>
              <TableCell>Тип</TableCell>
              <TableCell>Разрешение</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {images.map((image, index) => (
              <TableRow key={index}>
                <TableCell>{image.name}</TableCell>
                <TableCell>{image.size}</TableCell>
                <TableCell>{image.type}</TableCell>
                <TableCell>{image.resolution}</TableCell>
                <TableCell>
                  <Button
                    color="secondary"
                    variant="outlined"
                    size="small"
                    onClick={() => handleDelete(index)}
                    style={{ marginRight: "8px" }}
                  >
                    Удалить
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={handleSave}
                  >
                    Сохранить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default ImageUploaderButton;
