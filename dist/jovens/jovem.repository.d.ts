import { Repository } from 'typeorm';
import { Jovem } from './jovem.entity';
import { CriarJovemDto } from './criar-jovem-dto';
import { CredenciaisDto } from './credenciais-dto';
export declare class JovemRepository {
    private readonly jovemRepository;
    constructor(jovemRepository: Repository<Jovem>);
    criarJovem(criarJovemDto: CriarJovemDto): Promise<Jovem>;
    exibirPorCredencial(credenciaisDto: CredenciaisDto): Promise<{
        nome: string;
        email: string;
        genero: string;
    } | null>;
    findByEmail(email: string): Promise<Jovem | null>;
    save(jovem: Jovem): Promise<Jovem>;
    delete(id: string): Promise<void>;
    private hashPassword;
}
