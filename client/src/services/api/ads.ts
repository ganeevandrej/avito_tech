import { type ListFilters } from '@/store/slices/listSlice';
import { type AdsListResponse, type Advertisement } from '@/types/ad';

import { apiClient } from './client';

type QueryParamsValue = string | number | string[];

/**
 * Нормализация параметров фильтров для API запроса
 */
const normalizeParams = (filters: ListFilters): Record<string, QueryParamsValue> => {
  const params: Record<string, QueryParamsValue> = {
    page: filters.page,
    limit: filters.limit,
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
  };

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
  /**
   * Одобрить объявление
   */
  approveAd: async (id: number) => {
    const response = await apiClient.post(`/ads/${id}/approve`);
    return response.data;
  },
  /**
   * Отклонить объявление
   */
  rejectAd: async (id: number, payload: { reason: string; comment?: string }) => {
    const response = await apiClient.post(`/ads/${id}/reject`, payload);
    return response.data;
  },
  /**
   * Запросить изменения
   */
  requestChanges: async (id: number, payload: { reason: string; comment?: string }) => {
    const response = await apiClient.post(`/ads/${id}/request-changes`, payload);
    return response.data;
  },
};


/**
 * Запрос списка объявлений
 */
export const fetchAds = async (
  filters: ListFilters,
  signal?: AbortSignal,
): Promise<AdsListResponse> => adsApi.getAds(filters, signal);

/**
 * Получить объявление по ID
 */
export const fetchAdById = async (id: number, signal?: AbortSignal) =>
  adsApi.getAdById(id, signal);

/**
 * Одобрить объявление
 */
export const approveAd = async (id: number) => adsApi.approveAd(id);

/**
 * Отклонить объявление
 */
export const rejectAd = async (id: number, reason: string, comment?: string) =>
  adsApi.rejectAd(id, { reason, comment });

/**
 * Отправить запрос на изменения
 */
export const requestChanges = async (id: number, reason: string, comment?: string) =>
  adsApi.requestChanges(id, { reason, comment });
