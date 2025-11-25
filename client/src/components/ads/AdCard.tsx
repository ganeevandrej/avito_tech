import { ArrowForward as ArrowForwardIcon, Bolt as BoltIcon } from '@mui/icons-material';
import { Box, Button, Card, Chip, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { memo } from 'react';

import { PRIORITY_LABELS, STATUS_LABELS } from '@/shared/constants/filters';
import { formatCurrency, formatDate } from '@/shared/utils/format';
import { type Advertisement } from '@/types/ad';

interface IProps {
  index: number;
  ad: Advertisement;
  onOpen: () => void;
  selected?: boolean;
  onSelect?: (id: number, selected: boolean) => void;
}

/**
 * Компонент карточки объявления
 */
export const AdCard = memo(({ ad, onOpen, selected = false, onSelect }: IProps) => {
  const handleSelectClick = () => {
    if (onSelect) {
      onSelect(ad.id, !selected);
    }
  };

  return (
    <StyledCard elevation={3} selected={selected}>
      <CardContentContainer>
        <ImageContainer>
          {ad.images && ad.images.length > 0 ? (
            <StyledImage src={ad.images[0]} alt={ad.title} />
          ) : (
            <PlaceholderImage>
              <Typography variant="body2" color="text.secondary">
                Нет изображения
              </Typography>
            </PlaceholderImage>
          )}
        </ImageContainer>
        <ContentWrapper>
          <Stack direction="row" alignItems="center" spacing={1} mb={1} flexWrap="wrap">
            <Typography variant="h6">{ad.title}</Typography>
            {ad.priority === 'urgent' && (
              <Chip
                size="small"
                label={PRIORITY_LABELS[ad.priority]}
                color="error"
                icon={<BoltIcon fontSize="small" />}
              />
            )}
            <Chip
              size="small"
              label={STATUS_LABELS[ad.status] || ad.status}
              color={
                ad.status === 'approved'
                  ? 'success'
                  : ad.status === 'rejected'
                    ? 'error'
                    : ad.status === 'draft'
                      ? 'default'
                      : 'warning'
              }
            />
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1} mb={1}>
            <Typography variant="body1" fontWeight={600}>
              Цена: {formatCurrency(ad.price)}
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Категория: {ad.category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Создано: {formatDate(ad.createdAt)}
          </Typography>
        </ContentWrapper>
        <ButtonContainer>
          <Stack direction="row" spacing={1}>
            {onSelect && (
              <Button
                variant={selected ? 'contained' : 'outlined'}
                color={selected ? 'primary' : 'inherit'}
                onClick={handleSelectClick}
              >
                {selected ? 'Снять выбор' : 'Выбрать'}
              </Button>
            )}
            <Button variant="text" onClick={onOpen} endIcon={<ArrowForwardIcon />}>
              Открыть
            </Button>
          </Stack>
        </ButtonContainer>
      </CardContentContainer>
    </StyledCard>
  );
});

const StyledCard = styled(Card)<{ selected?: boolean }>(({ theme, selected }) => ({
  borderRadius: 12,
  display: 'flex',
  flexDirection: 'row',
  border: selected ? `2px solid ${theme.palette.primary.main}` : '1px solid',
  borderColor: selected ? theme.palette.primary.main : theme.palette.divider,
  transition: 'border-color 0.2s',
  overflow: 'hidden',
}));

const CardContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  padding: theme.spacing(2),
  gap: theme.spacing(2),
}));

const ImageContainer = styled(Box)({
  flexShrink: 0,
  width: 160,
  height: 160,
  borderRadius: 8,
  overflow: 'hidden',
});

const StyledImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const PlaceholderImage = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.grey[200],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ContentWrapper = styled(Box)({
  flexGrow: 1,
  minWidth: 0,
});

const ButtonContainer = styled(Box)({
  flexShrink: 0,
  alignSelf: 'end',
});

AdCard.displayName = 'AdCard';
