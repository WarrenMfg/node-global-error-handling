import { Router } from 'express';
import apiControllers from './apiControllers';

const apiRoutes = Router();

// utilize global error handler with catch method
const use = apiCallback => (req, res, next) =>
  Promise.resolve(apiCallback(req, res, next)).catch(next);

apiRoutes.get('/resource/:id', use(apiControllers.get));

export default apiRoutes;
