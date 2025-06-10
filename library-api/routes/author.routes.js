const express = require('express');
const router = express.Router();
const db = require('../models');
const Author = db.Author;
const authorController = require('../controllers/author.controller');

// Заменили ручную реализацию на контроллер
router.post('/', authorController.create);

router.get('/:id', authorController.findOne);

router.get('/', authorController.findAll);

router.put('/:authorId', authorController.updateAuthor);

router.delete('/:id', authorController.delete);

module.exports = router;




