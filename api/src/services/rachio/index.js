import { Router } from 'express';
import * as controller from './rachio.controller';

const router = new Router();

router.get('/api-key', controller.getAPIKey);
router.patch('/api-key',controller.patchAPIKey);
router.get('/devices',controller.getDevices);
router.get('/controller',controller.getController);
router.patch('/controller',controller.patchController);
router.get('/controller/status',controller.getStatus);
router.patch('/controller/status',controller.patchStatus);

export default router;