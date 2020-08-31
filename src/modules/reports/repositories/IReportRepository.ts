import ICreateReportDTO from '@modules/reports/dtos/ICreateReportDTO';
import Report from '../infra/typeorm/entities/Report';

export default interface IReportRepository {
  create(data: ICreateReportDTO): Promise<Report>;
  findAllReports(): Promise<Report[]>;
}
