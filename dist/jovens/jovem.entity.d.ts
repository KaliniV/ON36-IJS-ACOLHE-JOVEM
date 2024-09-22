import { Genero } from './genero.enum';
export declare class Jovem {
    id: string;
    nome: string;
    email: string;
    status: boolean;
    senha: string;
    genero: Genero;
    dataNascimento: Date;
    criptografia: string;
    confirmacaoToken: string;
    recuperarToken: string;
    criadoEm: Date;
    atualizadoEm: Date;
    checarSenha(senha: string): Promise<boolean>;
}
