import { Box, Card, Skeleton, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * Компонент скелетона карточки объявления
 */
export const AdCardSkeleton = () => {
  return (
    <StyledCard>
      <CardContentContainer>
        <ImageSkeleton variant="rectangular" />
        <ContentWrapper>
          <Stack direction="row" alignItems="center" spacing={1} mb={1} flexWrap="wrap">
            <Skeleton variant="text" width="40%" height={28} />
            <Skeleton variant="rounded" width={80} height={24} />
            <Skeleton variant="rounded" width={100} height={24} />
          </Stack>
          <Skeleton variant="text" width="30%" height={24} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="50%" height={20} sx={{ mb: 0.5 }} />
          <Skeleton variant="text" width="45%" height={20} />
        </ContentWrapper>
        <ButtonContainer>
          <Stack direction="row" spacing={1}>
            <Skeleton variant="rounded" width={120} height={36} />
            <Skeleton variant="rounded" width={100} height={36} />
          </Stack>
        </ButtonContainer>
      </CardContentContainer>
    </StyledCard>
  );
};

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  display: 'flex',
  flexDirection: 'row',
  border: '1px solid',
  borderColor: theme.palette.divider,
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

const ImageSkeleton = styled(Skeleton)({
  flexShrink: 0,
  width: 160,
  height: 160,
  borderRadius: 8,
});

const ContentWrapper = styled(Box)({
  flexGrow: 1,
  minWidth: 0,
});

const ButtonContainer = styled(Box)({
  flexShrink: 0,
  alignSelf: 'end',
});

