import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from '@mui/material';

import { CATEGORIES } from '@/shared/constants/filters';

interface IProps {
  value: number | null;
  onChange: (value: number | null) => void;
}

/**
 * Компонент фильтра по категории объявлений
 */
export const CategoryFilter = ({ value, onChange }: IProps) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    const newValue = event.target.value;
    onChange(newValue === '' ? null : Number(newValue));
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel>Категория</InputLabel>
      <Select
        value={value !== null ? String(value) : ''}
        label="Категория"
        onChange={handleChange}
      >
        <MenuItem value="">Все категории</MenuItem>
        {CATEGORIES.map((category, index) => (
          <MenuItem key={category} value={index.toString()}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
