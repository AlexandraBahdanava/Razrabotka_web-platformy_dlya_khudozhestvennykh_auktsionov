const { Collector, AuthorizationData } = require("../database/models");
const bcrypt = require("bcrypt");

class CollectorController {

  async create(req, res) {
      const { login, password, ...collectorData } = req.body;
  
      try {
          // Хеширование пароля
          const hashedPassword = await bcrypt.hash(password, 10);
  
          // Создание записи в таблице ДанныеАвторизации
          const createdAuthorizationData = await AuthorizationData.create({
              login: login,
              password: hashedPassword,
          });
  
          // Создание записи в таблице коллекционеры с привязкой к записи в таблице ДанныеАвторизации
          const createdCollector = await Collector.create({
              ...collectorData,
              AuthorizationDataId: createdAuthorizationData.id,
          });
  
          return res.status(201).json(createdCollector);
      } catch (err) {
          console.error("Error during collector creation:", err);
          return res.sendStatus(500);
      }
  }
      
}

module.exports = new CollectorController();