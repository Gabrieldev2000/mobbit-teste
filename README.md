# Sistema de Gestão de Telecom

Este repositório contém uma aplicação Full Stack desenvolvida para a gestão de contratos de telecomunicações, faturas e consumo para filiais de uma empresa. O sistema visa oferecer uma solução robusta e intuitiva para o controle e monitoramento de serviços de telefonia e internet.

## Objetivo do Projeto

O objetivo principal deste projeto é demonstrar a capacidade de desenvolver uma aplicação Full Stack seguindo boas práticas de engenharia de software. A aplicação permite o gerenciamento completo de operadoras, contratos e faturas, além de fornecer um dashboard interativo para análise de dados e um serviço de notificação em segundo plano.

## Descrição do Desafio

O desafio consistiu em criar um Sistema de Gestão de Telecom que permite à empresa controlar todos os aspectos dos contratos de telefonia e internet de suas filiais. Para isso, a aplicação foi estruturada com as seguintes funcionalidades essenciais:

## Funcionalidades Detalhadas

Cada funcionalidade foi implementada pensando na usabilidade e na conformidade com as regras de negócio:

### 1. Gestão de Operadoras
Módulo completo para gerenciar as operadoras de telecomunicações (e.g., Vivo, Claro, TIM).
*   **Ações Disponíveis**: Criar novas operadoras, editar informações existentes, listar todas as operadoras (com filtros por tipo de serviço e status ativo/inativo) e excluir operadoras.
*   **Campos Essenciais**:
    *   `ID` (Identificador único)
    *   `Nome da Operadora` (Nome comercial da operadora)
    *   `CNPJ` (Cadastro Nacional da Pessoa Jurídica - **Único**: não permite duplicidade)
    *   `Tipo de Serviço` (Permite seleção múltipla entre Móvel, Fixo, Internet através de um sistema de bitmask, garantindo flexibilidade)
    *   `Contato Suporte` (Informações de contato para suporte técnico da operadora)
    *   `Data de Cadastro` (Registro automático da data de criação)
    *   `Status` (Indicador se a operadora está `Ativa` ou `Inativa`)
*   **Regras de Negócio Importantes**:
    *   Um CNPJ não pode ser reutilizado por outra operadora já cadastrada.
    *   Uma operadora **não pode ser inativada ou excluída** se ela possuir contratos que ainda estão **ativos** vinculados a ela. Isso previne inconsistências de dados e garante a integridade referencial.

### 2. Gestão de Contratos
Módulo para cadastrar e controlar os contratos de telecomunicações associados a cada filial da empresa.
*   **Ações Disponíveis**: Criar novos contratos, editar detalhes de contratos existentes, listar todos os contratos (com filtros por operadora e status) e excluir contratos.
*   **Campos Essenciais**:
    *   `ID` (Identificador único)
    *   `Nome da Filial` (Filial da empresa à qual o contrato pertence)
    *   `Operadora` (Associação com uma Operadora previamente cadastrada, garantindo o relacionamento)
    *   `Plano Contratado` (Descrição do plano de serviço, ex: "Fibra 300MB")
    *   `Data de Início` (Data de ativação do contrato)
    *   `Data de Vencimento` (Data em que o contrato expira ou renova)
    *   `Valor Mensal` (Custo fixo mensal do contrato)
    *   `Status` (Indicador se o contrato está `Ativo` ou `Inativo`)
    *   `Data de Cadastro` (Registro automático da data de criação do contrato)
*   **Regras de Negócio Importantes**:
    *   Um contrato **não pode ser excluído** se existirem faturas vinculadas a ele, mantendo o histórico financeiro intacto.

### 3. Registro de Faturas
Módulo para cadastrar e gerenciar as faturas mensais geradas para cada contrato.
*   **Ações Disponíveis**: Criar novas faturas, editar detalhes de faturas existentes, listar todas as faturas (com filtro por status) e excluir faturas.
*   **Campos Essenciais**:
    *   `ID` (Identificador único)
    *   `Contrato` (Associação com o Contrato ao qual a fatura pertence)
    *   `Data de Emissão` (Data em que a fatura foi gerada)
    *   `Data de Vencimento` (Data limite para pagamento da fatura)
    *   `Valor Cobrado` (Valor total da fatura)
    *   `Status` (Indicador do estado da fatura: `Paga`, `Pendente`, `Atrasada`)
    *   `Data de Pagamento` (Registrada automaticamente quando o status da fatura é alterado para `Paga`)
