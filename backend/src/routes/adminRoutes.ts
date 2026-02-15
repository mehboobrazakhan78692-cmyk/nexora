import { Router } from 'express';
import * as adminController from '../controllers/adminController';
import { authenticate, isAdmin } from '../middleware/auth';

const router = Router();

router.use(authenticate);
router.use(isAdmin);

router.get('/dashboard', adminController.getDashboardStats);
router.get('/users', adminController.getAllUsersAdmin);
router.get('/users/:id', adminController.getUserByIdAdmin);
router.put('/users/:id', adminController.updateUserAdmin);
router.delete('/users/:id', adminController.deleteUserAdmin);
router.get('/audit-logs', adminController.getAuditLogs);

export default router;
