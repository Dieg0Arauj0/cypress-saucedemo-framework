# Modelagem e Desenho de Testes — SauceDemo

## 1. Objetivo

Este documento apresenta as técnicas de desenho de testes utilizadas para identificar, organizar e especificar cenários funcionais da aplicação SauceDemo.

O objetivo é estabelecer uma relação clara entre os comportamentos esperados da aplicação, os riscos identificados e os testes selecionados para automação com Cypress.

O documento complementa o Plano de Testes e a Especificação BDD, concentrando-se nas decisões de modelagem e nas técnicas de teste.

## 2. Abordagem de modelagem

A modelagem considera quatro módulos funcionais:

- **Autenticação:** credenciais, validações de campos, restrições de acesso e encerramento de sessão.
- **Catálogo:** apresentação de produtos, ordenação e interações de compra.
- **Carrinho:** inclusão, remoção, contagem de produtos e navegação.
- **Checkout:** validação de informações, revisão e conclusão do pedido.

São considerados cenários positivos, negativos e transições entre estados da aplicação.

Os cenários identificados não são necessariamente equivalentes aos cenários já automatizados. A implementação efetiva deve ser verificada nos arquivos `.cy.js`.

## 3. Técnicas de desenho de testes

### 3.1. Particionamento de equivalência — Autenticação

O particionamento de equivalência permite organizar entradas em classes que, sob determinadas regras, devem apresentar comportamentos semelhantes.

| Partição           | Exemplo                                  | Comportamento esperado                  |
| -------------------- | ---------------------------------------- | --------------------------------------- |
| Credenciais válidas | `standard_user` / `secret_sauce`     | Autenticação bem-sucedida             |
| Usuário inexistente | `invalid_user` / `secret_sauce`      | Mensagem de credenciais incompatíveis  |
| Senha incorreta      | `standard_user` / `invalid_password` | Mensagem de credenciais incompatíveis  |
| Usuário bloqueado   | `locked_out_user` / `secret_sauce`   | Mensagem de bloqueio                    |
| Usuário vazio       | `""` / `secret_sauce`                | Mensagem de obrigatoriedade do usuário |
| Senha vazia          | `standard_user` / `""`               | Mensagem de obrigatoriedade da senha    |
| Ambos vazios         | `""` / `""`                          | Mensagem de obrigatoriedade do usuário |

As partições representam grupos de entrada selecionados para verificar respostas distintas do formulário.

### 3.2. Tabela de decisão — Autenticação

A tabela de decisão relaciona condições de entrada às respostas esperadas do sistema.

**Condições:**

- C1: Usuário informado?
- C2: Senha informada?
- C3: Credenciais válidas?
- C4: Usuário bloqueado?

| Condição / Ação          | R1                    | R2                 | R3                         | R4                 | R5              |
| ---------------------------- | --------------------- | ------------------ | -------------------------- | ------------------ | --------------- |
| C1 — Usuário informado     | Não                  | Sim                | Sim                        | Sim                | Sim             |
| C2 — Senha informada        | —                    | Não               | Sim                        | Sim                | Sim             |
| C3 — Credenciais válidas   | —                    | —                 | Não                       | Sim                | Sim             |
| C4 — Usuário bloqueado     | —                    | —                 | —                         | Sim                | Não            |
| **Resultado esperado** | Usuário obrigatório | Senha obrigatória | Credenciais incompatíveis | Usuário bloqueado | Login realizado |

O símbolo `—` indica uma condição irrelevante para a decisão daquela regra.

A tabela representa as principais regras observáveis de autenticação selecionadas para o projeto, não todas as combinações teoricamente possíveis.

### 3.3. Transição de estados — Carrinho de compras

A técnica de transição de estados é aplicada ao comportamento de inclusão e remoção de produtos.

| Estado inicial             | Ação                     | Estado esperado               |
| -------------------------- | -------------------------- | ----------------------------- |
| Produto não adicionado    | Clicar em `Add to cart`  | Produto adicionado            |
| Produto adicionado         | Clicar em `Remove`       | Produto removido              |
| Carrinho vazio             | Adicionar primeiro produto | Contador apresenta `1`      |
| Carrinho com dois produtos | Remover um produto         | Contador apresenta `1`      |
| Carrinho com um produto    | Remover último produto    | Contador deixa de ser exibido |

As verificações devem considerar o estado dos botões, a quantidade de itens e a consistência das informações apresentadas.

A cor dos botões não é utilizada como principal critério funcional.

### 3.4. Ordenação e análise de sequência — Catálogo

