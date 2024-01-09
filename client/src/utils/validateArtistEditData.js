const validateArtistEditData = (values) => {
    const errors = {};


    if (!values.name) {
        errors.name = "Обязательное поле";
    }

    if (!values.country) {
        errors.country = "Обязательное поле";
    }

    if (!values.city) {
        errors.city = "Обязательное поле";
    }

    if (!values.photo) {
        errors.photo = "Обязательное поле";
    }
    return errors;
};

export default validateArtistEditData;