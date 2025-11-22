import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import { SKELETON_COUNT } from '@/shared/constants/list';
import { type Advertisement } from '@/types/ad';

import { AdCard } from './AdCard';
import { AdCardSkeleton } from './AdCardSkeleton';

interface IProps {
  ads: Advertisement[];
  isLoading: boolean;
  totalItems?: number;
}

/**
 * Компонент сетки объявлений
 */
export const AdsGrid = ({ ads, isLoading, totalItems }: IProps) => {
  const navigate = useNavigate();

  const handleOpen = (id: number) => {
    navigate(`/item/${id}`);
  };

  const defaultEmptyState = () => (
    <Box textAlign="center" py={8}>
      <Typography variant="h6">Нет объявлений</Typography>
    </Box>
  );

  return (
    <Box>
      {totalItems && (
        <Typography variant="subtitle2" color="text.secondary" mb={1}>
          Найдено объявлений: {totalItems}
        </Typography>
      )}
      <GridContainer>
        {isLoading &&
          Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <AdCardSkeleton key={`skeleton-${index}`} />
          ))}
        {ads.map((ad, index) => (
          <AdCard key={ad.id} ad={ad} index={index} onOpen={() => handleOpen(ad.id)} />
        ))}
      </GridContainer>
      {!isLoading && !ads.length && defaultEmptyState()}
    </Box>
  );
};

const GridContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  },
}));
