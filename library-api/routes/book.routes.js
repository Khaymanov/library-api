const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');

// Создать новую книгу
router.post('/', bookController.create);

// Получить все книги с фильтрацией и пагинацией (query params: offset, limit, category, author)
router.get('/', bookController.findAll);

// Получить книгу по ID
router.get('/:id', bookController.findOne);

// Обновить книгу по ID
router.put('/:id', bookController.update);

// Удалить книгу по ID
router.delete('/:id', bookController.delete);

module.exports = router;

