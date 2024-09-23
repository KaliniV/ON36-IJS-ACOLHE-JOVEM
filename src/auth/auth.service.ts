// import {
//   Injectable,
//   UnauthorizedException,
//   UnprocessableEntityException,
// } from '@nestjs/common';
// import { CredenciaisDto } from 'src/jovens/credenciais-dto';
// import { CriarJovemDto } from 'src/jovens/criar-jovem-dto';
// import { Jovem } from 'src/jovens/jovem.entity';
// import { JovemRepository } from 'src/jovens/jovem.repository';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly jovemRepository: JovemRepository,
//     private jwtService: JwtService,
//   ) {}

//   async signUp(criarJovemDto: CriarJovemDto): Promise<Jovem> {
//     if (criarJovemDto.senha != criarJovemDto.confirmacaoSenha) {
//       throw new UnprocessableEntityException('As senhas não conferem');
//     } else {
//       return await this.jovemRepository.criarJovem(criarJovemDto);
//     }
//   }
//   async signIn(credenciaisDto: CredenciaisDto) {
//     const jovem = await this.jovemRepository.checarCredenciais(credenciaisDto);

//     if (jovem === null) {
//       throw new UnauthorizedException('Credenciais inválidas');
//     }
//     const jwtPayload = {
//       id: jovem.id,
//     };
//     const token = await this.jwtService.sign(jwtPayload);

//     return { token };
//   }
// }
