import { Card, CardContent, Typography } from '@mui/material';

import { formatDate } from '@/shared/utils/format';
import { type Seller } from '@/types/ad';

interface IProps {
  seller: Seller;
}

export const SellerInfoCard = ({ seller }: IProps) => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Продавец
      </Typography>
      <Typography>{seller.name}</Typography>
      <Typography color="text.secondary">Рейтинг: {seller.rating}</Typography>
      <Typography color="text.secondary">Объявлений: {seller.totalAds}</Typography>
      <Typography color="text.secondary">
        На платформе с {formatDate(seller.registeredAt)}
      </Typography>
    </CardContent>
  </Card>
);

