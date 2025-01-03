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
#### 1. Instalar pacotes
```sh
cd backend && npm install

```
#### 2. Rodar migrations
```sh
npm run migrate
```
#### 3. Rodar ambiente de desenvolvimento
```sh
npm run dev
```

## Iniciar frontend
#### 1. Instalar pacotes
```sh
cd Frontend && npm install

```
#### 3. Rodar ambiente de desenvolvimento
```sh
npm run dev
```

### Extensão para o VSCODE
- [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)