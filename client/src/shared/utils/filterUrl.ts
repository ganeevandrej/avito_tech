import type { ListFilters } from '@/store/slices/listSlice';
import type { AdStatus } from '@/types/ad';

const parseNumberParam = (value: string | null): number | null => {
  if (value === null) {
    return null;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
};

/**
 * Формирует строку query-параметров на основе текущих фильтров
 */
export const filtersToSearch = (filters: ListFilters): string => {
  const params = new URLSearchParams();

  if (filters.status.length) {
    params.set('status', filters.status.join(','));
  }

  if (filters.categoryId) {
    params.set('categoryId', String(filters.categoryId));
  }

  if (filters.minPrice !== null) {
    params.set('minPrice', String(filters.minPrice));
  }

  if (filters.maxPrice !== null) {
    params.set('maxPrice', String(filters.maxPrice));
  }

  if (filters.search.trim()) {
    params.set('search', filters.search.trim());
  }

  params.set('sortBy', filters.sortBy);
  params.set('sortOrder', filters.sortOrder);
  params.set('page', String(filters.page));

  const serialized = params.toString();
  return serialized ? `?${serialized}` : '';
};

/**
 * Извлекает фильтры из строки query-параметров
 */
export const filtersFromSearch = (search: string): Partial<ListFilters> | null => {
  if (!search) {
    return null;
  }

  const params = new URLSearchParams(search);

  return {
    status: params.get('status')?.split(',').filter(Boolean) as AdStatus[] ?? [],
    categoryId: parseNumberParam(params.get('categoryId')),
    minPrice: parseNumberParam(params.get('minPrice')),
    maxPrice: parseNumberParam(params.get('maxPrice')),
    search: params.get('search') ?? '',
    sortBy: params.get('sortBy') as ListFilters['sortBy'] ?? 'createdAt',
    sortOrder: params.get('sortOrder') as ListFilters['sortOrder'] ?? 'desc',
    page: parseNumberParam(params.get('page')) ?? 1,
  };
};

