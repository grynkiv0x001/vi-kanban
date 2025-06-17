import { Router } from 'express';

import * as controller from '../controllers/tasks.controller';

const router = Router({ mergeParams: true });

router.get('/', controller.getTasks);
router.get('/:id', controller.getTask);
router.post('/', controller.createTask);
router.put('/:id', controller.updateTask);
router.delete('/:id', controller.deleteTask);

export default router;