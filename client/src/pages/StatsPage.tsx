import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import {
  ActivityChart,
  CategoriesChart,
  DecisionsChart,
  StatsCards,
  StatsPageSkeleton,
  StatsPeriodFilter,
} from '@/components/stats';
import { statsApi } from '@/services/api/stats';
import { PERIOD_LABELS } from '@/shared/constants/stats';
import type { StatsPeriod } from '@/types/stats';

/**
 * Страница статистики модерации
 */
const StatsPage = () => {
  const [period, setPeriod] = useState<StatsPeriod>('week');

  const summaryQuery = useQuery({
    queryKey: ['stats', 'summary', period],
    queryFn: () => statsApi.getSummary({ period }),
  });

  const activityQuery = useQuery({
    queryKey: ['stats', 'activity', period],
    queryFn: () => statsApi.getActivityChart({ period }),
  });

  const decisionsQuery = useQuery({
    queryKey: ['stats', 'decisions', period],
    queryFn: () => statsApi.getDecisionsChart({ period }),
  });

  const categoriesQuery = useQuery({
    queryKey: ['stats', 'categories', period],
    queryFn: () => statsApi.getCategoriesChart({ period }),
  });

  const isLoading =
    summaryQuery.isLoading ||
    activityQuery.isLoading ||
    decisionsQuery.isLoading ||
    categoriesQuery.isLoading;

  if (isLoading) {
    return <StatsPageSkeleton />;
  }

  return (
    <Stack spacing={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
      >
        <Typography variant="h4" component="h1">
          Статистика
        </Typography>

        {/* фильтр периода статистики */}
        <StatsPeriodFilter period={period} onChange={setPeriod} />
      </Box>

      {/* карточки статистики */}
      {summaryQuery.data && <StatsCards data={summaryQuery.data} />}

      <ChartsContainer>
        {/* график активности */}
        <ChartItem size="large">
          {activityQuery.data && (
            <ActivityChart data={activityQuery.data} period={PERIOD_LABELS[period]} />
          )}
        </ChartItem>

        {/* график решений */}
        <ChartItem size="small">
          {decisionsQuery.data && <DecisionsChart data={decisionsQuery.data} />}
        </ChartItem>

        {/* график категорий */}
        <ChartItem size="full">
          {categoriesQuery.data && Object.keys(categoriesQuery.data).length > 0 && (
            <CategoriesChart data={categoriesQuery.data} />
          )}
        </ChartItem>
      </ChartsContainer>
    </Stack>
  );
};

const ChartsContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: '2fr 1fr',
  },
}));

const ChartItem = styled(Box)<{ size: 'large' | 'small' | 'full' }>(({ size }) => {
  if (size === 'full') {
    return {
      gridColumn: '1 / -1',
    };
  }
  return {};
});

export default StatsPage;