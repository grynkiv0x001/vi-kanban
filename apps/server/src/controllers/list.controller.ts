import { Request, Response } from 'express';

import * as service from '../services/list.service';
import { createListSchema } from '../schemas/list.schema';

export const getLists = async (req: Request, res: Response) => {
  const projectId = Number(req.params.projectId);

  if (isNaN(projectId)) {
    res.status(400).json({ message: 'Invalid or missing project ID' });
    return;
  }

  const lists = await service.getProjectLists(projectId);
  res.json(lists);
};

export const getList = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const list = await service.getListById(id);

  if (!list) {
    res.status(404).json({ message: 'List not found' });
    return;
  }

  res.json(list);
};

export const postList = async (req: Request, res: Response) => {
  const projectId = Number(req.params.projectId);

  if (isNaN(projectId)) {
    res.status(400).json({ message: 'Invalid or missing project ID' });
    return;
  }

  const result = createListSchema.safeParse({
    ...req.body,
    projectId,
  });

  if (!result.success) {
    res.status(400).json(result.error);
    return;
  }

  const list = await service.createList(result.data);

  res.status(201).json(list);
};

// TODO: add missing PUT & DELETE
export const putList = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
};

export const deleteList = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
};