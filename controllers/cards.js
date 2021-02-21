const Card = require('../models/card');

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

const getCards = (req, res) => Card.find({})
  .then((cards) => {
    if (!cards.length) {
      return res.status(ERROR_CODE_404).send({ message: 'Cards are not found' });
    }
    return res.status(200).send(cards);
  })
  .catch((error) => returnErrorStatus(error, res));

const createCard = (req, res) => {
  Card.create({ ...req.body, owner: req.user._id })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((error) => returnErrorStatus(error, res));
};

const deleteCard = (req, res) => {
  Card.deleteOne({ _id: req.params.cardId })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((error) => returnErrorStatus(error, res));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((error) => returnErrorStatus(error, res));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((error) => returnErrorStatus(error, res));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
