import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  NotFoundException,
} from '@nestjs/common';

import { CadastrarJovemDto } from '../../application/dtos/cadastrar-jovem-dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JovensService } from 'src/application/services/jovens.service';
import { AtualizarJovemDto } from 'src/application/dtos/atualizar-jovem.dto';
import { Jovem } from 'src/domain/entities/jovem.entity';

@Controller('jovens')
@ApiTags('Jovem')
export class JovensController {
  constructor(private jovensService: JovensService) {}

  @Post('cadastrar-jovem')
  @ApiOperation({
    summary: 'Cadastra um novo usuário - fornece o ID',
  })
  @ApiOperation({
    summary: 'Atualiza os dados dados do voluntário',
  })
  @ApiResponse({
    status: 201,
    description: 'Mensagem de cadastrado com sucesso + id',
    type: Jovem,
  })
  async cadastrarJovem(@Body() cadastrarJovemDto: CadastrarJovemDto) {
    const cadastrado =
      await this.jovensService.cadastrarJovem(cadastrarJovemDto);
    return {
      message: 'Criado com sucesso.',
      id: cadastrado.id,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Visualiza os dados do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Dados do usuário com senha criptografada',
  })
  async exibirJovem(@Param('id') id: string) {
    return await this.jovensService.buscarPorId(id);
  }

  @Patch('atualizar-jovem/:id')
  @ApiOperation({
    summary: 'Atualiza os dados do usuário',
  })
  @ApiResponse({
    status: 200,
    description: 'Mensagem de modificado com sucesso + dados atualizados',
    type: Jovem,
  })
  async atualizarJovemPorId(
    @Param('id') id: string,
    @Body() atualizarJovemDto: AtualizarJovemDto,
  ) {
    const jovemAtualizado = await this.jovensService.atualizarJovemPorId(
      id,
      atualizarJovemDto,
    );
    if (!jovemAtualizado) {
      throw new NotFoundException('Jovem não encontrado.');
    }

    return {
      message: 'atualizado com sucesso.',
      jovem: jovemAtualizado,
    };
  }

  @Delete('deletar-jovem/:id')
  @ApiOperation({
    summary: 'Altera o status do usuário - status=false',
  })
  @ApiResponse({
    status: 200,
    description: 'Mensagem de deletado com sucesso',
  })
  async deletarJovem(@Param('id') id: string) {
    const jovemDeletado = await this.jovensService.deletarPorId(id);
    return {
      message: 'Status do jovem atualizado para inativo.',
      status: jovemDeletado.status,
    };
  }
}
