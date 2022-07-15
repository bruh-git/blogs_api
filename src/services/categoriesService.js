const Joi = require('joi');
const { Category } = require('../database/models');

const categoriesService = {
  validateBody: (data) => {
    const schema = Joi.object({
      name: Joi.string().required(),
    });

    const { error, value } = schema.validate(data);

    if (error) throw error;

    return value;
  },

  list: async () => {
    const categories = await Category.findAll();
    return categories;
  },

  checkIfExists: async (name) => {
    const category = await Category.findOne({ where: { name } });
    if (category) return true;
    return false;
  },

  create: async ({ name }) => {
    const category = await Category.create({ name });
    return category;
  },
};

module.exports = categoriesService;