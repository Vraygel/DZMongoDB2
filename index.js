const express = require('express');
const fs = require('fs');
const idBook = require('./getid')

const logger = require('./middleware/logger')
const error404 = require('./middleware/err-404')
const indexRouter = require('./routes/index')
const demoRouter = require('./routes/demo')


const downloadBook = require('./routes/books/download_book')
const uploadBook = require('./routes/books/upload_book');
const { log } = require('console');

const app = express();

app.use(logger)
app.use('/', indexRouter)
app.use('/public', express.static(__dirname+'/public'))
app.use('/demo', demoRouter)

app.use(error404)

app.use('/api/books', downloadBook)
app.use('/api/books', uploadBook)

const PORT = process.env.PORT || 3000;
app.listen(PORT);