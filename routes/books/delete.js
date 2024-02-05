const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/:id', (req, res) => {
    const bookId = req.params.id;

    try {
        // Чтение файла с книгами
        let data = fs.readFileSync('./books/books', 'utf8');
        console.log('Содержимое файла:', data);

        // Парсинг данных из файла
        let books = JSON.parse(data);

        // Поиск индекса книги по ID
        const idx = books.findIndex(book => book.id === bookId);

        // Если книга не найдена, редирект на страницу 404
        if (idx === -1) {
            return res.redirect('/404');
        }

        // Удаление книги по индексу
        books.splice(idx, 1);

        // Запись обновленных данных в файл
        fs.writeFileSync('./books/books', JSON.stringify(books), 'utf8');
        console.log('Данные успешно записаны в файл.');

        res.redirect('/');
    } catch (err) {
        console.error('Ошибка:', err);
        res.status(500).send('Ошибка сервера');
    }
});

module.exports = router;