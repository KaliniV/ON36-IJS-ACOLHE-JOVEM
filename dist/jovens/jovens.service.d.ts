import { JovemRepository } from './jovem.repository';
import { CriarJovemDto } from './criar-jovem-dto';
import { Jovem } from './jovem.entity';
import { ValidadorIdade } from './validadores/validador-idade';
export declare class JovensService {
    private readonly jovemRepository;
    private readonly validadorIdade;
    constructor(jovemRepository: JovemRepository, validadorIdade: ValidadorIdade);
    criarJovem(criarJovemDto: CriarJovemDto): Promise<Jovem>;
}
