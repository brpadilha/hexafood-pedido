import { PrismaClient } from '@prisma/client';

const generateCategoria = (id: number, nome: string) => ({
  where: { id },
  update: {},
  create: {
    id,
    nome,
  },
});

export const seedCategorias = async (client: PrismaClient) => {
  await Promise.all([
    client.categoria.upsert(generateCategoria(1, 'Lanche')),
    client.categoria.upsert(generateCategoria(2, 'Acompanhamento')),
    client.categoria.upsert(generateCategoria(3, 'Bebida')),
    client.categoria.upsert(generateCategoria(4, 'Sobremesa')),
  ]);

  await client.$executeRaw`SELECT setval(\'categorias_id_seq\', (SELECT MAX(id) from "categorias"))`;
};
