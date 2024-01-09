const { Artist, Collector}= require("../database/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthorizationDataController {
    async login(req, res) {
        try {
            const { email, password } = req.body;

            const artist = await Artist.findOne({ where: { email: email } });
            const collector = await Collector.findOne({ where: { email: email } });

            if (!artist && !collector) {
                return res.status(401).json({ error: "Authentication failed" });
            }

            if (artist) {
                const passwordMatch = await bcrypt.compare(password, artist.password);

                if (!passwordMatch) {
                    return res.status(401).json({ error: "Authentication failed" });
                }

                const token = jwt.sign({ artistId: artist.id }, process.env.SECRET_KEY, {
                    expiresIn: "24h",
                });

                res.status(200).json({ token: token, role: "artist" });
            } else {
                const passwordMatch = await bcrypt.compare(password, collector.password);

                if (!passwordMatch) {
                    return res.status(401).json({ error: "Authentication failed" });
                }

                const token = jwt.sign({ collectorId: collector.id }, process.env.SECRET_KEY, {
                    expiresIn: "24h",
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

            const artist = await Artist.findOne({ where: { email: email } });
            const collector = await Collector.findOne({ where: { email: email } });

            if (!artist && !collector) {
                return res.status(200).json({ available: true });
            }

            return res.status(200).json({ available: false });
        } catch (error) {
            res.status(500).json({ error: "Email check failed" });
        }
    }
      
}

module.exports = new AuthorizationDataController();