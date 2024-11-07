/*
  Warnings:

  - You are about to drop the `Producto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tienda` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductoTienda` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProductoTienda" DROP CONSTRAINT "_ProductoTienda_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductoTienda" DROP CONSTRAINT "_ProductoTienda_B_fkey";

-- DropTable
DROP TABLE "Producto";

-- DropTable
DROP TABLE "Tienda";

-- DropTable
DROP TABLE "_ProductoTienda";

-- CreateTable
CREATE TABLE "producto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tienda" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,

    CONSTRAINT "tienda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_productoTienda" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_productoTienda_AB_unique" ON "_productoTienda"("A", "B");

-- CreateIndex
CREATE INDEX "_productoTienda_B_index" ON "_productoTienda"("B");

-- AddForeignKey
ALTER TABLE "_productoTienda" ADD CONSTRAINT "_productoTienda_A_fkey" FOREIGN KEY ("A") REFERENCES "producto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_productoTienda" ADD CONSTRAINT "_productoTienda_B_fkey" FOREIGN KEY ("B") REFERENCES "tienda"("id") ON DELETE CASCADE ON UPDATE CASCADE;
