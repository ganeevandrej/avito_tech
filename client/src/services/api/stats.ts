import type {
  ActivityData,
  CategoriesChart,
  DecisionsChart,
  StatsPeriod,
  StatsSummary,
} from '@/types/stats';

import { apiClient } from './client';

export interface StatsQueryParams {
  period?: StatsPeriod;
  startDate?: string;
  endDate?: string;
}

export const statsApi = {
  /**
   * Получить общую статистику
   */
  getSummary: async (params?: StatsQueryParams): Promise<StatsSummary> => {
    const response = await apiClient.get<StatsSummary>('/stats/summary', { params });
    return response.data;
  },

  /**
   * Получить данные для графика активности
   */
  getActivityChart: async (params?: StatsQueryParams): Promise<ActivityData[]> => {
    const response = await apiClient.get<ActivityData[]>('/stats/chart/activity', { params });
    return response.data;
  },

  /**
   * Получить данные для графика решений
   */
  getDecisionsChart: async (params?: StatsQueryParams): Promise<DecisionsChart> => {
    const response = await apiClient.get<DecisionsChart>('/stats/chart/decisions', { params });
    return response.data;
  },

  /**
   * Получить данные для графика категорий
   */
  getCategoriesChart: async (params?: StatsQueryParams): Promise<CategoriesChart> => {
    const response = await apiClient.get<CategoriesChart>('/stats/chart/categories', { params });
    return response.data;
  },
};

