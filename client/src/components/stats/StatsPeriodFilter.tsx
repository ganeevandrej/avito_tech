import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';

import type { StatsPeriod } from '@/types/stats';

interface IProps {
  period: StatsPeriod;
  onChange: (period: StatsPeriod) => void;
}

/**
 * Компонент фильтра периода статистики
 */
export const StatsPeriodFilter = ({ period, onChange }: IProps) => {
  const handleChange = (_: React.MouseEvent<HTMLElement>, newPeriod: StatsPeriod | null) => {
    if (newPeriod !== null) {
      onChange(newPeriod);
    }
  };

  return (
    <StyledToggleButtonGroup
      value={period}
      exclusive
      onChange={handleChange}
      aria-label="период статистики"
    >
      <ToggleButton value="today" aria-label="сегодня">
        Сегодня
      </ToggleButton>
      <ToggleButton value="week" aria-label="7 дней">
        7д
      </ToggleButton>
      <ToggleButton value="month" aria-label="30 дней">
        30д
      </ToggleButton>
    </StyledToggleButtonGroup>
  );
};

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButton-root': {
    padding: theme.spacing(1, 2),
    textTransform: 'none',
  },
}));
