import { IsOptional, IsString, IsEmail } from 'class-validator';
import { Genero } from '../../domain/enums/genero.enum';
import { ApiProperty } from '@nestjs/swagger';

export class AtualizarJovemDto {
  @ApiProperty()
  @IsOptional()
  @IsString({
    message: 'Informe um nome de usuário válido',
  })
  nome: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail(
    {},
    {
      message: 'Informe um endereço de email válido',
    },
  )
  email: string;

  @ApiProperty()
  @IsOptional()
  genero: Genero;
}
