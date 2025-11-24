import { type AdStatus } from '@/types/ad';

/**
 * Список лейблов для отображения приоритетов
 */
export const PRIORITY_LABELS: Record<string, string> = {
  normal: 'Обычный',
  urgent: 'Срочный',
};

/**
 * Список лейблов для отображения статусов
 */
export const STATUS_LABELS: Record<AdStatus, string> = {
  pending: 'На модерации',
  approved: 'Одобрено',
  rejected: 'Отклонено',
  draft: 'Черновик',
};

/**
 * Список статусов для фильтрации
 */
export const STATUSES: { value: AdStatus; label: string }[] = [
  { value: 'pending', label: 'На модерации' },
  { value: 'approved', label: 'Одобрено' },
  { value: 'rejected', label: 'Отклонено' },
  { value: 'draft', label: 'Черновик' },
];

/**
 * Список категорий для фильтрации
 */
export const CATEGORIES = [
  'Электроника',
  'Недвижимость',
  'Транспорт',
  'Работа',
  'Услуги',
  'Животные',
  'Мода',
  'Детское',
];

/**
 * Список опций сортировки
 */
export const SORT_OPTIONS = [
  { value: 'createdAt', label: 'По дате создания' },
  { value: 'price', label: 'По цене' },
  { value: 'priority', label: 'По приоритету' },
];

