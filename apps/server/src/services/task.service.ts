import { prisma } from '../prisma/client';

export const getTasks = () => prisma.project.findMany();

export const getTaskById = (id: number) =>
  prisma.project.findUnique({ where: { id } });
