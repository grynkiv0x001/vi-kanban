import type { List } from 'shared/src/types';
import { baseApi } from '@/store/services/baseApi';

export const listApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProjectLists: build.query<List[], string>({
      query: (id) => `projects/${id}/lists`,
      providesTags: ['List'],
    }),
  }),
});

export const {
  useGetProjectListsQuery,
} = listApi;
