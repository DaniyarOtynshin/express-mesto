const mongoose = require('mongoose');

const SUCCESS_CODE_200 = 200;
const ERROR_CODE_400 = 400;
const ERROR_CODE_404 = 404;

const returnErrorStatus = (error, res) => {
  switch (error.kind || Object.keys(error.errors)[0]) {
    case 'name':
      return res.status(ERROR_CODE_400).send({ message: error.errors.name.message });
    case 'link':
      return res.status(ERROR_CODE_400).send({ message: error.errors.link.message });
    case 'about':
      return res.status(ERROR_CODE_400).send({ message: error.errors.about.message });
    case 'avatar':
      return res.status(ERROR_CODE_400).send({ message: error.errors.avatar.message });
    default:
      return res.status(ERROR_CODE_400).send({ message: 'Validation Error' });
  }
};

function validateObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id)
    ? mongoose.Types.ObjectId(id)
    : mongoose.Types.ObjectId(Number(id));
}

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

module.exports = {
  returnErrorStatus,
  validateObjectId,
  isValidObjectId,
  ERROR_CODE_400,
  ERROR_CODE_404,
  SUCCESS_CODE_200,
};
