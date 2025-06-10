module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define("Book", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'author_id'  // 👈 Вот здесь указываем имя поля в БД
    }
  }, {
    tableName: "books", // 👈 если ты используешь строчные имена таблиц
    timestamps: true
  });

  Book.associate = (models) => {
    Book.belongsTo(models.Author, {
      foreignKey: "authorId",
      as: "author"
    });
  };

  return Book;
};



/*module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define("Book", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'author_id' // 👈 Вот здесь указываем имя поля в БД
    }
  });

  Book.associate = (models) => {
    Book.belongsTo(models.Author, {
      foreignKey: "authorId",
      as: "author"
    });
  };

  return Book;
};*/







