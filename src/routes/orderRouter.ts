import { Router } from 'express';
import { createOrder, getOrderStatus } from '../controllers/orderController';

const router = Router();

router.post('/orders', createOrder);
router.get('/orders/:orderId/status', getOrderStatus);

export default router;