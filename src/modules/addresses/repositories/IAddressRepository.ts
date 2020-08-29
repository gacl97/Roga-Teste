import ICreateAddressDTO from '../dtos/ICreateAddressDTO';
import IFindByLatitudeAndLongitudeDTO from '../dtos/IFindByLatitudeAndLongitudeDTO';
import Address from '../infra/typeorm/entities/Address';

export default interface IAddressRepository {
  create(data: ICreateAddressDTO): Promise<Address>;
  findByLatitudeAndLongitude(
    data: IFindByLatitudeAndLongitudeDTO,
  ): Promise<Address | undefined>;
}
