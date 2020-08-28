import { container } from 'tsyringe';

import ReportRepository from '@modules/reports/infra/typeorm/repositories/ReportRepository';
import IReportRepository from '@modules/reports/repositories/IReportRepository';

import WhistleblowerRepository from '@modules/whistleblower/infra/typeorm/repositories/WhistleblowerRepository';
import IWhistleblowerRepository from '@modules/whistleblower/repositories/IWhistleblowerRepository';

import AddressRepository from '@modules/addresses/infra/typeorm/repositories/AddressRepository';
import IAddressRepository from '@modules/addresses/repositories/IAddressRepository';

container.registerSingleton<IReportRepository>(
  'ReportRepository',
  ReportRepository,
);

container.registerSingleton<IWhistleblowerRepository>(
  'WhistleblowerRepository',
  WhistleblowerRepository,
);

container.registerSingleton<IAddressRepository>(
  'AddressRepository',
  AddressRepository,
);
