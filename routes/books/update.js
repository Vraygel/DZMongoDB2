const express = require('express');
const router = express.Router();
const fs = require('fs');

let books = [];

// Функция для чтения данных из файла и обработки ошибок
function readBooksFromFile() {
    try {
        const data = fs.readFileSync('./books/books', 'utf8');
        books = JSON.parse(data);
    } catch (err) {
        console.error('Ошибка чтения файла:', err);
    }
}

// Получение данных при каждом запросе
router.get('/:id', (req, res) => {
    const bookId = req.params.id;

    readBooksFromFile();

    const book = books.find(book => book.id === bookId);

    res.render('update', { book });
});

router.post('/:id', (req, res) => {
    const bookId = req.params.id;
    const { title, authors, description, favorite } = req.body;

    readBooksFromFile();

    const bookIndex = books.findIndex(book => book.id === bookId);

    // Обновление данных книги
    books[bookIndex] = {
        ...books[bookIndex],
        title,
        authors,
        description,
        favorite: !!favorite,
    };

    // Запись обновленных данных в файл
    let json = JSON.stringify(books);
    try {
        fs.writeFileSync('./books/books', json, 'utf8');
        console.log('Данные успешно записаны в файл.');
    } catch (err) {
        console.error('Ошибка записи файла:', err);
    }

    res.redirect(`/view/${bookId}`);
});

module.exports = router;
