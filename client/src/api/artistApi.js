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

const updateAvatar = async (id, image) => {
    try {
        let formData = new FormData();
        formData.append("image", image);

        const response = await host.post(`/api/artist/update/${id}/avatar`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

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

export { getArtist, updateArtist, updateAvatar };