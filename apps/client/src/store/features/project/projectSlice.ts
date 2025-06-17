import type { Project } from 'shared/src/types';
import { baseApi } from '@/store/services/baseApi';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface IProjectState {
  currentProject?: Project;
}

const initialState: IProjectState = {};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setCurrentProject: (state, action: PayloadAction<Project | undefined>) => {
      state.currentProject = action.payload;
    },
  },
});

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

export const { setCurrentProject } = projectSlice.actions;

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useUpdateProjectMutation,
} = projectApi;

export default projectSlice.reducer;
