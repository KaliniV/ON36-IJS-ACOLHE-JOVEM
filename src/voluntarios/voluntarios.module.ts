import { Module } from '@nestjs/common';
import { Voluntario } from './voluntario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoluntariosService } from './voluntarios.service';
import { VoluntariosController } from './voluntarios.controller';
import { VoluntarioRepository } from './voluntario.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Voluntario])],
  providers: [VoluntarioRepository],
  exports: [VoluntarioRepository],
})
export class VoluntariosModule {}
