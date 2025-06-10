module.exports = {
  HOST: "localhost", // имя сервиса из docker-compose.yml
  USER: "root",
  PASSWORD: "Qredafd4!",
  DB: "library",
  dialect: "mysql",
  PORT: 3306, // внутренний порт MySQL внутри Docker-сети
    pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};