*   **Funcionalidades Adicionais**:
    *   A aplicação inclui uma funcionalidade para calcular automaticamente o **valor total de gastos** da empresa no mês, agregando os valores das faturas.

### 4. Dashboard Interativo
Uma interface de dashboard no frontend que fornece insights visuais sobre os dados de telecom.
*   **Gráficos Disponíveis (utilizando Chart.js)**:
    *   **Gráfico de Pizza**: Exibe a distribuição percentual das faturas por seu status (`Paga`, `Pendente`, `Atrasada`), oferecendo uma visão rápida da saúde financeira.
    *   **Gráfico de Barras**: Mostra a evolução mensal do total de faturas emitidas e pagas ao longo do último ano, permitindo acompanhar tendências.
*   **Indicadores Numéricos (Cards)**:
    *   `Total de Faturas Emitidas`: Número total de faturas registradas no sistema.
    *   `Valor Total Faturado`: Soma de todos os valores cobrados nas faturas.
    *   `Faturas Pendentes`: O card apenas indica a categoria "Faturas Pendentes", sem exibir um valor numérico específico.

### 5. Notificações de Vencimento (Serviço em Segundo Plano)
Um serviço assíncrono (Background Service) no backend que automatiza o processo de alerta para contratos próximos do vencimento.
*   **Mecanismo**: Verifica periodicamente (configurável, **atualmente a cada 5 segundos para fins de teste/validação**) se há contratos que estão `Ativos` e que vencerão nos próximos 5 dias.
*   **Disparo de E-mail**: Para cada contrato que atende a essa condição, um e-mail de notificação é enviado para o contato de suporte da operadora associada ao contrato.
*   **Configuração Necessária**: Para que o envio de e-mails funcione, é crucial configurar as credenciais SMTP (servidor, porta, usuário, senha e remetente) no arquivo `appsettings.json` do backend.

## Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias e frameworks:

