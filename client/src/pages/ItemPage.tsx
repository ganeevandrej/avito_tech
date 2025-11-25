import { Box, Chip, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import type { ModerationActionsRef } from '@/components/item';
import {
  HistoryCard,
  ItemDetailsCard,
  ItemGalleryCard,
  ItemPageSkeleton,
  ModerationActions,
  NotFoundError,
} from '@/components/item';
import { fetchAdById } from '@/services/api/ads';
import { STATUS_LABELS } from '@/shared/constants/filters';
import { formatDate } from '@/shared/utils/format';

/**
 * Страница детальной информации об объявлении
 */
const ItemPage = () => {
  const { id } = useParams<{ id: string }>();
  const moderationActionsRef = useRef<ModerationActionsRef | null>(null);

  const numericId = Number(id);

  const adQuery = useQuery({
    queryKey: ['ad', numericId],
    queryFn: ({ signal }) => fetchAdById(numericId, signal),
    enabled: Number.isInteger(numericId),
  });

  // Обработка горячих клавиш
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const isTyping = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';

      // Игнорируем, если пользователь уже вводит текст
      if (isTyping && event.key !== '/') return;

      // Одобрить объявление
      if (event.key === 'a' || event.key === 'A') {
        event.preventDefault();
        moderationActionsRef.current?.handleApprove?.();
        return;
      }

      // Отклонить объявление (открыть модальное окно)
      if (event.key === 'd' || event.key === 'D') {
        event.preventDefault();
        moderationActionsRef.current?.handleReject?.();
        return;
      }

      // Вернуть на доработку (открыть модальное окно)
      if (event.key === 's' || event.key === 'S') {
        event.preventDefault();
        moderationActionsRef.current?.handleRequestChanges?.();
        return;
      }

      // Предыдущее объявление
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        moderationActionsRef.current?.goToPrev?.();
        return;
      }

      // Следующее объявление
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        moderationActionsRef.current?.goToNext?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!Number.isInteger(numericId)) {
    return <NotFoundError />;
  }

  if (adQuery.isLoading) {
    return <ItemPageSkeleton />;
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

  const isUrgent = ad.priority === 'urgent';

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <Typography variant="h4" fontWeight={700}>
            {ad.title}
          </Typography>
          {isUrgent && <Chip label="Срочно" color="error" size="small" />}
          <Chip label={STATUS_LABELS[ad.status]} color="primary" size="small" variant="outlined" />
        </Stack>
        <Typography variant="body2" color="text.secondary">
          Объявление #{ad.id} · обновлено {formatDate(ad.updatedAt)}
        </Typography>
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <Box flex={1}>
          <ItemGalleryCard images={ad.images} />
        </Box>
        <Box flex={1}>
          <HistoryCard history={ad.moderationHistory} />
        </Box>
      </Stack>

      <ItemDetailsCard ad={ad} />

      <ModerationActions adId={numericId} actionsRef={moderationActionsRef} />
    </Stack>
  );
};

export default ItemPage;
