import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JovemRepository } from './jovem.repository';
import { CriarJovemDto } from './criar-jovem-dto';
import { Jovem } from './jovem.entity';
import { ValidadorIdade } from './validadores/validador-idade';
import { CredenciaisDto } from './credenciais-dto';
import { AtualizarJovemDto } from './atualizar-jovem.dto';

@Injectable()
export class JovensService {
  constructor(
    private readonly jovemRepository: JovemRepository,
    private readonly validadorIdade: ValidadorIdade,
  ) {}

  async criarJovem(criarJovemDto: CriarJovemDto): Promise<Jovem> {
    const dataNascimento = new Date(criarJovemDto.dataNascimento);
    this.validadorIdade.validarIdade(dataNascimento);

    if (criarJovemDto.senha !== criarJovemDto.confirmacaoSenha) {
      throw new UnprocessableEntityException('As senhas não conferem.');
    }
    return this.jovemRepository.criarJovem({
      ...criarJovemDto,
      dataNascimento: dataNascimento.toISOString(),
    });
  }

  async exibirPorCredencial(
    credenciaisDto: CredenciaisDto,
  ): Promise<{ nome: string; email: string; genero: string } | null> {
    return this.jovemRepository.exibirPorCredencial(credenciaisDto);
  }
  async atualizarPorCredencial(
    credenciaisDto: CredenciaisDto,
    atualizarJovemDto: AtualizarJovemDto,
  ): Promise<Jovem> {
    const { email, senha } = credenciaisDto;

    const jovem =
      await this.jovemRepository.exibirPorCredencial(credenciaisDto);
    if (!jovem) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const jovemParaAtualizar = await this.jovemRepository.findByEmail(email);

    const { nome, status } = atualizarJovemDto;
    jovemParaAtualizar.nome = nome ? nome : jovemParaAtualizar.nome;
    jovemParaAtualizar.status =
      status === undefined ? jovemParaAtualizar.status : status;

    try {
      await this.jovemRepository.save(jovemParaAtualizar);
      return jovemParaAtualizar;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao salvar os dados');
    }
  }
  async deletarPorCredencial(credenciaisDto: CredenciaisDto): Promise<void> {
    const { email, senha } = credenciaisDto;

    // Verifica se as credenciais são válidas
    const jovem =
      await this.jovemRepository.exibirPorCredencial(credenciaisDto);
    if (!jovem) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Buscar jovem pelo email
    const jovemParaDeletar = await this.jovemRepository.findByEmail(email);

    try {
      await this.jovemRepository.delete(jovemParaDeletar.id);
    } catch (error) {
      throw new InternalServerErrorException('Erro ao deletar os dados');
    }
  }
}
