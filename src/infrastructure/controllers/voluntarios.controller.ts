import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { VoluntariosService } from '../../application/services/voluntarios.service';
import { AtualizarVoluntarioDto } from '../../application/dtos/atualizar-voluntario-dto';
import { CadastrarVoluntarioDto } from 'src/application/dtos/cadastrar-voluntario-dto';
import { Voluntario } from 'src/domain/entities/voluntario.entity';
import { ApiTags } from '@nestjs/swagger';
@Controller('voluntarios')
@ApiTags('Voluntário')
export class VoluntariosController {
  constructor(private voluntariosService: VoluntariosService) {}

  @Get()
  async listarTodos(): Promise<string | Voluntario[]> {
    return this.voluntariosService.exibirTodos();
  }

  @Post('/cadastrar-voluntario')
  async cadastrarVoluntario(
    @Body() cadastrarVoluntarioDto: CadastrarVoluntarioDto,
  ) {
    const cadastrado = await this.voluntariosService.cadastrarVoluntario(
      cadastrarVoluntarioDto,
    );
    return {
      mensagem: 'Voluntário criado com sucesso, esse ID é único.',
      id: cadastrado.id,
    };
  }
  @Patch('atualizar-voluntario/:id')
  async atualizarVoluntarioPorId(
    @Param('id') id: string,
    @Body() atualizarVoluntarioDto: AtualizarVoluntarioDto,
  ) {
    const voluntarioAtualizado =
      await this.voluntariosService.atualizarVoluntarioPorId(
        id,
        atualizarVoluntarioDto,
      );
    if (!voluntarioAtualizado) {
      throw new NotFoundException('Voluntário não encontrado.');
    }

    return {
      message: 'atualizado com sucesso.',
      voluntario: voluntarioAtualizado,
    };
  }

  @Delete('deletar-voluntario/:id')
  async deletarPorCredencial(@Param('id') id: string) {
    const voluntarioDeletado = await this.voluntariosService.deletarPorId(id);
    return {
      message: 'Status do voluntário atualizado para inativo.',
      status: voluntarioDeletado.status,
    };
  }
}
