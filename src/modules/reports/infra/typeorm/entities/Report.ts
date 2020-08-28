import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

import Whistleblower from '@modules/whistleblower/infra/typeorm/entities/Whistleblower';
import Address from '@modules/addresses/infra/typeorm/entities/Address';

import { Exclude } from 'class-transformer';

@Entity('reports')
class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Whistleblower)
  @JoinColumn({ name: 'whistleblower_id' })
  whistleblower: Whistleblower;

  @Exclude()
  @Column()
  whistleblower_id: string;

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @Exclude()
  @Column()
  address_id: string;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}

export default Report;
