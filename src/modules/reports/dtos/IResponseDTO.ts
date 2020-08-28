import Address from '@modules/addresses/infra/typeorm/entities/Address';
import Whistleblower from '@modules/whistleblower/infra/typeorm/entities/Whistleblower';
import Report from '../infra/typeorm/entities/Report';

export default interface IResponseDTO {
  report: Report;
  address: Address;
  whistleblower: Whistleblower;
}
