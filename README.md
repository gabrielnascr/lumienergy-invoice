# Projeto Teste Técnico Lumi

Este é o projeto de teste técnico para a vaga de Desenvolvedor Full Stack Pleno na Lumi. O projeto é construído utilizando Node.js, Express, RabbitMQ e Docker.

## Pré-requisitos

Antes de rodar o projeto, certifique-se de ter o seguinte instalado em sua máquina:

- Docker
- Docker Compose

## Configuração

1. Dentro da pasta 'server' Renomeie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente conforme necessário.

## Instalação

O projeto já possui um Dockerfile que define o ambiente de execução. Não é necessário instalar nada além do Docker e do Docker Compose.

## Execução

Para rodar o projeto, utilize o script `start-script.sh`. Este script inicia os serviços Docker em modo de desenvolvimento.

```bash
./start-script.sh
```
