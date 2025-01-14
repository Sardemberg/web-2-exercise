# API para Sistema de Gerenciamento de Salas

## Descrição
Esta API permite o gerenciamento de salas laboratoriais, oferecendo funcionalidades para autenticação de usuários, cadastro de laboratórios, geração de relatórios e restrições de acesso com base em horários. Os dados são armazenados no MongoDB, e a API está hospedada na nuvem, garantindo acessibilidade externa.

## Sumário
1. [Funcionalidades](#funcionalidades)
2. [Endpoints](#endpoints)
   - [Autenticação](#autenticação)
   - [Cadastro de Laboratórios](#cadastro-de-laboratórios)
   - [Relatórios de Laboratórios](#relatórios-de-laboratórios)
3. [Middleware](#middleware)
4. [Testes Automatizados](#testes-automatizados)
5. [Requisitos](#requisitos)
6. [Tecnologias Utilizadas](#tecnologias-utilizadas)

---

## Funcionalidades
- **Autenticação de usuários**: Login com usuário e senha para obter um token de acesso.
- **Cadastro de laboratórios**: Inserção de novos laboratórios com informações detalhadas.
- **Geração de relatórios**: Exportação de lista de laboratórios em formato PDF com fotos.
- **Restrição de acesso**: Limitação de uso da API aos dias úteis (segunda a sexta-feira).

---

## Endpoints

### Autenticação
**POST** `/validaLogin`

- **Descrição**: Permite que o usuário faça login e receba um token de acesso.
- **Requisição**:
  ```json
  {
      "usuario": "string",
      "senha": "string"
  }
  ```
- **Resposta**:
  ```json
  {
      "token": "string"
  }
  ```

---

### Cadastro de Laboratórios
**POST** `/laboratorio`

- **Descrição**: Cadastra um novo laboratório no sistema.
- **Requisição**:
  ```json
  {
      "nome": "string",
      "descricao": "string",
      "capacidade": "number",
      "foto": "string (opcional)"
  }
  ```
- **Resposta**:
  ```json
  {
      "message": "Laboratório cadastrado com sucesso!"
  }
  ```

---

### Relatórios de Laboratórios
**GET** `/laboratorio/relatorio`

- **Descrição**: Gera um arquivo PDF com a lista de todos os laboratórios e suas fotos.
- **Resposta**: Um arquivo PDF para download.

---

## Middleware

### dayMiddleware
- **Descrição**: Limita o acesso à API para que esteja disponível apenas de segunda a sexta-feira.
- **Funcionamento**: O middleware verifica o dia da semana e retorna um erro 401 caso a solicitação seja feita durante o fim de semana.

---

## Testes Automatizados
- **Cobertura de Testes**:
  1. Login com usuário e senha.
  2. Cadastro de laboratório.
  3. Geração de relatórios em PDF.
  4. Restrições de acesso nos fins de semana.

---

## Requisitos
- **Banco de dados**: MongoDB configurado para armazenar informações de usuários e laboratórios.
- **Hospedagem**: API implantada no Vercel.
- **Autenticação**: Implementação de autenticação JWT para rotas protegidas.
- **Geração de PDF**: Uso de bibliotecas como `pdfkit` para criação do relatório.

---

## Tecnologias Utilizadas
As dependências e ferramentas utilizadas neste projeto incluem:

```json
"dependencies": {
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "jsonwebtoken": "^9.0.2",
    "mongodb": "^6.12.0",
    "mongoose": "^8.9.2",
    "multer": "^1.4.5-lts.1",
    "pdfkit": "^0.16.0",
    "jest": "^29.7.0"
}
```
