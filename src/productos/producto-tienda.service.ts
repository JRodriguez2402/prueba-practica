import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductoTiendaService {
  constructor(private prisma: PrismaService) {}

  async addStoreToProduct(productId: number, storeId: number) {
    // Verificar que el producto y la tienda existan
    const producto = await this.prisma.producto.findUnique({
      where: { id: productId },
    });
    const tienda = await this.prisma.tienda.findUnique({
      where: { id: storeId },
    });

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${productId} no encontrado`);
    }
    if (!tienda) {
      throw new NotFoundException(`Tienda con ID ${storeId} no encontrada`);
    }

    // Asociar la tienda al producto
    return this.prisma.producto.update({
      where: { id: productId },
      data: {
        tiendas: {
          connect: { id: storeId },
        },
      },
    });
  }

  async findStoresFromProduct(productId: number) {
    const producto = await this.prisma.producto.findUnique({
      where: { id: productId },
      include: { tiendas: true },
    });

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${productId} no encontrado`);
    }

    return producto.tiendas;
  }

  async findStoreFromProduct(productId: number, storeId: number) {
    const producto = await this.prisma.producto.findUnique({
      where: { id: productId },
      include: {
        tiendas: {
          where: { id: storeId },
        },
      },
    });

    if (!producto || producto.tiendas.length === 0) {
      throw new NotFoundException(
        `La tienda con ID ${storeId} no está asociada al producto con ID ${productId}`,
      );
    }

    return producto.tiendas[0];
  }

  async updateStoresFromProduct(productId: number, storeIds: number[]) {
    if (!Array.isArray(storeIds)) {
      throw new BadRequestException('storeIds debe ser un array');
    }

    const producto = await this.prisma.producto.findUnique({
      where: { id: productId },
    });
    
    const tiendas = await this.prisma.tienda.findMany({
      where: {
        id: {
          in: storeIds,
        },
      },
    });
    
    if (tiendas.length !== storeIds.length) {
      throw new NotFoundException(`Una o más tiendas con los IDs proporcionados no fueron encontradas`);
    }

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${productId} no encontrado`);
    }

    return this.prisma.producto.update({
      where: { id: productId },
      data: {
        tiendas: {
          set: storeIds.map((id) => ({ id })),
        },
      },
    });
  }

  async deleteStoreFromProduct(productId: number, storeId: number) {
    const producto = await this.prisma.producto.findUnique({
      where: { id: productId },
    });

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${productId} no encontrado`);
    }

    const tienda = await this.prisma.tienda.findUnique({
      where: { id: storeId },
    });
    
    if (!tienda) {
      throw new NotFoundException(`La tienda con ID ${storeId} no está asociada al producto con ID ${productId}`);
    }

    return this.prisma.producto.update({
      where: { id: productId },
      data: {
        tiendas: {
          disconnect: { id: storeId },
        },
      },
    });
  }
}
