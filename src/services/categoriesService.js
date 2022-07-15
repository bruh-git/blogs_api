const Joi = require('joi');
const { Category } = require('../database/models');
/* const jwtService = require('./jwtService'); */

const categoriesService = {
  validateBody: (data) => {
    const schema = Joi.object({
      name: Joi.string().required(),
    });

    const { error, value } = schema.validate(data);

    if (error) throw error;

/*   if (error) {
      const e = new Error('"name" is required');
      e.name = 'NotFoundError';
      throw e;
    } */

    return value;
  },

/*   list: async () => {
    const users = await Category.findAll({
      attributes: { exclude: ['password'] },
    });
    return users;
  }, */

  checkIfExists: async (name) => {
    const category = await Category.findOne({ where: { name } });
    if (category) return true;
    return false;
  },

  create: async ({ name }) => {
    const category = await Category.create({ name });
    /* const { ...categoryWithoutPassword } = category.dataValues; */
    /* const token = jwtService.createToken(categoryWithoutPassword); */
    return category;
  },

/*   findByIdLazy: async (id) => {
    const user = await Category.findByPk(id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      const e = new Error('User does not exist');
      e.name = 'NotFoundError';
      throw e;
    }
    return user;
  }, */
};

module.exports = categoriesService;