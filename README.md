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

## Abordagens Utilizadas

- **RabbitMQ**: Utilizado para processamento assíncrono de arquivos de faturas, garantindo escalabilidade e evitando bloqueios na aplicação principal.

- **Factory Pattern**: Empregado para criação de objetos relacionados, fornecendo código limpo e modular, facilitando manutenção e extensão do sistema.

- **Repository Pattern**: Separou a lógica de acesso a dados da lógica de negócios, promovendo melhor organização do código e facilitando testes e substituições futuras.

- **Dependency Injection**: Gerenciou as dependências entre os componentes da aplicação, promovendo código modular, desacoplado e facilitando testes, configurações e trocas de implementações.
