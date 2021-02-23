const User = require('../models/user');

const {
  returnErrorStatus,
  validateObjectId,
  isValidObjectId,
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
    if (!isValidObjectId(req.params.id)) {
      res.status(400).send({ message: 'UserId is not valid' });
    } else if (!user) {
      res.status(404).send({ message: 'User does not exist' });
    }
    return res.status(200).send(user);
  })
  .catch((error) => returnErrorStatus(error, res));

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
    { runValidators: true, context: 'query' },
  )
    .then((user) => {
      console.log(user);
      res.status(200).send(user);
    })
    .catch((error) => console.log(error));
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
