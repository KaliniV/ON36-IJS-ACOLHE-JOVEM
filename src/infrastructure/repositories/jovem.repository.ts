import { Repository } from 'typeorm';
import { Jovem } from '../../domain/entities/jovem.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { JovemRepositoryPort } from '../../application/ports/jovem-repository.port';

@Injectable()
export class JovemRepository implements JovemRepositoryPort {
  constructor(
    @InjectRepository(Jovem)
    private readonly jovemRepository: Repository<Jovem>,
  ) {}
  async exibirJovem(): Promise<Jovem[]> {
    return await this.jovemRepository.find();
  }

  async buscarPorId(id: string): Promise<Jovem | null> {
    return await this.jovemRepository.findOne({
      where: { id, status: true },
    });
  }
  async salvar(jovem: Jovem): Promise<Jovem> {
    return await this.jovemRepository.save(jovem);
  }

  async deletarJovem(id: string, status: boolean): Promise<Jovem> {
    const jovem = await this.jovemRepository.findOne({ where: { id } });

    if (!jovem) {
      throw new NotFoundException('Jovem não encontrado.');
    }

    jovem.status = status;
    return await this.jovemRepository.save(jovem);
  }
}
