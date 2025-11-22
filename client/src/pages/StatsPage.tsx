import { Stack, Typography } from '@mui/material';

/**
 * Страница статистики модерации
 */
export const StatsPage = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="h4" component="h1">
        Статистика модерации
      </Typography>
      <Typography variant="body1">
        Здесь будет статистика модерации объявлений
      </Typography>
    </Stack>
  );
};
