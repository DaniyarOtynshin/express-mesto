const usersRouter = require('express').Router();
const { getUsers, getProfile, createUser } = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getProfile);
usersRouter.post('/', createUser);

module.exports = usersRouter;
