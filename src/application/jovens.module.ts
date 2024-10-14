import { Module } from '@nestjs/common';
import { Jovem } from '../domain/entities/jovem.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JovensService } from '../application/services/jovens.service';
import { JovemRepository } from '../infrastructure/repositories/jovem.repository';
import { ValidadorIdade } from '../validadores/validador-idade';
import { JovemFactory } from '../domain/factorys/jovem-factory';
@Module({
  imports: [TypeOrmModule.forFeature([Jovem])],
  providers: [
    JovensService,
    ValidadorIdade,
    JovemFactory,
    {
      provide: 'JovemRepositoryPort',
      useClass: JovemRepository,
    },
  ],
  exports: [JovensService],
})
export class JovensModule {}
