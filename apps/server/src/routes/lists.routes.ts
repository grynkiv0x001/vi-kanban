import { Router } from 'express';

import tasksRouter from './tasks.routes';

import * as controller from '../controllers/lists.controller';

const router = Router({ mergeParams: true });

router.get('/', controller.getLists);
router.get('/:id', controller.getList);
router.post('/', controller.postList);
router.put('/:id', controller.putList);
router.delete('/:id', controller.deleteList);

router.use('/:id/tasks', tasksRouter);

export default router;