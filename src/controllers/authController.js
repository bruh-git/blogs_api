const authService = require('../services/authService');

const authController = {
  login: async (req, res) => {
    const { email, password } = authService.validateBody(req.body);

    if (!email || !password) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }

    const token = await authService.login(email, password);
    if (!token) return res.status(400).json({ message: 'Invalid fields' });

    res.status(200).json({ token });
  },

  validateToken: async (req, _res, next) => {
    const { authorization } = req.headers;

    await authService.validateToken(authorization);

    next();
  },
};

module.exports = authController;