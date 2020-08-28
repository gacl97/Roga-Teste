import ICreateWhistleblowerDTO from '../dtos/ICreateWhistleblowerDTO';
import Whistleblower from '../infra/typeorm/entities/Whistleblower';

export default interface IWhistleblowerRepository {
  create(data: ICreateWhistleblowerDTO): Promise<Whistleblower>;
  findByCpf(cpf: string): Promise<Whistleblower | undefined>;
}
