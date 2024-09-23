import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JovensModule } from './jovens/jovens.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jovem } from './jovens/jovem.entity';
import { JovensController } from './jovens/jovens.controller';
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
      entities: [Jovem],
      synchronize: true,
    }),
    JovensModule,
  ],
  controllers: [AppController, JovensController],
  providers: [AppService],
})
export class AppModule {}
