import { Router } from 'express';

import reportsRouter from '@modules/reports/infra/http/routes/reports.routes';

const routes = Router();

routes.use('/report', reportsRouter);

export default routes;
