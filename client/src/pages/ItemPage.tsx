import { Box, CircularProgress, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import {
  HistoryCard,
  ItemDetailsCard,
  ItemGalleryCard,
  ModerationActions,
  NotFoundError,
} from '@/components/item';
import type { ModerationActionsRef } from '@/components/item/useModerationActions';
import { fetchAdById } from '@/services/api/ads';

/**
 * Страница детальной информации об объявлении
 */
const ItemPage = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  const moderationActionsRef = useRef<ModerationActionsRef | null>(null);

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
      <ModerationActions adId={numericId} actionsRef={moderationActionsRef} />
    </Stack>
  );
};

export default ItemPage;