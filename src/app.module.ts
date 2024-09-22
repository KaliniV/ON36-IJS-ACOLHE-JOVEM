import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JovensModule } from './jovens/jovens.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jovem } from './jovens/jovem.entity';
import { ConfigModule } from '@nestjs/config';
import { JovensController } from './jovens/jovens.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 6001,
      database: 'acolhe_jovem',
      username: 'postgres',
      password: '123456',
      entities: [Jovem],
      synchronize: true,
    }),
    JovensModule,
  ],
  controllers: [AppController, JovensController],
  providers: [AppService],
})
export class AppModule {}
