import { Search } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';

interface IProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Компонент фильтра поиска по названию
 */
export const SearchFilter = ({ value, onChange }: IProps) => {
  return (
    <TextField
      fullWidth
      label="Поиск по названию"
      size="small"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
    />
  );
};
