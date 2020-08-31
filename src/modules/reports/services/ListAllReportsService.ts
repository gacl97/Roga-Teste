import { inject, injectable } from 'tsyringe';
import Report from '../infra/typeorm/entities/Report';
import IReportRepository from '../repositories/IReportRepository';

@injectable()
class ListAllReportsService {
  constructor(
    @inject('ReportRepository')
    private reportRepository: IReportRepository,
  ) {}

  public async execute(): Promise<Report[]> {
    const reports = await this.reportRepository.findAllReports();

    return reports;
  }
}

export default ListAllReportsService;
