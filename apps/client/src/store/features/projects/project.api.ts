import type { Project } from 'shared/src/types.ts';
import { baseApi } from '@/store/services/base.api';

const projectApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProjects: build.query<Project[], void>({
      query: () => 'projects',
      providesTags: ['Projects'],
    }),
    getProject: build.query<Project, string>({
      query: (id) => `projects/${id}`,
      providesTags: ['Projects'],
    }),
    updateProject: build.mutation<Project, Project>({
      query: (project) => ({
        url: `projects/${project.id}`,
        method: 'PUT',
        body: project,
      }),
      invalidatesTags: ['Projects'],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useUpdateProjectMutation,
} = projectApi;
