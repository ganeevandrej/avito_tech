import type { Theme } from '@mui/material/styles';

import { formatReviewTime } from '@/shared/utils/format';
import type { DecisionsChart, StatsPeriod, StatsSummary } from '@/types/stats';

/**
 * Метки периодов
 */
export const PERIOD_LABELS: Record<StatsPeriod, string> = {
  today: 'Сегодня',
  week: '7 дней',
  month: '30 дней',
};

/**
 * Получение цветов для графиков решений из темы
 */
export const getDecisionColors = (theme: Theme) => ({
  approved: theme.palette.success.main,
  rejected: theme.palette.error.main,
  requestChanges: theme.palette.warning.main,
});

/**
 * Лейблы для графиков решений
 */
export const DECISION_LABELS = {
  approved: 'Одобрено',
  rejected: 'Отклонено',
  requestChanges: 'На доработку',
} as const;

/**
 * Создание данных для графика решений
 */
export const createDecisionsChartData = (data: DecisionsChart, theme: Theme) => {
  const colors = getDecisionColors(theme);

  return Object.entries(data)
    .map(([key, value]) => {
      const keyLabel = key as keyof typeof DECISION_LABELS;

      return {
        name: DECISION_LABELS[keyLabel],
        value: Math.round(value),
        color: colors[keyLabel],
      };
    })
    .filter(({ value }) => value > 0);
};

/**
 * Конфигурация карточек статистики
 */
export interface StatCardConfig {
  title: string;
  getValue: (data: StatsSummary) => string | number;
}

export const STAT_CARDS_CONFIG: StatCardConfig[] = [
  {
    title: 'Проверено',
    getValue: (data) => data.totalReviewed,
  },
  {
    title: DECISION_LABELS.approved,
    getValue: (data) => `${Math.round(data.approvedPercentage)}%`,
  },
  {
    title: DECISION_LABELS.rejected,
    getValue: (data) => `${Math.round(data.rejectedPercentage)}%`,
  },
  {
    title: 'Ср. время',
    getValue: (data) => formatReviewTime(data.averageReviewTime),
  },
];

