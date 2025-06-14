import type { Project } from "shared/src/types";
import { baseApi } from "@/store/services/baseApi";

export const projectApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProjects: build.query<Project[], void>({
      query: () => 'project',
      providesTags: ['Project'],
    }),
  }),
});

export const {
  useGetProjectsQuery,
} = projectApi;
