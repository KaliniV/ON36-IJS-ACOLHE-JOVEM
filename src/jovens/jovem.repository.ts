import { Repository } from 'typeorm';
import { Jovem } from './jovem.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CriarJovemDto } from './criar-jovem-dto';
import { Genero } from './genero.enum';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { ValidadorIdade } from './validadores/validador-idade';

@Injectable()
export class JovemRepository {
  constructor(
    @InjectRepository(Jovem)
    private readonly jovemRepository: Repository<Jovem>,
  ) {}

  async criarJovem(criarJovemDto: CriarJovemDto): Promise<Jovem> {
    const { nome, email, senha, genero, dataNascimento } = criarJovemDto;

    const jovem = this.jovemRepository.create({
      nome,
      email,
      senha,
      genero,
      dataNascimento: new Date(dataNascimento),
      status: true,
      confirmacaoToken: crypto.randomBytes(32).toString('hex'),
      criptografia: await bcrypt.genSalt(),
    });

    jovem.senha = await this.hashPassword(senha, jovem.criptografia);

    try {
      await this.jovemRepository.save(jovem);
      delete jovem.senha;
      delete jovem.criptografia;
      return jovem;
    } catch (error) {
      console.error('Erro ao salvar o jovem:', error);
      if (error.code === '23505') {
        throw new ConflictException('Endereço de email já está em uso');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o jovem no banco de dados',
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
