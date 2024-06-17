# Amiko - API de Chamadas

Este repositório contém o código-fonte de uma API para gerenciar chamadas. A API possui uma rota `/calls` com suporte para os métodos POST e GET. O projeto foi desenvolvido em JavaScript e utiliza Jest e Supertest para validação das rotas.

O Banco utilizado para armazenamento das chamadas foi o MongoDB, e utilizei o Insomnia para fazer as requisições e testar a API durante o desenvolvimento.

## Funcionalidades

### POST `/calls`
Cria uma nova chamada.

### GET `/calls`
Retorna uma lista de chamadas com suporte à filtragem.

#### Filtragem
Você pode filtrar as chamadas utilizando parâmetros na URL. É possível filtrar pelo nome do Hospital, e caso haja filtragem por nome, é possível filtrar pelo número do quarto. Exemplos:
- `http://localhost:3000/calls?hospitalName=Nome%20Hospital&roomNumber=NumeroDoQuarto`
- `http://localhost:3000/calls?hospitalName=Santa%20Casa&roomNumber=103`


## Instalação, execução e testes

1. Instale as dependências:
  ```bash
  # Usando pnpm
  pnpm install
    
  # Ou usando npm
  npm install
  ```

2. Inicializando a API:
  ```bash
  # Usando pnpm
  pnpm run dev
  
  # Ou usando npm
  npm run dev
  ```

3. Para executar os testes:
  ```bash
  # Usando pnpm
  pnpm run test
  
  # Ou usando npm
  npm run test
  ```

## Tecnologias Utilizadas

- JavaScript
- Node.js
- Express
- Jest
- Supertest
- MongoDB

## Melhorias
Ao rodar os testes, fica um erro de "Open handle" que não soube resolver.


