const validateCollectorData = (values) => {
    const errors = {};

    if (!values.phone) {
        errors.phone = "Обязательное поле";
    }
    return errors;
};

export default validateCollectorData;