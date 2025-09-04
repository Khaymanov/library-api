const kafka = require('./client');
const producer = kafka.producer();

const produceMessage = async () => {
  await producer.connect();

  await producer.send({
    topic: 'test-topic',
    messages: [
      {
        key: 'test-key',
        value: JSON.stringify({ message: 'Привет из library-api!', timestamp: new Date() }),
      },
    ],
  });

  console.log('✅ Сообщение отправлено в Kafka');
  await producer.disconnect();
};

module.exports = produceMessage;

