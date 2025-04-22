"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderStatus = exports.createOrder = void 0;
const order_1 = require("../models/order");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = new order_1.Order(req.body);
        yield order.save();
        res.status(201).json(order);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.createOrder = createOrder;
const getOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_1.Order.findOne({ orderId: req.params.orderId });
        if (!order)
            return res.status(404).json({ message: 'Order not found' });
        res.json({ status: order.status });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getOrderStatus = getOrderStatus;
