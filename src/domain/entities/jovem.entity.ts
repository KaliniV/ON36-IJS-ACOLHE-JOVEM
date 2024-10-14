import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Genero } from '../enums/genero.enum';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';
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

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;

  async checarSenha(senha: string): Promise<boolean> {
    if (!senha) {
      throw new BadRequestException('Senha não fornecida');
    }
    const hash = await bcrypt.hash(senha, this.criptografia);
    return hash == this.senha;
  }
}
