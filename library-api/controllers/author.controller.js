const db = require("../models");
const Author = db.Author;
const Book = db.Book;
const logger = require('../logger/logger');

// Создать одного или нескольких авторов
exports.create = async (req, res) => {
  try {
    const authors = Array.isArray(req.body) ? req.body : [req.body];

    for (const author of authors) {
      if (!author.name) {
        return res.status(400).send({ message: "Name is required" });
      }
    }

    const createdAuthors = await Author.bulkCreate(authors);

    // Логируем чисто, без спецсимволов
    logger.info(`Authors created: ${authors.map(a => a.name).join(', ')}`, {
      service: 'nodejs-mysql-api',
      action: 'create-authors',
      count: authors.length,
    });

    res.status(201).send(createdAuthors);
  } catch (err) {
    logger.error(`Error creating authors: ${err.message}`, {
      service: 'nodejs-mysql-api',
      action: 'create-authors',
    });

    res.status(500).send({ message: err.message });
  }
};



// Получить всех авторов
exports.findAll = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const authors = await Author.findAll({ limit });
    res.json(authors);
  } catch (error) {
    console.error("Ошибка в findAll authors:", error); // 👈 Добавь это
    res.status(500).json({ error: "Failed to fetch authors" });
  }
};


// Получить одного автора по ID
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const author = await Author.findByPk(id, {
      include: [{
        model: Book,
        as: "books"
      }]
    });

    if (!author) {
      return res.status(404).send({ message: "Автор не найден" });
    }

    res.send(author);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Обновить автора по ID
exports.updateAuthor = async (req, res) => {
  try {
    const id = req.params.authorId;
    const [updated] = await Author.update(req.body, { where: { id } });

    if (updated) {
      const updatedAuthor = await Author.findByPk(id);
      return res.send(updatedAuthor);
    }

    res.status(404).send({ message: "Автор не найден" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Удалить автора по ID
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Author.destroy({ where: { id } });

    if (deleted) {
      return res.send({ message: "Автор удалён" });
    }

    res.status(404).send({ message: "Автор не найден" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
