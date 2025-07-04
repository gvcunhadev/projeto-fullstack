import * as userRepository from "../repositories/userRepository";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

type UserCreationData = Omit<User, "id" | "createdAt" | "updatedAt">;

export const registerUser = async (
  userData: UserCreationData
): Promise<Omit<User, "password">> => {
  const existingUser = await userRepository.findUserByEmail(userData.email);
  if (existingUser) {
    throw new Error("E-mail já cadastrado.");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser = await userRepository.createUser({
    ...userData,
    password: hashedPassword,
  });

  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

export const loginUser = async (
  credentials: Pick<User, "email" | "password">
) => {
  const user = await userRepository.findUserByEmail(credentials.email);
  if (!user) {
    throw new Error("Credenciais inválidas.");
  }

  const isPasswordValid = await bcrypt.compare(
    credentials.password,
    user.password
  );
  if (!isPasswordValid) {
    throw new Error("Credenciais inválidas.");
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  const { password, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
};
