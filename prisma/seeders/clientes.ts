import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/pt_BR';

const generateCliente = (id: number) => ({
  where: { id },
  update: {},
  create: {
    id,
    nome: faker.person.fullName(), // Gera um nome aleatório usando o faker.js
    cpf: generateRandomCPF(), // Gera um CPF aleatório.
  },
});

export const seedClientes = async (client: PrismaClient) => {
  const clientesPromises = [];
  for (let i = 1; i <= 50; i++) {
    clientesPromises.push(client.cliente.upsert(generateCliente(i)));
  }
  await Promise.all(clientesPromises);
  await client.$executeRaw`SELECT setval(\'clientes_id_seq\', (SELECT MAX(id) from "clientes"))`;
};

const generateRandomCPF = () => {
  let cpf = '';
  for (let i = 0; i < 11; i++) {
    cpf += Math.floor(Math.random() * 10); // Gera um número aleatório entre 0 e 9.
  }
  return cpf;
};
