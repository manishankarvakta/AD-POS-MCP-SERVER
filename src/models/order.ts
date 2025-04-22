import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  orderId: { type: String, required: true, unique: true },
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  products: [{
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
  }],
  status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered'], default: 'pending' },
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Order = model('Order', orderSchema);