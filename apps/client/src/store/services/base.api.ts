import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Projects', 'Lists', 'Tasks'],
  endpoints: (build) => ({
    login: build.mutation<any, any>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (!data) {
            return;
          }

          localStorage.setItem('token', data.token);
        } catch {
          throw new Error('Failed to save token');
        }
      },
      invalidatesTags: ['Projects'],
    }),
  }),
});

export const { useLoginMutation } = baseApi;
