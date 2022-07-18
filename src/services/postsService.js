const Joi = require('joi');
const { BlogPost, User, Category } = require('../database/models');

const postsService = {
  validateBody: (data) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      categoryIds: Joi.array().items(Joi.number().integer()).required(),
    });

    const { error, value } = schema.validate(data);

    if (error) {
      const e = new Error('Some required fields are missing');
      e.name = 'ValidationError';
      throw e;
    }
    
    return value;
  },

list: async (userId) => {
    const posts = await BlogPost.findAll({
      where: userId,
      include: [
        { model: User, as: 'user' },
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    return posts;
  },
/*   checkIfExists: async (categoryId) => {
    const post = await PostCategory.findAll({ where: { categoryId } });
    if (post.length !== categoryId.length) {
      const error = new Error('"categoryIds" not found');
      error.name = 'ValidationError';
      throw error;
    }
    return true;
  },  */

/*   create: async (postData, categories) => {
    const { title, content, userId } = postData;
    const blogPost = await BlogPost.create({ title, content, userId });
    const { id: postId } = blogPost.toJSON();
    await PostCategory.bulkCreate(
      categories.map((category) => ({
        postId,
        categoryId: category.dataValues.id,
      })),
    );
    return blogPost;
  }, */

/*   findByIdLazy: async (id) => {
    const post = await PostCategory.findByPk(id);

    if (!post) {
      const e = new Error('Posts does not exist');
      e.name = 'NotFoundError';
      throw e;
    }
    return post;
  }, */
};

module.exports = postsService;