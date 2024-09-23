import { Body, Controller, Post, Get, Patch, Delete } from '@nestjs/common';
import { JovensService } from './jovens.service';
import { CriarJovemDto } from './criar-jovem-dto';
import { RetornarJovemDto } from './retornar-jovem-dto';
import { CredenciaisDto } from './credenciais-dto';
import { AtualizarJovemDto } from './atualizar-jovem.dto';

@Controller('jovens')
export class JovensController {
  constructor(private jovensService: JovensService) {}

  @Post('criar-jovem')
  async criarJovem(
    @Body() criarJOvemDto: CriarJovemDto,
  ): Promise<RetornarJovemDto> {
    const jovem = await this.jovensService.criarJovem(criarJOvemDto);
    return {
      jovem,
      message: 'Criado com sucesso.',
    };
  }

  @Get('login')
  async exibirPorCredencial(
    @Body() credenciaisDto: CredenciaisDto,
  ): Promise<{ nome: string; email: string; genero: string } | null> {
    const jovem = await this.jovensService.exibirPorCredencial(credenciaisDto);
    return jovem;
  }
  @Patch('atualizar')
  async atualizarPorCredencial(
    @Body() credenciaisDto: CredenciaisDto,
    @Body() atualizarJovemDto: AtualizarJovemDto,
  ) {
    const jovemAtualizado = await this.jovensService.atualizarPorCredencial(
      credenciaisDto,
      atualizarJovemDto,
    );
    return 'Atualizado com sucesso ';
  }
  @Delete('deletar')
  async deletarPorCredencial(
    @Body() credenciaisDto: CredenciaisDto,
  ): Promise<void> {
    return this.jovensService.deletarPorCredencial(credenciaisDto);
  }
}
