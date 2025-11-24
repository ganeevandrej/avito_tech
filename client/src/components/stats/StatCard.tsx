import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface IProps {
  title: string;
  value: string | number;
}

/**
 * Компонент карточки статистики
 */
export const StatCard = ({ title, value }: IProps) => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div" fontWeight={600}>
          {value}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.spacing(2),
}));
