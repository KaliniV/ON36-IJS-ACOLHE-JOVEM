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
  @IsNotEmpty({ message: 'Informe o nome do usuário' })
  @IsString()
  nome: string;

  @IsNotEmpty({ message: 'Informe um endereço de email' })
  @IsEmail({}, { message: 'Informe um endereço de email válido' })
  @MaxLength(200, {
    message: 'O endereço de email deve ter menos de 200 caracteres',
  })
  @IsString()
  email: string;

  @IsNotEmpty({ message: 'Informe uma senha' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @IsString()
  senha: string;

  @IsNotEmpty({ message: 'Informe a confirmação de senha' })
  @MinLength(6, {
    message: 'A confirmação de senha deve ter no mínimo 6 caracteres',
  })
  @IsString()
  confirmacaoSenha: string;

  @IsNotEmpty({ message: 'Informe os 7 números do CRP' })
  conselhoRegionalDePsicologia: string;

  @IsNotEmpty({ message: 'Informe a especialidade' })
  especialidade: Especialidade;

  @IsNotEmpty({ message: 'Informe a abordagem terapêutica' })
  abordagem: Abordagem;

  @IsNotEmpty({ message: 'Informe com detalhes sua esperiência' })
  experiencia: string;

  @IsNotEmpty({ message: 'Informe com detalhes sua motivação' })
  motivacao: string;

  @IsNotEmpty({ message: 'Informe sua disponibilidade com "X horas"' })
  disponibilidadeSemanal: string;

  @IsString()
  foto: string;
}
