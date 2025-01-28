# Auth RBAC

## Rodar o backend com sqlite
### 1. Acessar pasta do backend.
```sh
cd backend
```

### 2. Criar arquivo `.env` baseado no modelo `env_modelo_sqlite`.
```sh
cp env_modelo_sqlite .env
```

### 3. Setar versão do node com NVM (opcional).
```sh
nvm use
```

### 4. Instalar pacotes.
```sh
npm install
```

### 5. Rodar migrations.
```sh
npm run migrate
```

### 6. Inserir dados default.
```sh
npm run npm run seed
```

### 6. Rodar app em ambiente de desenvolvimento.
```sh
npm run dev
```


## Rodar backend com postgres dockerizado
### 1. Acessar pasta do backend.
```sh
cd backend
```

#### 2. Criar arquivo `.env` baseado no modelo `env_modelo_postgres`.
```sh
cp env_modelo_postgres .env
```

### 3. Setar versão do node com NVM (opcional).
```sh
nvm use
```

### 4. Instalar pacotes.
```sh
npm install
```

#### 5. Rodar o container com docker compose.
```sh
docker compose up -d
```

#### 6. Alterar o provider no arquivo `backend/prisma/schema.prisma`.
```ts
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

#### 7. Gerar as migrations.
```sh
npm run migrate-postgres
```

#### 8. Inserir dados default.
```sh
npm run seed
```

### 9. Rodar app em ambiente de desenvolvimento.
```sh
npm run dev
```


## Rodar frontend
### 1. Acessar pasta do frontend.
```sh
cd Frontend
```

### 2. Criar arquivo `.env`.
```sh
cp env_modelo .env
```

### 3. Setar versão do node com NVM (opcional).
```sh
nvm use
```

### 4. Instalar pacotes.
```sh
npm install
```

### 5. Rodar app em ambiente de desenvolvimento.
```sh
npm run dev
```


### Extensão para testar APIs pelo VSCODE
- [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)


### Serviço de email gratuito
- [nodemailer](https://mailtrap.io/)


### Observações
- A complexidade da senha está fraca.
- O uuid está sendo gerado pelo prisma. Mudar para gerar o uuid pelo pacote uuidv4.
- Migrar as entidades para um pacote core.
- Criar testes unitários para os casos de uso.


### Padrões de desenvolvimento do projeto
- Usar "ident spaces" número 2 (vscode).


## Processo de commit
```sh
# Atualizar a branch develop
git checkout develop
git pull origin develop

# Criar uma nova branch
git checkout -b <nome da issue>

# Commitar alterações e vincular a issue
git add .
git commit -m "Descrição (closes #<número-da-issue>)"

# Ir para develop e atualizar
git checkout develop
git pull

# Retornar para a branch de trabalho e mesclar:
git checkout <nome da issue>
git merge develop

# Caso tenha conflito resolver e commitar novamente

# Enviar para o repositório
git push origin <nome da issue>

# Após o push abrir o Pull Request com a branch de desenvolvimento.
```

### Exemplo de commit linkando a issue:
```sh
git commit -m 'Start Frontend (closes #4)'
```