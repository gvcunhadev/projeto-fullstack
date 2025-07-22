// server/src/app.ts
import express from "express";
import cors from "cors"; // Mantenha apenas esta importação
import dotenv from "dotenv";
import apiRoutes from "./routes";

dotenv.config();

const app = express();

// Use a configuração CORS completa que já estava correta
app.use(cors({
    origin: [
        'http://localhost:5173'   // Se você testar o frontend em dev server (Vite) diretamente na porta 5173
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json()); // Este middleware deve vir DEPOIS do CORS

app.use("/api", apiRoutes);

export default app;