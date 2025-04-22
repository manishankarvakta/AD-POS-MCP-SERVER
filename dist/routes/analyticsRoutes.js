"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analyticsController_1 = require("../controllers/analyticsController");
const errorHandler_1 = require("../middlewares/errorHandler");
const router = (0, express_1.Router)();
router.post('/analytics/aggregate', errorHandler_1.validateAggregation, analyticsController_1.runAggregation);
exports.default = router;
