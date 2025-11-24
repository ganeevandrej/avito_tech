import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type AdStatus } from '@/types/ad';

/**
 * Интерфейс фильтров для списка объявлений
 */
export interface ListFilters {
  status: AdStatus[];
  categoryId: number | null;
  minPrice: number | null;
  maxPrice: number | null;
  search: string;
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
    setFilters(state, action: PayloadAction<Partial<ListFilters>>) {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    resetFilters(state) {
      state.filters = { ...defaultFilters };
      state.selectedIds = [];
    },
    setLastLoadedIds(state, action: PayloadAction<number[]>) {
      state.lastLoadedIds = action.payload;
    },
  },
});

export const { setFilters, resetFilters, setLastLoadedIds } = listSlice.actions;
export const defaultListFilters = defaultFilters;
export default listSlice.reducer;

