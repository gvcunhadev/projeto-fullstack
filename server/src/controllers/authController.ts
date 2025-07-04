import { Request, Response } from "express";
import * as authService from "../services/authService";
import * as userRepository from "../repositories/userRepository";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json({ message: "Usuário registrado com sucesso!", user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { user, token } = await authService.loginUser(req.body);
    res.status(200).json({ user, token });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  // O ID do usuário é adicionado ao objeto req pelo authMiddleware
  const userId = (req as any).user.id;

  const user = await userRepository.findUserById(userId);

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado." });
  }

  const { password, ...userWithoutPassword } = user;
  res.status(200).json(userWithoutPassword);
};
