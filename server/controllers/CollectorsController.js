const  Collectors = require('../database/models/Collectors');
const  AuthorizationData = require('../database/models/AuthorizationData');

class CollectorController {
  async create(req, res) {
    try {
        const collector = {
            phone: req.body.phone,
        };

        if ((await Collectors.findOne({ where: { email: collector.email } })) !== null) {
            return res.status(400).json({ error: "Email is taken" });
        }

        collector.password = await bcrypt.hash(collector.password, 10);

        const createdCollectors = await Collectors.create({
            ...collector,
        });

        await createdContactPerson.setCompany(createdCollectors.id);

        return res.status(201).json(createdCollectors);
    } catch (err) {
        return res.sendStatus(500);
    }
}
}

module.exports = new CollectorController();
