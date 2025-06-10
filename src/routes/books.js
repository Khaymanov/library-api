const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

// Получить список всех книг
router.get('/', (req, res) => {
  connection.query('SELECT * FROM books', (err, results) => {
    if (err) return res.status(500).json({ error: 'Ошибка запроса' });
    res.json(results);
  });
});

// Добавить книгу
router.post('/', (req, res) => {
  const { title, author, category, status } = req.body;
  const sql = 'INSERT INTO books (title, author, category, status) VALUES (?, ?, ?, ?)';
  connection.query(sql, [title, author, category, status], (err, result) => {
    if (err) return res.status(500).json({ error: 'Ошибка вставки' });
    res.status(201).json({ id: result.insertId });
  });
});

module.exports = router;
