import { Module, Controller } from '@nestjs/common';
import { Jovem } from './jovem.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JovensService } from './jovens.service';
import { JovensController } from './jovens.controller';
import { JovemRepository } from './jovem.repository';
import { ValidadorIdadeModule } from './validadores/validador-idade.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Jovem]),
    ValidadorIdadeModule
  ],
  controllers: [JovensController],
  providers: [
    JovensService,
    JovemRepository, // Registra o repositório customizado como um provider
  ],
  exports: [JovensService],
})
export class JovensModule {}