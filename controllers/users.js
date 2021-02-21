const User = require('../models/user');

const getUsers = (req, res) => User.find({})
  .then((users) => {
    if (!users) {
      return res.status(404).send({ message: 'Файл не найден' });
    }
    return res.status(200).send(users);
  })
  .catch((error) => console.error(error));

const getProfile = (req, res) => User.findOne({ _id: req.params.id })
  .then((user) => {
    if (!user) {
      return res.status(404).send({ message: 'Нет пользователя с таким id' });
    }
    return res.status(200).send(user);
  });

const createUser = (req, res) => {
  User.create({ ...req.body })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => console.error(error));
};

const updateProfile = (req, res) => {
  User.findByIdAndUpdate(
    req.params.cardId,
    { ...req.body },
  )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => console.error(error));
};

const updateProfileAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.params.cardId,
    { ...req.body },
  )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => console.error(error));
};

module.exports = {
  getUsers,
  getProfile,
  createUser,
  updateProfile,
  updateProfileAvatar,
};
