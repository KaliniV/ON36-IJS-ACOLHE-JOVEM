import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail } from 'class-validator';

export class AtualizarVoluntarioDto {
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
  status: boolean;
  @IsOptional({ message: 'Informe com detalhes sua esperiência' })
  experiencia: string;

  @ApiProperty()
  @IsOptional({ message: 'Informe com detalhes sua motivação' })
  motivacao: string;

  @ApiProperty()
  @IsOptional({ message: 'Informe sua disponibilidade com "X horas"' })
  disponibilidadeSemanal: string;
}
