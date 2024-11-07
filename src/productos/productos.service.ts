import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductosService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProductoDto: CreateProductoDto) {
    return this.prisma.producto.create({ data: createProductoDto });
  }

  findAll() {
    return this.prisma.producto.findMany();
  }

  findOne(id: number) {
    return this.prisma.producto.findUniqueOrThrow({ where: { id } });
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    let found = await this.prisma.producto.findUnique({ where: { id} });
    if (!found) {
      throw new NotFoundException('Producto no encontrado');
    } else {
      return this.prisma.producto.update({
        where: { id },
        data: updateProductoDto,
      });
    }
  }

  async remove(id: number) {
    let found = await this.prisma.producto.findUnique({ where: { id} });
    if (!found) {
      throw new NotFoundException('Producto no encontrado');
    } else {
      return this.prisma.producto.delete({ where: { id } });
    }
  }
}
