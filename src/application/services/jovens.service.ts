import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CadastrarJovemDto } from '../dtos/cadastrar-jovem-dto';
import { Jovem } from '../../domain/entities/jovem.entity';
import { ValidadorIdade } from '../../validadores/validador-idade';
import { AtualizarJovemDto } from '../dtos/atualizar-jovem.dto';
import * as bcrypt from 'bcrypt';
import { JovemRepositoryPort } from '../ports/jovem-repository.port';
import { JovemFactory } from '../../domain/factorys/jovem-factory';

@Injectable()
export class JovensService {
  constructor(
    @Inject('JovemRepositoryPort')
    private readonly jovemRepository: JovemRepositoryPort,
    private readonly validadorIdade: ValidadorIdade,
    private readonly jovemFactory: JovemFactory,
  ) {}

  async cadastrarJovem(cadastrarJovemDto: CadastrarJovemDto): Promise<Jovem> {
    this.validadorIdade.validarIdade(
      new Date(cadastrarJovemDto.dataNascimento),
    );

    if (cadastrarJovemDto.senha !== cadastrarJovemDto.confirmacaoSenha) {
      throw new UnprocessableEntityException('As senhas não conferem.');
    }

    const criptografia = await bcrypt.genSalt();
    const senhaCriptografada = await this.hashPassword(
      cadastrarJovemDto.senha,
      criptografia,
    );

    const novoJovem = this.jovemFactory.cadastrar(
      cadastrarJovemDto,
      senhaCriptografada,
      criptografia,
    );

    try {
      const jovemSalvo = await this.jovemRepository.salvar(novoJovem);
      return jovemSalvo;
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

  private async hashPassword(senha: string, salt: string): Promise<string> {
    return bcrypt.hash(senha, salt);
  }

  async exibirTodos(): Promise<Jovem[]> {
    return await this.jovemRepository.exibirJovem();
  }
  async atualizarJovemPorId(
    id: string,
    atualizarJovemDto: AtualizarJovemDto,
  ): Promise<Jovem> {
    const jovem = await this.jovemRepository.buscarPorId(id);

    if (!jovem) {
      throw new NotFoundException('Jovem não encontrado.');
    }

    Object.assign(jovem, atualizarJovemDto);
    return await this.jovemRepository.salvar(jovem);
  }

  async buscarPorId(id: string): Promise<Jovem> {
    const jovem = await this.jovemRepository.buscarPorId(id);
    if (!jovem) {
      throw new NotFoundException('Jovem não encontrado.');
    }
    return jovem;
  }
  async deletarPorId(id: string): Promise<Jovem> {
    const jovem = await this.jovemRepository.deletarJovem(id, false);
    if (!jovem) {
      throw new NotFoundException('Jovem não encontrado.');
    }
    return jovem;
  }
}
