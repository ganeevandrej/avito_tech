import { SettingsOutlined as SettingsIcon } from '@mui/icons-material';
import { Stack, styled, Typography } from '@mui/material';

import { InfoRow } from '../common/InfoRow';

interface IProps {
  characteristics: Record<string, string>;
}

/**
 * Компонент секции характеристик
 */
export const CharacteristicsSection = ({ characteristics }: IProps) => {
  const entries = Object.entries(characteristics);

  if (!entries.length) {
    return null;
  }

  return (
    <SectionWrapper>
      <SectionTitle>Характеристики</SectionTitle>
      <Stack spacing={1.25}>
        {entries.map(([key, value]) => (
          <InfoRow
            key={key}
            icon={<SettingsIcon fontSize="small" />}
            label={key}
            value={value}
          />
        ))}
      </Stack>
    </SectionWrapper>
  );
};

const SectionWrapper = styled(Stack)(({ theme }) => ({
  flex: 1,
  gap: theme.spacing(1.25),
  minWidth: 0,
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1),
}));

