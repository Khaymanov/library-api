const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const db = require('./models'); // Sequelize models
const bookRoutes = require('./routes/book.routes');
const authorRoutes = require('./routes/author.routes');

const client = require('prom-client');
const logger = require('./logger/logger');  // твой Winston-логгер

const app = express();
const port = 3000;

app.use(express.json());

// Раздача статики swagger (чтобы api.yaml был доступен)
app.use('/swagger', express.static(path.join(__dirname, 'swagger')));

// Swagger UI доступен по адресу http://localhost:3000/api-docs
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger', 'api.yaml'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Роуты
app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);

// Prometheus метрики
client.collectDefaultMetrics();

// Добавляем endpoint для метрик
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } catch (ex) {
    logger.error('Ошибка при отдаче метрик: ' + ex.message);
    res.status(500).end();
  }
});

// Простой эндпоинт
app.get('/', (req, res) => {
  logger.info('Запрос на /');
  res.send('Приложение работает!');
});

// Синхронизация с БД и запуск сервера
db.sequelize.sync().then(() => {
  logger.info('База данных синхронизирована');
  app.listen(port, '0.0.0.0', () => {
    logger.info(`Сервер запущен на http://0.0.0.0:${port}`);
  });
}).catch((err) => {
  logger.error('Ошибка синхронизации с БД', err);
});





 
