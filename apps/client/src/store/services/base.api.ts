import { type BaseQueryFn, createApi, fetchBaseQuery, type FetchArgs } from '@reduxjs/toolkit/query/react';

interface ILoginInput {
  email: string;
  password: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  credentials: 'include',
});

const baseQueryReAuth: BaseQueryFn<string | FetchArgs, unknown, unknown> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions);

  const needAuth = result.error
    && 'originalStatus' in result.error
    && result.error.originalStatus === 401;

  if (needAuth) {
    const refreshResult = await baseQuery(
      {
        url: '/auth/refresh',
        method: 'POST',
        credentials: 'include',
      },
      api,
      extraOptions,
    );

    if (refreshResult.data && !refreshResult.error) {
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryReAuth,
  tagTypes: ['Projects', 'Lists', 'Tasks'],
  endpoints: (build) => ({
    register: build.mutation<void, ILoginInput>({
      query: (body) => ({
        url: 'auth/register',
        method: 'POST',
        body,
      }),
    }),
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

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} = baseApi;
