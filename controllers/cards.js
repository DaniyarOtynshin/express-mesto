const Card = require('../models/card');

const getCards = (req, res) => Card.find({})
  .then((cards) => {
    if (!cards) {
      return res.status(404).send({ message: 'Файл не найден' });
    }
    return res.status(200).send(cards);
  })
  .catch((error) => console.error(error));

const createCard = (req, res) => {
  Card.create({ ...req.body, owner: req.user._id })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((error) => console.error(error));
};

const deleteCard = (req, res) => {
  Card.deleteOne({ _id: req.params.cardId })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((error) => console.error(error));
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
    .catch((error) => console.error(error));
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
    .catch((error) => console.error(error));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
