import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseConfig } from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { RawMaterialsModule } from './raw-materials/raw-materials.module';
import { ProductRawMaterialsModule } from './product-raw-materials/product-raw-materials.module';
import { ProductionModule } from './production/production.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        databaseConfig(configService),
    }),
    ProductsModule,
    RawMaterialsModule,
    ProductRawMaterialsModule,
    ProductionModule,
    ...(process.env.NODE_ENV === 'test' ? [TestModule] : []),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
