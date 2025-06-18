import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@/store';

const selectTasksState = (state: RootState) => state.tasks.projectTasks;

export const selectTasksByListId = createSelector(
  [selectTasksState, (_: RootState, listId: number) => listId],
  (tasks, listId) => tasks?.filter(task => task.listId === listId) ?? [],
);
