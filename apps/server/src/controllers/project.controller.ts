import { Request, Response } from 'express';

import * as service from '../services/project.service';
import { createProjectSchema, updateProjectSchema } from '../schemas/project.schema';

export const getProjects = async (_: Request, res: Response) => {
  const projects = await service.getAllProjects();
  res.json(projects);
};

export const getProject = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const project = await service.getProjectById(id);

  if (!project) {
    res.status(404).json({ message: 'Project not found' });
    return;
  }

  res.json(project);
};

export const postProject = async (req: Request, res: Response) => {
  const result = createProjectSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(result.error);
    return;
  }

  const project = await service.createProject(result.data.name);

  res.status(201).json(project);
};

export const putProject = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = updateProjectSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(result.error);
    return;
  }

  try {
    const updated = await service.updateProject(id, result.data.name!);
    res.json(updated);
  } catch {
    res.status(404).json({ error: 'Project not found' });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await service.deleteProject(id);
    res.status(204).send();
  } catch {
    res.status(404).json({ error: 'Project not found' });
  }
};
