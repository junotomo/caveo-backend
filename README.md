# Caveo-backend

Aplicação backend integrada ao AWS Cognito para autenticação de usuários e um banco de dados PostgreSQL para gerenciar dados. O objetivo desta aplicação é fornecer uma API escalável, coma a finalidade de gerenciamento de usuários.

## Tecnologias utilizadas:

- Node.js
- TypeScript
- Koa
- TypeORM
- AWS Cognito
- PostgreSQL

## Necessário para rodar a aplicação:

É necessário Docker instalados em sua máquina, com uma instância do PostgreSQL rodando, seja localmente ou através do Docker.

## Instalação

### Local
Para rodar a aplicação localmente, siga os passos abaixo:


1. Configurar o PostgreSQL com Docker:
    - Baixe a imagem do PostgreSQL 14:
        ```bash
        docker pull postgres:14
        ```
    - Inicie um container do PostgreSQL:
        ```bash
        docker run --name postgres-container -e POSTGRES_USER=<usuario> -e POSTGRES_PASSWORD=<senha> -e POSTGRES_DB=<banco> -p 5432:5432 -d postgres:14
        ```


2. Instale as depenências
    ```
    npm install
    ```

3. Adicione as credenciais do Cognito no arquivo .env:
    ```bash
    COGNITO_USER_POOL_ID=<seu_user_pool_id>
    COGNITO_CLIENT_ID=<seu_client_id>
    ```

5. Para iniciar a aplicação em modo de desenvolvimento, execute:
    ```
    npm run dev
    ```

### Docker
Para executar a aplicação usando Docker:

1. Adicione variáveis do Cognito no arquivo docker-compose.yml:

   ```
   environment:
    COGNITO_USER_POOL_ID: <user_pool_id>
    COGNITO_CLIENT_ID: <client_id>
    ```

2. Execute Docker Compose para construir e iniciar os containers:
    ```
    docker-compose up --build
    ```

# Scripts
- npm run dev: Roda em modo de desenvolvimento.
- docker-compose up --build: Constrói e inicia a aplicação usando Docker.