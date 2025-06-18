import { z } from 'zod';

import { prisma } from '../prisma/client';
import { createListSchema, updateListSchema } from '../schemas/list.schema';

export type CreateListInput = z.infer<typeof createListSchema>;
export type UpdateListInput = z.infer<typeof updateListSchema>;

export const getProjectLists = (projectId: number) => {
  return prisma.list.findMany({
    where: { projectId },
    orderBy: [
      {
        position: 'asc',
      },
      {
        id: 'asc',
      },
    ],
  });
};

export const getListById = (id: number) =>
  prisma.list.findUnique({ where: { id } });

export const createList = (data: CreateListInput) =>
  prisma.list.create({ data });

export const updateList = (data: UpdateListInput) =>
  prisma.list.update({ where: { id: data.id }, data });

export const deleteList = async (id: number) => {
  await prisma.task.deleteMany({ where: { listId: id } });

  return prisma.list.delete({ where: { id } });
};
