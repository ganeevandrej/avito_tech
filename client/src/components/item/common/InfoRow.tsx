import { Box, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface IProps {
  icon: ReactNode;
  label: string;
  value: ReactNode;
}

/**
 * Компонент для отображения "иконка + ключ + значение"
 */
export const InfoRow = ({ icon, label, value }: IProps) => (
  <Stack direction="row" spacing={1.5} alignItems="flex-start">
    <Box mt={0.4} color="text.secondary">
      {icon}
    </Box>
    <Stack spacing={0.25} flex={1}>
      <Typography variant="body2" fontWeight={600} color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Stack>
  </Stack>
);

