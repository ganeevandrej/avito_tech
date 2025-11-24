import { ArrowBack } from '@mui/icons-material';
import { Button, Card, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@/store/hooks';

import { ModerationButtons } from './ModerationButtons';

interface IProps {
  adId: number;
}

export const ModerationActions = ({ adId }: IProps) => {
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

  const handleNavigate = (targetId: number | null) => {
    if (!targetId) return;
    navigate(`/item/${targetId}`);
  };

  return (
    <StickyCard>
      <ActionsLayout>
        <Button
          variant="text"
          color="inherit"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/list')}
        >
          К списку
        </Button>
        <ModerationButtons adId={adId} />
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
    </StickyCard>
  );
};

const StickyCard = styled(Card)(({ theme }) => ({
  zIndex: 1,
  padding: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    position: 'sticky',
    bottom: theme.spacing(2),
  },
}));

const ActionsLayout = styled(Stack)(({ theme }) => ({
  flexDirection: 'column',
  gap: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));
