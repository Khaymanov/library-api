const consumeMessages = require('./consumer');

const topicName = 'test-topic'; // заменяй на нужный топик

consumeMessages(topicName).catch((err) => {
  console.error('Ошибка при запуске консюмера:', err);
});