A ordenação de produtos é modelada por meio da comparação entre os valores apresentados e a sequência esperada.

| Opção de ordenação | Resultado esperado                     |
| ---------------------- | -------------------------------------- |
| Name (A to Z)          | Nomes em ordem alfabética crescente   |
| Name (Z to A)          | Nomes em ordem alfabética decrescente |
| Price (low to high)    | Preços em ordem numérica crescente   |
| Price (high to low)    | Preços em ordem numérica decrescente |

A validação deve considerar a sequência completa dos produtos exibidos, evitando depender exclusivamente do primeiro e do último item.

Essa estratégia permite detectar inconsistências em posições intermediárias da lista.

### 3.5. Testes negativos — Checkout

O formulário de Checkout permite explorar classes de entradas incompletas ou inválidas.

| Cenário                        | Resultado esperado                                                  |
| ------------------------------- | ------------------------------------------------------------------- |
| Primeiro nome não informado    | Mensagem de obrigatoriedade                                         |
| Sobrenome não informado        | Mensagem de obrigatoriedade                                         |
| Código postal não informado   | Mensagem de obrigatoriedade                                         |
| Todos os campos vazios          | Impedimento de avanço e indicação do primeiro campo obrigatório |
| Campos contendo apenas espaços | Comportamento em investigação                                     |

O último cenário permanece pendente de definição conclusiva sobre a regra esperada.

Não deve ser classificado automaticamente como defeito sem análise da expectativa funcional.

## 4. Modelagem dos fluxos E2E

Os fluxos são estruturados a partir de pré-condições, ações e resultados esperados.

### 4.1. Fluxo positivo de compra

**Pré-condição:** usuário autenticado e catálogo disponível.

**Etapas:**

1. Selecionar um produto.
2. Adicionar o produto ao carrinho.
3. Acessar o carrinho.
4. Iniciar o Checkout.
5. Informar os dados obrigatórios.
6. Avançar para a revisão do pedido.
7. Confirmar a compra.
8. Verificar a mensagem de conclusão.

**Resultado esperado:** a aplicação apresenta a confirmação de compra, incluindo a mensagem `Thank you for your order!`.

### 4.2. Fluxo negativo de autenticação

**Pré-condição:** formulário de login disponível.

**Etapas:**

1. Informar um usuário inválido.
2. Informar uma senha.
3. Acionar o login.
4. Verificar a resposta apresentada.

**Resultado esperado:** o acesso não é concedido e uma mensagem de erro é exibida.

## 5. Relação entre modelagem e automação

As técnicas de desenho orientam a escolha dos cenários, mas não determinam obrigatoriamente a estrutura do código.

A implementação utiliza Cypress Raw e organiza os testes por funcionalidade.

| Módulo            | Arquivo de automação |
| ------------------ | ---------------------- |
| Autenticação     | `login.cy.js`        |
| Catálogo e compra | `compra.cy.js`       |
| Carrinho           | `cart.cy.js`         |
| Checkout           | `checkout.cy.js`     |

Cada cenário automatizado deve conter assertions que comprovem seu resultado esperado.

Um teste que apenas executa uma ação, sem verificar seu efeito, não oferece evidência suficiente de validação funcional.

## 6. Cenários identificados para evolução

Os seguintes comportamentos podem ser considerados para ampliação da cobertura, mediante verificação da necessidade e do comportamento real da aplicação:

- Persistência dos itens do carrinho após recarregamento da página.
- Validação detalhada dos cálculos de subtotal, imposto e total do pedido.
- Ampliação da cobertura de perfis específicos disponibilizados pelo SauceDemo.
- Verificações de responsividade web.
- Validação mais aprofundada do conteúdo dos arquivos PDF gerados.

Esses itens não devem ser apresentados como testes implementados sem evidência correspondente.

## 7. Rastreabilidade

A rastreabilidade deve permitir relacionar:

**Funcionalidade → Risco → Cenário → Caso de teste → Automação → Resultado**

O projeto utiliza os documentos de planejamento, especificação e implementação para apoiar essa relação.

A existência de uma matriz formal de rastreabilidade não é presumida nesta versão.

## 8. Documentos relacionados

- `plano-de-testes.md` — Estratégia, escopo, riscos e critérios de execução.
- `especificacao-bdd.md` — Cenários descritos em linguagem de comportamento.
- `automacao-arquitetura.md` — Estrutura técnica e organização da automação.
- `bug-reports.md` — Registro de defeitos e comportamentos divergentes.
