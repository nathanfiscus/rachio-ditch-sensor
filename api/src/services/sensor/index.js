import { Router } from 'express';
import * as controller from './sensor.controller';

const router = new Router();

router.get('/', controller.index);
router.get('/threshold',controller.getThreshold);
router.patch('/threshold',controller.patchThreshold);
router.delete('/threshold',controller.resetThreshold);

export default router;