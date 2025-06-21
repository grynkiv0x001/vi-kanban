import { type BaseQueryFn, createApi, fetchBaseQuery, type FetchArgs } from '@reduxjs/toolkit/query/react';

interface ILoginInput {
  email: string;
  password: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3001',
  credentials: 'include',
});

const baseQueryReAuth: BaseQueryFn<string | FetchArgs, unknown, unknown> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.originalStatus === 401) {
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

    if ((refreshResult.data as any)?.token) {
      // Retry the original query after refresh
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Optional: trigger logout or reset state
      api.dispatch({ type: 'auth/logout' }); // if you have an auth slice
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryReAuth,
  tagTypes: ['Projects', 'Lists', 'Tasks'],
  endpoints: (build) => ({
    login: build.mutation<void, ILoginInput>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        credentials: 'include',
        body,
      }),
      invalidatesTags: ['Projects'],
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
        credentials: 'include',
      }),
    }),
  }),
});

export const { useLoginMutation } = baseApi;
