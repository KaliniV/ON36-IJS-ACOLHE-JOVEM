import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JovensModule } from './application/jovens.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jovem } from './domain/entities/jovem.entity';
import { JovensController } from './infrastructure/controllers/jovens.controller';

import { VoluntariosController } from './infrastructure/controllers/voluntarios.controller';
import { Voluntario } from 'src/domain/entities/voluntario.entity';
import { VoluntariosModule } from 'src/application/voluntarios.module';
require('dotenv').config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Jovem, Voluntario],
      // esta construindo o banco sem o migration
      synchronize: true,
    }),
    JovensModule,
    VoluntariosModule,
  ],
  controllers: [AppController, JovensController, VoluntariosController],
  providers: [AppService],
})
export class AppModule {}
