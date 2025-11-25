import {
  AssignmentOutlined as AssignmentOutlinedIcon,
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  GavelOutlined as GavelOutlinedIcon,
  PersonOutline as PersonOutlineIcon,
  ScheduleOutlined as ScheduleOutlinedIcon,
} from '@mui/icons-material';
import { Box, Card, CardContent, Stack, styled, Typography } from '@mui/material';

import { MODERATION_ACTION_LABELS } from '@/shared/constants/moderation';
import { formatDate } from '@/shared/utils/format';
import { type ModerationHistory } from '@/types/ad';

import { InfoRow } from '../common/InfoRow';

interface IProps {
  history: ModerationHistory[];
}

/**
* Компонент истории модерации
*/
export const HistoryCard = ({ history }: IProps) => (
  <Card sx={{ height: '100%' }}>
    <CardContent component={CardContentLayout}>
      <Typography variant="subtitle1" fontWeight={700} gutterBottom>
        История модерации
      </Typography>
      {!history.length && <Typography color="text.secondary">Записей пока нет</Typography>}
      {Boolean(history.length) && (
        <ScrollArea>
          <Stack spacing={2}>
            {history.map((entry) => (
              <HistoryEntry key={entry.id}>
                <InfoRow
                  icon={<PersonOutlineIcon fontSize="small" />}
                  label="Модератор"
                  value={entry.moderatorName}
                />
                <InfoRow
                  icon={<ScheduleOutlinedIcon fontSize="small" />}
                  label="Дата"
                  value={formatDate(entry.timestamp)}
                />
                <InfoRow
                  icon={<GavelOutlinedIcon fontSize="small" />}
                  label="Решение"
                  value={MODERATION_ACTION_LABELS[entry.action]}
                />
                {entry.reason && (
                  <InfoRow
                    icon={<AssignmentOutlinedIcon fontSize="small" />}
                    label="Причина"
                    value={entry.reason}
                  />
                )}
                {entry.comment && (
                  <InfoRow
                    icon={<ChatBubbleOutlineIcon fontSize="small" />}
                    label="Комментарий"
                    value={entry.comment}
                  />
                )}
              </HistoryEntry>
            ))}
          </Stack>
        </ScrollArea>
      )}
    </CardContent>
  </Card>
);

const CardContentLayout = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  padding: theme.spacing(3),
}));

const ScrollArea = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  maxHeight: 300,
  overflowY: 'auto',
  paddingRight: theme.spacing(1),
  [theme.breakpoints.down('md')]: {
    maxHeight: 320,
  },
}));

const HistoryEntry = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.default,
  gap: theme.spacing(1.25),
}));

