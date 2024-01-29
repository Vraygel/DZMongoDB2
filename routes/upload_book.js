const express = require('express');
const router = express.Router();
const middlewareBook = require('../middleware/middleware_book')
const idBook = require('../getid')

router.post('/creature',
    middlewareBook.single('fieldname'),
    (req, res) => {
        console.log(req);
        if (req.file) {
            const { path } = req.file
            const book = {
                path: path,
                id: idBook,
                title: req.file.title,
                description: req.file.description,
                authors: req.file.authors,
                favorite: req.file.favorite,
                fileCover: req.file.fileCover,
                fileName: req.file.fileName,
                fileBook: req.file.filename
            };
            console.log(book);
            res.json({ book })
        }
        // console.log(res.json());
        res.json()
    })

module.exports = router;
