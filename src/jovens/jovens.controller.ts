import { Body, Controller, Post, Get } from '@nestjs/common';
import { JovensService } from './jovens.service';
import { CriarJovemDto } from './criar-jovem-dto';
import { promises } from 'dns';
import { RetornarJovemDto } from './retornar-jovem-dto';

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
}
