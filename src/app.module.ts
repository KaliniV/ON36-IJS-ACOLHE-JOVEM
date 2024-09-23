import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JovensModule } from './jovens/jovens.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jovem } from './jovens/jovem.entity';
import { JovensController } from './jovens/jovens.controller';
import { VoluntariosModule } from './voluntarios/voluntarios.module';
import { Voluntario } from './voluntarios/voluntario.entity';
import { VoluntariosController } from './voluntarios/voluntarios.controller';
import { VoluntariosService } from './voluntarios/voluntarios.service';
require('dotenv').config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 6001,
      database: process.env.DB_DATABASE,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      entities: [Jovem, Voluntario],
      synchronize: true,
    }),
    JovensModule,
    VoluntariosModule,
  ],
  controllers: [AppController, JovensController, VoluntariosController],
  providers: [AppService, VoluntariosService],
})
export class AppModule {}
