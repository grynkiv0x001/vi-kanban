import { Request, Response } from 'express';

import { createProjectSchema, updateProjectSchema } from '../schemas/project.schema';
import * as service from '../services/projects.service';

export const getProjects = async (_: Request, res: Response) => {
  const projects = await service.getAllProjects();
  res.status(200).json(projects);
};

export const getProject = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const project = await service.getProjectById(id);

  if (!project) {
    res.status(404).json({ message: 'Project not found' });
    return;
  }

  res.status(200).json(project);
};

export const createProject = async (req: Request, res: Response) => {
  const result = createProjectSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(result.error);
    return;
  }

  try {
    const project = await service.createProject(result.data.name);
    res.status(201).json(project);
  } catch {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = updateProjectSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(result.error);
    return;
  }

  try {
    const updated = await service.updateProject(id, result.data.name!);
    res.status(200).json(updated);
  } catch {
    res.status(500).json({ error: 'Failed to update project' });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await service.deleteProject(id);
    res.status(204).send();
  } catch {
    res.status(500).json({ error: 'Failed to delete project' });
  }
};
