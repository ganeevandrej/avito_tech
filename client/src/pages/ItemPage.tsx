import { Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

/**
 * Страница детальной информации об объявлении
 */
export const ItemPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Stack spacing={2}>
      <Typography variant="h4" component="h1">
        Детальная информация об объявлении
      </Typography>
      <Typography variant="body1">ID объявления: {id}</Typography>
      <Typography variant="body1">
        Здесь будет детальная информация об объявлении
      </Typography>
    </Stack>
  );
};
