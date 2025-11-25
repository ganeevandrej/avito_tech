import {
  CategoryOutlined as CategoryIcon,
  LocalOfferOutlined as LocalOfferIcon,
  PriceChangeOutlined as PriceIcon,
  ScheduleOutlined as ScheduleIcon,
  UpdateOutlined as UpdateIcon,
} from '@mui/icons-material';
import { Stack, styled, Typography } from '@mui/material';

import { STATUS_LABELS } from '@/shared/constants/filters';
import { formatCurrency, formatDate } from '@/shared/utils/format';
import type { Advertisement } from '@/types/ad';

import { InfoRow } from '../common/InfoRow';

interface IProps {
  ad: Advertisement;
}

/**
 * Компонент секции деталей
 */
export const DetailsSection = ({ ad }: IProps) => (
  <SectionWrapper>
    <SectionTitle>Детали</SectionTitle>
    <InfoRow
      icon={<CategoryIcon fontSize="small" />}
      label="Категория"
      value={ad.category}
    />
    <InfoRow
      icon={<LocalOfferIcon fontSize="small" />}
      label="Статус"
      value={STATUS_LABELS[ad.status]}
    />
    <InfoRow
      icon={<ScheduleIcon fontSize="small" />}
      label="Создано"
      value={formatDate(ad.createdAt)}
    />
    <InfoRow
      icon={<UpdateIcon fontSize="small" />}
      label="Последнее обновление"
      value={formatDate(ad.updatedAt)}
    />
    <InfoRow
      icon={<PriceIcon fontSize="small" />}
      label="Стоимость"
      value={formatCurrency(ad.price)}
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

