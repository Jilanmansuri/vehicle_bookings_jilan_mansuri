import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  themeMode: localStorage.getItem('themeMode') || 'light',
  sidebarOpen: true,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', state.themeMode);
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});

export const { toggleTheme, toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;
