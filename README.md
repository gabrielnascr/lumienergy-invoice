# Invoice Extractor System

## Descrição do Problema

Empresas e consumidores frequentemente enfrentam dificuldades na gestão e análise de suas faturas de energia elétrica. Com o volume crescente de dados e a necessidade de controle rigoroso sobre os custos, torna-se essencial ter uma solução automatizada para processar e organizar essas informações. Esse software desenvolvido por mim resolve os seguintes problemas:

1. **Extração de Dados de Faturas de Energia**: Processar automaticamente as faturas de energia elétrica para extrair dados relevantes, como consumo, valor total, datas de emissão e vencimento, entre outros detalhes específicos. Esse processo elimina a necessidade de entrada manual de dados, reduzindo erros e economizando tempo(tempo = dinheiro).

2. **Organização e Armazenamento Estruturado**: Os dados extraídos são organizados e armazenados de maneira estruturada em um banco de dados PostgreSQL. Isso permite uma gestão eficiente das informações, facilitando consultas e análises detalhadas.

3. **Apresentação de Dados via API**: Disponibiliza uma API que permite a integração com aplicações web. Essa API fornece acesso aos dados de forma estruturada e segura, possibilitando que os usuários visualizem suas faturas e façam análises através de interfaces web amigáveis.

4. **Escalabilidade e Flexibilidade**: O sistema é projetado para lidar com um grande volume de dados e é facilmente adaptável a diferentes necessidades e requisitos específicos dos clientes.

5. **Dashboard Interativo**: Além disso, o software possui um dashboard interativo, onde os usuários podem enviar cargas de arquivos de faturas para processamento. Esse dashboard inclui uma tela que mostra algumas estatísticas sobre as faturas processadas e outra tela para gerenciar as faturas processadas, permitindo uma experiência completa de gerenciamento dos dados.

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

- **Docker**: Utilizado para facilitar a implantação e o gerenciamento do ambiente de desenvolviment, garantindo consistência e portabilidade.

- **Repository Pattern**: Separou a lógica de acesso a dados da lógica de negócios, promovendo melhor organização do código e facilitando testes e substituições futuras.


