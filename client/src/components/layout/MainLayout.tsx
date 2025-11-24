import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { NAV_ITEMS } from '@/shared/constants/navigation';

import { NavTabs } from './NavTabs';

/**
 * Основной layout приложения
 */
export const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <AppBar position="sticky" color="default">
        <Toolbar sx={{ gap: 2 }}>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate('/list')}
          >
            Авито · Модерация
          </Typography>
          <NavTabs
            items={NAV_ITEMS}
            pathname={location.pathname}
            onNavigate={(path) => navigate(path)}
          />
          <Box flexGrow={1} />
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ py: 4, flexGrow: 1 }}>
        <Outlet />
      </Container>
    </Box>
  );
};
