import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import orderRoutes from './routes/orderRoutes';
import customerRoutes from './routes/customerRoutes';
import productRoutes from './routes/productRoutes';
import analyticsRoutes from './routes/analyticsRoutes';
import errorHandler from './middlewares/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', orderRoutes);
app.use('/api', customerRoutes);
app.use('/api', productRoutes);
app.use('/api', analyticsRoutes);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});