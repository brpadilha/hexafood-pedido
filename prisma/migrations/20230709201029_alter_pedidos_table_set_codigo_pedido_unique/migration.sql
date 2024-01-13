/*
  Warnings:

  - A unique constraint covering the columns `[codigo_pedido]` on the table `pedidos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "pedidos_codigo_pedido_key" ON "pedidos"("codigo_pedido");
