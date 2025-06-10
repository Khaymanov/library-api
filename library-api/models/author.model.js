module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define("Author", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: "authors",  // Указываем точное имя таблицы
    timestamps: true       // Если хочешь использовать createdAt и updatedAt (по умолчанию true)
  });

  Author.associate = (models) => {
    Author.hasMany(models.Book, {
      foreignKey: "authorId",
      as: "books"
    });
  };

  return Author;
};





