import { IsString, Length,  } from "class-validator";

export class CreateTiendaDto {
    @IsString()
    nombre: string;
    @IsString()
    @Length(3,3)
    ciudad: string; 
    @IsString()
    direccion: string;
  }