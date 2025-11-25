import { type RootState } from '@/store';

import { type ListFilters } from './listSlice';

/**
 * Селектор для получения фильтров
 */
export const selectFilters = (state: RootState): ListFilters => state.list.filters;

/**
 * Селектор для получения текущей страницы
 */
export const selectPage = (state: RootState): number => state.list.filters.page;

/**
 * Селектор для получения выбранных ID объявлений
 */
export const selectSelectedIds = (state: RootState): number[] => state.list.selectedIds;