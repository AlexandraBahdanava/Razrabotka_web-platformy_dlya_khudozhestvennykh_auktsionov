const validateAuctionData = (values) => {
    const errors = {};

    if (values.description && values.description.length > 255) {
        errors.description = "Слишком длинное описание";
    }

    if (!values.starting_price) {
        errors.starting_price = "Обязательное поле";
    } else if (isNaN(values.starting_price) || parseInt(values.starting_price) < 0 || parseInt(values.starting_price) > 9999) {
        errors.starting_price = "Некорректное значение для начальной цены";
    }

    if (isNaN(values.rate_step) || parseInt(values.rate_step) < 0 || parseInt(values.rate_step) > 9999) {
        errors.rate_step = "Некорректное значение для шага ставки";
    }
    if(values.bidding==1){
        if (!values.bidding_rate) {
            errors.bidding_rate = "Обязательное поле";
         }
    }
    if (values.bidding_rate && (isNaN(values.bidding_rate) || parseInt(values.bidding_rate) < 0 || parseInt(values.bidding_rate) > 9999)) {
        errors.bidding_rate = "Некорректное значение для ставки участника";
    }
    if (!values.tags) {
        errors.tags = "Обязательное поле";
    }

    return errors;
};

export default validateAuctionData;
