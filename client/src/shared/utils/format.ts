import { STATUS_CHIP_COLORS } from '@/shared/constants/filters';

/**
 * Форматирование валюты
 */
export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value);

/**
 * Форматирование даты
 */
export const formatDate = (value: string) => {
  return new Date(value).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Форматирование даты для графиков (день и месяц)
 */
export const formatChartDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
  });
};

/**
 * Форматирование времени для статистики (минуты и секунды)
 */
export const formatReviewTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  if (minutes > 0) {
    const tenthsOfMinute = Math.round(remainingSeconds / 6);
    return `${minutes}.${tenthsOfMinute} мин`;
  }

  return `${totalSeconds} сек`;
};

/**
 * Получение цвета чипа статуса объявления
 */
export const getStatusChipColor = (status: string) =>
  STATUS_CHIP_COLORS[status] ?? 'warning';
