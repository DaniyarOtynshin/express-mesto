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

module.exports = {
  getCards,
  createCard,
};
