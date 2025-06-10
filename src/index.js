const express = require('express');
const app = express();
require('dotenv').config();

const booksRouter = require('./routes/books');

app.use(express.json());
app.use('/books', booksRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${port}`);
});
