import { FilterList as FilterListIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';

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
    handleStatusesChange,
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
        <Stack spacing={3}>
          {/* Заголовок и сброс */}
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={1} alignItems="center">
              <FilterListIcon color="action" fontSize="small" />
              <Typography variant="subtitle1" fontWeight={600}>
                Фильтры
              </Typography>
            </Stack>
            <Button
              variant="text"
              color="inherit"
              startIcon={<RefreshIcon />}
              size="small"
              onClick={handleReset}
            >
              Сбросить
            </Button>
          </Stack>

          {/* Поиск и сортировка */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <SearchFilter value={searchValue} onChange={setSearchValue} inputRef={searchInputRef} />
            <SortFilter
              sortBy={filters.sortBy}
              sortOrder={filters.sortOrder}
              onSortByChange={handleSortByChange}
              onSortOrderChange={handleSortOrderChange}
            />
          </Stack>

          {/* Основные фильтры */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Box sx={{ flex: 1, minWidth: 130 }}>
              <CategoryFilter value={filters.categoryId} onChange={handleCategoryChange} />
            </Box>
            <Box sx={{ flex: 1, minWidth: 130 }}>
              <StatusFilter selected={filters.status} onChange={handleStatusesChange} />
            </Box>
            <Box sx={{ flex: 1, minWidth: 200 }}>
              <PriceFilter
                minPrice={filters.minPrice}
                maxPrice={filters.maxPrice}
                onMinPriceChange={handleMinPriceChange}
                onMaxPriceChange={handleMaxPriceChange}
              />
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
