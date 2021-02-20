const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const path = require('path');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => {
    console.log('Connected to DB');
  });

const PORT = 3000;
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT);
