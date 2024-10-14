import { CadastrarVoluntarioDto } from 'src/application/dtos/cadastrar-voluntario-dto';
import { Voluntario } from '../entities/voluntario.entity';

export class VoluntarioFactory {
  cadastrar(
    cadastrarVoluntarioDto: CadastrarVoluntarioDto,
    senhaCriptografada: string,
    criptografia: string,
  ): Voluntario {
    const voluntario = new Voluntario();
    voluntario.nome = cadastrarVoluntarioDto.nome;
    voluntario.email = cadastrarVoluntarioDto.email;
    voluntario.senha = senhaCriptografada;
    voluntario.status = true;
    voluntario.criptografia = criptografia;
    voluntario.conselhoRegionalDePsicologia =
      cadastrarVoluntarioDto.conselhoRegionalDePsicologia;
    voluntario.especialidade = cadastrarVoluntarioDto.especialidade;
    voluntario.abordagem = cadastrarVoluntarioDto.abordagem;
    voluntario.experiencia = cadastrarVoluntarioDto.experiencia;
    voluntario.motivacao = cadastrarVoluntarioDto.motivacao;
    voluntario.disponibilidadeSemanal =
      cadastrarVoluntarioDto.disponibilidadeSemanal;
    voluntario.foto = cadastrarVoluntarioDto.foto;

    return voluntario;
  }
}
