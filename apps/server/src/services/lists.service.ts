import { z } from 'zod';

import { prisma } from '../prisma/client';
import { createListSchema } from '../schemas/list.schema';

type CreateListInput = z.infer<typeof createListSchema>;

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

