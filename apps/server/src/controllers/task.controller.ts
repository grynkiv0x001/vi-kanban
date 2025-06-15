import { Request, Response } from 'express';

import * as service from '../services/task.service';

export const getTasks = async (_: Request, res: Response) => {
  const tasks = await service.getTasks();
  res.json(tasks);
};

export const getTaskById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const task = await service.getTaskById(id);

  if (!task) {
    res.status(404).json({ message: 'List not found' });
    return;
  }

  res.json(task);
};
