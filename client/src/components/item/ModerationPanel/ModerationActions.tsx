import { ArrowBack } from '@mui/icons-material';
import { Button, Card, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@/store/hooks';

import { ModerationButtons } from './ModerationButtons';
import type { ModerationActionsRef } from './useModerationActions';

interface IProps {
  adId: number;
  actionsRef?: React.RefObject<ModerationActionsRef | null>;
}

/**
 * Компонент панели действий модерации
 */
export const ModerationActions = ({ adId, actionsRef }: IProps) => {
  const navigate = useNavigate();
  const lastLoadedIds = useAppSelector((state) => state.list.lastLoadedIds);

  const { prevId, nextId } = useMemo(() => {
    const currentIndex = lastLoadedIds.findIndex((id) => id === adId);
    const prev = currentIndex > 0 ? lastLoadedIds[currentIndex - 1] : null;
    const next =
      currentIndex >= 0 && currentIndex < lastLoadedIds.length - 1
        ? lastLoadedIds[currentIndex + 1]
        : null;

    return { prevId: prev, nextId: next };
  }, [adId, lastLoadedIds]);

  const handleNavigate = useCallback(
    (targetId: number | null) => {
      if (!targetId) return;
      navigate(`/item/${targetId}`);
    },
    [navigate],
  );

  // Устанавливаем функции через ref для горячих клавиш
  useEffect(() => {
    if (!actionsRef) return;

    actionsRef.current = {
      ...(actionsRef.current ?? {}),
      ...(prevId && { goToPrev: () => handleNavigate(prevId) }),
      ...(nextId && { goToNext: () => handleNavigate(nextId) }),
    };
  }, [actionsRef, handleNavigate, nextId, prevId]);

  return (
    <StickyWrapper>
      <ActionCard>
        <ActionsLayout>
          <Button
            variant="text"
            color="inherit"
            startIcon={<ArrowBack />}
            onClick={() => navigate('/list')}
          >
            К списку
          </Button>
          <ModerationButtons adId={adId} actionsRef={actionsRef} />
          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              variant="text"
              color="inherit"
              disabled={!prevId}
              onClick={() => handleNavigate(prevId)}
            >
              ◀ Пред
            </Button>
            <Typography variant="body1" color="text.secondary">|</Typography>
            <Button
              variant="text"
              color="inherit"
              disabled={!nextId}
              onClick={() => handleNavigate(nextId)}
            >
              След ▶
            </Button>
          </Stack>
        </ActionsLayout>
      </ActionCard>
    </StickyWrapper>
  );
};

const StickyWrapper = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    position: 'sticky',
    bottom: theme.spacing(2),
    zIndex: 10,
  },
  display: 'flex',
  justifyContent: 'center',
}));

const ActionCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2.5),
  boxShadow: theme.shadows[3],
  width: '100%',
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    maxWidth: 840,
  },
}));

const ActionsLayout = styled(Stack)(({ theme }) => ({
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

