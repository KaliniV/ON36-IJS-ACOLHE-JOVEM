import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { VoluntarioRepository } from './voluntario.repository';
import { Voluntario } from './voluntario.entity';
import { CriarVoluntarioDto } from './criar-voluntario-dto';

@Injectable()
export class VoluntariosService {
  constructor(private readonly voluntarioRepository: VoluntarioRepository) {}

  async criarVoluntario(
    criarVoluntarioDto: CriarVoluntarioDto,
  ): Promise<Voluntario> {
    if (criarVoluntarioDto.senha !== criarVoluntarioDto.confirmacaoSenha) {
      throw new UnprocessableEntityException('As senhas não conferem.');
    }
    return this.voluntarioRepository.criarVoluntario({
      ...criarVoluntarioDto,
    });
  }
}
