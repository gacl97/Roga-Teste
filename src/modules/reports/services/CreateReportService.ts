import { inject, injectable } from 'tsyringe';
import axios from 'axios';

import IResquestDTO from '@modules/reports/dtos/IResquestDTO';
import IResponseDTO from '@modules/reports/dtos/IResponseDTO';

import IWhistleblowerRepository from '@modules/whistleblower/repositories/IWhistleblowerRepository';
import AppError from '@shared/errors/AppError';
import IAddressRepository from '@modules/addresses/repositories/IAddressRepository';
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

    const response = await axios.get(
      `http://www.mapquestapi.com/geocoding/v1/reverse?key=CnjDjaUTQlMEVg8tyfi044RX6R6Mp2BP&location=${latitude},${longitude}&outFormat=json&thumbMaps=false`,
    );

    const [locations] = response.data.results;

    const [address] = locations.locations;
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

    let addressExists = await this.addressRepository.findByCityStateAndStreet({
      city,
      state,
      street,
    });

    if (!addressExists) {
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
