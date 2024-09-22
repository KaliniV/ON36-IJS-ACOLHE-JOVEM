// import {
//   Body,
//   Controller,
//   Get,
//   Post,
//   Req,
//   UseGuards,
//   ValidationPipe,
// } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { CriarJovemDto } from 'src/jovens/criar-jovem-dto';
// import { CredenciaisDto } from 'src/jovens/credenciais-dto';
// import { AuthGuard } from '@nestjs/passport';
// import { Jovem } from 'src/jovens/jovem.entity';
// import { GetJovem } from './get-jovem.decorator';

// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   @Post('/signup')
//   async signUp(
//     @Body(ValidationPipe) criarJovemDto: CriarJovemDto,
//   ): Promise<{ mensagem: string }> {
//     await this.authService.signUp(criarJovemDto);
//     return {
//       mensagem: 'Cadastro realizado com sucesso',
//     };
//   }
//   @Post('/signin')
//   async signIn(
//     @Body(ValidationPipe) credenciaisDto: CredenciaisDto,
//   ): Promise<{ token: string }> {
//     return await this.authService.signIn(credenciaisDto);
//   }
//   @Get('/me')
//   @UseGuards(AuthGuard())
//   getMe(@GetJovem() jovem: Jovem): Jovem {
//     return jovem;
//   }
// }
