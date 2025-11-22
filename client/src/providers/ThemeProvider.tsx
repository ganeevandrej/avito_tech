import CssBaseline from '@mui/material/CssBaseline';
import { createTheme,ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { type ReactNode } from 'react';

const theme = createTheme({
  palette: {
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
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
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
});

interface IProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: IProps) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </MuiThemeProvider>
);
