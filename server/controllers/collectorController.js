const { Collector } = require("../database/models");

class CollectorController {

    async create(req, res) {
        const collector = { ...req.body };

        try {
            const createdCollector = await Collector.create(collector);

            return res.status(201).json(createdCollector);
        } catch (err) {
            return res.sendStatus(500);
        }
    }
      
}

module.exports = new CollectorController();