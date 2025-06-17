import { z } from 'zod';

import { TaskSchema } from '@shared/types';

export const createTaskSchema = TaskSchema.omit({ id: true });
export const updateTaskSchema = TaskSchema.partial().extend({
  id: z.number().min(1),
});
