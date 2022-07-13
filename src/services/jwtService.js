const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtService = {
  createToken: (data) => {
    const token = jwt.sign({ data }, process.env.JWT_SECRET);
    return token;
  },

  validateToken: (token) => {
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      return data;
    } catch (e) {
      const error = new Error('Faça login');
      error.name = 'UnauthorizedError';
      throw error; 
    }
  },
};

module.exports = jwtService;