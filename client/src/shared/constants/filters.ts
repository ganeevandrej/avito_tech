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
  { value: 'pending', label: STATUS_LABELS.pending },
  { value: 'approved', label: STATUS_LABELS.approved },
  { value: 'rejected', label: STATUS_LABELS.rejected },
  { value: 'draft', label: STATUS_LABELS.draft },
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

