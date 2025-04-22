// import { Request, Response } from 'express';
// import { Customer } from '../models/Customer';

// export const addCustomer = async (req: Request, res: Response) => {
//   try {
//     const customer = new Customer(req.body);
//     await customer.save();
//     res.status(201).json(customer);
//   } catch (error) {
//     res.status(400).json({ error: (error as Error).message });
//   }
// };