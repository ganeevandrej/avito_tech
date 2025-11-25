import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

import { STATUSES } from '@/shared/constants/filters';
import { type AdStatus } from '@/types/ad';

interface IProps {
  selected: AdStatus[];
  onChange: (statuses: AdStatus[]) => void;
}

/**
 * Компонент фильтра по статусам объявлений
 */
export const StatusFilter = ({ selected, onChange }: IProps) => {
  const handleChange = (event: SelectChangeEvent<AdStatus[]>) => {
    onChange(event.target.value as AdStatus[]);
  };

  const renderValue = (values: AdStatus[]) => {
    if (!values.length) {
      return undefined;
    }

    return values
      .map((value) => STATUSES.find((status) => status.value === value)?.label ?? value)
      .join(', ');
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel>Статусы</InputLabel>
      <Select
        multiple
        value={selected}
        label="Статусы"
        onChange={handleChange}
        renderValue={(values) => renderValue(values as AdStatus[])}
      >
        {STATUSES.map((status) => (
          <MenuItem key={status.value} value={status.value}>
            <Checkbox size="small" checked={selected.includes(status.value)} />
            <ListItemText primary={status.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
