import { z } from 'zod';

import { prisma } from '@/prisma/client';
import { createTaskSchema, updateTaskSchema } from '@/schemas/task.schema';

type CreateTaskInput = z.infer<typeof createTaskSchema>;
type UpdateTaskInput = z.infer<typeof updateTaskSchema>;

export const getTasks = (listId: number) => prisma.task.findMany({ where: { listId } });

export const getTasksByListIds = (listIds: number[]) =>
  prisma.task.findMany({
    where: { listId: { in: listIds } },
    orderBy: [
      {
        position: 'asc',
      },
      {
        id: 'asc',
      },
    ],
  });

export const getTaskById = (id: number) =>
  prisma.task.findUnique({ where: { id } });

export const createTask = async (data: CreateTaskInput) => {
  // If position is not provided, set it to the end of the list
  if (data.position === null || data.position === undefined) {
    const tasksInList = await prisma.task.findMany({
      where: {
        listId: data.listId,
        projectId: data.projectId,
      },
      orderBy: {
        position: 'desc',
      },
      take: 1,
      select: {
        position: true,
      },
    });

    const maxPosition = tasksInList[0]?.position ?? -1;
    data.position = maxPosition + 1;
  }

  return prisma.task.create({ data });
};

export const updateTask = (data: UpdateTaskInput) =>
  prisma.task.update({ where: { id: data.id }, data });

export const deleteTask = (id: number) =>
  prisma.task.delete({ where: { id } });
