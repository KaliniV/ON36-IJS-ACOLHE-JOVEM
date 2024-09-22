import { Module } from '@nestjs/common';
import { Jovem } from './jovem.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JovensService } from './jovens.service';
import { JovemRepository } from './jovem.repository';
import { ValidadorIdade } from './validadores/validador-idade';
@Module({
  imports: [TypeOrmModule.forFeature([Jovem])],
  providers: [JovemRepository, JovensService, ValidadorIdade],
  exports: [JovensService, JovemRepository],
})
export class JovensModule {}
