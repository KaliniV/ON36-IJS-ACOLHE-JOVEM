import { Jovem } from '../entities/jovem.entity';
import { CadastrarJovemDto } from '../../application/dtos/cadastrar-jovem-dto';

export class JovemFactory {
  cadastrar(
    cadastrarJovemDto: CadastrarJovemDto,
    senhaCriptografada: string,
    criptografia: string,
  ): Jovem {
    const jovem = new Jovem();
    jovem.nome = cadastrarJovemDto.nome;
    jovem.email = cadastrarJovemDto.email;
    jovem.senha = senhaCriptografada;
    jovem.genero = cadastrarJovemDto.genero;
    jovem.dataNascimento = new Date(cadastrarJovemDto.dataNascimento);
    jovem.status = true;
    jovem.criptografia = criptografia;

    return jovem;
  }
}
