import { Router } from 'express';

import * as controller from '@/controllers/reorder.controller';

const router = Router({ mergeParams: true });

router.post('/lists', controller.reorderLists);
router.post('/tasks', controller.reorderTasks);

export default router;
