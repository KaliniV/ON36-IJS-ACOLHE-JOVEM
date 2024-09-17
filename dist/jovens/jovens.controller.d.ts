import { JovensService } from './jovens.service';
import { CriarJovemDto } from './criar-jovem-dto';
import { RetornarJovemDto } from './retornar-jovem-dto';
export declare class JovensController {
    private jovensService;
    constructor(jovensService: JovensService);
    criarJovem(criarJOvemDto: CriarJovemDto): Promise<RetornarJovemDto>;
}
