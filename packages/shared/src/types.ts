import { z } from 'zod';

export const ProjectSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required'),
});

export type Project = z.infer<typeof ProjectSchema>;

export const ListSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required'),
  position: z.number().optional(),
  projectId: z.number().min(1, 'Project ID is required'),
});

export type List = z.infer<typeof ListSchema>;
