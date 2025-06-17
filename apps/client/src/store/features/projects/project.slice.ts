import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Project } from 'shared/src/types';

interface IProjectState {
  currentProject?: Project;
}

const initialState: IProjectState = {};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setCurrentProject: (state, action: PayloadAction<Project | undefined>) => {
      state.currentProject = action.payload;
    },
  },
});

export const { setCurrentProject } = projectSlice.actions;

export default projectSlice.reducer;
