import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ListState {
  selectedIds: number[];
  lastLoadedIds: number[];
}

const initialState: ListState = {
  selectedIds: [],
  lastLoadedIds: [],
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setLastLoadedIds(state, action: PayloadAction<number[]>) {
      state.lastLoadedIds = action.payload;
    },
  },
});

export const { setLastLoadedIds } = listSlice.actions;
export default listSlice.reducer;

