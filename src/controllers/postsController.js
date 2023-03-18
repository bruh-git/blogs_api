const postsService = require('../services/postsService');

const postsController = {
  list: async (_req, res) => {
    const posts = await postsService.list();
    res.status(200).json(posts);
  },

/*   create: async (req, res) => { */
  /*  const { title, content, categoryIds } = postsService.validateBody(req.body);
    const postExists = await postsService.checkIfExists(categoryIds);
    
    if (!postExists) return res.status(400).json({ message: '"categoryIds" not found' });
    const post = await postsService.create({ title, content, categoryIds });

    res.status(201).json(post); */

/*     const { categoryIds, ...data } = req.body;
    const post = await BlogPost.create(data);

    if (categoryIds && categoryIds.length > 0) {
      post.setTags(categoryIds);
    }
    res.status(201).json(post);
  }, */

  findById: async (req, res) => {
    const post = await postsService.findByIdLazy(req.params.id);

    res.status(200).json(post);
  },

  update: async (req, res) => { 
    const { id } = req.params;
    const { title, content } = req.body;

    postsService.validateBodyPost({ title, content });

    const blogPost = await postsService.update({ id, title, content, userId: req.params.id });

    res.status(200).json(blogPost);
  },
};

module.exports = postsController;