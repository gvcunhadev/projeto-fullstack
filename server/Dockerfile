# server/Dockerfile

# --- Estágio 1: Build ---
FROM node:20-alpine AS builder

# Instala dependências essenciais para o Prisma no Alpine
RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

COPY package*.json ./

# Copia o schema antes de instalar para otimizar o cache
COPY prisma ./prisma/

RUN npm install

COPY . .
RUN npm run build


# --- Estágio 2: Produção ---
FROM node:20-alpine AS production

# Instala as mesmas dependências essenciais para a execução
RUN apk add --no-cache openssl libc6-compat netcat-openbsd

WORKDIR /app

COPY package*.json ./
COPY --from=builder /app/prisma ./prisma

RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

COPY entrypoint.sh .
RUN chmod +x ./entrypoint.sh

EXPOSE 3001

ENTRYPOINT [ "./entrypoint.sh" ]
CMD [ "node", "dist/server.js" ]