# Guia de Métricas para API

Este documento contém as principais métricas que devem ser monitoradas em nossa API e as respectivas consultas (queries) Prometheus.

## Principais Métricas e Consultas

### 1. Taxa de Requisições (Request Rate)
```
# Taxa de requisições por segundo nos últimos 5 minutos
sum(rate(flaskapp_http_requests_total[5m]))

# Taxa de requisições por endpoint
sum by(endpoint) (rate(flaskapp_http_requests_total[5m]))
```

### 2. Erros e Taxa de Erros
```
# Total de erros nos últimos 15 minutos
sum(increase(flaskapp_http_requests_total{status=~"5.*|4.*"}[15m]))

# Taxa de erros (porcentagem)
sum(rate(flaskapp_http_requests_total{status=~"5.*|4.*"}[5m])) / sum(rate(flaskapp_http_requests_total[5m])) * 100
```

### 3. Latência/Tempo de Resposta
Para métricas de latência (requer implementação adicional):
```
# 95º percentil de latência
histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le, endpoint))

# Latência média
sum(rate(http_request_duration_seconds_sum[5m])) / sum(rate(http_request_duration_seconds_count[5m]))
```

### 4. Disponibilidade (SLI)
```
# Taxa de sucesso (disponibilidade)
sum(rate(flaskapp_http_requests_total{status=~"2.*"}[5m])) / sum(rate(flaskapp_http_requests_total[5m])) * 100
```

### 5. Volume de Tráfego
```
# Total de requisições por endpoint nas últimas 24h
sum by(endpoint) (increase(flaskapp_http_requests_total[24h]))
```

### 6. Códigos de Status
```
# Distribuição de códigos de status
sum by(status) (rate(flaskapp_http_requests_total[5m]))
```

### 7. Requisições por Método HTTP
```
# Requisições por método
sum by(method) (rate(flaskapp_http_requests_total[5m]))
```

### 8. Detecção de Picos (Spikes)
```
# Detecção de picos anômalos (comparação com a mesma hora do dia anterior)
sum(rate(flaskapp_http_requests_total[5m])) / sum(rate(flaskapp_http_requests_total[5m] offset 1d)) > 1.5
```

## Notas Importantes

- A função `increase()` retorna o aumento absoluto (em números inteiros) do contador durante o período especificado, não um percentual.
- A função `rate()` é usada para calcular a taxa (média por segundo) durante o período especificado.
- Para implementar todas estas métricas, seriam necessários exportadores adicionais, especialmente para métricas como latência.

## Rotas da API

- `/health` - Verificação de saúde da aplicação
- `/sum` - Soma dois números passados como parâmetros
- `/prometheus` - Endpoint para coleta de métricas pelo Prometheus
