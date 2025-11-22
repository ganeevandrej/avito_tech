import { Card, CardContent, Skeleton, Stack } from '@mui/material';

/**
 * Компонент скелетона карточки объявления
 */
export const AdCardSkeleton = () => {
  return (
    <Card sx={{ height: '100%' }}>
      <Skeleton variant="rectangular" height={200} />
      <CardContent>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1}>
            <Skeleton variant="rounded" width={80} height={24} />
            <Skeleton variant="rounded" width={80} height={24} />
          </Stack>
          <Skeleton variant="text" width="80%" height={32} />
          <Skeleton variant="text" width="60%" height={20} />
          <Skeleton variant="text" width="40%" height={28} />
          <Skeleton variant="text" width="50%" height={16} />
        </Stack>
      </CardContent>
    </Card>
  );
};

