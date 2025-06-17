import type { List, Task } from 'shared/src/types';
import { baseApi } from '@/store/services/base.api';

const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getListTasks: build.query<Task[], Omit<List, 'name'>>({
      query: ({ id, projectId }) => `projects/${projectId}/lists/${id}/tasks`,
      providesTags: ['Tasks'],
    }),
  }),
});

export const {
  useGetListTasksQuery,
} = tasksApi;