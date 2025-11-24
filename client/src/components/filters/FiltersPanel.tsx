import { Refresh } from '@mui/icons-material';
import { Button, Card, CardContent, Stack } from '@mui/material';

import { CategoryFilter } from './CategoryFilter';
import { PriceFilter } from './PriceFilter';
import { SearchFilter } from './SearchFilter';
import { StatusFilter } from './StatusFilter';
import { useFiltersHandlers } from './useFiltersHandlers';

/**
 * Компонент панели фильтров
 */
export const FiltersPanel = () => {
  const {
    filters,
    searchValue,
    setSearchValue,
    handleStatusToggle,
    handleCategoryChange,
    handleMinPriceChange,
    handleMaxPriceChange,
    handleReset,
  } = useFiltersHandlers();

  return (
    <Card elevation={2}>
      <CardContent>
        <Stack spacing={2}>
          {/* Поиск */}
          <SearchFilter value={searchValue} onChange={setSearchValue} />

          {/* Статусы */}
          <StatusFilter selected={filters.status} onToggle={handleStatusToggle} />

          {/* Категория и цена */}
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <CategoryFilter value={filters.categoryId} onChange={handleCategoryChange} />
            <PriceFilter
              minPrice={filters.minPrice}
              maxPrice={filters.maxPrice}
              onMinPriceChange={handleMinPriceChange}
              onMaxPriceChange={handleMaxPriceChange}
            />
          </Stack>

          {/* Кнопка сброса */}
          <Stack direction="row" spacing={1}>
            <Button variant="text" color="inherit" startIcon={<Refresh />} onClick={handleReset}>
              Сбросить
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
