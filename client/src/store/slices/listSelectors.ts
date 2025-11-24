import { type RootState } from '@/store';

import { type ListFilters } from './listSlice';

export const selectFilters = (state: RootState): ListFilters => state.list.filters;
