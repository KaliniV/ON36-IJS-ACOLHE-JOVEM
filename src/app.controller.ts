import { Controller, Get } from '@nestjs/common';

import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('principal')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Rota inicial - boas vindas' })
  @ApiResponse({ status: 200, description: 'Hello World!' })
  getHello(): string {
    return this.appService.getHello();
  }
}
