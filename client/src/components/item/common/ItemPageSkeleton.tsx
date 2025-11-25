import { Box, Card, CardContent, Skeleton, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * Скелетон для страницы объявления
 */
export const ItemPageSkeleton = () => (
  <Stack spacing={4}>
    {/* Заголовок */}
    <Stack spacing={1}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Skeleton variant="text" width="40%" height={40} />
        <Skeleton variant="rounded" width={70} height={24} />
        <Skeleton variant="rounded" width={100} height={24} />
      </Stack>
      <Skeleton variant="text" width="30%" height={20} />
    </Stack>

    {/* Галерея и история */}
    <RowLayout>
      <Box flex={1}>
        <Card>
          <CardContent>
            <Skeleton variant="text" width={100} height={24} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={260} sx={{ borderRadius: 2 }} />
          </CardContent>
        </Card>
      </Box>
      <Box flex={1}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Skeleton variant="text" width={150} height={24} sx={{ mb: 2 }} />
            <Stack spacing={2}>
              {[1, 2].map((i) => (
                <HistoryEntrySkeleton key={i}>
                  <Skeleton variant="text" width="60%" height={20} />
                  <Skeleton variant="text" width="40%" height={20} />
                  <Skeleton variant="text" width="50%" height={20} />
                </HistoryEntrySkeleton>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </RowLayout>

    {/* Детали */}
    <Card>
      <CardContent>
        <Stack spacing={3}>
          {/* Описание */}
          <Stack spacing={1}>
            <Skeleton variant="text" width={180} height={28} />
            <Skeleton variant="text" width="100%" height={20} />
            <Skeleton variant="text" width="80%" height={20} />
          </Stack>

          <Skeleton variant="rectangular" height={1} />

          {/* Три колонки */}
          <ColumnsLayout>
            <Stack spacing={1} flex={1}>
              <Skeleton variant="text" width={80} height={24} />
              <Skeleton variant="text" width="90%" height={20} />
              <Skeleton variant="text" width="70%" height={20} />
              <Skeleton variant="text" width="80%" height={20} />
            </Stack>
            <Stack spacing={1} flex={1}>
              <Skeleton variant="text" width={120} height={24} />
              <Skeleton variant="text" width="85%" height={20} />
              <Skeleton variant="text" width="75%" height={20} />
            </Stack>
            <Stack spacing={1} flex={1}>
              <Skeleton variant="text" width={90} height={24} />
              <Skeleton variant="text" width="80%" height={20} />
              <Skeleton variant="text" width="60%" height={20} />
              <Skeleton variant="text" width="70%" height={20} />
            </Stack>
          </ColumnsLayout>
        </Stack>
      </CardContent>
    </Card>

    {/* Панель действий */}
    <Box display="flex" justifyContent="center">
      <Card sx={{ p: 2.5, width: '100%', maxWidth: 840 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Skeleton variant="rounded" width={100} height={36} />
          <Stack direction="row" spacing={2}>
            <Skeleton variant="rounded" width={120} height={36} />
            <Skeleton variant="rounded" width={120} height={36} />
            <Skeleton variant="rounded" width={140} height={36} />
          </Stack>
          <Stack direction="row" spacing={1}>
            <Skeleton variant="rounded" width={80} height={36} />
            <Skeleton variant="rounded" width={80} height={36} />
          </Stack>
        </Stack>
      </Card>
    </Box>
  </Stack>
);

const RowLayout = styled(Stack)(({ theme }) => ({
  flexDirection: 'column',
  gap: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
}));

const HistoryEntrySkeleton = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  border: `1px solid ${theme.palette.divider}`,
  gap: theme.spacing(1),
}));

const ColumnsLayout = styled(Stack)(({ theme }) => ({
  flexDirection: 'column',
  gap: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
}));

