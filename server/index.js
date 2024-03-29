require("dotenv").config();
const express = require('express');
const sequelize = require("./database/index");
const router = require("./routers/index");
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors()); // Включаем CORS для всех маршрутов
app.use(express.json());
app.use(router);

// TODO Remove redundant controllers.
const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();
