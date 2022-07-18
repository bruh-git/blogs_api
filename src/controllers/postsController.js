const postsService = require('../services/postsService');
const { BlogPost } = require('../database/models');

const postsController = {
  list: async (_req, res) => {
    const posts = await postsService.list();
    res.status(200).json(posts);
  },

  create: async (req, res) => {
  /*  const { title, content, categoryIds } = postsService.validateBody(req.body);
    const postExists = await postsService.checkIfExists(categoryIds);
    
    if (!postExists) return res.status(400).json({ message: '"categoryIds" not found' });
    const post = await postsService.create({ title, content, categoryIds });

    res.status(201).json(post); */

    const { categoryIds, ...data } = req.body;
    const post = await BlogPost.create(data);

    if (categoryIds && categoryIds.length > 0) {
      post.setTags(categoryIds);
    }
    res.status(201).json(post);
  },

  findById: async (req, res) => {
    const post = await postsService.findByIdLazy(req.params.id);

    res.status(200).json(post);
  },
};

module.exports = postsController;