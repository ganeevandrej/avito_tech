import {
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
} from '@mui/icons-material';
import type { SelectChangeEvent } from '@mui/material';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from '@mui/material';

import { SORT_OPTIONS } from '@/shared/constants/filters';
import { type ListFilters } from '@/store/slices/listSlice';

interface IProps {
  sortBy: ListFilters['sortBy'];
  sortOrder: ListFilters['sortOrder'];
  onSortByChange: (value: ListFilters['sortBy']) => void;
  onSortOrderChange: (value: ListFilters['sortOrder']) => void;
}

export const SortFilter = ({
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderChange,
}: IProps) => {
  const handleSortByChange = (event: SelectChangeEvent<ListFilters['sortBy']>) => {
    onSortByChange(event.target.value);
  };

  return (
    <Stack direction="row" spacing={2} flex={1}>
      <FormControl fullWidth>
        <InputLabel id="sort-filter-label">Сортировка</InputLabel>
        <Select
          labelId="sort-filter-label"
          id="sort-filter"
          label="Сортировка"
          size="small"
          value={sortBy}
          onChange={handleSortByChange}
        >
          {SORT_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ToggleButtonGroup
        exclusive
        value={sortOrder}
        onChange={(_, value) => value && onSortOrderChange(value)}
        color="primary"
        size="small"
      >
        <ToggleButton value="asc" aria-label="По возрастанию">
          <Tooltip title="По возрастанию" arrow>
            <ArrowUpwardIcon fontSize="small" />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value="desc" aria-label="По убыванию">
          <Tooltip title="По убыванию" arrow>
            <ArrowDownwardIcon fontSize="small" />
          </Tooltip>
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
};
