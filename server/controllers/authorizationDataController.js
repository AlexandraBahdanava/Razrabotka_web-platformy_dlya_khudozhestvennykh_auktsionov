const { AuthorizationData, Artist, Collector}= require("../database/models");

class AuthorizationDataController {

    async login(req, res) {
        try {
            const { login, password } = req.body;
    
            // Поиск пользователя в таблице данных авторизации
            const authData = await AuthorizationData.findOne({ where: { login, password } });
    
            if (!authData) {
                return res.status(401).json({ error: "Authentication failed" });
            }
    
            // Проверка роли пользователя и генерация токена
            let role, user;
    
            if (authData.artistId) {
                role = "artist";
                user = await Artist.findByPk(authData.artistId);
            } else if (authData.collectorId) {
                role = "collector";
                user = await Collector.findByPk(authData.collectorId);
            } else {
                return res.status(401).json({ error: "Invalid user role" });
            }
    
            const passwordMatch = await bcrypt.compare(password, authData.password);
    
            if (!passwordMatch || !user) {
                return res.status(401).json({ error: "Authentication failed" });
            }
    
            const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
                expiresIn: "1h",
            });
    
            res.status(200).json({ token, role });
        } catch (error) {
            console.error(error);
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