import { Skeleton, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

import {
  ActionsColumn,
  BottomRow,
  ContentContainer,
  DetailsColumn,
  HeaderRow,
  StyledCard,
} from './AdCard.styles';

/**
 * Компонент скелетона карточки объявления
 */
export const AdCardSkeleton = () => (
  <StyledCard>
    {/* Изображение */}
    <ImageSkeleton variant="rectangular" />

    {/* Контент */}
    <ContentContainer>
      {/* Заголовок + чипы */}
      <HeaderRow>
        <Skeleton variant="text" width="50%" height={28} />
        <Stack direction="row" spacing={1}>
          <Skeleton variant="rounded" width={70} height={24} />
          <Skeleton variant="rounded" width={90} height={24} />
        </Stack>
      </HeaderRow>

      {/* Нижняя часть */}
      <BottomRow>
        {/* Детали */}
        <DetailsColumn>
          <Skeleton variant="text" width="60%" height={20} />
          <Skeleton variant="text" width="50%" height={20} />
        </DetailsColumn>

        {/* Дата и кнопки */}
        <ActionsColumn>
          <Stack direction="row" spacing={2} alignItems="flex-end" justifyContent="end">
            <Skeleton variant="text" width={120} height={20} />
            <Skeleton variant="rounded" width={90} height={36} />
            <Skeleton variant="rounded" width={100} height={36} />
          </Stack>
        </ActionsColumn>
      </BottomRow>
    </ContentContainer>
  </StyledCard>
);

const ImageSkeleton = styled(Skeleton)(({ theme }) => ({
  flexShrink: 0,
  width: '100%',
  height: 180,
  [theme.breakpoints.up('sm')]: {
    width: 180,
    height: 'auto',
    minHeight: 160,
  },
}));

