const Sequelize = require("sequelize");

module.exports = new Sequelize('Web_platforma_dlya_khudozhestvennykh_auktsionov', 'postgres', 'admin', {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
});