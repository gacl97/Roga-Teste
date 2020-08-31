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

  it('should be able to create an new report', async () => {
    const response = await createReport.execute({
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

    expect(response.report).toHaveProperty('id');
  });

  it('should be able to create an address', async () => {
    const address = await fakeAddressRepository.create({
      street: 'Rua Dom Silverio',
      state: 'Minas Gerais',
      zipcode: '12345-123',
      neighborhood: 'Matriz',
      city: 'Congonhas',
      country: 'BR',
      latitude: -20.499751,
      longitude: -43.861278,
    });

    expect(address).toHaveProperty('id');
  });

  it('should be able to create an whistleblower', async () => {
    const whistleblower = await fakeWhistleblowerRepository.create({
      cpf: '11111111111',
      name: 'Gustavo',
    });

    expect(whistleblower).toHaveProperty('id');
  });

  it('should not be able to create an report with invalid address', async () => {
    await expect(
      createReport.execute({
        latitude: -23.499751,
        longitude: -43.861278,
        report: {
          description: 'descricao',
          title: 'title',
        },
        whistleblower: {
          cpf: '11111111111',
          name: 'name',
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an report with invalid latitude and longitude', async () => {
    await expect(
      createReport.execute({
        latitude: -2312312.499751,
        longitude: -433131.861278,
        report: {
          description: 'descricao',
          title: 'title',
        },
        whistleblower: {
          cpf: '11111111111',
          name: 'name',
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an whistleblower if already exists', async () => {
    const whistleblower = await fakeWhistleblowerRepository.create({
      cpf: '11111111111',
      name: 'Gustavo',
    });

    await createReport.execute({
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

    await expect(
      fakeWhistleblowerRepository.findByCpf('11111111111'),
    ).resolves.toEqual(whistleblower);
  });

  it('should not be able to create a address if already exists', async () => {
    const latitude = -20.499751;
    const longitude = -43.861278;

    await fakeCacheProvider.save(`${latitude}:${longitude}`, {
      id: '1',
      street: 'Rua Dom Silverio',
      state: 'Minas Gerais',
      zipcode: '12345-123',
      neighborhood: 'Matriz',
      city: 'Congonhas',
      country: 'BR',
    });

    await createReport.execute({
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

    await expect(
      fakeCacheProvider.recover(`${latitude}:${longitude}`),
    ).resolves.toEqual({
      id: '1',
      street: 'Rua Dom Silverio',
      state: 'Minas Gerais',
      zipcode: '12345-123',
      city: 'Congonhas',
      neighborhood: 'Matriz',
      country: 'BR',
    });
  });
});
