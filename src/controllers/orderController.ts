import { Request, Response } from 'express';
import { Order } from '../models/order';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getOrderStatus = async (req: Request, res: Response) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ status: order.status });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};