const db = require("../models");
const Book = db.Book;
const Author = db.Author;

// Создать новую книгу
exports.create = async (req, res) => {
  try {
    const payload = req.body;

    // Если массив книг — обрабатываем как bulkCreate
    if (Array.isArray(payload)) {
      const valid = payload.every(item => item.title && item.authorId);
      if (!valid) {
        return res.status(400).send({ message: "Каждая книга должна содержать title и authorId!" });
      }

      const books = await Book.bulkCreate(payload);
      return res.status(201).send(books);
    }

    // Если один объект — деструктуризируем и создаём одну книгу
    const { title, authorId, publishedDate, category, status } = payload;

    if (!title || !authorId) {
      return res.status(400).send({ message: "Title и authorId обязательны!" });
    }

    const book = await Book.create({ title, authorId, publishedDate, category, status });
    res.status(201).send(book);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


// Получить список всех книг
exports.findAll = async (req, res) => {
  try {
    const allowedCategories = [
      "fiction novel",
      "biography",
      "historic novel",
      "horror",
      "detective story",
      "comedy",
      "fantasy",
      "mystery",
    ];

    let { offset, limit, category, author } = req.query;

    // Парсим offset и limit как числа, если не заданы — задаём по умолчанию
    offset = offset !== undefined ? parseInt(offset, 10) : 0;
    limit = limit !== undefined ? parseInt(limit, 10) : 20;

    // Проверяем offset и limit на корректность
    if (isNaN(offset) || offset < 0) {
      return res.status(400).send({ message: "Параметр offset должен быть целым числом >= 0" });
    }
    if (isNaN(limit) || limit < 1 || limit > 50) {
      return res.status(400).send({ message: "Параметр limit должен быть целым числом от 1 до 50" });
    }

    // Проверяем category, если он задан
    if (category && !allowedCategories.includes(category)) {
      return res.status(400).send({ message: `Параметр category должен быть одним из: ${allowedCategories.join(", ")}` });
    }

    // Формируем объект фильтров для Sequelize
    const where = {};
    if (category) {
      where.category = category;
    }

    // Если фильтруем по автору, надо сделать вложенный include с условием
    const include = {
      model: Author,
      as: "author",
    };
    if (author) {
      include.where = {
        name: author,
      };
    }

    const books = await Book.findAll({
      where,
      include: [include],
      offset,
      limit,
    });

    res.send(books);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};



// Получить одну книгу по ID
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findByPk(id, { include: ["author"] });

    if (!book) {
      return res.status(404).send({ message: "Книга не найдена" });
    }

    res.send(book);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Обновить книгу по ID
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Book.update(req.body, { where: { id } });

    if (updated) {
      const updatedBook = await Book.findByPk(id);
      return res.send(updatedBook);
    }

    res.status(404).send({ message: "Книга не найдена" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Удалить книгу по ID
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Book.destroy({ where: { id } });

    if (deleted) {
      return res.status(200).send({ message: "Книга удалена" });
    }

    res.status(404).send({ message: "Книга не найдена" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
