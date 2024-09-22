// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { PassportStrategy } from '@nestjs/passport';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Strategy, ExtractJwt } from 'passport-jwt';
// import { Jovem } from 'src/jovens/jovem.entity';
// import { JovemRepository } from 'src/jovens/jovem.repository';
// import { Repository } from 'typeorm';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(
//     private readonly configService: ConfigService,
//     @InjectRepository(Repository)
//     private readonly JovemRepository: Repository<Jovem>,
//   ) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: configService.get<string>('JWT_SECRET'), // Pegue o segredo do ConfigService
//     });
//   }

//   async validate(payload: { id: number }) {
//     const { id } = payload;

//     const user = await this.JovemRepository.findOne({
//       where: { id: id.toString() }, // Use um objeto com a condição de busca
//       select: ['nome', 'email', 'status', 'genero'], // Certifique-se de que os nomes dos campos estão corretos
//     });

//     if (!user) {
//       throw new UnauthorizedException('Usuário não encontrado');
//     }

//     return user;
//   }
// }
