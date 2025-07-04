import * as userRepository from "../repositories/userRepository";
import * as authService from "../services/authService"; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

jest.mock("../repositories/userRepository");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("authService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("registerUser", () => {
    it("deve registrar um usuário novo com sucesso", async () => {
      (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");
      (userRepository.createUser as jest.Mock).mockImplementation(async (userData) => ({
        id: 1,
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      const userData = {
        fullName: "Novo Usuário",
        email: "novo@usuario.com",
        password: "senha123",
      };

      const result = await authService.registerUser(userData);

      expect(userRepository.findUserByEmail).toHaveBeenCalledWith("novo@usuario.com");
      expect(bcrypt.hash).toHaveBeenCalledWith("senha123", 10);
      expect(userRepository.createUser).toHaveBeenCalledWith({
        fullName: "Novo Usuário",
        email: "novo@usuario.com",
        password: "hashedPassword",
      });
      expect(result).not.toHaveProperty("password");
      expect(result.email).toBe("novo@usuario.com");
    });

    it("deve lançar erro se o email já estiver cadastrado", async () => {
      (userRepository.findUserByEmail as jest.Mock).mockResolvedValue({ id: 1 });

      await expect(authService.registerUser({
        fullName: "Outro",
        email: "existente@usuario.com",
        password: "senha123",
      })).rejects.toThrow("E-mail já cadastrado.");

      expect(userRepository.createUser).not.toHaveBeenCalled();
    });
  });

  describe("loginUser", () => {
    it("deve logar usuário com credenciais válidas e retornar token", async () => {
      const fakeUser = {
        id: 1,
        email: "usuario@teste.com",
        password: "hashedPassword",
        fullName: "Usuário Teste",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(fakeUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue("token123");

      const credentials = { email: "usuario@teste.com", password: "senha123" };

      const result = await authService.loginUser(credentials);

      expect(userRepository.findUserByEmail).toHaveBeenCalledWith("usuario@teste.com");
      expect(bcrypt.compare).toHaveBeenCalledWith("senha123", "hashedPassword");
      expect(jwt.sign).toHaveBeenCalledWith({ id: 1 }, process.env.JWT_SECRET!, { expiresIn: "1d" });

      expect(result).toHaveProperty("user");
      expect(result).toHaveProperty("token", "token123");
      expect(result.user).not.toHaveProperty("password");
      expect(result.user.email).toBe("usuario@teste.com");
    });

    it("deve lançar erro se email não existir", async () => {
      (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(null);

      await expect(authService.loginUser({
        email: "naoexiste@teste.com",
        password: "senha123",
      })).rejects.toThrow("Credenciais inválidas.");

      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(jwt.sign).not.toHaveBeenCalled();
    });

    it("deve lançar erro se a senha for inválida", async () => {
      const fakeUser = {
        id: 1,
        email: "usuario@teste.com",
        password: "hashedPassword",
        fullName: "Usuário Teste",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(fakeUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(authService.loginUser({
        email: "usuario@teste.com",
        password: "senhaErrada",
      })).rejects.toThrow("Credenciais inválidas.");

      expect(jwt.sign).not.toHaveBeenCalled();
    });
  });
});
