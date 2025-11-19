import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { List } from 'shared/src/types.ts';

interface IListsState {
  projectLists?: List[];
}

const initialState: IListsState = {};

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    setProjectLists: (state, action: PayloadAction<List[]>) => {
      state.projectLists = action.payload;
    },
    reorderLists: (state, action: PayloadAction<List[]>) => {
      state.projectLists = action.payload;
    },
  },
});

export const { setProjectLists, reorderLists } = listsSlice.actions;

export default listsSlice.reducer;
