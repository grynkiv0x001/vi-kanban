import { ProjectSchema } from '@shared/types';

export const createProjectSchema = ProjectSchema.omit({ id: true });
export const updateProjectSchema = ProjectSchema.partial();
