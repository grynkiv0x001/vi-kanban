import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Project } from 'shared/src/types';

interface IProjectState {
  currentProject?: Project;
  listIds?: number[];
}

const initialState: IProjectState = {};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setCurrentProject: (state, action: PayloadAction<Project | undefined>) => {
      state.currentProject = action.payload;
    },
    setListIds: (state, action: PayloadAction<number[]>) => {
      state.listIds = action.payload;
    },
  },
});

export const { setCurrentProject, setListIds } = projectSlice.actions;

export default projectSlice.reducer;
