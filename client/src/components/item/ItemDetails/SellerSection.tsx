import {
  PersonOutline as PersonIcon,
  ShoppingBagOutlined as ShoppingIcon,
  StarOutline as StarIcon,
  VerifiedUserOutlined as VerifiedIcon,
} from '@mui/icons-material';
import { Stack, styled, Typography } from '@mui/material';

import { formatDate } from '@/shared/utils/format';
import type { Seller } from '@/types/ad';

import { InfoRow } from '../common/InfoRow';

interface IProps {
  seller: Seller;
}

/**
 * Компонент секции продавца
 */
export const SellerSection = ({ seller }: IProps) => (
  <SectionWrapper>
    <SectionTitle>Продавец</SectionTitle>
    <InfoRow
      icon={<PersonIcon fontSize="small" />}
      label="Имя"
      value={seller.name}
    />
    <InfoRow
      icon={<StarIcon fontSize="small" />}
      label="Рейтинг"
      value={seller.rating}
    />
    <InfoRow
      icon={<ShoppingIcon fontSize="small" />}
      label="Количество объявлений"
      value={seller.totalAds}
    />
    <InfoRow
      icon={<VerifiedIcon fontSize="small" />}
      label="На платформе с"
      value={formatDate(seller.registeredAt)}
    />
  </SectionWrapper>
);

const SectionWrapper = styled(Stack)(({ theme }) => ({
  flex: 1,
  gap: theme.spacing(1.25),
  minWidth: 0,
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1),
}));

