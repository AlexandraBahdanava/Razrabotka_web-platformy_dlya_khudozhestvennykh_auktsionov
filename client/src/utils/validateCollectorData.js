const validateCollectorData = (values) => {
    const errors = {};

    if (!values.contactPhone) {
        errors.contactPhone = "Обязательное поле";
    } else if (values.contactPhone.includes("_")) {
        errors.contactPhone = "Некорректное значение";
    }

    return errors;
};

export default validateCollectorData;