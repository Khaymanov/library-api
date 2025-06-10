require('dotenv').config();
const { createLogger, format, transports } = require('winston');
const { ElasticsearchTransport } = require('winston-elasticsearch');

// Настройки транспорта Elasticsearch
const esTransportOpts = {
  level: 'info',
  indexPrefix: 'test-logs', // Индекс будет вида: test-logs-YYYY.MM.DD
  flushInterval: 2000,      // Отправка логов в Elasticsearch каждые 2 секунды
  clientOpts: {
    node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200',
  },
};

// Создание транспорта и логгера
const esTransport = new ElasticsearchTransport(esTransportOpts);

// Логирование ошибок транспорта в консоль
esTransport.on('error', (err) => {
  console.error('❌ Elasticsearch Transport Error:', err);
});

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),     // timestamp в ISO 8601 (по умолчанию)
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    }),
    esTransport
  ],
  exitOnError: false,
});

module.exports = logger;



