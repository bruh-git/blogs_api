const Joi = require('joi');
const { User } = require('../database/models');
const jwtService = require('./jwtService');

const authService = {
  validateBody: (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
    });

    const { error, value } = schema.validate(data);

    if (error) {
      const e = new Error('Some required fields are missing');
      e.name = 'ValidationError';
      throw e;
    }
    
    return value;
  },

  login: async (email, senha) => {
    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== senha) {
      const e = new Error('Invalid fields');
      e.name = 'ValidationError';
      throw e;
    }

    const { password, ...userWithoutPassword } = user.dataValues;

    const token = jwtService.createToken(userWithoutPassword);

    return token;
  },

  validateToken: async (token) => {
    if (!token) {
      const e = new Error('Token not found');
      e.name = 'UnauthorizedError';
      throw e;
    }
    const data = await jwtService.validateToken(token);

    return data;
  },
};

module.exports = authService;