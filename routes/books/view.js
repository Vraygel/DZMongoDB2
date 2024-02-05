const express = require('express');
const router = express.Router();
const fs = require('fs');

// Функция для чтения данных из файла и обработки ошибок
function readBooksFromFile() {
    try {
        const data = fs.readFileSync('./books/books', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Ошибка чтения файла:', err);
        return [];
    }
}

router.get('/:id', (req, res) => {
    const bookId = req.params.id;

    const books = readBooksFromFile();

    const book = books.find(book => book.id === bookId);

    res.render('view', { book });
});

module.exports = router;
