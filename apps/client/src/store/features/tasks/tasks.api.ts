import type { Task } from 'shared/src/types';
import { baseApi } from '@/store/services/base.api';

const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getListTasks: build.query<Task[], {projectId: number, ids: number[]}>({
      query: ({ projectId, ids }) => {
        const searchParams = new URLSearchParams();

        ids.forEach((id) => searchParams.append('ids', id.toString()));

        return `projects/${projectId}/tasks?${searchParams.toString()}`;
      },
      providesTags: ['Tasks'],
    }),
    createTask: build.mutation<Task, Omit<Task, 'id'>>({
      query: (body) => ({
        url: `projects/${body.projectId}/lists/${body.listId}/tasks`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Tasks'],
    }),
    updateTask: build.mutation<Task, Task>({
      query: (body) => ({
        url: `projects/${body.projectId}/lists/${body.listId}/tasks/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Tasks'],
    }),
    deleteTask: build.mutation<Task, Omit<Task, 'name'>>({
      query: ({ id, projectId, listId }) => ({
        url: `projects/${projectId}/lists/${listId}/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
    }),
  }),
});

export const {
  useGetListTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
