import CssBaseline from '@mui/material/CssBaseline';
import {
  createTheme,
  type ThemeOptions,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import { type ReactNode, useMemo } from 'react';

import { useAppSelector } from '@/store/hooks';
import { selectThemeMode } from '@/store/slices/listSelectors';

interface IProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: IProps) => {
  const mode = useAppSelector(selectThemeMode);

  const theme = useMemo(() => {
    const options: ThemeOptions = {
      palette: {
        mode,
        primary: {
          main: '#007bff',
        },
        secondary: {
          main: '#6c757d',
        },
        error: {
          main: '#dc3545',
        },
        warning: {
          main: '#ffc107',
        },
        info: {
          main: '#17a2b8',
        },
        success: {
          main: '#28a745',
        },
      },
      typography: {
        fontFamily: ['Roboto', 'Segoe UI', 'sans-serif'].join(','),
      },
      shape: {
        borderRadius: 8,
      },
      components: {
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: 12,
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
              borderRadius: 8,
            },
          },
        },
      },
    };

    return createTheme(options);
  }, [mode]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
