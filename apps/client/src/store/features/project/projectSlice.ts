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
      query: () => 'project',
      providesTags: ['Project'],
    }),
    getProject: build.query<Project, string>({
      query: (id) => `project/${id}`,
    }),
  }),
});

export const { setCurrentProject } = projectSlice.actions;

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
} = projectApi;

export default projectSlice.reducer;
