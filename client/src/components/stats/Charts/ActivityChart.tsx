import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { DECISION_LABELS, getDecisionColors } from '@/shared/constants/stats';
import { formatChartDate } from '@/shared/utils/format';
import type { ActivityData } from '@/types/stats';

interface IProps {
  data: ActivityData[];
  period: string;
}

/**
 * Компонент графика активности
 */
export const ActivityChart = ({ data, period }: IProps) => {
  const theme = useTheme();
  const colors = getDecisionColors(theme);
  
  const hasData =
    data &&
    data.length > 0 &&
    data.some((item) => item.approved + item.rejected + item.requestChanges > 0);

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          График активности ({period})
        </Typography>
        <Box marginTop={2}>
          {hasData ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatChartDate}
                  style={{ fontSize: '12px' }}
                />
                <YAxis style={{ fontSize: '12px' }} />
                <Tooltip
                  labelFormatter={(value) => formatChartDate(value as string)}
                  formatter={(value: number) => [value, '']}
                />
                <Legend />
                <Bar dataKey="approved" fill={colors.approved} name={DECISION_LABELS.approved} />
                <Bar dataKey="rejected" fill={colors.rejected} name={DECISION_LABELS.rejected} />
                <Bar
                  dataKey="requestChanges"
                  fill={colors.requestChanges}
                  name={DECISION_LABELS.requestChanges}
                />
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

