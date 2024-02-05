const express = require('express');
const router = express.Router();
const fs = require('fs');
const idBook = require('../../getid');

router.get('/', (req, res) => {
    res.render('create');
});

router.post('/', (req, res) => {
    try {
        // Чтение файла с книгами
        const data = fs.readFileSync('./books/books', 'utf8');

        // Парсинг данных из файла
        let books = JSON.parse(data);

        // Добавление новой книги
        const { title, authors, description, favorite } = req.body;
        const newBook = {
            id: idBook(),
            title,
            description,
            authors,
            favorite,
        };
        books.push(newBook);

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
