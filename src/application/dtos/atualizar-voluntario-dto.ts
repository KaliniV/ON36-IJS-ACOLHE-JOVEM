import { IsOptional, IsString, IsEmail } from 'class-validator';

export class AtualizarVoluntarioDto {
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
  @IsOptional({ message: 'Informe com detalhes sua esperiência' })
  experiencia: string;

  @IsOptional({ message: 'Informe com detalhes sua motivação' })
  motivacao: string;

  @IsOptional({ message: 'Informe sua disponibilidade com "X horas"' })
  disponibilidadeSemanal: string;
}
