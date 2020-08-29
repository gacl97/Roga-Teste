import axios from 'axios';

import FakeWhistleblowerRepository from '@modules/whistleblower/repositories/fakes/FakeWhistleblowerRepository';
import FakeAddressRepository from '@modules/addresses/repositories/fakes/FakeAddressRepository';
import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeReportRepository from '../repositories/fakes/FakeReportRepository';

import CreateReportService from './CreateReportService';

let fakeReportRepository: FakeReportRepository;
let fakeWhistleblowerRepository: FakeWhistleblowerRepository;
let fakeAddressRepository: FakeAddressRepository;
let fakeCacheProvider: FakeCacheProvider;
let createReport: CreateReportService;

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CreateReport', () => {
  beforeEach(() => {
    fakeReportRepository = new FakeReportRepository();
    fakeWhistleblowerRepository = new FakeWhistleblowerRepository();
    fakeAddressRepository = new FakeAddressRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createReport = new CreateReportService(
      fakeReportRepository,
      fakeWhistleblowerRepository,
      fakeAddressRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new report', async () => {
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `http://www.mapquestapi.com/geocoding/v1/reverse?key=CnjDjaUTQlMEVg8tyfi044RX6R6Mp2BP&location=-20.499751-43.861278&outFormat=json&thumbMaps=false`,
    );
    const report = await createReport.execute({
      latitude: -20.499751,
      longitude: -43.861278,
      report: {
        description: 'descricao',
        title: 'title',
      },
      whistleblower: {
        cpf: '11111111111',
        name: 'name',
      },
    });

    expect(report).toHaveProperty('id');
  });

  it('should not be able to create a report with invalid address', async () => {
    const report = await createReport.execute({
      latitude: -221313.499751,
      longitude: -4321313.861278,
      report: {
        description: 'descricao',
        title: 'title',
      },
      whistleblower: {
        cpf: '11111111111',
        name: 'name',
      },
    });

    await expect(report).rejects.toBeInstanceOf(AppError);
  });
});
