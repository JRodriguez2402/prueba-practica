import { IsIn, IsNumber, IsString } from "class-validator";

export class CreateProductoDto {
    @IsString()
    nombre: string;
    @IsNumber()
    precio: number;
    @IsIn(['Perecedero','No perecedero'])
    tipo: 'Perecedero' | 'No perecedero'; // Se asegura que el tipo sea uno de estos valores.
  }