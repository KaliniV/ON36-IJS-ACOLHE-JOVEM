import { IsOptional, IsString, IsEmail } from 'class-validator';

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
  status: boolean;
}
