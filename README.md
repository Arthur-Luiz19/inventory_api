## Sistema de controle de produção - Backend
Sistema de controle de produção industrial desenvolvido com NestJS e TypeScript. Gerencia produtos, matérias-primas e calcula capacidade de produção baseada no estoque disponível. 

## 🎨 Frontend

O frontend deste sistema está disponível em um repositório separado:

📦 **Repositório:** [sistema-controle-producao-frontend](https://github.com/Arthur-Luiz19/sistema-controle-producao-frontend)

## 🏗️ Decisão Arquitetural: Backend

O backend foi desenvolvido com **NestJS + TypeScript**, uma escolha estratégica fundamentada em:

1. **Equivalência Técnica:** injeção de dependência, módulos, decorators, ORM.

2. **Excelência na Entrega:** Optei por utilizar uma stack que domino profundamente 
   para garantir código de alta qualidade, testável e bem documentado, em vez de 
   comprometer a qualidade com uma curva de aprendizado durante o prazo do teste.

3. **Coerência Full-Stack:** Com o frontend em React + TypeScript, o NestJS permitiu 
   uma stack homogênea, facilitando compartilhamento de tipos e reduzindo overhead 
   cognitivo.

4. **Type-Safety:** TypeScript oferece tipagem estática com 
   iteração mais rápida e ecossistema moderno.


# Índice
- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Estrutura do Banco de Dados](#estrutura-do-banco-de-dados)
- [Testes](#testes)
- [Contato](#contato)

## 📖 Sobre o Projeto
Este sistema foi desenvolvido para uma indústria que necessita controlar o estoque de insumos (matérias-primas) necessários para a produção de itens fabricados.

### ✨ Funcionalidades Principais

| Funcionalidade | Descrição |
|----------------|-----------|
| CRUD de Produtos | Cadastro, edição e exclusão de produtos com nome e valor |
| CRUD de Matérias-Primas | Gerenciamento de insumos com controle de quantidade em estoque |
| Associações | Vinculação de matérias-primas aos produtos com quantidades necessárias |
| Capacidade de Produção | Cálculo automático de quantos produtos podem ser fabricados com o estoque atual |
| Registro de Produção | Baixa automática de matérias-primas ao registrar produção |

## 🛠️ Tecnologias

| Tecnologia | Finalidade |
|------------|------------|
| Node.js | Runtime JavaScript |
| NestJS | Framework backend |
| TypeScript | Linguagem tipada |
| PostgreSQL | Banco de dados relacional |
| TypeORM | ORM para banco de dados |
| Jest | Framework de testes |
| Express | Servidor HTTP (via NestJS) |

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- Node.js (versão 18 ou superior)
- npm ou yarn
- PostgreSQL (versão 14 ou superior)

### Verificar Instalação

```bash
node --version    # Deve retornar v18.x ou superior
npm --version     # Deve retornar 8.x ou superior
psql --version    # Deve retornar 14.x ou superior
```

## 📊 Estrutura do Banco de Dados

### Diagrama Entidade-Relacionamento

### Tabelas e Campos

**products**
- `id` (PK) - Identificador único do produto
- `name` - Nome do produto
- `price` - Preço unitário do produto
- `quantity` - Quantidade em estoque
- `createdAt` - Data de criação do registro
- `updatedAt` - Data da última atualização

**raw_materials**
- `id` (PK) - Identificador único da matéria-prima
- `name` - Nome da matéria-prima
- `quantityAvailable` - Quantidade disponível em estoque
- `createdAt` - Data de criação do registro
- `updatedAt` - Data da última atualização

**product_raw_materials** (tabela de associação)
- `id` (PK) - Identificador único da associação
- `product_id` (FK) - Referência ao produto
- `raw_material_id` (FK) - Referência à matéria-prima
- `quantityRequired` - Quantidade necessária da matéria-prima para produzir uma unidade do produto
- `createdAt` - Data de criação do registro
- `updatedAt` - Data da última atualização

## 🧪 Testes

### Testes Unitários

```bash
# Rodar todos os testes
npm run test

# Rodar em modo watch
npm run test:watch

# Rodar com coverage
npm run test:cov
```

## 📫 Contato

| Canal | Link |
|-------|------|
| Desenvolvedor | [Arthur Luiz da Silva] |
| Email | [arthur.luiz11@hotmail.com] |
| LinkedIn | [linkedin.com/in/arthur-luiz-da-silva](https://linkedin.com/in/arthur-luiz-da-silva) |
| GitHub | [github.com/Arthur-Luiz19](https://github.com/Arthur-Luiz19) |
