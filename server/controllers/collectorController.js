const { Collector } = require("../database/models");
const bcrypt = require("bcrypt");

class CollectorController {

    async create(req, res) {
        try {
            const collector = { ...req.body };
    
            if ((await Collector.findOne({ where: { email: collector.email } })) !== null) {
                return res.status(400).json({ error: "Email is taken" });
            }
    
            collector.password = await bcrypt.hash(collector.password, 10);
    
            const createdCollector = await Collector.create(collector);
    
            return res.status(201).json(createdCollector);
        } catch (err) {
            return res.sendStatus(500);
        }
    }
      
}

module.exports = new CollectorController();