"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const userRepository = __importStar(require("../repositories/userRepository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = async (userData) => {
    const existingUser = await userRepository.findUserByEmail(userData.email);
    if (existingUser) {
        throw new Error("E-mail já cadastrado.");
    }
    const hashedPassword = await bcrypt_1.default.hash(userData.password, 10);
    const newUser = await userRepository.createUser({
        ...userData,
        password: hashedPassword,
    });
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
};
exports.registerUser = registerUser;
const loginUser = async (credentials) => {
    const user = await userRepository.findUserByEmail(credentials.email);
    if (!user) {
        throw new Error("Credenciais inválidas.");
    }
    const isPasswordValid = await bcrypt_1.default.compare(credentials.password, user.password);
    if (!isPasswordValid) {
        throw new Error("Credenciais inválidas.");
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
};
exports.loginUser = loginUser;
