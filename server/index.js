require("dotenv").config();
const express = require('express');
const sequelize = require("./database/index");
const router = require("./routers/index");
const cors = require('cors');
const app = express();

app.use(cors()); // Включаем CORS для всех маршрутов

app.get('/api/data', (req, res) => {
  // Ваш обработчик GET запроса здесь
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({ message: 'Пример ответа JSON' });
});

const PORT = process.env.PORT || 3000;
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
