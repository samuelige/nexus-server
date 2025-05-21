import { Request, Response, NextFunction } from 'express';

const notFoundMiddleware = (_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).send('Route does not exist');
};

export default notFoundMiddleware;