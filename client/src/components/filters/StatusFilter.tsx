import { Box, Chip, Stack, Typography } from '@mui/material';

import { STATUSES } from '@/shared/constants/filters';
import { type AdStatus } from '@/types/ad';

interface IProps {
  selected: AdStatus[];
  onToggle: (status: AdStatus) => void;
}

/**
 * Компонент фильтра по статусам объявлений
 */
export const StatusFilter = ({ selected, onToggle }: IProps) => {
  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        Статусы
      </Typography>
      <Stack direction="row" gap={1} flexWrap="wrap">
        {STATUSES.map((status) => (
          <Chip
            key={status.value}
            label={status.label}
            color={selected.includes(status.value) ? 'primary' : 'default'}
            onClick={() => onToggle(status.value)}
          />
        ))}
      </Stack>
    </Box>
  );
};



