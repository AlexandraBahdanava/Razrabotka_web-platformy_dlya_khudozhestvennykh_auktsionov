const { Sequelize } = require('sequelize');

// Замените следующие параметры на ваши собственные данные
const sequelize = new Sequelize('Web-platforma_dlya_khudozhestvennykh_auktsionov', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
});

// Подключаемся к базе данных
sequelize.authenticate()
  .then(() => {
    console.log('Connected to PostgreSQL database');
    // Выполните здесь ваши запросы к базе данных
  })
  .catch((err) => console.error('Error connecting to PostgreSQL database', err))
  .finally(() => {
    // Всегда закрывайте соединение после использования
    sequelize.close();
  });
