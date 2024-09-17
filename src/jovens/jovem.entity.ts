import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Genero } from './genero.enum';
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
  genero: Genero; // Certifique-se de que o campo está configurado para o tipo enum

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
}


