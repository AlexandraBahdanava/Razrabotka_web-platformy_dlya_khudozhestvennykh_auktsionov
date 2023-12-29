const AuthorizationData = require('../models/AuthorizationData');
const Artist = require('../models/Artists');
const Collector = require('../models/Collectors');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController {
  async login(req, res) {
    try {
      const { login, password } = req.body;

      // Поиск пользователя в AuthorizationData
      const authData = await AuthorizationData.findOne({
        where: { login },
        include: [Artist, Collector],
      });

      // Проверка существования пользователя и сопоставление пароля
      if (!authData || !(await bcrypt.compare(password, authData.password))) {
        return res.status(401).json({ error: 'Invalid login or password' });
      }

      // Определение, к какой таблице относится пользователь
      let userRole = null;
      let userDetails = null;

      if (authData.Artist) {
        userRole = 'artist';
        userDetails = authData.Artist;
      } else if (authData.Collector) {
        userRole = 'collector';
        userDetails = authData.Collector;
      }

      // Создание JWT токена для аутентификации
      const token = jwt.sign(
        { userId: authData.id, role: userRole, userDetails },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
      );

      res.status(200).json({ token, role: userRole, userDetails });
    } catch (error) {
      console.error('Error authenticating user', error);
      res.status(500).json({ error: 'Authentication failed' });
    }
  }
}

module.exports = new AuthController();
