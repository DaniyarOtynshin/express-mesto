const Card = require('../models/card');

const {
  returnErrorStatus,
  validateObjectId,
  isValidObjectId,
} = require('../utils/utils');

const getCards = (req, res) => Card.find({})
  .then((cards) => {
    if (!cards.length) {
      return res.status(404).send({ message: 'Cards are not found' });
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
  Card.deleteOne({ _id: validateObjectId(req.params.cardId) })
    .then((response) => {
      if (!isValidObjectId(req.params.cardId)) {
        res.status(400).send({ message: 'CardId is not valid' });
      } else if (response.n === 0) {
        res.status(404).send({ message: 'Card is not found' });
      }
      res.status(200).send(response);
    })
    .catch((error) => returnErrorStatus(error, res));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    {
      _id: validateObjectId(req.params.cardId),
    },
    {
      $addToSet: validateObjectId(req.params.cardId),
    },
    { new: true },
  )
    .then((card) => {
      if (!isValidObjectId(req.params.cardId)) {
        res.status(400).send({ message: 'CardId is not valid' });
      } else if (!card) {
        res.status(404).send({ message: 'Card is not found' });
      }
      res.status(200).send(card);
    })
    .catch((error) => returnErrorStatus(error, res));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    ({
      _id: validateObjectId(req.params.cardId),
    }),
    {
      $pull: validateObjectId(req.params.cardId),
    },
    { new: true },
  )
    .then((card) => {
      if (!isValidObjectId(req.params.cardId)) {
        res.status(400).send({ message: 'CardId is not valid' });
      } else if (!card) {
        res.status(404).send({ message: 'Card is not found' });
      }
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
