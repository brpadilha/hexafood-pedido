import { PrismaClient } from '@prisma/client';

// COPY public.produtos (id, nome, id_categoria, valor, descricao, imagem, "createdAt", "updatedAt") FROM stdin;
const generateProduto = (
  id: number,
  nome: string,
  id_categoria: number,
  valor: number,
  descricao: string,
  imagem: string,
  createdAt: string,
  updatedAt: string,
) => ({
  where: { id },
  update: {},
  create: {
    id,
    nome,
    id_categoria,
    valor,
    descricao,
    imagem,
    createdAt,
    updatedAt,
  },
});

export const seedProdutos = async (client: PrismaClient) => {
  await Promise.all([
    client.produto.upsert(
      generateProduto(
        1,
        'Hexa Lanche Feliz',
        1,
        19.95,
        'O clássico: pão, carne, e queijo.',
        'https://images.unsplash.com/photo-1605789538467-f715d58e03f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80',
        new Date().toISOString(),
        new Date().toISOString(),
      ),
    ),
    client.produto.upsert(
      generateProduto(
        2,
        'Big Hexa Duplo',
        1,
        29.9,
        'Dois hambúrgueres, salada, muito queijo.',
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1398&q=80',
        new Date().toISOString(),
        new Date().toISOString(),
      ),
    ),
    client.produto.upsert(
      generateProduto(
        3,
        'Big Hexa',
        1,
        25.9,
        'Hambúrguer, salada, queijo.',
        'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
        new Date().toISOString(),
        new Date().toISOString(),
      ),
    ),
    client.produto.upsert(
      generateProduto(
        4,
        'Hexa Dog',
        1,
        12.9,
        'Cachorro quente minimalista',
        'https://images.unsplash.com/photo-1612392062422-ef19b42f74df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
        new Date().toISOString(),
        new Date().toISOString(),
      ),
    ),
    client.produto.upsert(
      generateProduto(
        5,
        'Chips de batata',
        2,
        9.9,
        'Deliciosamente crocantes (300g)',
        'https://images.unsplash.com/photo-1528751014936-863e6e7a319c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=772&q=80',
        new Date().toISOString(),
        new Date().toISOString(),
      ),
    ),
    client.produto.upsert(
      generateProduto(
        6,
        'Batata frita',
        2,
        15.9,
        'Deliciosamente crocantes (400g)',
        'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1625&q=80',
        new Date().toISOString(),
        new Date().toISOString(),
      ),
    ),
    client.produto.upsert(
      generateProduto(
        7,
        'Onion rings',
        2,
        21.9,
        'Deliciosamente crocantes (400g)',
        'https://images.unsplash.com/photo-1639024471283-03518883512d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
        new Date().toISOString(),
        new Date().toISOString(),
      ),
    ),
    client.produto.upsert(
      generateProduto(
        8,
        'Água sem gás 500ml',
        3,
        4.5,
        'Para matar a sede',
        'https://images.unsplash.com/photo-1561041695-d2fadf9f318c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
        new Date().toISOString(),
        new Date().toISOString(),
      ),
    ),
    client.produto.upsert(
      generateProduto(
        9,
        'Hexa Bier 300ml',
        3,
        15.9,
        'Produção local',
        'https://images.unsplash.com/photo-1608270586620-248524c67de9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
        new Date().toISOString(),
        new Date().toISOString(),
      ),
    ),
    client.produto.upsert(
      generateProduto(
        10,
        'Hexa Bier 500ml',
        3,
        21.9,
        'Produção local',
        'https://images.unsplash.com/photo-1608270586620-248524c67de9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
        new Date().toISOString(),
        new Date().toISOString(),
      ),
    ),
    client.produto.upsert(
      generateProduto(
        11,
        'Hexa Brownie',
        4,
        14.5,
        'Brownie de chocolate com duas bolas de sorvete',
        'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
        new Date().toISOString(),
        new Date().toISOString(),
      ),
    ),
  ]);

  await client.$executeRaw`SELECT setval(\'produtos_id_seq\', (SELECT MAX(id) from "produtos"))`;
};
