const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// Настройка CORS для разрешения запросов с GitHub Pages и localhost
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      /^https:\/\/.*\.github\.io$/, // Все GitHub Pages домены
      /^http:\/\/localhost:\d+$/, // Localhost с любым портом
      /^http:\/\/127\.0\.0\.1:\d+$/, // 127.0.0.1 с любым портом
    ];

    // Проверяем, соответствует ли origin одному из разрешенных паттернов
    const isAllowed = allowedOrigins.some((pattern) => pattern.test(origin));

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));

app.use("/api/v1", require("./src/routes/v1"));

app.get("/", (req, res) => {
  res.json({
    message: "API сервер для модерации объявлений",
    version: "1.0.0",
  });
});

app.use((err, req, res, next) => {
  // Обработка CORS ошибок
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      error: "CORS: Запрос с данного домена не разрешен",
      origin: req.get("origin"),
    });
  }

  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    error: "Что-то пошло не так!",
    message: err.message,
  });
});

app.use("*", (req, res) => {
  res.status(404).json({
    error: "Endpoint не найден",
    path: req.originalUrl,
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

module.exports = app;
