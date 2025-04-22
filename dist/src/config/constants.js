"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FORBIDDEN_AGGREGATION_STAGES = void 0;
// src/config/constants.ts
exports.FORBIDDEN_AGGREGATION_STAGES = [
    '$out',
    '$merge',
    '$geoNear'
];
