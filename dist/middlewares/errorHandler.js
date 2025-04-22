"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAggregation = void 0;
const forbiddenStages = ['$out', '$merge', '$geoNear'];
const validateAggregation = (req, res, next) => {
    const pipeline = req.body.pipeline || [];
    const hasForbiddenStage = pipeline.some((stage) => Object.keys(stage).some(key => forbiddenStages.includes(key)));
    if (hasForbiddenStage) {
        return res.status(400).json({ error: 'Aggregation contains forbidden stages' });
    }
    next();
};
exports.validateAggregation = validateAggregation;
