import FakeReportRepository from '../repositories/fakes/FakeReportRepository';
import ListAllReportsService from './ListAllReportsService';

let fakeReportRepository: FakeReportRepository;

let listReports: ListAllReportsService;

describe('ListReports', () => {
  beforeEach(() => {
    fakeReportRepository = new FakeReportRepository();

    listReports = new ListAllReportsService(fakeReportRepository);
  });

  it('should be able to list all reports', async () => {
    const report1 = await fakeReportRepository.create({
      address_id: '1',
      description: 'description',
      title: 'title',
      whistleblower_id: '1',
    });

    const report2 = await fakeReportRepository.create({
      address_id: '2',
      description: 'description',
      title: 'title',
      whistleblower_id: '2',
    });

    const allReports = await listReports.execute();

    expect(allReports).toEqual([report1, report2]);
  });
});
