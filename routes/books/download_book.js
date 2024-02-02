const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/:id/download', (req, res) => {
  const idGetBook = req.params.id;
  let books = []

  try {
    const data = fs.readFileSync('../../books/books', options = 'utf8')
    console.log('Содержимое файла:', data)
    books = JSON.parse(data)
    } catch (err) {
    console.error('Ошибка чтения файла:', err)
    } 

    let book = books.find(item => item.id == idGetBook);
    if (book) {
      let {fileBook, path} = book
      res.download(`${path}`, `${fileBook}`, (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Что-то пошло не так...' });
        }
      });

    }
});

module.exports = router;