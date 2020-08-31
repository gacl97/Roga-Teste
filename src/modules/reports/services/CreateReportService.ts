import { inject, injectable } from 'tsyringe';
import axios from 'axios';

import AppError from '@shared/errors/AppError';

import IResquestDTO from '@modules/reports/dtos/IResquestDTO';
import IResponseDTO from '@modules/reports/dtos/IResponseDTO';

import IWhistleblowerRepository from '@modules/whistleblower/repositories/IWhistleblowerRepository';
import IAddressRepository from '@modules/addresses/repositories/IAddressRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Address from '@modules/addresses/infra/typeorm/entities/Address';
import IReportRepository from '../repositories/IReportRepository';

@injectable()
class CreateReportService {
  constructor(
    @inject('ReportRepository')
    private reportRepository: IReportRepository,

    @inject('WhistleblowerRepository')
    private whistleblowerRepository: IWhistleblowerRepository,

    @inject('AddressRepository')
    private addressRepository: IAddressRepository,

    @inject('RedisCacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    latitude,
    longitude,
    report,
    whistleblower,
  }: IResquestDTO): Promise<IResponseDTO> {
    let whistleblowerExists = await this.whistleblowerRepository.findByCpf(
      whistleblower.cpf,
    );

    if (!whistleblowerExists) {
      whistleblowerExists = await this.whistleblowerRepository.create({
        cpf: whistleblower.cpf,
        name: whistleblower.name,
      });
    }

    let addressExists = await this.cacheProvider.recover<Address>(
      `${latitude}:${longitude}`,
    );

    if (!addressExists) {
      const response = await axios.get(
        `http://www.mapquestapi.com/geocoding/v1/reverse?key=CnjDjaUTQlMEVg8tyfi044RX6R6Mp2BP&location=${latitude},${longitude}&outFormat=json&thumbMaps=false`,
      );

      const [location] = response.data.results;

      const [address] = location.locations;

      if (!address) {
        throw new AppError('Latitude or longitude is wrong.', 404);
      }

      const {
        street,
        adminArea5: city,
        adminArea3: state,
        postalCode: zipcode,
        adminArea6: neighborhood,
        adminArea1: country,
      } = address;

      if (!street) {
        throw new AppError('Address not found for that location.', 404);
      }

      addressExists = await this.addressRepository.create({
        city,
        country,
        latitude,
        longitude,
        neighborhood,
        state,
        street,
        zipcode,
      });

      await this.cacheProvider.save(`${latitude}:${longitude}`, {
        id: addressExists.id,
        street,
        state,
        zipcode,
        neighborhood,
        country,
      });
    }
    const createdReport = await this.reportRepository.create({
      description: report.description,
      title: report.title,
      whistleblower_id: whistleblowerExists.id,
      address_id: addressExists.id,
    });

    return {
      report: createdReport,
      address: addressExists,
      whistleblower: whistleblowerExists,
    };
  }
}

export default CreateReportService;
