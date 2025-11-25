import type { PaletteMode } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';

const THEME_KEY = 'app-theme';

const getInitialTheme = (): PaletteMode => {
  const stored = window.localStorage.getItem(THEME_KEY);

  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  // Смотрим какую тему предпочитает пользователь в браузере
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

interface ThemeState {
  mode: PaletteMode;
}

const initialState: ThemeState = {
  mode: getInitialTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      window.localStorage.setItem(THEME_KEY, state.mode);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;

