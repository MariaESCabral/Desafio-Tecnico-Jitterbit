# Order API - Node.js

API simples desenvolvida em **Node.js** para gerenciamento de pedidos.  
Este projeto foi criado como parte de um desafio técnico e implementa operações básicas de **CRUD** (Create, Read, Update, Delete).

## Tecnologias utilizadas

- Node.js
- Express
- MongoDB
- Mongoose

---

# Estrutura do projeto

order-api  
│  
├── server.js  
├── package.json  
├── models  
│   └── Order.js  
└── routes  
    └── orderRoutes.js  

---

# Instalação

Clone o repositório:

git clone https://github.com/seuusuario/order-api.git

Entre na pasta do projeto:

cd order-api

Instale as dependências:

npm install

Inicie a aplicação:

node server.js

A API estará disponível em:

http://localhost:3000

---

# Endpoints

## Criar pedido

POST /order

Exemplo de body:

{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}

---

## Buscar pedido

GET /order/:orderId

Exemplo:

GET /order/v10089015vdb

---

## Listar pedidos

GET /order/list

---

## Atualizar pedido

PUT /order/:orderId

---

## Deletar pedido

DELETE /order/:orderId

---

# Transformação de dados

A API recebe os dados no seguinte formato:

{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00"
}

E faz o **mapping para salvar no banco**:

{
  "orderId": "v10089016vdb",
  "value": 10000,
  "creationDate": "2023-07-19T12:24:11.529Z"
}

---

# Banco de dados

Foi utilizado **MongoDB** para armazenar os pedidos.

Estrutura da collection:

order  
 ├─ orderId  
 ├─ value  
 ├─ creationDate  
 └─ items  
     ├─ productId  
     ├─ quantity  
     └─ price  

---

# Tratamento de erros

A API possui tratamento básico de erros utilizando:

- try/catch
- respostas HTTP apropriadas
- mensagens de erro descritivas

---

# Autor

Desenvolvido por **Maria Cabral**
