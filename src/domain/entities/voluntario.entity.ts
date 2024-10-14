import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Abordagem } from '../enums/abordagem.enum';
import { Especialidade } from '../enums/especialidade.enum';

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

  @Column({
    nullable: false,
    type: 'enum',
    enum: Abordagem,
  })
  abordagem: Abordagem;

  @Column({ nullable: false, type: 'varchar' })
  experiencia: string;

  @Column({ nullable: false, type: 'varchar' })
  motivacao: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  disponibilidadeSemanal: string;

  @Column()
  foto: string;

  @Column({ nullable: false })
  criptografia: string;

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;

  async checarSenha(senha: string): Promise<boolean> {
    const hash = await bcrypt.hash(senha, this.criptografia);
    return hash == this.senha;
  }
}
