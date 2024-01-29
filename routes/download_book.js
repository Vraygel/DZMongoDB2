const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/:id/download', (req, res) => {
  const id = req.params.id;
  const pathBook = path.join(__dirname, 'uploads/', `fileBook-${id}.extension`);

  res.download(pathBook, `book-${id}.extension`, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Что-то пошло не так...' });
    }
  });
});

module.exports = router;