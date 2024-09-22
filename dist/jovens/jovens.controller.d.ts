import { JovensService } from './jovens.service';
import { CriarJovemDto } from './criar-jovem-dto';
import { RetornarJovemDto } from './retornar-jovem-dto';
import { CredenciaisDto } from './credenciais-dto';
import { AtualizarJovemDto } from './atualizar-jovem.dto';
export declare class JovensController {
    private jovensService;
    constructor(jovensService: JovensService);
    criarJovem(criarJOvemDto: CriarJovemDto): Promise<RetornarJovemDto>;
    exibirPorCredencial(credenciaisDto: CredenciaisDto): Promise<{
        nome: string;
        email: string;
        genero: string;
    } | null>;
    atualizarPorCredencial(credenciaisDto: CredenciaisDto, atualizarJovemDto: AtualizarJovemDto): Promise<string>;
    deletarPorCredencial(credenciaisDto: CredenciaisDto): Promise<void>;
}
