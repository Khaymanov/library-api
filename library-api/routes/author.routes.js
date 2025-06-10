const express = require('express');
const router = express.Router();
/*const { Author } = require('../models');*/
const db = require('../models');
const Author = db.Author;
const authorController = require('../controllers/author.controller');

// Заменили ручную реализацию на контроллер
router.post('/', authorController.create);

router.get('/:id', authorController.findOne);

/*router.get('/:id', async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (author) {
      res.json(author);
    } else {
      res.status(404).send('Author not found');
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});*/

router.get('/', authorController.findAll);

/*router.get('/', async (req, res) => {
  try {
    const authors = await Author.findAll();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch authors' });
  }
});*/

router.put('/:authorId', authorController.updateAuthor);
router.delete('/:id', authorController.delete);

module.exports = router;




