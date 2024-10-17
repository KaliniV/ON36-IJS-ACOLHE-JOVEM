import {
  IsDate,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Genero } from '../../domain/enums/genero.enum';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CadastrarJovemDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Informe o nome do usuário' })
  @IsString()
  nome: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Informe um endereço de email' })
  @IsEmail({}, { message: 'Informe um endereço de email válido' })
  @MaxLength(200, {
    message: 'O endereço de email deve ter menos de 200 caracteres',
  })
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Informe uma senha' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @IsString()
  senha: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Informe a confirmação de senha' })
  @MinLength(6, {
    message: 'A confirmação de senha deve ter no mínimo 6 caracteres',
  })
  @IsString()
  confirmacaoSenha: string;

  @ApiProperty({ enum: Genero, enumName: 'Genero' })
  @IsNotEmpty()
  @IsEnum(Genero)
  genero: Genero;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDateString()
  @Type(() => String)
  dataNascimento: string;
}
