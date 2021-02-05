const usersRouter = require('express').Router();
const { getUsers, getProfile } = require('../controllers/users');


usersRouter.get('/', getUsers);
usersRouter.get('/:id', getProfile);

module.exports = usersRouter;