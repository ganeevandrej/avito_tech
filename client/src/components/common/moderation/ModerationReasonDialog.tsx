import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';
import { useState } from 'react';

import type { ModerationPayload } from '@/components/item/useModerationActions';
import { MODERATION_REASONS } from '@/shared/constants/moderation';
import type { DialogMode } from '@/shared/constants/moderationActions';

interface IProps {
  open: boolean;
  mode: DialogMode;
  onClose: () => void;
  onSubmit: (payload: ModerationPayload) => void;
}

export const ModerationReasonDialog = ({ mode, open, onClose, onSubmit }: IProps) => {
  const [reason, setReason] = useState(MODERATION_REASONS[0]);
  const [comment, setComment] = useState('');

  if (!mode) {
    return null;
  }

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

  const handleReasonChange = (event: SelectChangeEvent<string>) => {
    setReason(event.target.value);
  };

  return (
    <Dialog key={`${mode}-${open}`} open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <FormControl fullWidth>
            <InputLabel id="moderation-reason-label">Причина</InputLabel>
            <Select
              labelId="moderation-reason-label"
              label="Причина"
              value={reason}
              onChange={handleReasonChange}
            >
              {MODERATION_REASONS.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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


