const mongoose = require('mongoose');

const ERROR_CODE_400 = 400;
const ERROR_CODE_404 = 404;
const ERROR_CODE_500 = 500;

const returnErrorStatus = (error, res) => {
  switch (Object.keys(error.errors)[0]) {
    case 'name':
      switch (error.errors.name.kind) {
        case 'minlength':
          return res.status(ERROR_CODE_400).send({ message: 'Needs to be minimum 2 characters' });
        case 'maxlength':
          return res.status(ERROR_CODE_400).send({ message: 'Needs to be maximum 30 characters' });
        default:
          return res.status(ERROR_CODE_400).send({ message: 'Validation Error' });
      }
    case 'link':
      switch (error.errors.link.kind) {
        case 'user defined':
          return res.status(ERROR_CODE_400).send({ message: error.errors.link.message });
        default:
          return res.status(ERROR_CODE_400).send({ message: 'Validation Error' });
      }
    case 'about':
      switch (error.errors.about.kind) {
        case 'required':
          return res.status(ERROR_CODE_400).send({ message: error.errors.about.message });
        default:
          return res.status(ERROR_CODE_400).send({ message: 'Validation Error' });
      }
    case 'avatar':
      switch (error.errors.about.kind) {
        case 'required':
          return res.status(ERROR_CODE_400).send({ message: error.errors.avatar.message });
        default:
          return res.status(ERROR_CODE_400).send({ message: 'Validation Error' });
      }
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
};
