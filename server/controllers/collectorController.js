const { Collector, Artist } = require("../database/models");
const bcrypt = require("bcrypt");

class CollectorController {

    async create(req, res) {
        try {
            const collector = { ...req.body };
    
            if (
                (await Artist.findOne({ where: { email: collector.email } })) !== null ||
                (await Collector.findOne({ where: { email: collector.email } })) !== null
              ) {
                return res.status(400).json({ error: "Email is already taken" });
              }
      
              if (
                (await Artist.findOne({ where: { login: collector.login } })) !== null ||
                (await Collector.findOne({ where: { login: collector.login } })) !== null
              ) {
                return res.status(400).json({ error: "Login is already taken" });
              }
      
    
            collector.password = await bcrypt.hash(collector.password, 10);
    
            const createdCollector = await Collector.create(collector);
    
            return res.status(201).json(createdCollector);
        }catch (err) {
            console.error("Ошибка при создании артиста:", err); // Логируем ошибку
            return res.status(500).json({ message: "Ошибка сервера", error: err.message });
        }      
    }
      
}

module.exports = new CollectorController();