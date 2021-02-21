const usersRouter = require('express').Router();
const {
  getUsers,
  getProfile,
  createUser,
  updateProfile,
  updateProfileAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getProfile);
usersRouter.post('/', createUser);
usersRouter.patch('/me', updateProfile);
usersRouter.patch('/me/avatar', updateProfileAvatar);

module.exports = usersRouter;
