const Joi = require('joi');
const { User } = require('../database/models');
const jwtService = require('./jwtService');

const usersService = {
  validateBody: (data) => {
    const schema = Joi.object({
      displayName: Joi.string().required().min(8),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
      image: Joi.string().required(),
    });

    const { error, value } = schema.validate(data);

    if (error) throw error;

    return value;
  },

  list: async () => {
    const users = await User.findAll();
    return users;
  },

  create: async ({ displayName, email, password, image }) => {
    const user = await User.create({ displayName, email, password, image });
    const { ...userWithoutPassword } = user.dataValues;
    const token = jwtService.createToken(userWithoutPassword);
    return token;
  },
  checkIfExists: async (email) => {
    const user = await User.findOne({ where: { email } });
    if (user) return true;
    return false;
  },

  findByIdLazy: async (id) => {
    const user = await User.findByPk(id);

    const userJSON = user.dataValues;

    const userWithPets = { ...userJSON };

    if (!user) {
      const e = new Error('User does not exist');
      e.name = 'NotFoundError';
      throw e;
    }
    return userWithPets;
  },

/*   findByIdEager: async (id) => {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['passwordHash', 'phone', 'createdAt', 'updatedAt'] },
      include: { model: Pet, as: 'pets' },
    });

    if (!user) {
      const e = new Error('User not found');
      e.name = 'NotFoundError';
      throw e;
    }
    return user;
  },  */
};

module.exports = usersService;