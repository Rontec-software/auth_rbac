### Auth RBAC

#### Processo de commit

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

```

Após o push abrir o Pull Request com a branch de desenvolvimento.

## Exemplo de commit linkando a issue:

```sh
git commit -m 'Start Frontend (closes #4)'
```

### Iniciar backend
#### 1. Acessar pasta
```sh
cd backend
```

#### 2. Criar arquivo env
```sh
cp env_modelo .env
```

#### 3. Setar versão do node com NVM (opcional)
```sh
nvm use
```

#### 4. Instalar pacotes
```sh
npm install
```

#### 5. Rodar migrations (por default é sqlite)
```sh
npm run migrate
```

#### 5. Rodar app em ambiente de desenvolvimento
```sh
npm run dev
```

### Iniciar frontend
#### 1. Acessar pasta
```sh
cd Frontend
```

#### 2. Criar arquivo env
```sh
cp env_modelo .env
```

#### 3. Setar versão do node com NVM (opcional)
```sh
nvm use
```

#### 4. Instalar pacotes
```sh
npm install
```

#### 5. Rodar app em ambiente de desenvolvimento
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