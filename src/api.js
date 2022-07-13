require('express-async-errors');

const express = require('express');

const usersRouter = require('./routers/usersRouter');
const authRouter = require('./routers/authRouter');

const authController = require('./controllers/authController');

const app = express();

app.use(express.json());

app.use('/login', authRouter);

app.use('/user', usersRouter);

app.use(authController.validateToken);

app.use((err, _req, res, _next) => {
  const { name, message } = err;
  switch (name) {
    case 'ValidationError':
      res.status(400).json({ message });
      break;
    case 'NotFoundError':
      res.status(404).json({ message });
      break;
    /* case 'ConflictError':
      res.status(409).json({ message });
      break; */
    case 'UnauthorizedError':
      res.status(401).json({ message });
      break;
    default:
      res.status(500).json({ message });
      break;
  }
});

module.exports = app;
