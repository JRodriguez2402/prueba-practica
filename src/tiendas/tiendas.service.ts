import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTiendaDto } from './dto/create-tienda.dto';
import { UpdateTiendaDto } from './dto/update-tienda.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TiendasService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTiendaDto: CreateTiendaDto) {
    return this.prisma.tienda.create({ data: createTiendaDto });
  }

  findAll() {
    return this.prisma.tienda.findMany();
  }

  findOne(id: number) {
    return this.prisma.tienda.findUniqueOrThrow({where: {id}});
  }

  async update(id: number, updateTiendaDto: UpdateTiendaDto) {
    const foundUpdate = await this.prisma.tienda.findUnique({ where: { id} });
    if (!foundUpdate) {
      throw new NotFoundException('Tienda not found');
    }
      return this.prisma.tienda.update({
        where: { id },
        data: updateTiendaDto,
      });
  }

  async remove(id: number) {
    const foundRemove = await this.prisma.tienda.findUnique({ where: { id} });
    if (!foundRemove) {
      throw new NotFoundException('Tienda not found');
    }
    return this.prisma.tienda.delete({where: {id}});
  
  }
}
