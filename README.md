# Amazon OpenSearch Demo

Este projeto é uma demonstração de como integrar o Amazon OpenSearch com uma aplicação Node.js e um banco de dados MySQL. Ele inclui dois serviços principais: uma API e um job de sincronização de dados.

## Estrutura do Projeto

- **api**: Contém a aplicação Node.js que expõe endpoints para pesquisa no OpenSearch.
- **job**: Contém a aplicação Node.js que sincroniza dados do MySQL com o OpenSearch.
- **data**: Contém os arquivos de inicialização e certificados do MySQL.
- **docker-compose.yml**: Arquivo de configuração do Docker Compose para orquestrar os contêineres.

## Pré-requisitos

- Docker e Docker Compose instalados.
- Node.js e npm instalados.

## Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/amazon-opensearch-demo.git
   cd amazon-opensearch-demo
   ```

2. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   ```env
   AWS_ACCESS_KEY_ID=your_access_key_id
   AWS_SECRET_ACCESS_KEY=your_secret_access_key
   OPENSEARCH_NODE=https://your-opensearch-domain
   ```

## Executando o Projeto

1. Construa e inicie os contêineres:

   ```bash
   docker-compose up --build
   ```

2. Acesse a aplicação:

   - API: [http://localhost:3000](http://localhost:3000)

## Endpoints da API

- **GET /**: Retorna uma mensagem de boas-vindas.
- **GET /customers?q={name}**: Pesquisa clientes pelo nome.
- **GET /movies?q={actor}**: Pesquisa filmes pelo nome do ator.

## Estrutura de Pastas

```plaintext
.
├── api
│ ├── src
│ │ └── index.ts
│ ├── package.json
│ ├── tsconfig.json
│ └── Dockerfile
├── job
│ ├── src
│ │ └── index.ts
│ ├── package.json
│ ├── tsconfig.json
│ └── Dockerfile
├── data
│ └── init.sql
├── docker-compose.yml
├── .env.example
└── .gitignore
```

## Sincronização de Dados

O serviço de job sincroniza os dados do MySQL com o OpenSearch a cada 5 minutos. Ele lê os dados da tabela `customer` e os indexa no OpenSearch.
