import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import { useState } from 'react';

import { MODERATION_REASONS } from '@/shared/constants/moderation';

import type { DialogMode } from './ModerationButtons';
import type { ModerationPayload } from './useModerationActions';

interface IProps {
  open: boolean;
  mode: DialogMode;
  onClose: () => void;
  onSubmit: (payload: ModerationPayload) => void;
}

export const ModerationReasonDialog = ({ mode, open, onClose, onSubmit }: IProps) => {
  const [reason, setReason] = useState(MODERATION_REASONS[0]);
  const [comment, setComment] = useState('');

  const title = mode === 'reject' ? 'Отклонить объявление' : 'Вернуть на доработку';
  const submitLabel = mode === 'reject' ? 'Отклонить' : 'Вернуть';

  const handleClose = () => {
    onClose();
    setReason(MODERATION_REASONS[0]);
    setComment('');
  };

  const handleSubmit = () => {
    const payload: ModerationPayload = { reason };
    const trimmedComment = comment.trim();

    if (trimmedComment) {
      payload.comment = trimmedComment;
    }

    onSubmit(payload);
    handleClose();
  };

  return (
    <Dialog key={`${mode}-${open}`} open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            select
            label="Причина"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
          >
            {MODERATION_REASONS.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Комментарий"
            multiline
            minRows={3}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Если хотите оставьте комментарий"
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ pr: 3, pl: 3, pb: 2 }}>
        <Button onClick={handleClose}>Отмена</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
