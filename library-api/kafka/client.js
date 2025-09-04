const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'library-api',
  brokers: ['localhost:9092'], // Убедись, что Kafka доступна на этом порту
});

module.exports = kafka;
