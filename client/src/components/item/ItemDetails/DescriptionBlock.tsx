import { SubjectOutlined as SubjectIcon } from '@mui/icons-material';
import { Stack, styled, Typography } from '@mui/material';

import { InfoRow } from '../common/InfoRow';

interface IProps {
  description: string;
}

/**
 * Компонент блока описания
 */
export const DescriptionBlock = ({ description }: IProps) => (
  <Wrapper>
    <SectionTitle>Полное описание</SectionTitle>
    <InfoRow
      icon={<SubjectIcon fontSize="small" />}
      label="Описание"
      value={description}
    />
  </Wrapper>
);

const Wrapper = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1.25),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1),
}));

