import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { ProductoTiendaService } from './producto-tienda.service';
import { ProductoTiendaController } from './producto-tienda.controller';

@Module({
  controllers: [ProductosController,ProductoTiendaController],
  providers: [ProductosService,ProductoTiendaService],
})
export class ProductosModule {}
