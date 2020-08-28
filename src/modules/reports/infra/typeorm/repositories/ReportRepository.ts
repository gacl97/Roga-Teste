import { getRepository, Repository } from 'typeorm';

import IReportRepository from '@modules/reports/repositories/IReportRepository';

import ICreateReportDTO from '@modules/reports/dtos/ICreateReportDTO';

import Report from '../entities/Report';

class ReportRepository implements IReportRepository {
  private ormRepository: Repository<Report>;

  constructor() {
    this.ormRepository = getRepository(Report);
  }

  public async create({
    title,
    description,
    address_id,
    whistleblower_id,
  }: ICreateReportDTO): Promise<Report> {
    const report = this.ormRepository.create({
      title,
      description,
      address_id,
      whistleblower_id,
    });

    await this.ormRepository.save(report);

    return report;
  }
}

export default ReportRepository;
