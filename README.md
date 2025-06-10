Конечно! Вот пример README для твоего проекта **nodejs-mysql-api**, с учетом того, что у тебя REST API на Node.js с MySQL, поддержка CRUD для книг и авторов, и работа через Docker.

---

# nodejs-mysql-api

REST API для управления библиотекой книг и авторов, реализованный на Node.js с использованием Express и MySQL.
Позволяет создавать, читать, обновлять и удалять книги и авторов. Поддерживает пагинацию и фильтрацию.

---

## Технологии

* Node.js
* Express
* Sequelize ORM
* MySQL
* Docker и Docker Compose

---

## Установка и запуск локально

1. Клонируйте репозиторий:

```bash
git clone https://github.com/Khaymanov/nodejs-mysql-api.git
cd nodejs-mysql-api
```

2. Создайте файл `.env` и укажите настройки базы данных (пример):

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=librarydb
DB_PORT=3306
```

3. Установите зависимости:

```bash
npm install
```

4. Запустите MySQL сервер (локально или через Docker) и создайте базу данных с именем из `.env`.

5. Запустите приложение:

```bash
npm start
```

API будет доступен по адресу `http://localhost:3000`.

---

## Запуск через Docker

1. Убедитесь, что у вас установлен Docker и Docker Compose.

2. В корне проекта выполните:

```bash
docker-compose up --build
```

Это поднимет и MySQL, и приложение с нужными настройками.

---

## API эндпоинты

### Авторы

* `GET /authors` — получить список авторов
* `POST /authors` — создать автора
* `GET /authors/:id` — получить автора по ID
* `PUT /authors/:id` — обновить автора по ID
* `DELETE /authors/:id` — удалить автора по ID

### Книги

* `GET /books` — получить список книг (поддерживает фильтрацию, пагинацию)
* `POST /books` — создать книгу
* `GET /books/:id` — получить книгу по ID
* `PUT /books/:id` — обновить книгу по ID
* `DELETE /books/:id` — удалить книгу по ID

---

## Структура проекта

* `/models` — модели Sequelize для книг и авторов
* `/controllers` — обработчики логики API
* `/routes` — маршруты Express
* `index.js` — точка входа приложения
* `config/db.config.js` — конфигурация базы данных
* `.env` — переменные окружения

---

## Лицензия

MIT License

---


