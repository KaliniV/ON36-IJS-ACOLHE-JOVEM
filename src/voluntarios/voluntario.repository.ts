import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Voluntario } from './voluntario.entity';
import { CriarVoluntarioDto } from './criar-voluntario-dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
Injectable();
export class VoluntarioRepository {
  constructor(
    @InjectRepository(Voluntario)
    private readonly voluntarioRepository: Repository<Voluntario>,
  ) {}

  async criarVoluntario(
    criarVoluntarioDto: CriarVoluntarioDto,
  ): Promise<Voluntario> {
    const {
      nome,
      email,
      senha,
      conselhoRegionalDePsicologia,
      especialidade,
      abordagem,
      experiencia,
      motivacao,
      disponibilidadeSemanal,
    } = criarVoluntarioDto;

    const voluntario = this.voluntarioRepository.create({
      nome,
      email,
      senha,
      conselhoRegionalDePsicologia,
      especialidade,
      abordagem,
      experiencia,
      motivacao,
      disponibilidadeSemanal,
      status: true,
      confirmacaoToken: crypto.randomBytes(32).toString('hex'),
      criptografia: await bcrypt.genSalt(),
    });

    voluntario.senha = await this.hashPassword(senha, voluntario.criptografia);

    try {
      await this.voluntarioRepository.save(voluntario);
      delete voluntario.senha;
      delete voluntario.criptografia;
      return voluntario;
    } catch (error) {
      console.error('Erro ao salvar o voluntario:', error);
      if (error.code === '23505') {
        throw new ConflictException('Endereço de email já está em uso');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o voluntario no banco de dados',
        );
      }
    }
  }
  private async hashPassword(
    senha: string,
    criptografia: string,
  ): Promise<string> {
    return bcrypt.hash(senha, criptografia);
  }
}
