import { JovemRepository } from './jovem.repository';
import { CriarJovemDto } from './criar-jovem-dto';
import { Jovem } from './jovem.entity';
import { ValidadorIdade } from './validadores/validador-idade';
import { CredenciaisDto } from './credenciais-dto';
import { AtualizarJovemDto } from './atualizar-jovem.dto';
export declare class JovensService {
    private readonly jovemRepository;
    private readonly validadorIdade;
    constructor(jovemRepository: JovemRepository, validadorIdade: ValidadorIdade);
    criarJovem(criarJovemDto: CriarJovemDto): Promise<Jovem>;
    exibirPorCredencial(credenciaisDto: CredenciaisDto): Promise<{
        nome: string;
        email: string;
        genero: string;
    } | null>;
    atualizarPorCredencial(credenciaisDto: CredenciaisDto, atualizarJovemDto: AtualizarJovemDto): Promise<Jovem>;
    deletarPorCredencial(credenciaisDto: CredenciaisDto): Promise<void>;
}
