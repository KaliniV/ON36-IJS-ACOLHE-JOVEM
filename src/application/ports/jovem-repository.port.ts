import { Jovem } from '../../domain/entities/jovem.entity';

export interface JovemRepositoryPort {
  buscarPorId(id: string): Promise<Jovem | null>;
  salvar(jovem: Jovem): Promise<Jovem>;
  deletarJovem(id: string, status: boolean): Promise<Jovem>;
  exibirJovem(): Promise<Jovem[]>;
}
