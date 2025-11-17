# Setup Local do Banco de Dados

## Iniciando o MongoDB Local com Docker Compose

### Pré-requisitos
- Docker e Docker Compose instalados

### Executar o banco de dados local

```bash
docker-compose up -d
```

Isso vai iniciar o MongoDB local na porta `27017` com:
- **Usuário:** root
- **Senha:** password
- **Banco de dados padrão:** vivavox

### Verificar se está rodando

```bash
docker-compose ps
```

Para ver os logs:

```bash
docker-compose logs -f mongodb
```

## Configuração de Ambientes

### Desenvolvimento (Local)
O `.env` está configurado para usar o banco de dados local quando `NODE_ENV=dev`:

```
NODE_ENV=dev
DEV_DB_CONNECTION_STRING=mongodb://root:password@localhost:27017/vivavox?authSource=admin
```

### Produção
Para usar a conexão de produção, altere o `.env` para:

```
NODE_ENV=prod
PROD_DB_CONNECTION_STRING="url-prod"
```

## Rodar o servidor

```bash
npm start
```

O servidor conectará automaticamente ao banco de dados baseado no valor de `NODE_ENV`.

## Populating the Database with Seed Data

After starting the MongoDB container, you need to seed the database with initial data (default board, cells, etc.):

```bash
cd server
npm run seed
```

This will create:
- **Board "Padrão 1"** - The default board required for user signup
- **12 sample cells** - With Portuguese text and ARASAAC pictograms

Output example:
```
🌱 Iniciando seed do banco de dados em modo dev...
✅ Conectado ao MongoDB
🗑️  Limpando dados existentes...
✅ Dados antigos removidos
📝 Criando células...
✅ 12 células criadas
📋 Criando board padrão...
✅ Board "Padrão 1" criado com sucesso

🎉 Seed concluído com sucesso!
```

After seeding, users will be able to sign up successfully with the default board automatically assigned.

## Parar o banco de dados

```bash
docker-compose down
```

Para remover os dados também:

```bash
docker-compose down -v
```

## Conectar ao MongoDB Local via CLI

Se você quiser acessar o banco de dados diretamente:

```bash
docker-compose exec mongodb mongosh -u root -p password --authenticationDatabase admin
```

Dentro do shell:

```js
use vivavox
db.collections()
```
