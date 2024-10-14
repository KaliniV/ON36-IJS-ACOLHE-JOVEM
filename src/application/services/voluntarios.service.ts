import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { VoluntarioFactory } from '../../domain/factorys/voluntario-factory';
import * as bcrypt from 'bcrypt';
import { AtualizarVoluntarioDto } from '../dtos/atualizar-voluntario-dto';
import { VoluntarioRepositoryPort } from '../ports/voluntario-repository.port';
import { Voluntario } from 'src/domain/entities/voluntario.entity';
import { CadastrarVoluntarioDto } from '../dtos/cadastrar-voluntario-dto';

@Injectable()
export class VoluntariosService {
  constructor(
    @Inject('VoluntarioRepositoryPort')
    private readonly voluntarioRepository: VoluntarioRepositoryPort,
    private readonly voluntarioFactory: VoluntarioFactory,
  ) {}

  async cadastrarVoluntario(
    cadastrarVoluntarioDto: CadastrarVoluntarioDto,
  ): Promise<Voluntario> {
    if (
      cadastrarVoluntarioDto.senha !== cadastrarVoluntarioDto.confirmacaoSenha
    ) {
      throw new UnprocessableEntityException('As senhas não conferem.');
    }
    const criptografia = await bcrypt.genSalt();
    const senhaCriptografada = await this.hashPassword(
      cadastrarVoluntarioDto.senha,
      criptografia,
    );

    const novoJovem = this.voluntarioFactory.cadastrar(
      cadastrarVoluntarioDto,
      senhaCriptografada,
      criptografia,
    );
    try {
      const voluntarioSalvo = await this.voluntarioRepository.salvar(novoJovem);
      return voluntarioSalvo;
    } catch (error) {
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

  async exibirTodos(): Promise<Voluntario[]> {
    return await this.voluntarioRepository.exibirVoluntarios();
  }

  async atualizarVoluntarioPorId(
    id: string,
    atualizarVoluntarioDto: AtualizarVoluntarioDto,
  ): Promise<Voluntario> {
    const voluntario = await this.voluntarioRepository.buscarPorId(id);

    if (!voluntario) {
      throw new NotFoundException('Voluntario não encontrado.');
    }

    Object.assign(voluntario, atualizarVoluntarioDto);
    return await this.voluntarioRepository.salvar(voluntario);
  }

  async deletarPorId(id: string): Promise<Voluntario> {
    const voluntario = await this.voluntarioRepository.deletarVoluntario(
      id,
      false,
    );
    if (!voluntario) {
      throw new NotFoundException('Voluntario não encontrado.');
    }
    return voluntario;
  }
}
