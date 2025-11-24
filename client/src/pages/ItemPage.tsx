import { Box, CircularProgress, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import {
  HistoryCard,
  ItemDetailsCard,
  ItemGalleryCard,
  ModerationActions,
  NotFoundError,
} from '@/components/item';
import { fetchAdById } from '@/services/api/ads';

/**
 * Страница детальной информации об объявлении
 */
export const ItemPage = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);

  const adQuery = useQuery({
    queryKey: ['ad', numericId],
    queryFn: ({ signal }) => fetchAdById(numericId, signal),
    enabled: Number.isInteger(numericId),
  });

  if (!Number.isInteger(numericId)) {
    return <NotFoundError />;
  }

  if (adQuery.isLoading) {
    return (
      <Box textAlign="center" py={8}>
        <CircularProgress />
      </Box>
    );
  }

  if (adQuery.isError) {
    const isNotFound =
      axios.isAxiosError(adQuery.error) && adQuery.error.response?.status === 404;

    if (isNotFound) {
      return <NotFoundError />;
    }

    throw new Error('Непредвиденная ошибка при загрузке объявления');
  }

  if (!adQuery.data) {
    throw new Error('Данные объявления не найдены');
  }

  const ad = adQuery.data;

  return (
    <Stack spacing={3}>
      {/* Галерея и история модерации */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <ItemGalleryCard images={ad.images} />
        <HistoryCard history={ad.moderationHistory} />
      </Stack>

      {/* Детальная информация об объявлении */}
      <ItemDetailsCard ad={ad} />

      {/* Действия модерации */}
      <ModerationActions adId={numericId} />
    </Stack>
  );
};
