# Sistema de Gestão de Telecom

Sistema desenvolvido para gerenciamento de contratos de telecomunicações, faturas e consumo de telecom.

## Tecnologias Utilizadas

### Backend
- .NET Core 6+
- Entity Framework Core
- PostgreSQL
- C#

### Frontend
- Angular 17+
- Bootstrap/Material UI
- Chart.js/amCharts

## Estrutura do Projeto

```
Mobbit/
├── backend/                 # API .NET Core
│   ├── Mobbit.API/         # Projeto da API
│   ├── Mobbit.Core/        # Entidades e Interfaces
│   ├── Mobbit.Infrastructure/ # Implementações e Contexto
│   └── Mobbit.Tests/       # Testes Unitários
│
└── frontend/               # Aplicação Angular
    ├── src/
    │   ├── app/
    │   ├── assets/
    │   └── environments/
    └── package.json
```

## Requisitos

- .NET Core 6 SDK
- Node.js 18+
- Angular CLI 17+
- PostgreSQL (opcional para desenvolvimento)

## Como Executar

### Backend

1. Navegue até a pasta do backend:
```bash
cd backend/Mobbit.API
```

2. Restaure as dependências:
```bash
dotnet restore
```

3. Execute a aplicação:
```bash
dotnet run
```

### Frontend

1. Navegue até a pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Execute a aplicação:
```bash
ng serve
```

## Funcionalidades

- Gestão de Operadoras
- Gestão de Contratos
- Gestão de Faturas
- Dashboard com Gráficos
- Notificações de Vencimento (Opcional)

## Banco de Dados

O projeto utiliza PostgreSQL como banco de dados principal. Para desenvolvimento local, é possível utilizar o EF Core In-Memory Database.

## Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request 