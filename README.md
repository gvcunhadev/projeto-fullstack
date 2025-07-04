# Desafio Técnico - Cadastro e Login Full-Stack

Este repositório contém a implementação de uma aplicação full-stack de cadastro e login de usuários, desenvolvida como parte de um desafio técnico. Utilizando a stack: React 18+ (frontend) & Node.js 20+ (backend) com PostgreSQL.

### 1\. Objetivo

O principal objetivo deste projeto é demonstrar a habilidade de construir uma aplicação completa utilizando React no frontend e Node.js (com TypeScript) no backend. O sistema implementa uma API REST para gerenciar usuários, persistindo os dados em um banco PostgreSQL. 

### 2\. Stack de Tecnologias

A aplicação foi construída com as seguintes tecnologias, conforme os requisitos do desafio:

**Backend (Server)**

- **Runtime/Framework**: Node.js com Express. 
- **Linguagem**: TypeScript. 
- **Banco de Dados**: PostgreSQL com o ORM Prisma para as migrations e acesso aos dados. 
- **Autenticação**: JWT (JSON Web Tokens) para geração de tokens e `bcrypt` para hashing de senhas. 
- **Validação**: `Zod` para validação de esquemas de dados de entrada. 
- **Qualidade de Código**: ESLint e Prettier. 

**Frontend (Client)**

Este projeto foi criado com [Vite](https://vitejs.dev/), uma alternativa moderna ao Create React App, utilizando o seguinte comando:

```bash
npm create vite@latest
```

- **Framework/Biblioteca**: React 18+. 
- **Roteamento**: React Router DOM para navegação entre páginas. 
- **Gerenciamento de Estado**: React Context API foi utilizado para gerenciar o estado de autenticação. A escolha se justifica pela simplicidade e adequação ao escopo do projeto, que não demanda a complexidade de uma biblioteca como Redux. 
- **Requisições HTTP**: O `authService.js` abstrai as chamadas à API, utilizando o `fetch` nativo do navegador.
- **UI/Estilização**: Tailwind CSS para a construção da interface de usuário, permitindo um desenvolvimento ágil e responsivo. 
- **Qualidade de Código**: ESLint e Prettier.
- **Gerenciamento de autenticação
Este projeto utiliza **React Context API** para gerenciar o estado de autenticação do usuário.

**Por que React Context API?**

- Simples e nativo do React, sem necessidade de bibliotecas externas.
- Ideal para casos em que o estado global é limitado (ex.: apenas autenticação).
- Permite expor dados e métodos de forma centralizada via `AuthProvider` e `useAuth()`.
- Facilita o controle da sessão do usuário com persistência no `localStorage`.

**Principais responsabilidades do Context:**
- Armazenar o usuário autenticado.
- Realizar login e logout.
- Sincronizar o estado de autenticação ao carregar a aplicação.

### 3\. Estrutura de Pastas

O projeto segue uma estrutura de monorepo, com o frontend e o backend em diretórios separados para uma clara separação de responsabilidades.

```
/
|-- client/         # Aplicação frontend (React)
|   |-- src/
|   |   |-- api/
|   |   |-- components/
|   |   |-- context/
|   |   |-- pages/
|   |-- package.json
|   |-- eslint.config.js
|
|-- server/         # Aplicação backend (Node.js/TypeScript)
|   |-- prisma/
|   |-- src/
|   |   |-- __tests__/
|   |   |-- controllers/
|   |   |-- middlewares/
|   |   |-- repositories/
|   |   |-- services/
|   |-- package.json
|   |-- eslint.config.js
|   |-- tsconfig.json
|
|-- prettierrc.js
|-- .gitignore
|-- README.md
```

### 4\. Documentação da API

A API expõe os seguintes endpoints:

| Rota            | Método | Descrição                                                                                    | Protegida |
| :-------------- | :----- | :------------------------------------------------------------------------------------------- | :-------- |
| `/api/register` | `POST` | Registra um novo usuário com nome, e-mail e senha.                    | Não       |
| `/api/login`    | `POST` | Autentica um usuário existente com e-mail e senha, retornando um JWT. | Não       |
| `/api/profile`  | `GET`  | Retorna os dados do usuário autenticado.                              | Sim       |

### 5\. Decisões de Arquitetura e Design

- **Arquitetura do Backend**: A estrutura do backend segue uma arquitetura em camadas (Controllers → Services → Repositories) para promover a separação de interesses e facilitar a manutenção. 
- **Armazenamento do Token**: O JWT é armazenado no `localStorage` do navegador.  Esta abordagem foi escolhida pela simplicidade de implementação no frontend.
- **Riscos**: É importante notar que o armazenamento em `localStorage` torna o token vulnerável a ataques de Cross-Site Scripting (XSS). Em uma aplicação de produção, uma alternativa mais segura como cookies `HttpOnly` seria recomendada para mitigar esse risco. 
- **Rotas Privadas**: O frontend utiliza um componente `PrivateRoute` que verifica a existência do token de autenticação antes de renderizar rotas protegidas, como o `Dashboard`, garantindo que apenas usuários logados possam acessá-las. 

### 6\. Como Executar o Projeto

Siga os passos abaixo para configurar e executar a aplicação em seu ambiente local.

**Pré-requisitos:**

- Node.js (v18 ou superior) 
- NPM ou Yarn
- PostgreSQL (v14 ou superior)

**Passos:**

1.  **Clone este repositório.**

2.  **Instale as dependências do backend:**

    ```bash
    cd server
    npm install
    ```

3.  **Instale as dependências do frontend:**

    ```bash
    cd client
    npm install
    ```

4.  **Configure as variáveis de ambiente do backend:**

    - Na pasta `server`, crie uma cópia do arquivo `.env.example` e renomeie para `.env`. 
    - Abra o arquivo `.env` e preencha com suas credenciais do PostgreSQL e um segredo para o JWT.
      ```
      DATABASE_URL="postgresql://USUARIO:SENHA@HOST:PORTA/NOME_DA_TABELA _NO_BANCO"
      JWT_SECRET="SEU_SEGREDO_AQUI"
      ```

5.  **Execute as migrations do banco de dados:**

    - Ainda na pasta `server`, execute o comando do Prisma para criar as tabelas no seu banco e executar as migrations:

    <!-- end list -->

    ```bash
    npx prisma migrate dev
    npx prisma migrate dev --name init
    ```

6.  **Execute a aplicação:**

    - Abra um terminal para o client e um para o server e execute o seguinte comando:

    ```bash
    npm run dev
    ```

Após esses passos, o frontend estará rodando em `http://localhost:5173` e o backend em `http://localhost:3001`.
