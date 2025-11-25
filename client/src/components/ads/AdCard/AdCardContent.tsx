import {
  ArrowForward as ArrowForwardIcon,
  CategoryOutlined as CategoryIcon,
  PriceChangeOutlined as PriceIcon,
} from '@mui/icons-material';
import { Button, Typography } from '@mui/material';

import { InfoRow } from '@/components/item';
import { formatCurrency, formatDate } from '@/shared/utils/format';

import { ActionsColumn, BottomRow, ButtonsRow, DetailsColumn } from './AdCard.styles';

interface IProps {
  price: number;
  category: string;
  createdAt: string;
  selected: boolean;
  showSelect: boolean;
  onSelect: () => void;
  onOpen: () => void;
}

/**
 * Компонент содержимого карточки объявления
 */
export const AdCardContent = ({
  price,
  category,
  createdAt,
  selected,
  showSelect,
  onSelect,
  onOpen,
}: IProps) => (
  <BottomRow>
    <DetailsColumn>
      <InfoRow
        icon={<PriceIcon fontSize="small" />}
        label="Цена"
        value={formatCurrency(price)}
      />
      <InfoRow
        icon={<CategoryIcon fontSize="small" />}
        label="Категория"
        value={category}
      />
    </DetailsColumn>

    <ActionsColumn>
      <ButtonsRow>
        <Typography
          variant="body2"
          color="text.secondary"
          fontStyle="italic"
          sx={{ alignSelf: 'flex-end' }}
        >
          Создано: {formatDate(createdAt)}
        </Typography>
        {showSelect && (
          <Button
            variant={selected ? 'contained' : 'outlined'}
            color={selected ? 'primary' : 'inherit'}
            onClick={onSelect}
          >
            {selected ? 'Снять' : 'Выбрать'}
          </Button>
        )}
        <Button variant="text" onClick={onOpen} endIcon={<ArrowForwardIcon />}>
          Открыть
        </Button>
      </ButtonsRow>
    </ActionsColumn>
  </BottomRow>
);

