import { z } from 'zod';

export const ProjectSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required'),
});

export type Project = z.infer<typeof ProjectSchema>
