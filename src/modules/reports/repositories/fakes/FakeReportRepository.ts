import { uuid } from 'uuidv4';

import IReportRepository from '@modules/reports/repositories/IReportRepository';

import ICreateReportDTO from '@modules/reports/dtos/ICreateReportDTO';

import Report from '@modules/reports/infra/typeorm/entities/Report';

class FakeReportRepository implements IReportRepository {
  private reports: Report[] = [];

  public async create({
    title,
    description,
    address_id,
    whistleblower_id,
  }: ICreateReportDTO): Promise<Report> {
    const report = new Report();

    Object.assign(report, {
      id: uuid(),
      title,
      description,
      address_id,
      whistleblower_id,
    });

    this.reports.push(report);

    return report;
  }
}

export default FakeReportRepository;
