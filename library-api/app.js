const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const db = require('./models'); // Sequelize models
const bookRoutes = require('./routes/book.routes');
const authorRoutes = require('./routes/author.routes');

const app = express();
const port = 3000;

app.use(express.json());

// Swagger UI доступен по адресу http://localhost:3000/api-docs
const swaggerDocument = YAML.load('./api.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Роуты
app.use('/', bookRoutes);
app.use('/', authorRoutes);

// Простой эндпоинт
app.get('/', (req, res) => {
  res.send('Приложение работает!');
});

// Синхронизация с БД и запуск сервера
db.sequelize.sync().then(() => {
  console.log('База данных синхронизирована');
  app.listen(port, '0.0.0.0', () => {
    console.log(`Сервер запущен на http://0.0.0.0:${port}`);
  });
}).catch((err) => {
  console.error('Ошибка синхронизации с БД:', err);
});
