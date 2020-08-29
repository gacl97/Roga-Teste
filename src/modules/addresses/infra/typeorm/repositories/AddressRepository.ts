import { getRepository, Repository } from 'typeorm';
import IAddressRepository from '@modules/addresses/repositories/IAddressRepository';

import ICreateAddressDTO from '@modules/addresses/dtos/ICreateAddressDTO';
import IFindByLatitudeAndLongitudeDTO from '@modules/addresses/dtos/IFindByLatitudeAndLongitudeDTO';

import Address from '../entities/Address';

class AddressRepository implements IAddressRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async create({
    city,
    country,
    latitude,
    longitude,
    neighborhood,
    state,
    street,
    zipcode,
  }: ICreateAddressDTO): Promise<Address> {
    const address = this.ormRepository.create({
      city,
      country,
      latitude,
      longitude,
      neighborhood,
      state,
      street,
      zipcode,
    });

    await this.ormRepository.save(address);

    return address;
  }

  public async findByLatitudeAndLongitude({
    latitude,
    longitude,
  }: IFindByLatitudeAndLongitudeDTO): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne({
      where: {
        latitude,
        longitude,
      },
    });

    return address;
  }
}

export default AddressRepository;
