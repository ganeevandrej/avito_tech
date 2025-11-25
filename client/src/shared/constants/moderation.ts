import { STATUS_LABELS } from '@/shared/constants/filters';
import type { ModerationHistory } from '@/types/ad';

/**
 * Метки действий модерации
 */
export const MODERATION_ACTION_LABELS: Record<ModerationHistory['action'], string> = {
  approved: 'Одобрено',
  rejected: 'Отклонено',
  requestChanges: 'Нужны правки',
};

/**
 * Метки статусов модерации
 */
export const MODERATION_STATUS_LABELS = STATUS_LABELS;

/**
 * Причины модерации
 */
export const MODERATION_REASONS = [
  'Запрещённый товар',
  'Неверная категория',
  'Некорректное описание',
  'Проблемы с фото',
  'Подозрение на мошенничество',
];

