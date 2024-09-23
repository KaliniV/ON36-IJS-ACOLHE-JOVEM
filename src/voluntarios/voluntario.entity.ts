import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Especialidade } from './especialidade.enum';
@Entity()
@Unique(['email'])
@Unique(['conselhoRegionalDePsicologia'])
export class Voluntario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  nome: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  email: string;

  @Column({ nullable: false, default: true })
  status: boolean;

  @Column({ nullable: false })
  senha: string;

  @Column({ nullable: false, type: 'varchar', length: 7 })
  conselhoRegionalDePsicologia: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: Especialidade,
  })
  especialidade: Especialidade;

  @Column({ nullable: false, type: 'varchar' })
  abordagem: string;

  @Column({ nullable: false, type: 'varchar' })
  experiencia: string;

  @Column({ nullable: false, type: 'varchar' })
  motivacao: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  disponibilidadeSemanal: string;

  @Column({ nullable: false })
  criptografia: string;

  @Column({ nullable: true, type: 'varchar', length: 64 })
  confirmacaoToken: string;

  @Column({ nullable: true, type: 'varchar', length: 64 })
  recuperarToken: string;

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;
}
