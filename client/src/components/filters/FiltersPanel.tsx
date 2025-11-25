import { Refresh as RefreshIcon } from '@mui/icons-material';
import { Button, Card, CardContent, Stack } from '@mui/material';

import { CategoryFilter } from './CategoryFilter';
import { PriceFilter } from './PriceFilter';
import { SearchFilter } from './SearchFilter';
import { SortFilter } from './SortFilter';
import { StatusFilter } from './StatusFilter';
import { useFiltersHandlers } from './useFiltersHandlers';

interface IProps {
  searchInputRef?: React.RefObject<HTMLInputElement | null>;
}

/**
 * Компонент панели фильтров
 */
export const FiltersPanel = ({ searchInputRef }: IProps) => {
  const {
    filters,
    searchValue,
    setSearchValue,
    handleStatusToggle,
    handleCategoryChange,
    handleMinPriceChange,
    handleMaxPriceChange,
    handleReset,
    handleSortByChange,
    handleSortOrderChange,
  } = useFiltersHandlers();

  return (
    <Card elevation={2}>
      <CardContent>
        <Stack spacing={2}>
          {/* Поиск и сортировка */}
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <SearchFilter value={searchValue} onChange={setSearchValue} inputRef={searchInputRef} />
            <SortFilter
              sortBy={filters.sortBy}
              sortOrder={filters.sortOrder}
              onSortByChange={handleSortByChange}
              onSortOrderChange={handleSortOrderChange}
            />
          </Stack>

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
            <Button
              variant="text"
              color="inherit"
              startIcon={<RefreshIcon />}
              onClick={handleReset}
            >
              Сбросить
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
