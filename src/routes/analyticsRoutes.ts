import { Router } from 'express';
import { runAggregation } from '../controllers/analyticsController';
import { validateAggregation } from '../middlewares/errorHandler';

const router = Router();

router.post('/analytics/aggregate', validateAggregation, runAggregation);

export default router;