import { type AdsListResponse, type Advertisement } from '@/types/ad';

import { apiClient } from './client';

export const adsApi = {
  /**
   * Получить список объявлений
   */
  getAds: async (signal?: AbortSignal): Promise<AdsListResponse> => {
    const response = await apiClient.get<AdsListResponse>('/ads', { signal });
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

export const fetchAds = async (signal?: AbortSignal): Promise<AdsListResponse> => {
  return adsApi.getAds(signal);
};
