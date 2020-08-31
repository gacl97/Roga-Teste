import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';

import CreateReportService from '@modules/reports/services/CreateReportService';
import ListAllReportsService from '@modules/reports/services/ListAllReportsService';

class ReportController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      latitude,
      longitude,
      whistleblower: { name, cpf },
      report: { title, description },
    } = request.body;

    const createReportService = container.resolve(CreateReportService);

    const reportResponse = await createReportService.execute({
      latitude,
      longitude,
      report: {
        description,
        title,
      },
      whistleblower: {
        cpf,
        name,
      },
    });

    return response.json(classToClass(reportResponse));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listReports = container.resolve(ListAllReportsService);

    const reports = await listReports.execute();

    return response.json(reports);
  }
}

export default ReportController;
