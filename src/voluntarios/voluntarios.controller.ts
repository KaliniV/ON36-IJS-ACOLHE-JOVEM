import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CriarVoluntarioDto } from './criar-voluntario-dto';
import { RetornarVoluntarioDto } from './retornar-voluntario-dto';
import { VoluntariosService } from './voluntarios.service';

@Controller('voluntarios')
export class VoluntariosController {
  constructor(private voluntariosService: VoluntariosService) {}

  @Post('criar-voluntario')
  async criarVoluntario(
    @Body(ValidationPipe) criarVoluntarioDto: CriarVoluntarioDto,
  ): Promise<RetornarVoluntarioDto> {
    const jovem =
      await this.voluntariosService.criarVoluntario(criarVoluntarioDto);
    return {
      jovem,
      mensagem: 'Voluntario Criado com sucesso.',
    };
  }
}
