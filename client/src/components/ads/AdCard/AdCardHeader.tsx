import { Bolt as BoltIcon } from '@mui/icons-material';
import { Chip, Typography } from '@mui/material';

import { PRIORITY_LABELS, STATUS_LABELS } from '@/shared/constants/filters';
import { getStatusChipColor } from '@/shared/utils/format';
import type { AdPriority, AdStatus } from '@/types/ad';

import { ChipsRow, HeaderRow } from './AdCard.styles';

interface IProps {
  title: string;
  status: AdStatus;
  priority: AdPriority;
}

/**
 * Компонент заголовка карточки объявления
 */
export const AdCardHeader = ({ title, status, priority }: IProps) => (
  <HeaderRow>
    <Typography variant="h6" fontWeight={600} noWrap>
      {title}
    </Typography>
    <ChipsRow>
      {priority === 'urgent' && (
        <Chip
          size="small"
          label={PRIORITY_LABELS[priority]}
          color="error"
          icon={<BoltIcon fontSize="small" />}
        />
      )}
      <Chip
        size="small"
        label={STATUS_LABELS[status] || status}
        color={getStatusChipColor(status)}
      />
    </ChipsRow>
  </HeaderRow>
);

