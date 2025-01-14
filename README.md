# API para Sistema de Gerenciamento de Salas

## Descrição
Esta API permite o gerenciamento de salas laboratoriais, oferecendo funcionalidades para autenticação de usuários, cadastro de laboratórios, geração de relatórios e restrições de acesso com base em horários. Os dados são armazenados no MongoDB, e a API está hospedada na nuvem, garantindo acessibilidade externa.

## Sumário
1. [Funcionalidades](#funcionalidades)
2. [Endpoints](#endpoints)
3. [Middleware](#middleware)
4. [Testes Automatizados](#testes-automatizados)
5. [Requisitos](#requisitos)

---

## Funcionalidades
- **Autenticação de usuários**: Login com usúario e senha para obter token de acesso.
- **Cadastro de laboratórios**: Inserção de novos laboratórios com informações detalhadas.
- **Geração de relatórios**: Exportação de lista de laboratórios em formato PDF com fotos.
- **Restrição de acesso**: Limitação de uso da API aos dias úteis (segunda a sexta-feira).

---

## Endpoints

### 1. Autenticação
**POST** `/validaLogin`

- **Descrição**: Permite que o usuário faça login e receba um token de acesso.
- **Parâmetros**:
  - `usúario` (string, obrigatório): Email do usuário.
  - `senha` (string, obrigatório): Senha do usuário.
- **Resposta**:
  ```json
  {
    "token": "string"
  }
  ```

---

### 2. Cadastro de Laboratórios
**POST** `/laboratorio`

- **Descrição**: Cadastra um novo laboratório no sistema.
- **Parâmetros**:
  - `nome` (string, obrigatório): Nome do laboratório.
  - `descricao` (string, obrigatório): Descrição do laboratório.
  - `capacidade` (number, obrigatório): Capacidade máxima de pessoas.
  - `foto` (string, opcional): URL da foto do laboratório.
- **Resposta**:
  ```json
  {
    "message": "Laboratório cadastrado com sucesso!"
  }
  ```

---

### 3. Relatórios de Laboratórios
**GET** `/laboratorio/relatorio`

- **Descrição**: Gera um arquivo PDF com a lista de todos os laboratórios e suas fotos.
- **Resposta**: Um arquivo PDF para download.

---

## Middleware
- **dayMiddleware**: Limita o acesso à API para que esteja disponível apenas de segunda a sexta-feira.
- **Implementação**: O middleware verifica o dia da semana e retorna um erro 401 caso a solicitação seja feita durante o fim de semana.

---

## Testes Automatizados
- **Descrição**: Incluem cenários de sucesso e falha para os seguintes casos:
  1. Login com usúario e senha.
  2. Cadastro de laboratório.
  3. Geração de relatórios em PDF.
  4. Restrições de acesso nos fins de semana.

---

## Requisitos
1. **Banco de dados**: MongoDB configurado para armazenar informações de usuários e laboratórios.
2. **Hospedagem**: API implantada no Vercel.
3. **Autenticação**: Implementação de autenticação JWT para rotas protegidas.
5. **Geração de PDF**: Uso de bibliotecas`pdfkit` para criação do relatório.

---

### Exemplo de Configuração no Vercel
1. Clone o repositório:
   ```bash
   git clone <url_do_repositorio>
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente no painel do Vercel:
   - DB_USERNAME = ""
   - DB_PASSWORD = ""
   - CLUSTER_URL= ""
   - MONGO_APP_NAME = ""
   - APP_KEY = ""
4. Faça o deploy:
   ```bash
   vercel deploy
   
