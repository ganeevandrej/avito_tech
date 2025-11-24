import { Bolt as BoltIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { memo } from 'react';

import { PRIORITY_LABELS, STATUS_LABELS } from '@/shared/constants/filters';
import { formatCurrency, formatDate } from '@/shared/utils/format';
import { type Advertisement } from '@/types/ad';

interface IProps {
  index: number;
  ad: Advertisement;
  onOpen: () => void;
}

/**
 * Компонент карточки объявления
 */
export const AdCard = memo(({ ad, onOpen }: IProps) => {
  return (
    <StyledCard elevation={3}>
      {ad.images && ad.images.length > 0 ? (
        <CardMedia component="img" height={180} image={ad.images[0]} alt={ad.title} />
      ) : (
        <PlaceholderImage>
          <Typography variant="body2" color="text.secondary">
            Нет изображения
          </Typography>
        </PlaceholderImage>
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" alignItems="center" mb={1}>
          <Chip
            size="small"
            label={PRIORITY_LABELS[ad.priority]}
            color={ad.priority === 'urgent' ? 'error' : 'default'}
            icon={ad.priority === 'urgent' ? <BoltIcon fontSize="small" /> : undefined}
          />
          <Chip
            size="small"
            label={STATUS_LABELS[ad.status] || ad.status}
            color={
              ad.status === 'approved' ? 'success' : ad.status === 'rejected' ? 'error' : 'warning'
            }
          />
        </Stack>
        <Typography variant="h6">{ad.title}</Typography>
        <Typography variant="body1" mt={1} fontWeight={600}>
          Цена: {formatCurrency(ad.price)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Категория: {ad.category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Создано: {formatDate(ad.createdAt)}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Button onClick={onOpen}>Открыть</Button>
      </CardActions>
    </StyledCard>
  );
});

const StyledCard = styled(Card)({
  borderRadius: 12,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const PlaceholderImage = styled(Box)(({ theme }) => ({
  height: 180,
  backgroundColor: theme.palette.grey[200],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

AdCard.displayName = 'AdCard';
