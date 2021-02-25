const User = require('../models/user');

const {
  SUCCESS_CODE_200,
  ERROR_CODE_400,
  ERROR_CODE_404,
  returnErrorStatus,
  validateObjectId,
  isValidObjectId,
} = require('../utils/utils');

const getUsers = (req, res) => User.find({})
  .then((users) => {
    if (!users.length) {
      return res.status(ERROR_CODE_404).send({ message: 'Users are not found' });
    }
    return res.status(SUCCESS_CODE_200).send(users);
  })
  .catch((error) => returnErrorStatus(error, res));

const getProfile = (req, res) => User.findById(validateObjectId(req.params.id))
  .then((user) => {
    if (!isValidObjectId(req.params.id)) {
      return res.status(ERROR_CODE_400).send({ message: 'UserId is not valid' });
    }
    if (!user) {
      return res.status(ERROR_CODE_404).send({ message: 'User does not exist' });
    }
    return res.status(SUCCESS_CODE_200).send(user);
  })
  .catch((error) => returnErrorStatus(error, res));

const createUser = (req, res) => {
  User.create({ ...req.body })
    .then((user) => {
      res.status(SUCCESS_CODE_200).send(user);
    })
    .catch((error) => returnErrorStatus(error, res));
};

const updateProfile = (req, res) => {
  User.findOneAndUpdate(
    { _id: validateObjectId(req.user._id) },
    {
      name: req.body.name,
      about: req.body.about,
    },
    {
      runValidators: true,
      new: true,
    },
  )
    .orFail(() => {
      throw new Error('User is not found');
    })
    .then((user) => {
      res.status(SUCCESS_CODE_200).send(user);
    })
    .catch((error) => returnErrorStatus(error, res));
};

const updateProfileAvatar = (req, res) => {
  User.findOneAndUpdate(
    { _id: validateObjectId(req.user._id) },
    { avatar: req.body.avatar },
    {
      runValidators: true,
      new: true,
    },
  )
    .orFail(() => {
      throw new Error('User is not found');
    })
    .then((user) => {
      res.status(SUCCESS_CODE_200).send(user);
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
