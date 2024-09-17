import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JovemRepository } from './jovem.repository';
import { CriarJovemDto } from './criar-jovem-dto';
import { Jovem } from './jovem.entity';
import { Repository } from 'typeorm';
import { ValidadorIdade } from './validadores/validador-idade';

@Injectable()
export class JovensService {
  constructor(
    private readonly jovemRepository: JovemRepository,
    private readonly validadorIdade: ValidadorIdade,
  ) {}

  async criarJovem(criarJovemDto: CriarJovemDto): Promise<Jovem> {
    // Converta a string ISO para um objeto Date
    const dataNascimento = new Date(criarJovemDto.dataNascimento);

    // Valide a idade usando o objeto Date
    this.validadorIdade.validarIdade(dataNascimento);

    if (criarJovemDto.senha !== criarJovemDto.confirmacaoSenha) {
      throw new UnprocessableEntityException('As senhas não conferem.');
    }

    return this.jovemRepository.criarJovem({
      ...criarJovemDto,
      dataNascimento: dataNascimento.toISOString(), 
    });
  }
}
