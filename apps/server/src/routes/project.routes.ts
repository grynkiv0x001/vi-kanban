import { Router } from 'express';

import listRouter from './list.routes';

import * as controller from '../controllers/project.controller';

const router = Router();

router.get('/', controller.getProjects);
router.get('/:id', controller.getProject);
router.post('/', controller.postProject);
router.put('/:id', controller.putProject);
router.delete('/:id', controller.deleteProject);

router.use('/:projectId/list', listRouter);

export default router;