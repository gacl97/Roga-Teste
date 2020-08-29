import { uuid } from 'uuidv4';

import IWhistleblowerRepository from '@modules/whistleblower/repositories/IWhistleblowerRepository';
import ICreateWhistleblowerDTO from '@modules/whistleblower/dtos/ICreateWhistleblowerDTO';
import Whistleblower from '@modules/whistleblower/infra/typeorm/entities/Whistleblower';

class FakeWhistleblowerRepository implements IWhistleblowerRepository {
  private whistleblowers: Whistleblower[] = [];

  public async create({
    name,
    cpf,
  }: ICreateWhistleblowerDTO): Promise<Whistleblower> {
    const whistleblower = new Whistleblower();

    Object.assign(whistleblower, {
      id: uuid(),
      name,
      cpf,
    });

    this.whistleblowers.push(whistleblower);

    return whistleblower;
  }

  public async findByCpf(cpf: string): Promise<Whistleblower | undefined> {
    const findWhistleblower = this.whistleblowers.find(whistleblower => {
      return whistleblower.cpf === cpf;
    });

    return findWhistleblower;
  }
}

export default FakeWhistleblowerRepository;
