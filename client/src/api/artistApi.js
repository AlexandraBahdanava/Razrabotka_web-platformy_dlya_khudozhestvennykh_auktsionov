import host from ".";

const getArtist = async (id) => {
  try {
    const response = await host.get(`/api/artist/${id}`);

    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

const updateArtist = async (id, artistData) => {
  try {
    const response = await host.put(`/api/artist/update/${id}`, artistData);

    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

const handleRequestError = (error) => {
  if (error.response) {
    return error.response;
  } else if (error.request) {
    console.log("Server did not respond.");
  } else {
    console.log("Error while creating request");
  }
};

const createImage = async (id, image) => {
  try {
    const formData = new FormData();
    formData.append("image", image);
    const response = await host.post(
      `/api/artist/create/${id}/photo`,
      formData,
      {
        headers: {
          // 'Content-Type' не требуется при использовании FormData, он будет установлен автоматически
        },
      }
    );

    return response.data; // Возвращаем данные с сервера
  } catch (error) {
    console.error(
      "Ошибка загрузки изображения:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export { getArtist, updateArtist, createImage };
