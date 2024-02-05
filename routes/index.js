const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
    let books = []
    try {
        const data = fs.readFileSync('./books/books', options = 'utf8')
         books = JSON.parse(data)
    } catch (err) {
        console.error('Ошибка чтения файла:', err)
    }
    res.render('index', {
        title: 'Главная',
        books
    })
});

module.exports = router;