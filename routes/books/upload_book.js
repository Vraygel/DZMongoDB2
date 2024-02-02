const express = require('express');
const router = express.Router();
const middlewareBook = require('../../middleware/middleware_book')
const idBook = require('../../getid')
const fs = require('fs');

router.post('/creature',
    middlewareBook.single('fileBook'),
    (req, res) => {
        if (req.file) {

            let books = []

            try {
                const data = fs.readFileSync('../../books/books', options = 'utf8')
                console.log('Содержимое файла:', data)
                books = JSON.parse(data)
            } catch (err) {
                console.error('Ошибка чтения файла:', err)
            }
            const { path } = req.file
            const newBook = {
                path: path,
                id: idBook(),
                title: req.file.title,
                description: req.file.description,
                authors: req.file.authors,
                favorite: req.file.favorite,
                fileCover: req.file.fileCover,
                fileName: req.file.originalname,
                fileBook: req.file.filename
            };

            books.push(newBook)

            let json = JSON.stringify(books)
            try {
                fs.writeFileSync('../../books/books', json, options = 'utf8')
                console.log('Данные успешно записаны в файл.')
            } catch (err) {
                console.error('Ошибка записи файла:', err);
            }

            res.json({ newBook })
        }
        res.json()
    })

module.exports = router;

