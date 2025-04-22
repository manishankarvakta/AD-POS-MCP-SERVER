import { Request, Response } from 'express';
import { Order } from '../models/order';

export const runAggregation = async (req: Request, res: Response) => {
  try {
    const pipeline = req.body.pipeline;
    const result = await Order.aggregate(pipeline);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};