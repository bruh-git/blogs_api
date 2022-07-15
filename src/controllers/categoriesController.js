const categoriesService = require('../services/categoriesService');

const categoriesController = {
  list: async (_req, res) => {
    const categories = await categoriesService.list();
    res.status(200).json(categories);
  },

  create: async (req, res) => {
    const { name } = categoriesService.validateBody(req.body);
    const categoryExists = await categoriesService.checkIfExists(name);
    
    if (categoryExists) return res.status(409).json({ message: 'Category already registered' });

    const category = await categoriesService.create({ name });

    res.status(201).json(category);
  },
};

module.exports = categoriesController;