import { Router } from 'express';

import ReportController from '../controllers/ReportController';

const reportController = new ReportController();

const reportsRoutes = Router();

reportsRoutes.post('/', reportController.create);

export default reportsRoutes;
