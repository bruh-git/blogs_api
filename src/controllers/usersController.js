const usersService = require('../services/usersService');

const usersController = {
  list: async (_req, res) => {
    const users = await usersService.list();
    res.status(200).json(users);
  },

  create: async (req, res) => {
    const { displayName, email, password, image } = usersService.validateBody(req.body);
    const userExists = await usersService.checkIfExists(email);
    
    if (userExists) return res.status(409).json({ message: 'User already registered' });

    const token = await usersService.create({ displayName, email, password, image });

    res.status(201).json({ token });
  },

  findById: async (req, res) => {
    const user = await usersService.findByIdLazy(req.params.id);

    res.status(200).json(user);
  },
  deletar: async (req, res) => {
    const { id } = req.params;

    await usersService.delete(id);

    res.status(204).end();
  },
};

module.exports = usersController;