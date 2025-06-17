import { z } from 'zod';

import { prisma } from '../prisma/client';
import { createTaskSchema, updateTaskSchema } from '../schemas/task.schema';

type CreateTaskInput = z.infer<typeof createTaskSchema>;
type UpdateTaskInput = z.infer<typeof updateTaskSchema>;

export const getTasks = () => prisma.task.findMany();

export const getTaskById = (id: number) =>
  prisma.task.findUnique({ where: { id } });

export const createTask = (data: CreateTaskInput) =>
  prisma.task.create({ data });

export const updateTask = (data: UpdateTaskInput) =>
  prisma.task.update({ where: { id: data.id }, data });

export const deleteTask = (id: number) =>
  prisma.task.delete({ where: { id } });
