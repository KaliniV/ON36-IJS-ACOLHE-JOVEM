import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VoluntarioRepositoryPort } from '../../application/ports/voluntario-repository.port';
import { Voluntario } from 'src/domain/entities/voluntario.entity';
Injectable();
export class VoluntarioRepository implements VoluntarioRepositoryPort {
  constructor(
    @InjectRepository(Voluntario)
    private readonly voluntarioRepository: Repository<Voluntario>,
  ) {}

  async salvar(voluntario: Voluntario): Promise<Voluntario> {
    return await this.voluntarioRepository.save(voluntario);
  }

  async exibirVoluntarios(): Promise<Voluntario[]> {
    return await this.voluntarioRepository.find();
  }
  async buscarPorId(id: string): Promise<Voluntario | null> {
    return await this.voluntarioRepository.findOne({
      where: { id, status: true },
    });
  }
  async deletarVoluntario(id: string, status: boolean): Promise<Voluntario> {
    const voluntario = await this.voluntarioRepository.findOne({
      where: { id },
    });

    if (!voluntario) {
      throw new NotFoundException('voluntario não encontrado.');
    }

    voluntario.status = status;
    return await this.voluntarioRepository.save(voluntario);
  }
}
