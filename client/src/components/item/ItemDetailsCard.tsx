import { Card, CardContent, Divider, Stack, Typography } from '@mui/material';

import { formatCurrency, formatDate } from '@/shared/utils/format';
import { type Advertisement } from '@/types/ad';

interface IProps {
  ad: Advertisement;
}

export const ItemDetailsCard = ({ ad }: IProps) => (
  <Card>
    <CardContent>
      <Stack spacing={2}>
        <Typography variant="h6" component="h2">
          Полное описание
        </Typography>
        <Typography color="text.secondary">{ad.description}</Typography>
        <Divider />
        <Typography fontWeight={600}>Характеристики</Typography>
        <Stack spacing={0.5}>
          {Object.entries(ad.characteristics).map(([key, value]) => (
            <Stack key={key} direction="row" spacing={1}>
              <Typography width={160} color="text.secondary">
                {key}
              </Typography>
              <Typography>{value}</Typography>
            </Stack>
          ))}
        </Stack>
        <Divider />
        <Typography fontWeight={600}>Продавец</Typography>
        <Typography>
          {ad.seller.name} • рейтинг {ad.seller.rating} • {ad.seller.totalAds} объявлений • на
          платформе с {formatDate(ad.seller.registeredAt)}
        </Typography>
        <Typography variant="subtitle1">Стоимость: {formatCurrency(ad.price)}</Typography>
      </Stack>
    </CardContent>
  </Card>
);
