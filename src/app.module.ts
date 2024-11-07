import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { TiendasModule } from './tiendas/tiendas.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule, ProductosModule, TiendasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
