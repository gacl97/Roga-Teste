import { uuid } from 'uuidv4';

import IAddressRepository from '@modules/addresses/repositories/IAddressRepository';

import ICreateAddressDTO from '@modules/addresses/dtos/ICreateAddressDTO';
import IFindByLatitudeAndLongitudeDTO from '@modules/addresses/dtos/IFindByLatitudeAndLongitudeDTO';

import Address from '@modules/addresses/infra/typeorm/entities/Address';

class FakeAddressRepository implements IAddressRepository {
  private addresses: Address[] = [];

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
    const address = new Address();

    Object.assign(address, {
      id: uuid(),
      city,
      country,
      latitude,
      longitude,
      neighborhood,
      state,
      street,
      zipcode,
    });

    this.addresses.push(address);

    return address;
  }

  public async findByLatitudeAndLongitude({
    latitude,
    longitude,
  }: IFindByLatitudeAndLongitudeDTO): Promise<Address | undefined> {
    const findAddress = this.addresses.find(address => {
      return address.latitude === latitude && address.longitude === longitude;
    });

    return findAddress;
  }
}

export default FakeAddressRepository;
