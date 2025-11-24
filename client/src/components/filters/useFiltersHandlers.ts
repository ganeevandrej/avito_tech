import { useCallback, useEffect, useState } from 'react';

import { useDebounce } from '@/shared/hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectFilters } from '@/store/slices/listSelectors';
import { resetFilters, setFilters } from '@/store/slices/listSlice';
import { type AdStatus } from '@/types/ad';

/**
 * Хук для управления логикой фильтров
 */
export const useFiltersHandlers = () => {
  const filters = useAppSelector(selectFilters);
  const [searchValue, setSearchValue] = useState(filters.search);
  const dispatch = useAppDispatch();

  const debouncedSearch = useDebounce(searchValue, 500);

  /**
   * Применение debounced значения поиска к фильтрам
   */
  useEffect(() => {
    const trimmedSearch = debouncedSearch.trim();

    if (trimmedSearch !== filters.search) {
      dispatch(setFilters({ search: trimmedSearch }));
    }
  }, [debouncedSearch, dispatch, filters.search]);

  /**
   * Обработчик переключения статуса в фильтрах
   */
  const handleStatusToggle = useCallback(
    (status: AdStatus) => {
      const next = filters.status.includes(status)
        ? filters.status.filter((item) => item !== status)
        : [...filters.status, status];

      dispatch(setFilters({ status: next }));
    },
    [filters.status, dispatch],
  );

  /**
   * Обработчик изменения категории
   */
  const handleCategoryChange = useCallback(
    (value: number | null) => dispatch(setFilters({ categoryId: value })),
    [dispatch],
  );

  /**
   * Обработчик изменения минимальной цены
   */
  const handleMinPriceChange = useCallback(
    (value: number | null) => dispatch(setFilters({ minPrice: value })),
    [dispatch],
  );

  /**
   * Обработчик изменения максимальной цены
   */
  const handleMaxPriceChange = useCallback(
    (value: number | null) => dispatch(setFilters({ maxPrice: value })),
    [dispatch],
  );

  /**
   * Сброс всех фильтров к значениям по умолчанию
   */
  const handleReset = useCallback(() => {
    dispatch(resetFilters());
    setSearchValue('');
  }, [dispatch, setSearchValue]);

  return {
    filters,
    searchValue,
    setSearchValue,
    handleStatusToggle,
    handleCategoryChange,
    handleMinPriceChange,
    handleMaxPriceChange,
    handleReset,
  };
};



