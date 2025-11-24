import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type AdStatus } from '@/types/ad';

export type SortField = 'createdAt' | 'price' | 'priority';
export type SortOrder = 'asc' | 'desc';

const ITEMS_PER_PAGE = 10;

/**
 * Интерфейс фильтров для списка объявлений
 */
export interface ListFilters {
  status: AdStatus[];
  categoryId: number | null;
  minPrice: number | null;
  maxPrice: number | null;
  search: string;
  sortBy: SortField;
  sortOrder: SortOrder;
  page: number;
  limit: number;
}

/**
 * Фильтры по умолчанию
 */
const defaultFilters: ListFilters = {
  status: [],
  categoryId: null,
  minPrice: null,
  maxPrice: null,
  search: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  page: 1,
  limit: ITEMS_PER_PAGE,
};

interface ListState {
  filters: ListFilters;
  selectedIds: number[];
  lastLoadedIds: number[];
}

const initialState: ListState = {
  filters: defaultFilters,
  selectedIds: [],
  lastLoadedIds: [],
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    /**
     * Установка фильтров
     */
    setFilters(state, action: PayloadAction<Partial<ListFilters>>) {
      state.filters = {
        ...state.filters,
        ...action.payload,
        page: action.payload.page ?? 1,
      };
    },

    /**
     * Сброс фильтров
     */
    resetFilters(state) {
      state.filters = { ...defaultFilters };
      state.selectedIds = [];
    },

    /**
     * Установка последних загруженных идентификаторов
     */
    setLastLoadedIds(state, action: PayloadAction<number[]>) {
      state.lastLoadedIds = action.payload;
    },

    /**
     * Установка текущей страницы
     */
    setPage(state, action: PayloadAction<number>) {
      state.filters.page = action.payload;
    },
  },
});

export const { setFilters, resetFilters, setLastLoadedIds, setPage } = listSlice.actions;
export const defaultListFilters = defaultFilters;
export default listSlice.reducer;

