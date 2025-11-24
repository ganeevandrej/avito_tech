import { Card, CardContent, Stack, Typography } from '@mui/material';

import { formatDate } from '@/shared/utils/format';
import { type ModerationHistory } from '@/types/ad';

interface IProps {
  history: ModerationHistory[];
}

export const HistoryCard = ({ history }: IProps) => (
  <Card sx={{ bgcolor: 'warning.50' }}>
    <CardContent>
      <Typography variant="subtitle1" gutterBottom>
        История модерации
      </Typography>
      {!history.length && <Typography color="text.secondary">Записей пока нет</Typography>}
      <Stack spacing={1.5}>
        {history.map((entry) => (
          <Stack key={entry.id} spacing={0.5}>
            <Typography fontWeight={600}>{entry.moderatorName}</Typography>
            <Typography variant="body2" color="text.secondary">
              {formatDate(entry.timestamp)}
            </Typography>
            <Typography variant="body2">{entry.action}</Typography>
            {entry.reason && (
              <Typography variant="body2" color="text.secondary">
                Причина: {entry.reason}
              </Typography>
            )}
            {entry.comment && (
              <Typography variant="body2" color="text.secondary">
                Комментарий: {entry.comment}
              </Typography>
            )}
          </Stack>
        ))}
      </Stack>
    </CardContent>
  </Card>
);
