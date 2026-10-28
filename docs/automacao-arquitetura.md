# Arquitetura da Automação — SauceDemo

## 1. Visão geral

Este projeto implementa testes automatizados End-to-End (E2E) na aplicação web SauceDemo, utilizando Cypress e JavaScript.

O objetivo é validar os principais fluxos de utilização da aplicação, aplicando conceitos de qualidade de software, planejamento de testes, assertions e automação funcional.

A implementação utiliza **Cypress Raw**, com comandos Cypress escritos diretamente nos arquivos de teste, sem adoção do padrão Page Object Model (POM).

## 2. Tecnologias utilizadas

| Tecnologia                   | Finalidade                                    |
| ---------------------------- | --------------------------------------------- |
| Cypress                      | Execução dos testes automatizados E2E       |
| JavaScript                   | Implementação dos cenários e validações  |
| Node.js e npm                | Gerenciamento do ambiente e das dependências |
| Cypress Mochawesome Reporter | Geração de relatórios de execução        |

**Aplicação sob teste:** https://www.saucedemo.com/

## 3. Organização dos testes

Os testes estão organizados em quatro arquivos, separados por funcionalidades da aplicação.

| Arquivo            | Responsabilidade                                                          |
| ------------------ | ------------------------------------------------------------------------- |
| `login.cy.js`    | Autenticação, validações de credenciais e encerramento de sessão     |
| `compra.cy.js`   | Interações com produtos, ordenação e links sociais                    |
| `cart.cy.js`     | Visualização, navegação, adição e remoção de produtos no carrinho |
| `checkout.cy.js` | Preenchimento de dados, finalização da compra e validação de PDF      |

Todos os arquivos estão localizados em `cypress/e2e/ui-raw/`.

## 4. Estrutura do projeto

```text
cypress-saucedemo-framework/
├── cypress/
│   ├── e2e/
│   │   └── ui-raw/
│   │       ├── cart.cy.js
│   │       ├── checkout.cy.js
│   │       ├── compra.cy.js
│   │       └── login.cy.js
│   └── support/
│       └── e2e.js
├── docs/
├── cypress.config.js
├── package.json
└── package-lock.json
```

A estrutura acima representa a organização proposta após a limpeza dos arquivos não utilizados. Pastas geradas automaticamente durante a execução não estão representadas.

## 5. Estratégia de automação

A automação utiliza comandos Cypress diretamente nos cenários de teste.

Cada arquivo agrupa testes relacionados à mesma funcionalidade, utilizando:

- `describe()` para organizar as suítes.
- `it()` para declarar os casos de teste.
- `beforeEach()` para preparar as condições necessárias.
- Comandos como `cy.visit()`, `cy.get()`, `.click()` e `.type()` para interagir com a aplicação.
- Assertions com `.should()` e `expect()` para verificar os resultados esperados.

A abordagem Raw foi escolhida para favorecer o aprendizado prático da API do Cypress e a compreensão direta das interações e validações.

## 6. Estratégia de seletores

Os testes priorizam atributos `data-test`, disponibilizados pela aplicação.

Exemplo:

```javascript
cy.get('[data-test="login-button"]').click()
```

Quando necessário, são utilizados seletores CSS baseados em classes existentes na aplicação.

Exemplo:

```javascript
cy.get('.cart_item').should('have.length', 2)
```

A escolha dos seletores considera sua adequação ao elemento e ao comportamento que será validado.

## 7. Configuração e relatórios

O arquivo `cypress.config.js` centraliza as configurações da execução E2E, incluindo:

- URL base da aplicação.
- Diretório de downloads.
- Integração com o Cypress Mochawesome Reporter.
- Registro da tarefa personalizada `getLatestPdf`.

O Mochawesome Reporter é utilizado para apresentar os resultados das execuções automatizadas.

## 8. Validação de arquivos PDF

O projeto inclui uma validação de geração de PDF durante o fluxo de Checkout.

A tarefa Node.js `getLatestPdf` pesquisa arquivos PDF recentes no diretório de downloads e retorna o caminho do arquivo encontrado.

O teste utiliza esse caminho para verificar a existência de conteúdo e a assinatura inicial do formato PDF (`%PDF-`).

Essa verificação não equivale à validação integral do conteúdo visual ou textual do documento.

## 9. Execução dos testes

Para instalar as dependências:

```bash
npm install
```

Para executar as suítes:

```bash
npm test
```

Para abrir a interface interativa do Cypress:

```bash
npm run test:open
```

## 10. Resultado de referência

Na última execução completa registrada:

| Indicador | Resultado |
|
