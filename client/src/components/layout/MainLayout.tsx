import { DarkMode as DarkModeIcon, LightMode as LightModeIcon } from '@mui/icons-material';
import { AppBar, Box, Container, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { NAV_ITEMS } from '@/shared/constants/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectThemeMode } from '@/store/slices/listSelectors';
import { toggleTheme } from '@/store/slices/themeSlice';

import { NavTabs } from './NavTabs';

/**
 * Основной layout приложения
 */
export const MainLayout = () => {
  const themeMode = useAppSelector(selectThemeMode);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
          <Tooltip title="Переключить тему" arrow>
            <IconButton onClick={() => dispatch(toggleTheme())}>
              {themeMode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ py: 4, flexGrow: 1 }}>
        <Outlet />
      </Container>
    </Box>
  );
};
