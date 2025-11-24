import { Box, CircularProgress } from '@mui/material';

/**
 * Компонент загрузки страницы
 */
export const PageLoader = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
    <CircularProgress />
  </Box>
);

