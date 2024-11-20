const validateEditData = (values) => {
    const errors = {};

    // Проверка фамилии
    if (!values.surname) {
        errors.surname = "Обязательное поле.";
    } else if (!/^[а-яА-ЯёЁa-zA-Z]+$/.test(values.surname)) {
        errors.surname = "Фамилия должна содержать только буквы одного алфавита.";
    }

    // Проверка имени
    if (!values.name) {
        errors.name = "Обязательное поле.";
    } else if (!/^[а-яА-ЯёЁa-zA-Z]+$/.test(values.name)) {
        errors.name = "Имя должно содержать только буквы одного алфавита.";
    }

    // Проверка страны
    if (!values.country) {
        errors.country = "Обязательное поле.";
    }

    // Проверка города
    if (!values.city) {
        errors.city = "Обязательное поле.";
    }

    // Проверка логина
    if (!values.login) {
        errors.login = "Обязательное поле.";
    } else if (!/^[a-zA-Z0-9]{1,20}$/.test(values.login)) {
        errors.login = "Логин должен быть уникальным, содержать не более 20 символов и состоять только из цифр и латинских букв.";
    }

    // Проверка email
    if (!values.email) {
        errors.email = "Обязательное поле.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = "Введите корректный адрес электронной почты.";
    }

    // Проверка пароля
    if (!values.password) {
        errors.password = "Обязательное поле.";
    } else if (!/^[a-zA-Z0-9]{1,20}$/.test(values.password)) {
        errors.password = "Пароль должен содержать не более 20 символов и состоять только из цифр и латинских букв.";
    }

    return errors;
};

export default validateEditData;
