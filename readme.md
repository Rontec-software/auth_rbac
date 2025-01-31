# Auth RBAC

## Links de apoio.
- [Especificação do projeto de Autenticação e Autorização.](https://github.com/mentoriasdev/projetos-equipe-2)
- [Figma](https://www.figma.com/design/SzFJ9f1wqCDXg1jUSeG7wl/S3curity?node-id=0-1&node-type=canvas&t=87Z4tBRKPSSONDrU-0)
- [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
- [nodemailer](https://mailtrap.io/)

## 1A - Rodar backend com sqlite
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

### 7. Testar API.
```sh
curl --request GET --url http://localhost:3001/health
```


## 1B - Rodar backend com postgres dockerizado
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

### 8. Rodar app em ambiente de desenvolvimento.
```sh
npm run dev
```

### 9. Testar API.
```sh
curl --request GET --url http://localhost:3001/health
```


## 2 - Rodar frontend
### 1. Acessar pasta do frontend.
```sh
cd Frontend
```

### 2. Criar arquivo `.env`.
```sh
cp .env.example .env
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

### 6. Acessar a página de login.
- [Página de login](http://localhost:3000/login)

## Usuários para teste
### Administrador
email: `administrador@email.com`
senha: `123456`

### Usuário padrão
email: `usuariopadrao@email.com`
senha: `123456`


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

## ✒️ Desenvolvedores
- **Jhonatan Pereira** - [Jhonatan-Pereira](https://github.com/Jhonatan-Pereira)
- **Marcos Vinicius** - [MarckVinny](https://github.com/MarckVinny)
- **Igor Zanella** - [ZanellaIgor](https://github.com/ZanellaIgor)
- **Cezar Augusto Molinar** - [cezarmolinar](https://github.com/cezarmolinar)
- **Darlisson Limeira** - [darlissonlimeira](https://github.com/darlissonlimeira)
- **Paulo Cesar Rezende** - [PauloRezend](https://github.com/PauloRezend)

## Ouvintes
- Pedro Ribeiro
- Joabe Anderson da Silva
