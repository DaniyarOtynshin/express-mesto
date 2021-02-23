const User = require('../models/user');

const {
  returnErrorStatus,
  validateObjectId,
} = require('../utils/utils');

const getUsers = (req, res) => User.find({})
  .then((users) => {
    if (!users.length) {
      return res.status(404).send({ message: 'Users are not found' });
    }
    return res.status(200).send(users);
  })
  .catch((error) => returnErrorStatus(error, res));

const getProfile = (req, res) => User.findById(validateObjectId(req.params.id))
  .then((user) => {
    if (!user) {
      return res.status(400).send({ message: 'User does not exist' });
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
      console.log(req.body);
      res.status(200).send(user);
    })
    .catch((error) => console.log(Object.keys(error.errors)));
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
