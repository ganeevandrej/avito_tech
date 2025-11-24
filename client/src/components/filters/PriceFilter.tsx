import { Stack, TextField } from '@mui/material';

interface IProps {
  minPrice: number | null;
  maxPrice: number | null;
  onMinPriceChange: (value: number | null) => void;
  onMaxPriceChange: (value: number | null) => void;
}

/**
 * Компонент фильтра по диапазону цен
 */
export const PriceFilter = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}: IProps) => {
  const createPriceHandler = (onChange: (value: number | null) => void) => 
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (!value) return onChange(null);
      const numValue = Number(value);
      if (numValue >= 0) onChange(numValue);
    };

  const handleMinPriceChange = createPriceHandler(onMinPriceChange);
  const handleMaxPriceChange = createPriceHandler(onMaxPriceChange);

  return (
    <Stack direction="row" spacing={2} sx={{ flex: 1 }}>
      <TextField
        type="number"
        label="Цена от"
        value={minPrice ?? ''}
        onChange={handleMinPriceChange}
        inputProps={{ min: 0, step: 10 }}
        sx={{ flex: 1 }}
      />
      <TextField
        type="number"
        label="Цена до"
        value={maxPrice ?? ''}
        onChange={handleMaxPriceChange}
        inputProps={{ min: 0, step: 10 }}
        sx={{ flex: 1 }}
      />
    </Stack>
  );
};



