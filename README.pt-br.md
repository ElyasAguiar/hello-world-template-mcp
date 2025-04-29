# MCP Template - Hello World

Um template simples de Model Context Protocol (MCP) para integrar ferramentas de IA com funcionalidades personalizadas. Este projeto foi inspirado no trabalho do [Erick Wendel](https://github.com/ErickWendel) sobre padrões de integração MCP e tem como objetivo fornecer um ponto de partida para desenvolvedores que desejam criar seus próprios servidores MCP.

## Propósito do Projeto

Este template demonstra como construir um servidor MCP que pode ser integrado com ferramentas de IA como Cursor e Claude. Ele apresenta:

- Como implementar ferramentas personalizadas que assistentes de IA podem utilizar
- Arquitetura adequada para servidores MCP
- Implementação type-safe com TypeScript e Zod
- Padrões de integração para várias ferramentas de IA

## Ferramentas Disponíveis

Este servidor MCP fornece as seguintes ferramentas:

- `hello-world`: Retorna uma mensagem de "hello world" com parâmetro de nome opcional
  - Suporta parâmetro de nome opcional para personalizar a saudação

## Coleta de Métricas

Para coletar e monitorar métricas da aplicação, você pode consultar a implementação de exemplo em [ElyasPicpay/otel_api](https://github.com/ElyasPicpay/otel_api). Este repositório demonstra como:

- Implementar OpenTelemetry para monitoramento de API
- Configurar consultas Prometheus para métricas principais
- Monitorar taxas de requisição, erros, latência e disponibilidade

Exemplos de consultas para monitoramento:

```
# Taxa de requisições por segundo (últimos 5 minutos)
sum(rate(http_requests_total[5m]))

# Percentual da taxa de erros
sum(rate(http_requests_total{status=~"5.*|4.*"}[5m])) / sum(rate(http_requests_total[5m])) * 100

# Latência no percentil 95
histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le, endpoint))
```

## Configuração

1. Certifique-se de estar usando Node.js v20+
```bash
node -v
#v20.0.0 ou superior
```

2. Clone este repositório:
```bash
git clone https://github.com/aguiardev/hello-world-template-mcp.git
cd hello-world-template-mcp
```

3. Restaure as dependências:
```bash
npm ci
```

## Integração com Ferramentas de IA

### Configuração do Cursor

1. Abra as Configurações do Cursor
2. Navegue até a seção MCP
3. Clique em "Add new MCP server"
4. Configure o servidor:
   ```
   Name = hello-world-template
   Type = command
   Command = node CAMINHO_ABSOLUTO_DO_PROJETO/src/index.ts
   ```

ou configure diretamente a partir do arquivo global MCP do Cursor localizado em `~/.cursor/mcp.json` e adicione o seguinte:

```json
{
  "mcpServers": {
    "hello-world-template": {
      "command": "node",
      "args": ["CAMINHO_ABSOLUTO_DO_PROJETO/src/index.ts"]
    }
  }
}
```

5. Certifique-se de que o chat do Cursor esteja no modo Agente, selecionando "Agent" no dropdown do canto inferior esquerdo

6. Vá para o chat e pergunte "Hello World" ou "Hello [seu nome]"

### Configuração do Claude Desktop

1. Vá para as configurações do Claude
2. Clique na aba Developer
3. Clique em edit config
4. Abra a configuração em um editor de código
5. Adicione a seguinte configuração ao seu config do Claude Desktop:

```json
{
  "mcpServers": {
    "hello-world-template": {
      "command": "node",
      "args": ["CAMINHO_ABSOLUTO_DO_PROJETO/src/index.ts"]
    }
  }
}
```

6. Salve o arquivo e reinicie o Claude Desktop
7. Abra a aba Developer novamente e verifique se está no estado "running"
8. Vá para o chat e pergunte "Hello World" ou "Hello [seu nome]"

## Desenvolvimento

### Funcionalidades

- Construído com Model Context Protocol (MCP)
- Type-safe com TypeScript e validação de esquema Zod
- Suporte nativo a TypeScript no Node.js sem transpilação
- Arquitetura modular com separação de responsabilidades
- Transporte de I/O padrão para fácil integração
- Tratamento estruturado de erros
- Compatível com Claude Desktop, Cursor e outros clientes MCP

> Nota: Este projeto requer Node.js v20+ pois utiliza o suporte nativo ao TypeScript.

### Arquitetura

O código segue uma estrutura modular:

```
src/
  ├── config/      # Configurações
  ├── types/       # Interfaces e tipos TypeScript
  ├── tools/       # Implementações de ferramentas MCP
  ├── utils/       # Funções utilitárias
  ├── services/    # Camada de serviço API
  └── index.ts     # Ponto de entrada principal
```

## Testes

Para executar a suíte de testes:

```bash
npm test
```

Para o modo de desenvolvimento com watch:

```bash
npm run test:dev
```

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para enviar um Pull Request.

## Autor

[Elyas Aguiar](https://dev.elyasaguiar.com.br)

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](./LICENSE) para detalhes.
