import { Box, Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type { CategoriesChart as CategoriesChartData } from '@/types/stats';

interface IProps {
  data: CategoriesChartData;
}

/**
 * Компонент графика категорий объявлений
 */
export const CategoriesChart = ({ data }: IProps) => {
  const chartData = Object.entries(data)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const hasData = chartData.length > 0;

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Категории объявлений
        </Typography>
        <Box marginTop={2}>
          {hasData ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" style={{ fontSize: '12px' }} />
                <YAxis
                  dataKey="category"
                  type="category"
                  width={90}
                  style={{ fontSize: '12px' }}
                />
                <Tooltip formatter={(value: number) => [value, 'Объявлений']} />
                <Bar dataKey="count" fill="#007bff" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState>Нет данных за выбранный период</EmptyState>
          )}
        </Box>
      </CardContent>
    </StyledCard>
  );
};

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.spacing(2),
}));

const EmptyState = styled(Box)(({ theme }) => ({
  height: 300,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

