import { Repository } from 'typeorm';
import { Jovem } from './jovem.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CriarJovemDto } from './criar-jovem-dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { CredenciaisDto } from './credenciais-dto';

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

  async exibirPorCredencial(
    credenciaisDto: CredenciaisDto,
  ): Promise<{ nome: string; email: string; genero: string } | null> {
    const { email, senha } = credenciaisDto;

    const jovem = await this.jovemRepository.findOne({
      where: { email, status: true },
    });

    if (jovem && (await jovem.checarSenha(senha))) {
      return { nome: jovem.nome, email: jovem.email, genero: jovem.genero };
    }
    return null;
  }
  async findByEmail(email: string): Promise<Jovem | null> {
    return await this.jovemRepository.findOne({
      where: { email, status: true },
    });
  }
  async save(jovem: Jovem): Promise<Jovem> {
    return await this.jovemRepository.save(jovem);
  }

  async delete(id: string): Promise<void> {
    await this.jovemRepository.delete(id);
  }
  private async hashPassword(
    senha: string,
    criptografia: string,
  ): Promise<string> {
    return bcrypt.hash(senha, criptografia);
  }
}
