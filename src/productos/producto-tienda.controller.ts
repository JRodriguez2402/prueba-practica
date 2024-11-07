import { Controller, Param, Post, Get, Patch, Delete, Body, Put } from '@nestjs/common';
import { ProductoTiendaService } from './producto-tienda.service';
import { UpdateStoresDto } from './dto/update-producto-tienda.dto';

@Controller('productos/:productId/tiendas')
export class ProductoTiendaController {
  constructor(private readonly productoTiendaService: ProductoTiendaService) {}

  @Post(':storeId')
  addStoreToProduct(@Param('productId') productId: string, @Param('storeId') storeId: string) {
    return this.productoTiendaService.addStoreToProduct(+productId, +storeId);
  }

  @Get()
  findStoresFromProduct(@Param('productId') productId: string) {
    return this.productoTiendaService.findStoresFromProduct(+productId);
  }

  @Get(':storeId')
  findStoreFromProduct(@Param('productId') productId: string, @Param('storeId') storeId: string) {
    return this.productoTiendaService.findStoreFromProduct(+productId, +storeId);
  }

  @Put()
  updateStoresFromProduct(@Param('productId') productId: string, @Body() UpdateStoresDto: UpdateStoresDto) {
    return this.productoTiendaService.updateStoresFromProduct(+productId, UpdateStoresDto.storeIds);
  }

  @Delete(':storeId')
  deleteStoreFromProduct(@Param('productId') productId: string, @Param('storeId') storeId: string) {
    return this.productoTiendaService.deleteStoreFromProduct(+productId, +storeId);
  }
}
