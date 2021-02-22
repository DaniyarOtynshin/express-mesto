const mongoose = require('mongoose');
const User = require('../models/user');

const ERROR_CODE_400 = 400;
const ERROR_CODE_404 = 404;
const ERROR_CODE_500 = 500;

const returnErrorStatus = (error, res) => {
  switch (error.statusCode) {
    case 400:
      return res.status(ERROR_CODE_400).send(error);
    case 404:
      return res.status(ERROR_CODE_404).send(error);
    case 500:
      return res.status(ERROR_CODE_500).send(error);
    default:
      return res.status(error.statusCode).send(error);
  }
};

const getUsers = (req, res) => User.find({})
  .then((users) => {
    if (!users.length) {
      return res.status(404).send({ message: 'Users are not found' });
    }
    return res.status(200).send(users);
  })
  .catch((error) => returnErrorStatus(error, res));

const getProfile = (req, res) => User.findById(
  mongoose.Types.ObjectId.isValid(req.params.id)
    ? mongoose.Types.ObjectId(req.params.id)
    : mongoose.Types.ObjectId(Number(req.params.id)),
)
  .then((user) => {
    if (!user) {
      return res.status(404).send({ message: 'User does not exist' });
    }
    return res.status(200).send(user);
  })
  .catch((error) => console.log(error));

const createUser = (req, res) => {
  User.create({ ...req.body })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => returnErrorStatus(error, res));
};

const updateProfile = (req, res) => {
  User.findByIdAndUpdate(
    req.params.cardId,
    { ...req.body },
  )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => returnErrorStatus(error, res));
};

const updateProfileAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.params.cardId,
    { ...req.body },
  )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => returnErrorStatus(error, res));
};

module.exports = {
  getUsers,
  getProfile,
  createUser,
  updateProfile,
  updateProfileAvatar,
};
