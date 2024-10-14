import { Voluntario } from '../../domain/entities/voluntario.entity';

export interface VoluntarioRepositoryPort {
  buscarPorId(id: string): Promise<Voluntario | null>;
  salvar(Voluntario: Voluntario): Promise<Voluntario>;
  deletarVoluntario(id: string, status: boolean): Promise<Voluntario>;
  exibirVoluntarios(): Promise<Voluntario[]>;
}
