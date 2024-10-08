import {
  IsDate,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Genero } from './genero.enum';
import { Type } from 'class-transformer';

export class CriarJovemDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  senha: string;

  @IsNotEmpty()
  @IsString()
  confirmacaoSenha: string;

  @IsNotEmpty()
  @IsEnum(Genero)
  genero: Genero;

  @IsNotEmpty()
  @IsString()
  @IsDateString()
  @Type(() => String)
  dataNascimento: string;
}
