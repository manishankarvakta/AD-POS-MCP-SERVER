"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const customerRoutes_1 = __importDefault(require("./routes/customerRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const analyticsRoutes_1 = __importDefault(require("./routes/analyticsRoutes"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Connect to MongoDB
(0, db_1.connectDB)();
// Routes
app.use('/api', orderRoutes_1.default);
app.use('/api', customerRoutes_1.default);
app.use('/api', productRoutes_1.default);
app.use('/api', analyticsRoutes_1.default);
// Error handling
app.use(errorHandler_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
