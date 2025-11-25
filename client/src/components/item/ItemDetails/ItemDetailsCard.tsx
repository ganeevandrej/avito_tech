import { Card, CardContent, Divider, Stack, styled } from '@mui/material';

import type { Advertisement } from '@/types/ad';

import { CharacteristicsSection } from './CharacteristicsSection';
import { DescriptionBlock } from './DescriptionBlock';
import { DetailsSection } from './DetailsSection';
import { SellerSection } from './SellerSection';

interface IProps {
  ad: Advertisement;
}

/**
 * Компонент карточки деталей объявления
 */
export const ItemDetailsCard = ({ ad }: IProps) => (
  <Card>
    <CardContent>
      <Stack spacing={3}>
        {/* Полное описание во всю строку */}
        <DescriptionBlock description={ad.description} />

        <Divider />

        {/* Три колонки: детали, характеристики, продавец */}
        <ColumnsLayout>
          <DetailsSection ad={ad} />

          <ResponsiveDivider />
          <CharacteristicsSection characteristics={ad.characteristics} />

          <ResponsiveDivider />
          <SellerSection seller={ad.seller} />
        </ColumnsLayout>
      </Stack>
    </CardContent>
  </Card>
);

const ColumnsLayout = styled(Stack)(({ theme }) => ({
  flexDirection: 'column',
  gap: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
}));

const ResponsiveDivider = styled(Divider)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    borderBottomWidth: 0,
    borderRightWidth: 'thin',
    alignSelf: 'stretch',
  },
}));

