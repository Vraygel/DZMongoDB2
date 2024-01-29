const express = require('express');
const downloadBook = require('./routes/download_book')
const uploadBook = require('./routes/upload_book')
// const myMiddleware = require('./middleware/index');

const app = express();


app.use('/api/books', downloadBook)
app.use('/api/books', uploadBook)

const PORT = process.env.PORT || 3000;
app.listen(PORT);