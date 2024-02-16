const express = require('express');
const fs = require('fs');
const idBook = require('./getid')
const mongoose = require('mongoose');


const logger = require('./middleware/logger')
const error404 = require('./middleware/err-404')
const bookRoutes = require('./routes/book');


// const indexRouter = require('./routes/index')
// const downloadBook = require('./routes/books/download_book')
// const uploadBook = require('./routes/books/upload_book')
// const createBook = require('./routes/books/create')
// const viewBook = require('./routes/books/view')
// const updateBook = require('./routes/books/update')
// const deleteBook = require('./routes/books/delete')

const { log } = require('console');

const app = express();

app.use(express.urlencoded());
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(logger)
// app.use('/', indexRouter)
app.use('/', bookRoutes);
// app.use('/create', createBook)
// app.use('/view', viewBook)
// app.use('/update', updateBook);
// app.use('/delete', deleteBook);
app.use(error404)
// app.use('/api/books', downloadBook)
// app.use('/api/books', uploadBook)


mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('Error connecting to MongoDB:', err));



const PORT = process.env.PORT || 3000;
app.listen(PORT);

