const { Router } = require('express');

const postsController = require('../controllers/postsController');
const authController = require('../controllers/authController');

const router = Router();

router.use(authController.validateToken);

/* router.post('/', postsController.create); */

router.get('/', postsController.list);

router.get('/:id', postsController.findById);

router.put('/:id', postsController.update);

module.exports = router;