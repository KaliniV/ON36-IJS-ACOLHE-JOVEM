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
import { ApiTags } from '@nestjs/swagger';
import { JovensService } from 'src/application/services/jovens.service';
import { AtualizarJovemDto } from 'src/application/dtos/atualizar-jovem.dto';
import { Jovem } from 'src/domain/entities/jovem.entity';

@Controller('jovens')
@ApiTags('Jovem')
export class JovensController {
  constructor(private jovensService: JovensService) {}

  @Get()
  async exibirTodos(): Promise<string | Jovem[]> {
    return await this.jovensService.exibirTodos();
  }
  @Get(':id')
  async exibirJovem(@Param('id') id: string) {
    return await this.jovensService.buscarPorId(id);
  }

  @Post('cadastrar-jovem')
  async cadastrarJovem(@Body() cadastrarJovemDto: CadastrarJovemDto) {
    const cadastrado =
      await this.jovensService.cadastrarJovem(cadastrarJovemDto);
    return {
      message: 'Criado com sucesso.',
      id: cadastrado.id,
    };
  }

  @Patch('atualizar-jovem/:id')
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
  async deletarJovem(@Param('id') id: string) {
    const jovemDeletado = await this.jovensService.deletarPorId(id);
    return {
      message: 'Status do jovem atualizado para inativo.',
      status: jovemDeletado.status,
    };
  }
}
