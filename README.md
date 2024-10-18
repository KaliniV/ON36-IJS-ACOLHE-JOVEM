![imagem-ACOLHE](./imagem/ACOLHEJOVEM.jpg)

<div align="center">

# AcolheJovem

</div>

**AcolheJovem** é uma aplicação que tem como objetivo conectar adolescentes a profissionais voluntários que oferecem suporte psicológico gratuito. O projeto busca criar um ambiente seguro onde adolescentes entre 13 e 17 anos possam acessar informações sobre psicólogos disponíveis e seus contatos para marcar uma consulta.

## Índice

1. [Objetivos do Projeto](#objetivos-do-projeto)
2. [Arquitetura](#arquitetura)
3. [Tecnologias Utilizadas](#tecnologias-utilizadas)
4. [Instalação e Execução Local](#instalação-e-execução-local)
5. [Banco de Dados](#banco-de-dados)
6. [Documentação da API](#documentação-da-api)
7. [Rotas da API](#rotas-da-api)
8. [Deploy](#deploy)
9. [Contribuição](#contribuição)

## Objetivos do Projeto

Este projeto tem como foco os seguintes objetivos:

- Oferecer uma plataforma onde adolescentes possam acessar psicólogos voluntários.
- Estimular o suporte emocional a adolescentes em situação de vulnerabilidade, alinhando-se com os **Objetivos de Desenvolvimento Sustentável (ODS)** da ONU, em especial, o ODS 3 (Saúde e Bem-estar).
- Disponibilizar as informações de contato dos profissionais, facilitando o agendamento de consultas.

## Arquitetura

A aplicação segue a **Arquitetura Hexagonal**, ou **Ports and Adapters**, que busca isolar as regras de negócio do sistema de detalhes de infraestrutura, como banco de dados, interface de usuário ou APIs externas.

### Arquitetura Hexagonal (Ports and Adapters)

```plaintext
             +--------------------+                      +--------------------+
             |         DB         |                      |      REST API      |
             +--------------------+                      +--------------------+
                     |                                               |
                     v                                               v
             +---------------------------------------------------------------+
             |                          Portas                               |
             |---------------------------------------------------------------|
             |  - jovem-repository.port.ts                                   |
             |  - voluntario-repository.port.ts                              |
             +---------------------------------------------------------------+
                     |                        |                        |
                     v                        v                        v
+-------------------------------------------------------------------------------------------+
|                                       Núcleo (Domínio)                                    |
|-------------------------------------------------------------------------------------------|
|  - Entities (jovem.entity.ts, voluntario.entity.ts)                                       |
|  - Enums (abordagem.enum.ts, genero.enum.ts, especialidade.enum.ts)                       |
+-------------------------------------------------------------------------------------------+
                     |                        |                        |
                     v                        v                        v
             +---------------------------------------------------------------+
             |                       Adaptadores                             |
             |---------------------------------------------------------------|
             |  Controllers:                                                 |
             |     - jovens.controller.ts                                    |
             |     - voluntarios.controller.ts                               |
             |                                                               |
             |  Services:                                                    |
             |     - jovens.service.ts                                       |
             |     - voluntarios.service.ts                                  |
             |                                                               |
             |  Repositories:                                                |
             |     - jovem.repository.ts                                     |
             |     - voluntario.repository.ts                                |
             |                                                               |
             |  DTOs:                                                        |
             |     - atualizar-jovem.dto.ts                                  |
             |     - cadastrar-jovem.dto.ts                                  |
             |     - cadastrar-voluntario.dto.ts                             |
             +---------------------------------------------------------------+
```

## Explicação da Arquitetura Hexagonal

### Núcleo (Domínio)

- Contém as entidades (`jovem.entity.ts`, `voluntario.entity.ts`) e enums que representam as regras de negócio e objetos essenciais para o sistema.
- Essa camada é independente de detalhes de infraestrutura e representa o coração da aplicação.

### Portas

- Definem os contratos e interfaces para comunicação com o núcleo.
- Os arquivos `jovem-repository.port.ts` e `voluntario-repository.port.ts` são os pontos de entrada para interação com os repositórios, fornecendo interfaces para as operações permitidas no núcleo.

### Adaptadores

- **Controllers**: Lidam com a interação externa (API) e direcionam as chamadas para os serviços.
  - Arquivos: `jovens.controller.ts`, `voluntarios.controller.ts`
- **Services**: Contêm a lógica de aplicação, utilizando os repositórios para acessar ou modificar os dados.
  - Arquivos: `jovens.service.ts`, `voluntarios.service.ts`
- **Repositories**: Implementam a persistência dos dados, conectando-se ao banco de dados ou outra camada de armazenamento.
  - Arquivos: `jovem.repository.ts`, `voluntario.repository.ts`
- **DTOs**: Usados para transferir dados entre as camadas, assegurando que os dados corretos são enviados e recebidos.
  - Arquivos: `atualizar-jovem.dto.ts`, `cadastrar-jovem.dto.ts`, `cadastrar-voluntario.dto.ts`

# Principais Camadas

- **Core**: Responsável pelas regras de negócio, isolada de detalhes técnicos.
- **Ports**: Interfaces que permitem que o sistema se conecte com outras partes, como repositórios.
- **Adapters**: Implementam os ports, permitindo a comunicação com infraestrutura, como banco de dados.

## Tecnologias Utilizadas

- **Node.js** com **NestJS**: Framework para a construção da API.
- **PostgreSQL**: Banco de dados relacional.
- **TypeORM**: ORM utilizado para facilitar a manipulação do banco de dados.
- **Docker**: Utilizado para contêineres de banco de dados e aplicação.
- **AWS**: Deploy da aplicação.
- **Swagger**: Documentação da API.

## Instalação e Execução Local

### Pré-requisitos

- **Docker** instalado.
- **Node.js** versão 16 ou superior.
- **npm** ou **yarn** para gerenciar pacotes.

### Passos para rodar localmente

1. Clone o repositório:

   ```bash
   git clone https://github.com/KaliniV/ON36-IJS-ACOLHE-JOVEM
   cd ON36-IJS-ACOLHE-JOVEM

   ```

2. Instale as dependências:

   ```bash
    npm install
   ```

3. Configure as variáveis de ambiente no arquivo `.env`. Exemplo:

   ```bash
    DB_HOST='acolhe_jovem_postgres_container'
    DB_PORT='5432'
    DB_USER='postgres'
    DB_PASSWORD='123456'
    DB_DATABASE='acolhe_jovem'
    DATABASE_URL="postgresql://postgres:123456@acolhe_jovem_postgres_container:5432/acolhe_jovem?schema=public"
   ```

4. Execute o Docker:

   ```bash

   docker compose up -d --build

   ```

5. Inicie o servidor:
   ```bash
    npm run start:dev
   ```

O servidor estará rodando em: `http://localhost:3001`.

---

## Banco de Dados

A aplicação utiliza **PostgreSQL** como banco de dados, gerenciado via **TypeORM**. Certifique-se de que as configurações do banco de dados estejam corretas no arquivo `.env`.

## Documentação da API

A documentação completa das rotas da API está disponível via **Swagger**. Após iniciar o servidor, você pode acessar a documentação no seguinte endpoint:

bash

Copiar código

`http://localhost:3001/api#/`

### Exemplos de Rotas:

- `POST /jovens/cadastrar-jovem`: Cadastra um novo jovem.
- `GET /jovens/{id}`: Visualiza os dados de um jovem.
- `PATCH /jovens/atualizar-jovem/{id}`: Atualiza os dados de um jovem.
- `DELETE /jovens/deletar-jovem/{id}`: Altera o status de um jovem.

---

## Rotas da API

As rotas da API estão separadas em dois grupos principais: **Jovens** e **Voluntários**.

- **Jovens**:

- `POST /jovens/cadastrar-jovem`
- `GET /jovens/{id}`
- `PATCH /jovens/atualizar-jovem/{id}`
- `DELETE /jovens/deletar-jovem/{id}`

- **Voluntários**:

- `POST /voluntarios/cadastrar-voluntario`
- `GET /voluntarios`
- `PATCH /voluntarios/atualizar-voluntario/{id}`
- `DELETE /voluntarios/deletar-voluntario/{id}`

---

## Deploy

A aplicação foi implantada na AWS utilizando **EC2** e **Docker**. A documentação da API pode ser acessada no link:

- **URL da API**: [AcolheJovem API - AWS](http://54.233.35.72:3001/api#)

---

## Link para o repositório no GitHub

- [AcolheJovem - Repositório GitHub](https://github.com/KaliniV/ON36-IJS-ACOLHE-JOVEM)

---

## Contribuição

Se você deseja contribuir com o projeto, por favor, siga as etapas abaixo:

1.  Fork este repositório.
2.  Crie uma branch com a nova feature ou correção de bug (`git checkout -b feature/nome-da-feature`).
3.  Faça commit das alterações (`git commit -m 'Adiciona nova feature'`).
4.  Envie as alterações (`git push origin feature/nome-da-feature`).
5.  Abra um pull request.

---
