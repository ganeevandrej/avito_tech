import { Search } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';
import { forwardRef } from 'react';

interface IProps {
  value: string;
  onChange: (value: string) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

/**
 * Компонент фильтра поиска по названию
 */
export const SearchFilter = forwardRef<HTMLInputElement, IProps>(
  ({ value, onChange, inputRef }, ref) => {
    return (
      <TextField
        fullWidth
        label="Поиск по названию"
        size="small"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        inputRef={inputRef || ref}
        placeholder="Нажмите / для поиска"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
    );
  },
);
