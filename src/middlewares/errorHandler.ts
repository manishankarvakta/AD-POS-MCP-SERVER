import { Request, Response, NextFunction } from 'express';

const forbiddenStages = ['$out', '$merge', '$geoNear'];

export const validateAggregation = (req: Request, res: Response, next: NextFunction) => {
  const pipeline = req.body.pipeline || [];
  
  const hasForbiddenStage = pipeline.some((stage: any) => 
    Object.keys(stage).some(key => forbiddenStages.includes(key))
  );

  if (hasForbiddenStage) {
    return res.status(400).json({ error: 'Aggregation contains forbidden stages' });
  }

  next();
};