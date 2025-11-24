import { type ListFilters } from '@/store/slices/listSlice';
import { type AdsListResponse, type Advertisement } from '@/types/ad';

import { apiClient } from './client';

type QueryParamsValue = string | number | string[];

/**
 * Нормализация параметров фильтров для API запроса
 */
const normalizeParams = (filters: ListFilters): Record<string, QueryParamsValue> => {
  const params: Record<string, QueryParamsValue> = {};

  if (filters.search) {
    params.search = filters.search;
  }

  if (filters.categoryId !== null) {
    params.categoryId = filters.categoryId;
  }

  if (filters.minPrice !== null) {
    params.minPrice = filters.minPrice;
  }

  if (filters.maxPrice !== null) {
    params.maxPrice = filters.maxPrice;
  }

  if (filters.status.length > 0) {
    params.status = filters.status;
  }

  return params;
};

export const adsApi = {
  /**
   * Получить список объявлений
   */
  getAds: async (filters: ListFilters, signal?: AbortSignal): Promise<AdsListResponse> => {
    const params = normalizeParams(filters);
    const response = await apiClient.get<AdsListResponse>('/ads', { params, signal });
    return response.data;
  },

  /**
   * Получить объявление по ID
   */
  getAdById: async (id: number, signal?: AbortSignal): Promise<Advertisement> => {
    const response = await apiClient.get<Advertisement>(`/ads/${id}`, { signal });
    return response.data;
  },
};

export const fetchAds = async (
  filters: ListFilters,
  signal?: AbortSignal
): Promise<AdsListResponse> => adsApi.getAds(filters, signal);
