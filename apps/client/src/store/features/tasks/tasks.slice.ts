import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Task } from 'shared/src/types.ts';

interface ITasksState {
  currentTask?: Task;
  projectTasks?: Task[];
}

const initialState: ITasksState = {};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setCurrentTask: (state, action: PayloadAction<Task | undefined>) => {
      state.currentTask = action.payload;
    },
    setProjectTasks: (state, action: PayloadAction<Task[]>) => {
      state.projectTasks = action.payload;
    },
  },
});

export const { setCurrentTask, setProjectTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
