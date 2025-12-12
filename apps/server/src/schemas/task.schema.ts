import { z } from 'zod';

import { TaskSchema } from '@shared/types';

export const createTaskSchema = TaskSchema.omit({ id: true });

export const updateTaskSchema = TaskSchema.partial()
  .extend({
    id: z.number().min(1),
  })
  .merge(
    z.object({
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().nullable().optional(),
      deadline: z.coerce.date().nullable().optional(),
    }),
  );
