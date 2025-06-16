import { prisma } from '../prisma/client';

export const getAllProjects = () => prisma.project.findMany();

export const getProjectById = (id: number) =>
  prisma.project.findUnique({ where: { id } });

export const createProject = (name: string) =>
  prisma.project.create({ data: { name } });

export const updateProject = (id: number, name: string) =>
  prisma.project.update({ where: { id }, data: { name } });

export const deleteProject = (id: number) =>
  prisma.project.delete({ where: { id } });
