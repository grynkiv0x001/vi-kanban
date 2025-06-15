import { Router } from 'express';

import taskRouter from './task.routes';

import * as controller from '../controllers/list.controller';

const router = Router({ mergeParams: true });

router.get('/', controller.getLists);
router.get('/:id', controller.getList);
router.post('/', controller.postList);
router.put('/:id', controller.putList);
// router.delete('/:id', controller.deleteList);

router.use('/:id/tasks', taskRouter);

export default router;