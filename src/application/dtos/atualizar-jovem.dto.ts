import { IsOptional, IsString, IsEmail } from 'class-validator';
import { Genero } from '../../domain/enums/genero.enum';

export class AtualizarJovemDto {
  @IsOptional()
  @IsString({
    message: 'Informe um nome de usuário válido',
  })
  nome: string;

  @IsOptional()
  @IsEmail(
    {},
    {
      message: 'Informe um endereço de email válido',
    },
  )
  email: string;

  @IsOptional()
  genero: Genero;
}
