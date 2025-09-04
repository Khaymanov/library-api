const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'library-api',
  brokers: ['localhost:9092'], // если Redpanda использует другой порт — поменяй
});

module.exports = kafka;
