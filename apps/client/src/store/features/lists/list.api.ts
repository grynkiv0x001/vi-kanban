import type { List } from 'shared/src/types';
import { baseApi } from '@/store/services/base.api';

export const listApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProjectLists: build.query<List[], number>({
      query: (id) => `projects/${id}/lists`,
      providesTags: ['Lists'],
    }),
    createList: build.mutation<List, Omit<List, 'id'>>({
      query: (body) => ({
        url: `projects/${body.projectId}/lists`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Lists'],
    }),
    updateList: build.mutation<List, List>({
      query: (body) => ({
        url: `projects/${body.projectId}/lists/${body.id}`,
        method: 'PUT',
        body,
      }),
    }),
    deleteList: build.mutation<List, Omit<List, 'name'>>({
      query: ({ id, projectId }) => ({
        url: `projects/${projectId}/lists/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Lists'],
    }),
  }),
});

export const {
  useGetProjectListsQuery,
  useCreateListMutation,
  useUpdateListMutation,
  useDeleteListMutation,
} = listApi;
