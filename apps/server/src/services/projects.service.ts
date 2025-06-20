import { z } from 'zod';

import { prisma } from '@/prisma/client';

import { createProjectSchema } from '@/schemas/project.schema';

type CreateProjectInput = z.infer<typeof createProjectSchema> & { userId: string };

export const getAllProjects = (userId: string) => prisma.project.findMany({ where: { userId } });

export const getProjectById = (id: number) =>
  prisma.project.findUnique({ where: { id } });

export const createProject = (data: CreateProjectInput) =>
  prisma.project.create({ data });

export const updateProject = (id: number, name: string) =>
  prisma.project.update({ where: { id }, data: { name } });

export const deleteProject = async (id: number) => {
  await prisma.task.deleteMany({ where: { projectId: id } });
  await prisma.list.deleteMany({ where: { projectId: id } });

  return prisma.project.delete({ where: { id } });
};
