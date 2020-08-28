import { getRepository, Repository } from 'typeorm';
import IWhistleblowerRepository from '@modules/whistleblower/repositories/IWhistleblowerRepository';
import ICreateWhistleblowerDTO from '@modules/whistleblower/dtos/ICreateWhistleblowerDTO';
import Whistleblower from '../entities/Whistleblower';

class WhistleblowerRepository implements IWhistleblowerRepository {
  private ormRepository: Repository<Whistleblower>;

  constructor() {
    this.ormRepository = getRepository(Whistleblower);
  }

  public async create({
    name,
    cpf,
  }: ICreateWhistleblowerDTO): Promise<Whistleblower> {
    const whistleblower = this.ormRepository.create({
      name,
      cpf,
    });

    await this.ormRepository.save(whistleblower);

    return whistleblower;
  }

  public async findByCpf(cpf: string): Promise<Whistleblower | undefined> {
    const whistleblower = await this.ormRepository.findOne({
      where: {
        cpf,
      },
    });

    return whistleblower;
  }
}

export default WhistleblowerRepository;
