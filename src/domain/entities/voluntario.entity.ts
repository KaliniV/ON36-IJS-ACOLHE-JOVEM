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
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Unique(['email'])
@Unique(['conselhoRegionalDePsicologia'])
export class Voluntario {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  @ApiProperty()
  nome: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  @ApiProperty()
  email: string;

  @Column({ nullable: false, default: true })
  @ApiProperty()
  status: boolean;

  @Column({ nullable: false })
  @ApiProperty()
  senha: string;

  @Column({ nullable: false, type: 'varchar', length: 7 })
  @ApiProperty()
  conselhoRegionalDePsicologia: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: Especialidade,
  })
  @ApiProperty({ enum: Especialidade, enumName: 'especialidade' })
  especialidade: Especialidade;

  @Column({
    nullable: false,
    type: 'enum',
    enum: Abordagem,
  })
  @ApiProperty({ enum: Abordagem, enumName: 'Abordagem' })
  abordagem: Abordagem;

  @Column({ nullable: false, type: 'varchar' })
  @ApiProperty()
  experiencia: string;

  @Column({ nullable: false, type: 'varchar' })
  @ApiProperty()
  motivacao: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  @ApiProperty()
  disponibilidadeSemanal: string;

  @Column()
  @ApiProperty()
  foto: string;

  @Column({ nullable: false })
  @ApiProperty()
  criptografia: string;

  @CreateDateColumn()
  @ApiProperty()
  criadoEm: Date;

  @UpdateDateColumn()
  @ApiProperty()
  atualizadoEm: Date;

  async checarSenha(senha: string): Promise<boolean> {
    const hash = await bcrypt.hash(senha, this.criptografia);
    return hash == this.senha;
  }
}
