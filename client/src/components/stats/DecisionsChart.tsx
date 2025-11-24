import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { createDecisionsChartData } from '@/shared/constants/stats';
import type { DecisionsChart as DecisionsChartData } from '@/types/stats';

interface IProps {
  data: DecisionsChartData;
}

/**
 * Компонент графика распределения решений
 */
export const DecisionsChart = ({ data }: IProps) => {
  const theme = useTheme();
  
  const chartData = createDecisionsChartData(data, theme);
  const hasData = chartData.length > 0;

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Распределение решений
        </Typography>
        <Box marginTop={2}>
          {hasData ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`${value}%`, '']} />
                <Legend />
              </PieChart>
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

