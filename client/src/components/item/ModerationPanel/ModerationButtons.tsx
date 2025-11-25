import {
  Button,
  type ButtonProps,
  Stack,
  Tooltip,
} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';

import { ModerationReasonDialog } from '@/components/common';
import type { DialogMode, ModerationActionConfig } from '@/shared/constants/moderationActions';
import { MODERATION_ACTIONS } from '@/shared/constants/moderationActions';

import {
  type ModerationActionsRef,
  type ModerationButtonActionKey,
  type ModerationPayload,
  useModerationActions,
} from './useModerationActions';

interface IProps {
  adId: number;
  actionsRef?: React.RefObject<ModerationActionsRef | null>;
}

/**
 * Компонент кнопок модерации
 */
export const ModerationButtons = ({ adId, actionsRef }: IProps) => {
  const [dialogMode, setDialogMode] = useState<DialogMode>(null);

  const { actionStateMap, handleReject, handleRequestChanges } = useModerationActions(adId, {
    onOpenDialog: setDialogMode,
  });

  // Устанавливаем функции через ref для горячих клавиш
  useEffect(() => {
    if (!actionsRef) return;

    actionsRef.current = {
      ...(actionsRef.current ?? {}),
      handleApprove: actionStateMap.approve.handler,
      handleReject: () => actionStateMap.reject.handler(), // Открывает модальное окно
      handleRequestChanges: () => actionStateMap.changes.handler(), // Открывает модальное окно
    };
  }, [actionsRef, actionStateMap]);

  const handleDialogSubmit = (payload: ModerationPayload) => {
    if (dialogMode === 'reject') {
      handleReject(payload);
    } else if (dialogMode === 'changes') {
      handleRequestChanges(payload);
    }

    setDialogMode(null);
  };

  const renderButton = (config: ModerationActionConfig) => {
    const state = actionStateMap[config.key as ModerationButtonActionKey];

    if (!state) {
      return null;
    }

    const hotkeyHint = config.hotkey ? ` (${config.hotkey})` : '';
    const tooltipText = config.tooltip || '';

    return (
      <Tooltip key={config.key} title={tooltipText} arrow>
        <Button
          variant={config.key === 'approve' ? 'contained' : 'outlined'}
          color={config.color as ButtonProps['color']}
          startIcon={config.icon}
          disabled={state.disabled}
          onClick={state.handler}
        >
          {config.label}{hotkeyHint}
        </Button>
      </Tooltip>
    );
  };

  const buttonActions = MODERATION_ACTIONS.filter((action) => action.key !== 'clear');

  return (
    <>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        {buttonActions.map((button) => (
          <Fragment key={button.key}>{renderButton(button)}</Fragment>
        ))}
      </Stack>
      <ModerationReasonDialog
        mode={dialogMode}
        open={dialogMode !== null}
        onClose={() => setDialogMode(null)}
        onSubmit={handleDialogSubmit}
      />
    </>
  );
};

