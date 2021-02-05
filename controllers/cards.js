const path = require('path');
const getDataFromFile = require('../helpers/files');
const cardsDataPath = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => {
    return getDataFromFile(cardsDataPath)
        .then(cards => res.status(200).send(cards))
        .catch(error => console.error(error));
    }

module.exports = getCards