import { Router } from 'express';

import * as controller from '../controllers/tasks.controller';

const router = Router({ mergeParams: true });

router.get('/', controller.getTasks);
router.get('/:id', controller.getTask);
// router.post('/', controller.postTask);
// router.put('/:id', controller.putTask);
// router.delete('/:id', controller.deleteTask);

export default router;