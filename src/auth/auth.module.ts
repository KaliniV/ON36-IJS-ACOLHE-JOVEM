// import { Module } from '@nestjs/common';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { JovemRepository } from 'src/jovens/jovem.repository';
// import { JwtModule, JwtService } from '@nestjs/jwt';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { JovensModule } from 'src/jovens/jovens.module';
// import { JwtStrategy } from './jwt.strategy';
// import { PassportModule } from '@nestjs/passport';
// @Module({
//   imports: [
//     PassportModule.register({ defaultStrategy: 'jwt' }), // Importa o PassportModule
//     TypeOrmModule.forFeature([JovemRepository]),
//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (configService: ConfigService) => ({
//         secret: configService.get<string>('JWT_SECRET'),
//         signOptions: {
//           expiresIn: 18000,
//         },
//       }),
//     }),
//     ConfigModule,
//     JovensModule,
//   ],
//   controllers: [AuthController],
//   providers: [AuthService, JwtStrategy],
//   exports: [JwtStrategy, PassportModule],
// })
// export class AuthModule {}
