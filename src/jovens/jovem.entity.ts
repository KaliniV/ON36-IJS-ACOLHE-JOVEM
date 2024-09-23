import {
  Column,
  ConnectionCheckOutStartedEvent,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Genero } from './genero.enum';
import * as bcrypt from 'bcrypt';
@Entity()
@Unique(['email'])
export class Jovem {
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
  @Column({
    nullable: false,
    type: 'enum',
    enum: Genero,
  })
  genero: Genero;

  @Column({
    type: 'date',
    nullable: false,
  })
  dataNascimento: Date;

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

  async checarSenha(senha: string): Promise<boolean> {
    const hash = await bcrypt.hash(senha, this.criptografia);
    return hash == this.senha;
  }
}