### Backend
*   **.NET Core 6+ (C#)**: Framework robusto para o desenvolvimento da API RESTful.
*   **Entity Framework Core**: ORM (Object-Relational Mapper) para interagir com o banco de dados, facilitando operações de CRUD.
*   **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional, conhecido por sua robustez e escalabilidade.
*   **API RESTful**: Arquitetura da API para comunicação eficiente entre frontend e backend.
*   **Boas Práticas**: Implementação com foco em SOLID, Clean Code e modularização para um código legível e de fácil manutenção.

### Frontend
*   **Angular 17+**: Framework JavaScript para a construção da interface do usuário, proporcionando uma Single Page Application (SPA).
*   **Angular Material UI**: Biblioteca de componentes de UI que segue as diretrizes do Material Design, garantindo um design moderno e responsivo.
*   **Chart.js**: Biblioteca JavaScript para renderização de gráficos interativos no dashboard.
*   **Formulários Reativos**: Utilizados para o gerenciamento de estados de formulário, validações e interações.
*   **Pipes Customizados**: Desenvolvimento de pipes para formatação e exibição de dados complexos, como tipos de serviço e status.

## Estrutura do Projeto

A estrutura do projeto está organizada em duas principais áreas, `backend` e `frontend`, para promover a separação de responsabilidades e facilitar o desenvolvimento:

```
Mobbit/
├── backend/                 # Contém a API RESTful desenvolvida em .NET Core.
│   ├── Mobbit.API/         # Projeto principal da API, incluindo controllers e a configuração dos serviços de background.
│   ├── Mobbit.Core/        # Camada de domínio que define Entidades (modelos de dados), DTOs (Data Transfer Objects) e Interfaces de repositório e serviços.
│   ├── Mobbit.Infrastructure/ # Camada de infraestrutura que contém as implementações dos repositórios, serviços (como NotificacaoService) e o contexto do banco de dados (EF Core).
│   └── Mobbit.Tests/       # Projeto dedicado a testes unitários e de integração do backend.
│
└── frontend/               # Contém a aplicação Single Page Application (SPA) desenvolvida em Angular.
    ├── src/                # Código fonte da aplicação Angular.
    │   ├── app/            # Módulos principais da aplicação, divididos em features (operadoras, contratos, faturas, dashboard), core (serviços globais, modelos) e shared (componentes reutilizáveis).
    │   ├── assets/         # Recursos estáticos como imagens, ícones, etc.
    │   └── environments/   # Arquivos de configuração de ambiente (produção, desenvolvimento).
    └── package.json        # Gerencia as dependências do Node.js e scripts do projeto frontend.
```

## Requisitos de Sistema

Para clonar, configurar e executar este projeto em sua máquina local, você precisará ter as seguintes ferramentas instaladas:

*   **SDK do .NET Core 6** ou versão superior.
*   **Node.js 18+**.
*   **Angular CLI 17+**.
*   **PostgreSQL**: Recomendado para um ambiente de desenvolvimento persistente. O projeto também suporta EF Core In-Memory Database para testes rápidos e desenvolvimento sem a necessidade de um servidor de banco de dados externo.

## Como Executar o Projeto (Guia Passo a Passo)

Siga estas instruções detalhadas para configurar e iniciar as partes do backend e frontend da aplicação.

### 1. Configuração e Execução do Backend (API .NET Core)

1.  **Abra seu Terminal ou Prompt de Comando**: Navegue até o diretório raiz do projeto backend.
    ```bash
    cd backend/Mobbit.API
    ```

2.  **Configurações da Aplicação (`appsettings.json`)**
    O arquivo `appsettings.json` é fundamental para configurar o comportamento da aplicação .NET Core. Ele contém:
    *   **`ConnectionStrings`**: Informações de conexão com o banco de dados.
    *   **`Email`**: Credenciais e detalhes do servidor SMTP para o envio de e-mails.
    *   **`Logging`**, `AllowedHosts`, entre outras configurações gerais.
    É recomendável utilizar o `appsettings.Development.json` para configurações específicas do ambiente de desenvolvimento, pois ele sobrescreve as configurações do `appsettings.json` principal.

3.  **Iniciando o Banco de Dados PostgreSQL (Exemplo com Docker)**
    Se você optar por usar PostgreSQL (recomendado para persistência), certifique-se de que uma instância do servidor esteja rodando.
    Uma forma rápida e eficiente de iniciar um servidor PostgreSQL para desenvolvimento é usando Docker:
    *   **Pré-requisito**: Tenha o [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e rodando.
    *   **Executar o Container PostgreSQL**:
        Abra um terminal e execute o seguinte comando:
        ```bash
        docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
        ```
        *   `--name some-postgres`: Nomeia o seu container (opcional, mas recomendado).
        *   `-e POSTGRES_PASSWORD=mysecretpassword`: Define a senha para o usuário `postgres`. **Altere `mysecretpassword` para uma senha forte!**
        *   `-p 5432:5432`: Mapeia a porta 5432 do seu host para a porta 5432 do container PostgreSQL.
        *   `-d postgres`: Baixa a imagem oficial do PostgreSQL (se ainda não tiver) e executa-a em segundo plano.
    *   **Para parar o container (quando terminar o uso):**
        ```bash
        docker stop some-postgres
        docker rm some-postgres # Opcional: para remover o container
        ```

4.  **Configurar a Conexão com o Banco de Dados:**

    *   **Para PostgreSQL:**
        *   Abra o arquivo `appsettings.json` (ou `appsettings.Development.json`) localizado em `backend/Mobbit.API/`.
        *   Localize a seção `"ConnectionStrings"` e atualize o valor de `"DefaultConnection"` com suas credenciais do PostgreSQL. Se você usou o Docker conforme o exemplo acima, a string seria similar a esta:
            ```json
            {
              "ConnectionStrings": {
                "DefaultConnection": "Host=localhost;Port=5432;Database=mobbitdb;Username=postgres;Password=mysecretpassword"
              },
              // ... outras configurações
            }
            ```
        *   **Aplicação das Migrações**: O projeto está configurado para aplicar as migrações automaticamente na inicialização da aplicação em ambiente de desenvolvimento. No entanto, para garantir que o esquema do banco de dados esteja atualizado, você pode executar o comando de atualização do banco de dados manualmente a partir do diretório `backend/Mobbit.API/`:
            ```bash
            dotnet ef database update
            ```
            Este comando criará ou atualizará o esquema do banco de dados no PostgreSQL conforme definido pelas suas entidades do Entity Framework Core.

    *   **Para EF Core In-Memory Database (Apenas para Desenvolvimento Rápido/Testes):**
        *   Não é necessária nenhuma configuração de banco de dados externa. O banco de dados será criado e populado em memória sempre que a aplicação for iniciada. Os dados não persistem entre as execuções.
        *   Para garantir que esta opção seja usada e evitar conflitos com a string de conexão PostgreSQL, você pode comentar ou remover a `ConnectionStrings:DefaultConnection` no `appsettings.json` (ou `appsettings.Development.json`).

5.  **Configurar o Serviço de Notificações por E-mail:**
    *   Para que o serviço de notificação de vencimentos possa enviar e-mails, você precisa fornecer as credenciais SMTP.
    *   No mesmo arquivo `appsettings.json` (ou `appsettings.Development.json`), adicione a seguinte seção `Email` com os detalhes da sua conta de e-mail (exemplo: Gmail):
        ```json
        {
          // ... outras configurações
          "Email": {
            "SmtpServer": "smtp.gmail.com",
            "SmtpPort": 587,
            "Username": "seuemail@gmail.com",
            "Password": "SUA_SENHA_DE_APP_OU_SENHA_NORMAL",
            "From": "seuemail@gmail.com"
          }
        }
        ```
    *   **Ponto Crucial (Gmail com 2FA)**: Se você possui a Verificação em Duas Etapas (2FA) ativada em sua conta Gmail (o que é altamente recomendado por segurança), você **NÃO DEVE usar sua senha normal do Gmail** aqui. Em vez disso, você precisará gerar uma **"Senha de App"** específica para o seu aplicativo no Google. Visite sua [Conta do Google](https://myaccount.google.com/) -> Segurança -> Senhas de app para gerar uma. Use essa senha de 16 caracteres no campo `"Password"`.

6.  **Restaurar Dependências e Iniciar o Backend:**
    *   No terminal (ainda no diretório `backend/Mobbit.API`), execute os seguintes comandos:
        ```bash
        dotnet restore  # Baixa e restaura todas as dependências do projeto .NET
        dotnet run      # Compila e executa a aplicação da API
        ```
    *   Após a execução bem-sucedida, a API estará acessível. Geralmente, ela inicia em `https://localhost:7082` (HTTPS) e `http://localhost:5253` (HTTP). O Swagger UI (documentação interativa da API) estará disponível na rota raiz da sua URL (ex: `https://localhost:7082/`).

### 2. Configuração e Execução do Frontend (Aplicação Angular)

1.  **Abra um Novo Terminal ou Prompt de Comando**: Navegue até o diretório raiz do projeto frontend.
    ```bash
    cd frontend
    ```

2.  **Instalar as Dependências do Node.js:**
    *   Execute o comando para baixar e instalar todas as dependências do Angular e de outras bibliotecas:
        ```bash
        npm install
        ```
        Este processo pode levar alguns minutos, dependendo da sua conexão com a internet.

3.  **Iniciar a Aplicação Angular:**
    *   Após a instalação das dependências, execute o comando para iniciar o servidor de desenvolvimento do Angular:
        ```bash
        ng serve
        ```
    *   O Angular CLI compilará o projeto e o servidor estará disponível. O frontend poderá ser acessado no seu navegador em `http://localhost:4200` por padrão.

## Critérios de Avaliação (Conforme o Desafio Original)

Este projeto foi desenvolvido considerando os seguintes critérios de avaliação:

*   **Qualidade do Código**: Foco na legibilidade, organização e aplicação de boas práticas de desenvolvimento (como princípios SOLID, Clean Code).
*   **Estrutura do Projeto**: Adere à separação de camadas e modularização para facilitar a manutenção e escalabilidade.
*   **Funcionalidade**: Capacidade de atender e executar todos os requisitos e funcionalidades descritas na seção "Funcionalidades Detalhadas".
*   **Uso Correto de Tecnologias**: Demonstração da aplicação correta e eficiente do Angular, .NET e PostgreSQL (ou EF Core In-Memory).

## Como Contribuir

Contribuições são muito bem-vindas! Se você deseja colaborar com este projeto, siga estas etapas:

1.  **Faça um Fork** deste repositório para sua própria conta GitHub.
2.  **Clone o seu Fork** para sua máquina local.
3.  **Crie uma Nova Branch** para sua feature ou correção:
    ```bash
    git checkout -b feature/sua-nova-funcionalidade # Para novas funcionalidades
    # ou
    git checkout -b fix/correcao-de-bug             # Para correção de bugs
    ```
4.  **Implemente suas Mudanças** e faça commits de forma clara e atômica.
    ```bash
    git commit -m 'feat: adiciona [descrição concisa da funcionalidade]'
    # ou
    git commit -m 'fix: corrige [descrição concisa do bug]'
    ```
5.  **Envie as Mudanças** para sua branch no seu repositório bifurcado:
    ```bash
    git push origin feature/sua-nova-funcionalidade
    ```
6.  **Abra um Pull Request (PR)** da sua branch para a branch `main` (ou `master`) deste repositório. Descreva suas alterações detalhadamente no PR.
