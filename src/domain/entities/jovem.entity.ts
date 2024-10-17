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
import { ApiProperty } from '@nestjs/swagger';
@Entity()
@Unique(['email'])
export class Jovem {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ nullable: false, type: 'varchar', length: 200 })
  nome: string;

  @ApiProperty()
  @Column({ nullable: false, type: 'varchar', length: 200 })
  email: string;

  @ApiProperty()
  @Column({ nullable: false, default: true })
  status: boolean;

  @Column({ nullable: false })
  senha: string;
  @Column({
    nullable: false,
    type: 'enum',
    enum: Genero,
  })
  @ApiProperty({ enum: Genero, enumName: 'Genero' })
  genero: Genero;

  @ApiProperty()
  @Column({
    type: 'date',
    nullable: false,
  })
  dataNascimento: Date;

  @ApiProperty()
  @Column({ nullable: false })
  criptografia: string;

  @ApiProperty()
  @CreateDateColumn()
  criadoEm: Date;

  @ApiProperty()
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
