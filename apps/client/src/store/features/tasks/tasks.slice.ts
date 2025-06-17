import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Task } from 'shared/src/types.ts';

interface ITasksState {
  currentTask?: Task;
}

const initialState: ITasksState = {};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setCurrentTask: (state, action: PayloadAction<Task | undefined>) => {
      state.currentTask = action.payload;
    },
  },
});

export const { setCurrentTask } = tasksSlice.actions;

export default tasksSlice.reducer;
