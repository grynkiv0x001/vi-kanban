import { prisma } from '@/prisma/client';

export const reorderLists = async (projectId: number, listIds: number[]) => {
  const transaction = listIds.map((id, index) =>
    prisma.list.update({
      where: { id, projectId },
      data: { position: index },
    }),
  );

  await prisma.$transaction(transaction);
};

export const reorderTasks = async (projectId: number, listId: number, taskIds: number[]) => {
  const transaction = taskIds.map((id, index) =>
    prisma.task.update({
      where: { id, projectId, listId },
      data: { position: index },
    }),
  );

  await prisma.$transaction(transaction);
};

export const reorderTasksInList = async (projectId: number, listId: number, taskIds: number[]) => {
  const transaction = taskIds.map((id, index) => 
    prisma.task.update({
      where: { id, projectId },
      data: { 
        position: index,
        listId: listId, 
      },
    }),
  );
    
  await prisma.$transaction(transaction);
};
