#!/bin/sh
# server/entrypoint.sh

set -e

echo "Aguardando o banco de dados iniciar..."
while ! nc -z $POSTGRES_HOST 5432; do
  sleep 1
done
echo "Banco de dados iniciado com sucesso!"

echo "Executando as migrations do banco de dados..."
npx prisma migrate deploy

echo "Migrations concluídas. Iniciando o servidor..."
exec "$@"