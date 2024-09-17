import { Repository } from 'typeorm';
import { Jovem } from './jovem.entity';
import { CriarJovemDto } from './criar-jovem-dto';
export declare class JovemRepository {
    private readonly jovemRepository;
    constructor(jovemRepository: Repository<Jovem>);
    criarJovem(criarJovemDto: CriarJovemDto): Promise<Jovem>;
    private hashPassword;
}
