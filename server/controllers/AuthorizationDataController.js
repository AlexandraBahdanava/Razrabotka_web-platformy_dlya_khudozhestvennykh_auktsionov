const AuthorizationData = require('../database/models/AuthorizationData');
const Artist = require('../database/models/Artists');
const Collector = require('../database/models/Collectors');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { use } = require('../routers/AuctionArchiveRouter');

class AuthorizationDataController {
  async login(req, res) {
    try {
        const { login, password } = req.body;

        const artist = await Artist.findOne({ where: { login: login } });
        const collector = await Collector.findOne({ where: { login: login } });

        if (!artist && !collector) {
            return res.status(401).json({ error: "Authentication failed" });
        }

        if (artist) {
            const passwordMatch = await bcrypt.compare(password, artist.password);

            if (!passwordMatch) {
                return res.status(401).json({ error: "Authentication failed" });
            }

            const token = jwt.sign({ id: artist.id }, a6bj7dkvh43kge, {
                expiresIn: "1h",
            });

            res.status(200).json({ token: token, role: "artist" });
        } else {
            const passwordMatch = await bcrypt.compare(password, collector.password);

            if (!passwordMatch) {
                return res.status(401).json({ error: "Authentication failed" });
            }

            const token = jwt.sign({ id: collector.id }, a6bj7dkvh43kge, {
                expiresIn: "1h",
            });

            res.status(200).json({ token: token, role: "collector" });
        }
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
}

async checkEmail(req, res) {
    try {
        const { email } = { ...req.body };

        // Используйте методы, предоставленные Sequelize для работы с ассоциациями
        const user = await AuthorizationData.findOne({ where: { email: email } });
        if (!user ) {
            return res.status(200).json({ available: true });
        }

        return res.status(200).json({ available: false });
    } catch (error) {
        console.error("Error during email check:", error);
        res.status(500).json({ error: "Email check failed" });
    }
}


}

module.exports = new AuthorizationDataController();
