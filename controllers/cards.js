const path = require('path');
const getDataFromFile = require('../helpers/files');

const cardsDataPath = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => getDataFromFile(cardsDataPath)
  .then((cards) => {
    if (!cards) {
      return res.status(404).send({ message: 'Файл не найден' });
    }
    return res.status(200).send(cards);
  })
  .catch((error) => console.error(error));

module.exports = getCards;
