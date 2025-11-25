import { Card, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { useQueryClient } from '@tanstack/react-query';
import { Fragment, useCallback, useMemo, useState } from 'react';

import { ModerationReasonDialog } from '@/components/common';
import type { ModerationPayload } from '@/components/item/useModerationActions';
import { approveAd, rejectAd, requestChanges } from '@/services/api/ads';
import {
  type DialogMode,
  MODERATION_ACTIONS,
  type ModerationActionKey,
} from '@/shared/constants/moderationActions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectSelectedIds } from '@/store/slices/listSelectors';
import { clearSelection } from '@/store/slices/listSlice';

/**
 * Компонент массовых действий с объявлениями
 */
export const BulkActions = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [dialogMode, setDialogMode] = useState<DialogMode>(null);
  const selectedIds = useAppSelector(selectSelectedIds);

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const handleDialogSubmit = async (payload: ModerationPayload) => {
    if (!dialogMode) return;

    setIsProcessing(true);
    try {
      if (dialogMode === 'reject') {
        await Promise.all(selectedIds.map((id) => rejectAd(id, payload.reason, payload.comment)));
      } else if (dialogMode === 'changes') {
        await Promise.all(
          selectedIds.map((id) => requestChanges(id, payload.reason, payload.comment)),
        );
      }

      queryClient.invalidateQueries({ queryKey: ['ads'] });
      dispatch(clearSelection());
      setDialogMode(null);
    } catch (error) {
      console.error(
        `Ошибка при массовом ${dialogMode === 'reject' ? 'отклонении' : 'возврате на доработку'}:`,
        error,
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClearSelection = useCallback(() => {
    dispatch(clearSelection());
  }, [dispatch]);

  const actionStateMap: Record<ModerationActionKey, () => Promise<void> | void> = useMemo(
    () => ({
      approve: async () => {
        setIsProcessing(true);
        try {
          await Promise.all(selectedIds.map((id) => approveAd(id)));
          queryClient.invalidateQueries({ queryKey: ['ads'] });
          handleClearSelection();
        } catch (error) {
          console.error('Ошибка при массовом одобрении:', error);
        } finally {
          setIsProcessing(false);
        }
      },
      reject: () => setDialogMode('reject'),
      changes: () => setDialogMode('changes'),
      clear: () => handleClearSelection(),
    }),
    [handleClearSelection, queryClient, selectedIds],
  );

  const renderIconButton = (config: (typeof MODERATION_ACTIONS)[number]) => {
    const action = actionStateMap[config.key];

    if (!action) {
      return null;
    }

    return (
      <Tooltip title={config.bulkLabel ?? config.label} arrow>
        <span>
          <IconButton
            color={config.color}
            size="large"
            onClick={() => action()}
            disabled={isProcessing}
          >
            {config.icon}
          </IconButton>
        </span>
      </Tooltip>
    );
  };

  if (selectedIds.length === 0) {
    return null;
  }

  return (
    <>
      <StickyContainer>
        <ActionsCard elevation={6}>
          <Typography variant="body2" color="text.secondary">
            Выбрано: <SelectionCount>{selectedIds.length}</SelectionCount>
          </Typography>
          <ActionsRow spacing={1}>
            {MODERATION_ACTIONS.map((config) => (
              <Fragment key={config.key}>{renderIconButton(config)}</Fragment>
            ))}
          </ActionsRow>
        </ActionsCard>
      </StickyContainer>
      <ModerationReasonDialog
        mode={dialogMode}
        open={dialogMode !== null}
        onClose={() => setDialogMode(null)}
        onSubmit={handleDialogSubmit}
      />
    </>
  );
};

const StickyContainer = styled('div')(({ theme }) => ({
  position: 'sticky',
  bottom: theme.spacing(3),
  display: 'flex',
  justifyContent: 'center',
  pointerEvents: 'none',
  zIndex: 2,
}));

const ActionsCard = styled(Card)(({ theme }) => ({
  pointerEvents: 'auto',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(1.5, 2),
  borderRadius: theme.spacing(3),
  backdropFilter: 'blur(10px)',
  backgroundColor: alpha(theme.palette.background.paper, 0.9),
  maxWidth: 420,
  width: 'fit-content',
}));

const ActionsRow = styled(Stack)(() => ({
  flexDirection: 'row',
  alignItems: 'center',
}));

const SelectionCount = styled('span')(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginLeft: theme.spacing(0.5),
}));
