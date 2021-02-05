const path = require('path');
const getDataFromFile = require('../helpers/files');

const usersDataPath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = (req, res) => getDataFromFile(usersDataPath)
  .then((users) => {
    if (!users) {
      return res.status(404).send({ message: 'Файл не найден' });
    }
    return res.status(200).send(users);
  })
  .catch((error) => console.error(error));

const getProfile = (req, res) => getDataFromFile(usersDataPath)
  .then((users) => {
    if (!users) {
      return res.status(404).send({ message: 'Файл не найден' });
    }
    return users.find((user) => user._id === req.params.id);
  })
  .then((user) => {
    if (!user) {
      return res.status(404).send({ message: 'Нет пользователя с таким id' });
    }
    return res.status(200).send(user);
  });

module.exports = { getUsers, getProfile };
