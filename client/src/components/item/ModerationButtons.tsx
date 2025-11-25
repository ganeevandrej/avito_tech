import { Button, type ButtonProps, Stack } from '@mui/material';
import { Fragment, useState } from 'react';

import { ModerationReasonDialog } from '@/components/common';
import type { DialogMode, ModerationActionConfig } from '@/shared/constants/moderationActions';
import { MODERATION_ACTIONS } from '@/shared/constants/moderationActions';

import {
  type ModerationButtonActionKey,
  type ModerationPayload,
  useModerationActions,
} from './useModerationActions';

interface IProps {
  adId: number;
}

export const ModerationButtons = ({ adId }: IProps) => {
  const [dialogMode, setDialogMode] = useState<DialogMode>(null);

  const { actionStateMap, handleReject, handleRequestChanges } = useModerationActions(adId, {
    onOpenDialog: setDialogMode,
  });

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

    return (
      <Button
        key={config.key}
        variant={config.key === 'approve' ? 'contained' : 'outlined'}
        color={config.color as ButtonProps['color']}
        startIcon={config.icon}
        disabled={state.disabled}
        onClick={state.handler}
      >
        {config.label}
      </Button>
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
