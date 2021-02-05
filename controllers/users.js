const path = require('path');
const getDataFromFile = require('../helpers/files');
const usersDataPath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = (req, res) => {
    return getDataFromFile(usersDataPath)
        .then(users => res.status(200).send(users))
        .catch(error => console.error(error));
    }

const getProfile = (req, res) => {
    return getDataFromFile(usersDataPath)
        .then(users => users.find(user => user._id === req.params.id))
        .then(user => {
            if(!user) {
                return res.status(404).send({ message: "Нет пользователя с таким id" })
            } else {
                res.status(200).send(user)
            }
        })
    }

module.exports = { getUsers, getProfile };