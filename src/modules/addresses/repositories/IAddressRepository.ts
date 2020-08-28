import ICreateAddressDTO from '../dtos/ICreateAddressDTO';
import IFindAddressByCityStateAndStreetDTO from '../dtos/IFindAddressByCityStateAndStreetDTO';
import Address from '../infra/typeorm/entities/Address';

export default interface IAddressRepository {
  create(data: ICreateAddressDTO): Promise<Address>;
  findByCityStateAndStreet(
    data: IFindAddressByCityStateAndStreetDTO,
  ): Promise<Address | undefined>;
}
