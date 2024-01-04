import React, { useState } from 'react';
import path from 'path-browserify';

const ImageUpload = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];

    if (selectedImage && selectedImage.type.startsWith('image/')) {
      setImage(selectedImage);
    } else {
      alert('Выберите допустимое изображение.');
    }
  };

  const fileInfo = image
    ? {
        nameWithoutExtension: path.basename(image.name, path.extname(image.name)),
        extension: path.extname(image.name),
        size: `${(image.size / 1024).toFixed(2)} KB`,
      }
    : null;

  return (
    <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {fileInfo && (
        <table style={{ direction: "row", alignItems: "center",width: '100%', marginTop: '20px', border_collapse: 'collapse', border_radius: '10px', overflow: 'hidden'}}>
          <thead>
            <tr>
              <th>Название</th>
              <th>Тип</th>
              <th>Размер</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{fileInfo.nameWithoutExtension}</td>
              <td>{fileInfo.extension}</td>
              <td>{fileInfo.size}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ImageUpload;
