# Avito Модерация

SPA-приложение для модерации объявлений Avito.

### Требования

- Node.js 18+
- npm 9+

### Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Предпросмотр собранного приложения
npm run preview
```

### Дополнительные команды

```bash
# Линтинг кода
npm run lint

# Форматирование кода
npm run format
```

## Стек технологий

### Обязательные

- **React 19** — UI-библиотека
- **TypeScript** — статическая типизация
- **React Router 7** - Маршрутизация приложения

### Необязательные (обоснование выбора)

- **Vite** — сборщик приложения
- **Material UI 7** - UI-компоненты для ускорения разработки и обеспечения консистентным дизайном
- **Redux Toolkit** - Глобальный объект для хранения данных приложения
- **React Query** - Серверное состояние + Кэширование
- **Axios** - HTTP-клиент + удобная обработка ошибок
- **Recharts** - Графики для ускорения разработки + простая интеграция с React

## Архитектура проекта

```
src/
├── components/          # UI-компоненты
│   ├── ads/             # Компоненты списка объявлений
│   │   ├── AdCard/      # Карточка объявления
│   │   ├── AdsGrid/     # Сетка объявлений
│   │   ├── AdsPagination/ # Пагинация
│   │   └── BulkActions/ # Массовые действия
│   ├── common/          # Общие компоненты (ErrorBoundary, PageLoader)
│   ├── filters/         # Панель фильтров
│   ├── item/            # Компоненты страницы объявления
│   │   ├── common/      # Общие (InfoRow, Skeleton, NotFoundError)
│   │   ├── HistoryCard/ # История модерации
│   │   ├── ItemDetails/ # Детали объявления
│   │   ├── ItemGallery/ # Галерея изображений
│   │   └── ModerationPanel/ # Панель модерации
│   ├── layout/          # Лейаут приложения
│   └── stats/           # Компоненты статистики
│       ├── Charts/      # Графики
│       ├── StatsCards/  # Карточки метрик
│       └── StatsPeriodFilter/
├── pages/               # Страницы (lazy-loaded)
│   ├── ListPage.tsx     # Список объявлений
│   ├── ItemPage.tsx     # Детальная страница
│   └── StatsPage.tsx    # Статистика
├── providers/           # React-провайдеры
│   ├── QueryProvider    # React Query
│   ├── ReduxProvider    # Redux Store
│   └── ThemeProvider    # MUI Theme
├── services/api/        # API-слой
│   ├── client.ts        # Axios-инстанс
│   ├── ads.ts           # Запросы объявлений
│   └── stats.ts         # Запросы статистики
├── shared/              # Общие утилиты
│   ├── constants/       # Константы
│   ├── hooks/           # Кастомные хуки
│   └── utils/           # Утилиты форматирования
├── store/               # Redux Store
│   ├── slices/          # Слайсы (list, theme)
│   └── hooks.ts         # Типизированные хуки
└── types/               # TypeScript-типы
```

