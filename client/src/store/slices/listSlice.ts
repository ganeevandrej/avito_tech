import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type AdStatus } from '@/types/ad';

export type SortField = 'createdAt' | 'price' | 'priority';
export type SortOrder = 'asc' | 'desc';

const ITEMS_PER_PAGE = 10;
const LAST_LOADED_IDS_KEY = 'lastLoadedIds';

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

const getStoredLastLoadedIds = (): number[] => {
  try {
    const stored = sessionStorage.getItem(LAST_LOADED_IDS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const initialState: ListState = {
  filters: defaultFilters,
  selectedIds: [],
  lastLoadedIds: getStoredLastLoadedIds(),
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
      sessionStorage.setItem(LAST_LOADED_IDS_KEY, JSON.stringify(action.payload));
    },

    /**
     * Установка текущей страницы
     */
    setPage(state, action: PayloadAction<number>) {
      state.filters.page = action.payload;
    },

    /**
     * Переключение выбора объявления
     */
    toggleSelection(state, action: PayloadAction<number>) {
      const id = action.payload;
      const index = state.selectedIds.indexOf(id);

      if (index === -1) {
        state.selectedIds.push(id);
      } else {
        state.selectedIds.splice(index, 1);
      }
    },

    /**
     * Снять выбор со всех объявлений
     */
    clearSelection(state) {
      state.selectedIds = [];
    },

    /**
     * Установить выбранные ID
     */
    setSelectedIds(state, action: PayloadAction<number[]>) {
      state.selectedIds = action.payload;
    },
  },
});

export const {
  setFilters,
  resetFilters,
  setLastLoadedIds,
  setPage,
  toggleSelection,
  clearSelection,
  setSelectedIds,
} = listSlice.actions;
export const defaultListFilters = defaultFilters;
export default listSlice.reducer;

