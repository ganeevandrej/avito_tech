import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { STAT_CARDS_CONFIG } from '@/shared/constants/stats';
import type { StatsSummary } from '@/types/stats';

import { StatCard } from './StatCard';

interface IProps {
  data: StatsSummary;
}

/**
 * Компонент карточек статистики
 */
export const StatsCards = ({ data }: IProps) => {
  return (
    <GridContainer>
      {STAT_CARDS_CONFIG.map((config) => (
        <StatCard key={config.title} title={config.title} value={config.getValue(data)} />
      ))}
    </GridContainer>
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
