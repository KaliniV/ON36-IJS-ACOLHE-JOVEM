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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@Controller('voluntarios')
@ApiTags('Voluntário')
export class VoluntariosController {
  constructor(private voluntariosService: VoluntariosService) {}

  @Post('/cadastrar-voluntario')
  @ApiOperation({
    summary: 'Cadastra um novo profissional voluntariado - fornece o ID',
  })
  @ApiResponse({
    status: 201,
    description: 'Mensagem de cadastrado com sucesso + id',
    type: Voluntario,
  })
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

  @Get()
  @ApiOperation({ summary: 'Visualização de voluntários disponíveis' })
  @ApiResponse({
    status: 200,
    description: 'Lista de profissionais disponíveis (status=true)',
  })
  async listarTodos(): Promise<string | Voluntario[]> {
    return this.voluntariosService.exibirTodos();
  }

  @Patch('atualizar-voluntario/:id')
  @ApiOperation({
    summary: 'Atualiza os dados dados do voluntário',
  })
  @ApiResponse({
    status: 200,
    description: 'Mensagem de modificado com sucesso + dados atualizados',
    type: Voluntario,
  })
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
  @ApiOperation({
    summary: 'Altera o status do usuário - status=false',
  })
  @ApiResponse({
    status: 200,
    description: 'Mensagem de deletado com sucesso',
  })
  async deletarPorCredencial(@Param('id') id: string) {
    const voluntarioDeletado = await this.voluntariosService.deletarPorId(id);
    return {
      message: 'Status do voluntário atualizado para inativo.',
      status: voluntarioDeletado.status,
    };
  }
}
