# Cypress SauceDemo Framework

### Automação de Testes E2E | Cypress + JavaScript

Projeto de automação de testes funcionais End-to-End (E2E) da aplicação [SauceDemo](https://www.saucedemo.com/), desenvolvido com Cypress e JavaScript.

O projeto tem como objetivo demonstrar conhecimentos práticos em **Quality Assurance (QA)**, abrangendo planejamento, análise de riscos, modelagem de cenários, especificação BDD, execução automatizada e registro de comportamentos divergentes.

A automação utiliza **Cypress Raw**, com comandos escritos diretamente nos arquivos de teste, sem implementação do padrão Page Object Model (POM).

---

## 1. Sobre o projeto

O SauceDemo é uma aplicação demonstrativa de e-commerce utilizada para praticar testes de software.

O projeto contempla as principais jornadas do usuário:

- Autenticação e encerramento de sessão.
- Interação com o catálogo de produtos.
- Ordenação de produtos por nome e preço.
- Adição e remoção de itens do carrinho.
- Navegação entre catálogo, carrinho e detalhes de produtos.
- Preenchimento e validação de informações do Checkout.
- Finalização de pedidos.
- Verificação da geração de arquivo PDF.
- Validação de links sociais.

Além da automação, o repositório reúne documentos que apresentam as decisões de teste e a estratégia de qualidade adotada.

## 2. Tecnologias utilizadas

| Tecnologia                   | Finalidade                     |
| ---------------------------- | ------------------------------ |
| Cypress 16                   | Automação de testes E2E      |
| JavaScript                   | Implementação dos testes     |
| Node.js                      | Ambiente de execução         |
| npm                          | Gerenciamento de dependências |
| Cypress Mochawesome Reporter | Geração de relatórios HTML  |
| Git                          | Versionamento do projeto       |

## 3. Cobertura automatizada

Os testes estão organizados em quatro suítes funcionais.

| Suíte          | Testes declarados |    Aprovados |   Pendentes |
| --------------- | ----------------: | -----------: | ----------: |
| Login           |                13 |           13 |           0 |
| Compra          |                 9 |            9 |           0 |
| Carrinho        |                 7 |            7 |           0 |
| Checkout        |                 9 |            8 |           1 |
| **Total** |      **38** | **37** | **1** |

Os resultados correspondem à última execução completa registrada durante a revisão do projeto.

O cenário pendente investiga o comportamento do formulário de Checkout diante de entradas compostas exclusivamente por espaços em branco.

## 4. Estrutura do projeto

```text

cypress-saucedemo-framework/
├── cypress/
│   ├── e2e/
│   │   └── ui-raw/
│   │       ├── login.cy.js
│   │       ├── compra.cy.js
│   │       ├── cart.cy.js
│   │       └── checkout.cy.js
│   ├── reports/
│   │   └── html/
│   │       ├── index.html
│   │       └── index.json
│   └── support/
│       └── e2e.js
├── dashboard/
│   └── index.html
├── docs/
│   ├── assets/
│   │   ├── distribuicao-resultados.svg
│   │   └── resultados-funcionalidade.svg
│   ├── automacao-arquitetura.md
│   ├── plano-de-testes.md
│   ├── test-design.md
│   ├── especificacao-bdd.md
│   ├── bug-reports.md
│   ├── qa-status-report.md
│   └── Mapa Mental de Cobertura SauceDemo.png
├── scripts/
│   ├── executar-testes.js
│   └── gerar-graficos.js
├── cypress.config.js
├── package.json
├── package-lock.json
└── README.md
```

A estrutura representa a organização proposta após a remoção dos arquivos POM e fixtures não utilizados. Diretórios gerados automaticamente durante a execução foram omitidos.

## 5. Como executar os testes

### Pré-requisitos

- Node.js e npm instalados.
- Git instalado para clonar o repositório.
- Ambiente compatível com Cypress.

### Clonar o repositório

Após publicar o projeto no GitHub:

```bash
git clone <URL-DO-REPOSITORIO>
cd cypress-saucedemo-framework
```

### Instalar as dependências

```bash
npm install
```

### Executar todos os testes

```bash
npm test
```

### Abrir a interface do Cypress

```bash
npm run test:open
```

### Executar uma suíte específica

Exemplo:

```bash
npx cypress run --spec "cypress/e2e/ui-raw/login.cy.js"
```

## 6. Estratégia de testes

O projeto contempla a aplicação de práticas de QA, incluindo:

**Testes funcionais:** verificação de comportamentos esperados nas principais jornadas da aplicação.

**Testes negativos:** validação de credenciais incorretas, campos obrigatórios e outras entradas inválidas.

**Particionamento de equivalência:** organização das entradas de teste em classes representativas.

**Tabela de decisão:** modelagem das condições de autenticação e seus resultados.

**Transição de estados:** validação das alterações de estado dos produtos e do carrinho.

**Testes de regressão:** execução das suítes para identificar alterações inesperadas nos comportamentos cobertos.

**Especificação BDD:** descrição dos cenários em linguagem Dado, Quando e Então, utilizada como referência documental.

A especificação BDD não depende de Cucumber; os testes são implementados diretamente com Cypress e JavaScript.

## 7. Relatórios e evidências

O projeto utiliza o Cypress Mochawesome Reporter para registrar os resultados das execuções automatizadas.

Além do relatório HTML, foi desenvolvido um **QA Status Report**, que consolida os indicadores de execução, os resultados por funcionalidade, as pendências identificadas e a avaliação de qualidade.

### QA Status Report

[Consultar o QA Status Report](docs/qa-status-report.md)

O relatório contempla:

- Resumo executivo da execução automatizada.
- Indicadores de aprovação, falhas e testes pendentes.
- Gráficos de distribuição dos resultados.
- Resultados por suíte funcional.
- Registro de defeitos e pendências.
- Avaliação da qualidade e recomendação de liberação.
- Plano de ação para acompanhamento das pendências.

### Atualização dos relatórios

O comando `npm test` executa os testes Cypress e, quando um novo relatório JSON é gerado, atualiza automaticamente os indicadores, gráficos, resumo executivo e cabeçalho do QA Status Report.

Para atualizar os indicadores utilizando os resultados da última execução registrada, sem executar novamente os testes:

```bash
npm run report:qa
```

As análises de riscos, pendências e recomendações de liberação permanecem sob responsabilidade do QA e exigem revisão manual.

### Validação de arquivos PDF

O projeto também utiliza uma tarefa personalizada, `getLatestPdf`, para apoiar a validação de arquivos PDF gerados durante o Checkout.

Essa verificação identifica características básicas do formato do arquivo, sem afirmar que todo o conteúdo do documento foi validad

O projeto utiliza Cypress Mochawesome Reporter para gerar relatórios de execução.

Os relatórios permitem acompanhar os resultados dos testes e apoiar a análise de falhas.

O projeto também possui uma tarefa personalizada, `getLatestPdf`, utilizada na validação de arquivos PDF gerados durante o Checkout.

Essa validação verifica a identificação básica do formato do arquivo, sem afirmar que todo o conteúdo do documento foi validado.

## 8. Documentação de QA

| Documento                                                                        | Conteúdo                                                                                            |
| -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [Plano de Testes](docs/plano-de-testes.md)                                        | Escopo, estratégia, riscos e critérios de execução                                               |
| [Test Design](docs/test-design.md)                                                | Técnicas de modelagem e seleção de cenários                                                      |
| [Especificação BDD](docs/especificacao-bdd.md)                                  | Comportamentos esperados por funcionalidade                                                          |
| [Arquitetura da Automação](docs/automacao-arquitetura.md)                       | Organização técnica do projeto                                                                    |
| [QA Status Report](docs/qa-status-report.md)                                      | Indicadores de execução, resultados por funcionalidade, avaliação de qualidade e plano de ação |
| [Registro de Defeitos](docs/bug-reports.md)                                       | Investigação de comportamentos divergentes                                                         |
| [Mapa Mental de Cobertura](<docs/Mapa%20Mental%20de%20Cobertura%20SauceDemo.png>) | Representação visual da cobertura planejada                                                        |

## 9. Gestão de defeitos

O projeto contempla o registro e a investigação de comportamentos divergentes.

Um exemplo é o caso `QA-001`, relacionado à investigação da validação de campos do Checkout preenchidos apenas por espaços em branco.

O comportamento está em investigação, pois a classificação definitiva como defeito depende da confirmação da regra funcional esperada.

## 10. Limitações e oportunidades de evolução

O projeto tem foco educacional e de portfólio.

Não estão implementados neste escopo testes de carga, pentest, testes de API externos ou regressão visual automatizada.

Possíveis evoluções incluem:

- Ampliação da cobertura de cenários negativos e de limites.
- Verificação de persistência e reinicialização do carrinho.
- Validação detalhada de subtotal, taxas e total do pedido.
- Aprimoramento da rastreabilidade entre documentação e testes.
- Integração da execução automatizada com GitHub Actions.
- Ampliação da validação de conteúdo dos arquivos PDF.

## 11. Objetivo profissional

Este repositório demonstra a aplicação de práticas de Engenharia de Qualidade de Software, integrando análise funcional, desenho de testes, documentação e automação.

O foco não está apenas na execução de scripts, mas na construção de uma abordagem estruturada para identificar riscos, definir cenários e verificar comportamentos de software.
