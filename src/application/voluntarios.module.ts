import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoluntarioRepositoryPort } from './ports/voluntario-repository.port';
import { Voluntario } from 'src/domain/entities/voluntario.entity';
import { VoluntarioFactory } from 'src/domain/factorys/voluntario-factory';
import { VoluntarioRepository } from 'src/infrastructure/repositories/voluntario.repository';
import { VoluntariosService } from './services/voluntarios.service';

@Module({
  imports: [TypeOrmModule.forFeature([Voluntario])],
  providers: [
    VoluntariosService,
    VoluntarioFactory,
    {
      provide: 'VoluntarioRepositoryPort',
      useClass: VoluntarioRepository,
    },
  ],
  exports: [VoluntariosService],
})
export class VoluntariosModule {}
