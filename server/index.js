require("dotenv").config();
const express = require("express");
const router = require("./routers/index");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const app = express();

const { Sequelize } = require('sequelize');

// Замените следующие параметры на ваши собственные данные
const sequelize = new Sequelize('Web-platforma_dlya_khudozhestvennykh_auktsionov', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
});


app.use(cors());
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