import { Box, Card, CardContent, Skeleton, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * Скелетон для страницы статистики
 */
export const StatsPageSkeleton = () => {
  return (
    <Stack spacing={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
      >
        <Skeleton variant="text" width={200} height={40} />
        <Skeleton variant="rectangular" width={200} height={36} sx={{ borderRadius: 1 }} />
      </Box>

      <StatsCardsSkeleton />

      <ChartsContainer>
        <ChartSkeleton />
        <ChartSkeleton />
      </ChartsContainer>

      <ChartSkeleton />
    </Stack>
  );
};

const StatsCardsSkeleton = () => {
  return (
    <GridContainer>
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index}>
          <CardContent>
            <Skeleton variant="text" width="60%" height={20} />
            <Skeleton variant="text" width="40%" height={40} sx={{ mt: 1 }} />
          </CardContent>
        </Card>
      ))}
    </GridContainer>
  );
};

const ChartSkeleton = () => {
  return (
    <Card>
      <CardContent>
        <Skeleton variant="text" width="40%" height={28} />
        <Skeleton variant="rectangular" width="100%" height={300} sx={{ mt: 2 }} />
      </CardContent>
    </Card>
  );
};

const GridContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  },
}));

const ChartsContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: '2fr 1fr',
  },
}));

