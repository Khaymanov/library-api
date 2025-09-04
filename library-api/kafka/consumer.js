const kafka = require('./client');
const consumer = kafka.consumer({ groupId: 'library-group' });

const consumeMessages = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`📥 Получено сообщение: ${message.value.toString()}`);
    },
  });
};

module.exports = consumeMessages;

