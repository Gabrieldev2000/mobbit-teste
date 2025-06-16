# Sistema de Gestão de Telecom

Este repositório contém uma aplicação Full Stack desenvolvida para a gestão de contratos de telecomunicações, faturas e consumo para filiais de uma empresa. O sistema visa oferecer uma solução robusta e intuitiva para o controle e monitoramento de serviços de telefonia e internet.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)
- [Node.js 18+](https://nodejs.org/)
- [Angular CLI 17+](https://angular.io/cli)
- [PostgreSQL](https://www.postgresql.org/download/) ou [Docker](https://www.docker.com/products/docker-desktop/) (para rodar PostgreSQL em container)

## Configuração Inicial

### 1. Clone o Repositório

```bash
git clone [URL_DO_REPOSITÓRIO]
cd mobbit-teste
```

### 2. Configuração de Ambiente

#### 2.1 Arquivos de Configuração

O projeto utiliza arquivos de configuração que não são versionados por questões de segurança. Você precisará criar os seguintes arquivos:

**Backend:**
1. Crie um arquivo `backend/Mobbit.API/appsettings.json` com as configurações do banco de dados e e-mail:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=mobbit;Username=seu_usuario;Password=sua_senha"
  },
  "Email": {
    "SmtpServer": "smtp.seu_servidor.com",
    "SmtpPort": 587,
    "Username": "seu_email@dominio.com",
    "Password": "sua_senha",
    "From": "seu_email@dominio.com"
},
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}

```

**Frontend:**
1. Crie um arquivo `frontend/src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5253' // URL do backend
};
```

2. Crie um arquivo `frontend/src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://sua-api-producao.com' // URL do backend em produção
};
```

**Nota:** Estes arquivos são ignorados pelo `.gitignore` por conterem informações sensíveis. Cada desenvolvedor deve criar seus próprios arquivos de configuração localmente.

#### 2.2 Configuração do Banco de Dados

**PostgreSQL Local:**
1. Instale o PostgreSQL em sua máquina
2. Crie um banco de dados chamado `mobbit`
3. Configure a string de conexão no arquivo `appsettings.json` conforme mostrado acima

#### 2.3 Configuração do Serviço de Notificações

Para que o serviço de notificações funcione corretamente, configure o envio de e-mails no arquivo `appsettings.json` conforme mostrado acima.

**Nota:** Se estiver usando Gmail:
- Ative a verificação em duas etapas
- Gere uma senha de app específica
- Use essa senha no campo `Password`

### 3. Executando o Backend

```bash
cd backend/Mobbit.API
dotnet restore
dotnet ef database update
dotnet run
```

O backend estará disponível em:
- HTTPS: https://localhost:7082
- HTTP: http://localhost:5253

### 4. Executando o Frontend

```bash
cd frontend
npm install
ng serve
```

O frontend estará disponível em: http://localhost:4200

## Estrutura do Projeto

```
mobbit-teste/
├── backend/
│   ├── Mobbit.API/         # API REST
│   ├── Mobbit.Core/        # Entidades e Interfaces
│   └── Mobbit.Infrastructure/ # Implementações
└── frontend/
    └── src/
        └── app/
            ├── features/   # Módulos principais
            ├── core/       # Serviços globais
            └── shared/     # Componentes compartilhados
```

## Funcionalidades Principais

1. **Gestão de Operadoras**
   - CRUD completo de operadoras
   - Campos: ID, Nome, CNPJ, Tipo de Serviço, Contato Suporte

2. **Gestão de Contratos**
   - CRUD de contratos por filial
   - Campos: ID, Filial, Operadora, Plano, Datas, Valor, Status

3. **Registro de Faturas**
   - CRUD de faturas
   - Campos: ID, Contrato, Datas, Valor, Status

4. **Dashboard**
   - Gráficos de distribuição de faturas
   - Evolução mensal de faturas
   - Indicadores numéricos

5. **Notificações**
   - Serviço em segundo plano
   - Verifica contratos próximos do vencimento
   - Envia e-mails de notificação

## Solução de Problemas

### Problemas Comuns

1. **Erro de Conexão com o Banco**
   - Verifique se o PostgreSQL está rodando
   - Confirme as credenciais no `appsettings.json`
   - Execute `dotnet ef database update` novamente

2. **Erro no Envio de E-mails**
   - Verifique as configurações SMTP no `appsettings.json`
   - Para Gmail, use senha de app
   - Confirme se o servidor SMTP está acessível

3. **Erro no Frontend**
   - Limpe o cache: `npm cache clean --force`
   - Delete a pasta `node_modules` e execute `npm install` novamente
   - Verifique se o backend está rodando

## Observações

     para ajustar o tempo de envio de email para contratos perto do vencimento:
     pequise por esta linha:
                     private readonly TimeSpan _intervalo = TimeSpan.FromSeconds(60);
     nela podemos ajussa para a cada 24 - deixei co 5 segundos apenas para validação da funcionalidade tanto minha quanto de quem esta testando o software.

     exemplo 24 horas:  private readonly TimeSpan _intervalo = TimeSpan.FromHours(24);


## Suporte

Para suporte ou dúvidas, abra uma issue no repositório.
