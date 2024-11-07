-- CreateTable
CREATE TABLE "Producto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tienda" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,

    CONSTRAINT "Tienda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductoTienda" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductoTienda_AB_unique" ON "_ProductoTienda"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductoTienda_B_index" ON "_ProductoTienda"("B");

-- AddForeignKey
ALTER TABLE "_ProductoTienda" ADD CONSTRAINT "_ProductoTienda_A_fkey" FOREIGN KEY ("A") REFERENCES "Producto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductoTienda" ADD CONSTRAINT "_ProductoTienda_B_fkey" FOREIGN KEY ("B") REFERENCES "Tienda"("id") ON DELETE CASCADE ON UPDATE CASCADE;
