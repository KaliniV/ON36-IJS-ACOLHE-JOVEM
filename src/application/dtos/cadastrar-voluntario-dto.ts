import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Abordagem } from 'src/domain/enums/abordagem.enum';
import { Especialidade } from 'src/domain/enums/especialidade.enum';

export class CadastrarVoluntarioDto {
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

  @ApiProperty()
  @IsNotEmpty({ message: 'Informe os 7 números do CRP' })
  conselhoRegionalDePsicologia: string;

  @ApiProperty({ enum: Especialidade, enumName: 'especialidade' })
  @IsNotEmpty({ message: 'Informe a especialidade' })
  especialidade: Especialidade;

  @ApiProperty({ enum: Abordagem, enumName: 'Abordagem' })
  @IsNotEmpty({ message: 'Informe a abordagem terapêutica' })
  abordagem: Abordagem;

  @ApiProperty()
  @IsNotEmpty({ message: 'Informe com detalhes sua esperiência' })
  experiencia: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Informe com detalhes sua motivação' })
  motivacao: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Informe sua disponibilidade com "X horas"' })
  disponibilidadeSemanal: string;

  @ApiProperty()
  @IsString()
  foto: string;
}
