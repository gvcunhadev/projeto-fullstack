import { PrismaClient } from "@prisma/client";
import { findUserByEmail, createUser, findUserById } from "../repositories/userRepository";

const prisma = new PrismaClient();

describe("userRepository", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  beforeEach(async () => {
    // Limpa usuários antes de cada teste
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("deve criar e buscar um usuário pelo email", async () => {
    const user = await createUser({
      fullName: "Fulano de Tal",
      email: "fulano@example.com",
      password: "senha123",
    });

    expect(user).toHaveProperty("id");
    expect(user.email).toBe("fulano@example.com");

    const found = await findUserByEmail("fulano@example.com");
    expect(found).not.toBeNull();
    expect(found?.id).toBe(user.id);
  });

  it("deve retornar null ao buscar um email inexistente", async () => {
    const found = await findUserByEmail("naoexiste@example.com");
    expect(found).toBeNull();
  });

  it("deve buscar usuário pelo id", async () => {
    const user = await createUser({
      fullName: "Ciclano da Silva",
      email: "ciclano@example.com",
      password: "senha456",
    });

    const found = await findUserById(user.id);
    expect(found).not.toBeNull();
    expect(found?.email).toBe("ciclano@example.com");
  });
});
