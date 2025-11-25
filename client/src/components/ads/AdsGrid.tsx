import { Box, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { SKELETON_COUNT } from '@/shared/constants/list';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectSelectedIds } from '@/store/slices/listSelectors';
import { toggleSelection } from '@/store/slices/listSlice';
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
  const dispatch = useAppDispatch();

  const selectedIds = useAppSelector(selectSelectedIds);

  const handleOpen = (id: number) => {
    navigate(`/item/${id}`);
  };

  const handleSelect = (id: number) => {
    dispatch(toggleSelection(id));
  };

  const defaultEmptyState = () => (
    <Box textAlign="center" py={8}>
      <Typography variant="h6">Нет объявлений</Typography>
    </Box>
  );

  return (
    <Box>
      {Boolean(totalItems) && (
        <Typography variant="subtitle2" color="text.secondary" mb={1}>
          Найдено объявлений: {totalItems}
        </Typography>
      )}

      <Stack gap={2}>
        {isLoading &&
          Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <AdCardSkeleton key={`skeleton-${index}`} />
          ))}
        {ads.map((ad, index) => (
          <AdCard
            key={ad.id}
            ad={ad}
            index={index}
            onOpen={() => handleOpen(ad.id)}
            selected={selectedIds.includes(ad.id)}
            onSelect={handleSelect}
          />
        ))}
      </Stack>

      {!isLoading && !ads.length && defaultEmptyState()}
    </Box>
  );
};
