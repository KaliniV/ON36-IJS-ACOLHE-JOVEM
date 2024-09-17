import { Module } from '@nestjs/common';
import { ValidadorIdade } from './validador-idade';

@Module({
  providers: [ValidadorIdade],
  exports: [ValidadorIdade], // Exporta o provider para que outros módulos possam usá-lo
})
export class ValidadorIdadeModule {}