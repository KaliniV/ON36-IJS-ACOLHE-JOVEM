import { Module } from '@nestjs/common';
import { ValidadorIdade } from './validador-idade';

@Module({
  providers: [ValidadorIdade],
  exports: [ValidadorIdade],
})
export class ValidadorIdadeModule {}
