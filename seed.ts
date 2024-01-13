// https://www.prisma.io/docs/guides/migrate/seed-database

import { PrismaClient } from '@prisma/client';
import { seedCategorias } from './prisma/seeders/categorias';
import { seedProdutos } from './prisma/seeders/produtos';
import { seedClientes } from './prisma/seeders/clientes';
import { seedPedidos } from './prisma/seeders/pedidos';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL, 
    },
  },
});

async function main() {
  await seedCategorias(prisma);
  await seedProdutos(prisma);
  await seedClientes(prisma);
  await seedPedidos(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
