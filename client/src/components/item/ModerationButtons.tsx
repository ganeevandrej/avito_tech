import { Check as CheckIcon, Close as CloseIcon, Replay as ReplayIcon } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import { useState } from 'react';

import { ModerationReasonDialog } from './ModerationReasonDialog';
import { useModerationActions, type ModerationPayload } from './useModerationActions';

interface IProps {
  adId: number;
}

export type DialogMode = 'reject' | 'changes' | null;

export const ModerationButtons = ({ adId }: IProps) => {
  const [dialogMode, setDialogMode] = useState<DialogMode>(null);

  const openDialog = (mode: DialogMode) => {
    setDialogMode(mode);
  };

  const {
    handleApprove,
    handleReject,
    handleRequestChanges,
    isApproving,
    isRejecting,
    isRequestingChanges,
  } = useModerationActions(adId);

  const handleDialogSubmit = (payload: ModerationPayload) => {
    if (dialogMode === 'reject') {
      handleReject(payload);
    } else if (dialogMode === 'changes') {
      handleRequestChanges(payload);
    }
    setDialogMode(null);
  };

  return (
    <>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Button
          variant="contained"
          color="success"
          onClick={handleApprove}
          disabled={isApproving}
          startIcon={<CheckIcon />}
        >
          Одобрить
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => openDialog('reject')}
          disabled={isRejecting}
          startIcon={<CloseIcon />}
        >
          Отклонить
        </Button>
        <Button
          variant="outlined"
          onClick={() => openDialog('changes')}
          disabled={isRequestingChanges}
          startIcon={<ReplayIcon />}
        >
          Доработка
        </Button>
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

