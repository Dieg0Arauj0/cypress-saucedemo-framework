# Especificação Baseada em Comportamento (BDD) — SauceDemo

## 1. Objetivo

Este documento descreve os comportamentos esperados da aplicação web SauceDemo por meio de cenários estruturados em **Dado, Quando e Então**.

A especificação apoia o planejamento, a implementação e a manutenção dos testes funcionais automatizados com Cypress.

Os cenários são organizados por funcionalidade, considerando fluxos positivos, negativos e situações específicas de navegação e gerenciamento de estado.

## 2. Convenções

Os títulos dos cenários seguem preferencialmente o padrão:

**Deve + comportamento esperado + condição relevante.**

### 2.1. Status

- **Automatizado:** cenário com teste correspondente identificado na auditoria.
- **Pendente:** teste existente, mas desabilitado ou aguardando definição de comportamento.
- **Planejado:** cenário identificado para possível implementação futura.
- **A confirmar:** cenário cuja correspondência exata com a automação ainda precisa ser verificada.

Os status representam o conhecimento disponível durante a revisão e não substituem a consulta aos arquivos Cypress.

---

## 3. Autenticação e sessão

### LOGIN-001 — Deve autenticar com credenciais válidas

**Status:** Automatizado

**Dado** que o usuário está na página de login
**Quando** informa as credenciais válidas do perfil `standard_user`
**E** confirma a autenticação
**Então** deve ser direcionado ao catálogo de produtos
**E** deve visualizar o título "Products".

### LOGIN-002 — Deve autenticar ao pressionar Enter

**Status:** Automatizado

**Dado** que o usuário está na página de login
**Quando** informa credenciais válidas
**E** pressiona Enter no campo de senha
**Então** deve acessar o catálogo de produtos.

### LOGIN-003 — Deve impedir a autenticação com ambos os campos vazios

**Status:** Automatizado

**Dado** que o formulário de login está disponível
**Quando** o usuário tenta autenticar sem preencher os campos
**Então** deve visualizar a mensagem "Username is required".

### LOGIN-004 — Deve exigir o preenchimento do usuário

**Status:** Automatizado

**Dado** que o usuário preenche somente a senha
**Quando** tenta autenticar
**Então** deve visualizar a mensagem "Username is required".

### LOGIN-005 — Deve exigir o preenchimento da senha

**Status:** Automatizado

**Dado** que o usuário informa um nome de usuário válido
**E** mantém a senha vazia
**Quando** tenta autenticar
**Então** deve visualizar a mensagem "Password is required".

### LOGIN-006 — Deve rejeitar credenciais preenchidas apenas com espaços

**Status:** Automatizado — verificar abrangência da mensagem

**Dado** que o usuário está na página de login
**Quando** informa somente espaços nos campos de usuário e senha
**E** tenta autenticar
**Então** a autenticação deve ser rejeitada
**E** uma mensagem de erro deve ser apresentada.

### LOGIN-007 — Deve permitir fechar uma mensagem de erro

**Status:** Automatizado

**Dado** que existe uma mensagem de erro visível
**Quando** o usuário aciona o botão de fechamento
**Então** a mensagem deve deixar de ser exibida.

### LOGIN-008 — Deve rejeitar usuário inexistente

**Status:** Automatizado

**Dado** que o usuário está na página de login
**Quando** informa um usuário inexistente e uma senha
**E** tenta autenticar
**Então** deve visualizar uma mensagem de credenciais incompatíveis.

### LOGIN-009 — Deve rejeitar senha incorreta

**Status:** Automatizado

**Dado** que o usuário informa um nome de usuário válido
**Quando** informa uma senha incorreta
**E** tenta autenticar
**Então** deve visualizar uma mensagem de credenciais incompatíveis.

### LOGIN-010 — Deve rejeitar nome de usuário com caixa diferente

**Status:** Automatizado

**Dado** que o usuário está na página de login
**Quando** informa o nome de usuário em letras maiúsculas e a senha original
**E** tenta autenticar
**Então** o acesso deve ser rejeitado.

### LOGIN-011 — Deve impedir a autenticação de uma conta bloqueada

**Status:** Automatizado

**Dado** que o usuário está na página de login
**Quando** informa as credenciais de `locked_out_user`
**E** tenta autenticar
**Então** deve visualizar a mensagem de conta bloqueada.

### LOGIN-012 — Deve impedir o acesso direto ao catálogo sem autenticação

**Status:** Automatizado

**Dado** que não existe uma sessão autenticada
**Quando** o usuário tenta acessar diretamente `/inventory.html`
**Então** o acesso ao catálogo deve ser impedido
**E** o usuário deve ser direcionado à autenticação.

### LOGIN-013 — Deve encerrar a sessão ao realizar logout

**Status:** Automatizado

**Dado** que o usuário está autenticado
**Quando** abre o menu lateral
**E** seleciona "Logout"
**Então** deve retornar à página de login.

### Cenários adicionais de autenticação

**LOGIN-014 — Deve autenticar utilizando `problem_user`**
Status: A confirmar. O comportamento esperado é o acesso com credenciais válidas; eventuais problemas posteriores devem ser avaliados separadamente.

**LOGIN-015 — Deve autenticar utilizando `performance_glitch_user`**
Status: A confirmar. A autenticação não equivale à medição de desempenho.

**LOGIN-016 — Deve permitir operações no catálogo utilizando `visual_user`**
Status: A confirmar. A utilização desse perfil não caracteriza automaticamente um teste de regressão visual.

---

## 4. Catálogo e produtos

### COMPRA-001 — Deve adicionar um produto ao carrinho

**Status:** Automatizado

**Dado** que o usuário está autenticado e visualiza o catálogo
**Quando** adiciona o produto "Sauce Labs Backpack"
**Então** o produto deve ser incluído no carrinho
**E** o contador deve exibir "1".

### COMPRA-002 — Deve remover um produto pela vitrine

**Status:** Automatizado

**Dado** que um produto foi adicionado ao carrinho
**Quando** o usuário aciona "Remove" no catálogo
**Então** o produto deve ser removido
**E** o botão deve retornar ao estado "Add to cart".

### COMPRA-003 — Deve ordenar os produtos por nome de A a Z

**Status:** Automatizado

**Dado** que o usuário está no catálogo
**Quando** seleciona "Name (A to Z)"
**Então** os produtos devem ser apresentados em ordem alfabética crescente.

### COMPRA-004 — Deve ordenar os produtos por nome de Z a A

**Status:** Automatizado

**Dado** que o usuário está no catálogo
**Quando** seleciona "Name (Z to A)"
**Então** os produtos devem ser apresentados em ordem alfabética decrescente.

### COMPRA-005 — Deve ordenar os produtos por preço crescente

**Status:** Automatizado

**Dado** que o usuário está no catálogo
**Quando** seleciona "Price (low to high)"
**Então** os preços devem ser apresentados em ordem numérica crescente.

### COMPRA-006 — Deve ordenar os produtos por preço decrescente

**Status:** Automatizado

**Dado** que o usuário está no catálogo
**Quando** seleciona "Price (high to low)"
**Então** os preços devem ser apresentados em ordem numérica decrescente.

As validações de ordenação devem considerar a sequência completa dos produtos, conforme a estratégia definida no Test Design.

### Cenários adicionais do catálogo

**COMPRA-007 — Deve apresentar os detalhes corretos de um produto selecionado**
Status: Planejado como validação completa de nome, descrição, imagem e preço.

**COMPRA-008 — Deve manter o estado dos produtos após recarregar a página**
Status: Planejado. O comportamento esperado de persistência deve ser confirmado antes da implementação.

---

## 5. Carrinho de compras

### CART-001 — Deve apresentar os produtos adicionados ao carrinho

**Status:** Automatizado

**Dado** que o usuário adicionou produtos pelo catálogo
**Quando** acessa o carrinho
**Então** os produtos selecionados devem ser apresentados.

### CART-002 — Deve remover um produto diretamente do carrinho

**Status:** Automatizado

**Dado** que o carrinho contém produtos
**Quando** o usuário remove um deles
**Então** o produto removido deve deixar de aparecer na lista.

### CART-003 — Deve atualizar o contador após remover um produto

**Status:** Automatizado

**Dado** que o carrinho contém dois produtos
**Quando** o usuário remove um deles
**Então** o contador deve indicar um produto.

### CART-004 — Deve retornar ao catálogo e permitir adicionar outro produto

**Status:** Automatizado

**Dado** que o usuário possui um produto no carrinho
**Quando** seleciona "Continue Shopping"
**E** adiciona outro produto pelo catálogo
**Então** o contador deve refletir os dois produtos adicionados.

### CART-005 — Deve permitir avançar para o Checkout com produtos no carrinho

**Status:** Automatizado

**Dado** que o carrinho contém pelo menos um produto
**Quando** o usuário seleciona "Checkout"
**Então** deve acessar a etapa de informações do pedido.

### CART-006 — Deve apresentar o carrinho vazio após remover todos os produtos

**Status:** Automatizado

**Dado** que o carrinho contém produtos
**Quando** o usuário remove todos os itens
**Então** a lista de produtos deve ficar vazia
**E** o contador não deve indicar produtos adicionados.

### CART-007 — Deve permitir acessar os detalhes de um produto e retornar ao carrinho

**Status:** Automatizado

**Dado** que existe um produto listado no carrinho
**Quando** o usuário seleciona o produto para visualizar seus detalhes
**Então** deve acessar a página correspondente
**E** deve conseguir retornar ao carrinho.

### Cenários adicionais do carrinho

**CART-008 — Deve verificar a persistência do carrinho após logout e novo login**
Status: Planejado. O resultado esperado depende da regra observada na aplicação.

**CART-009 — Deve reiniciar o estado do carrinho por Reset App State**
Status: Planejado.

---

## 6. Checkout

### CHECKOUT-001 — Deve concluir a compra de um produto

**Status:** Automatizado

**Dado** que o usuário possui um produto no carrinho
**Quando** inicia o Checkout
**E** informa os dados obrigatórios
**E** confirma a compra
**Então** deve visualizar "Thank you for your order!".

### CHECKOUT-002 — Deve concluir a compra de dois produtos

**Status:** Automatizado

**Dado** que o usuário adicionou dois produtos ao carrinho
**Quando** preenche os dados obrigatórios
**E** confirma a compra
**Então** deve visualizar a confirmação do pedido.

### CHECKOUT-003 — Deve impedir o avanço com todos os campos vazios

**Status:** Automatizado

**Dado** que o usuário acessou o formulário de Checkout
**Quando** tenta avançar sem preencher os campos
**Então** deve visualizar "Error: First Name is required".

### CHECKOUT-004 — Deve exigir o preenchimento do sobrenome

**Status:** Automatizado

**Dado** que o usuário está no formulário de Checkout
**Quando** informa o primeiro nome
**E** mantém o sobrenome vazio
**E** tenta avançar
**Então** deve visualizar "Error: Last Name is required".

### CHECKOUT-005 — Deve exigir o preenchimento do código postal

**Status:** Automatizado

**Dado** que o usuário informa primeiro nome e sobrenome
**Quando** tenta avançar sem código postal
**Então** deve visualizar "Error: Postal Code is required".

### CHECKOUT-006 — Deve retornar ao carrinho ao cancelar o Checkout

**Status:** Automatizado

**Dado** que o usuário está na etapa de informações
**Quando** seleciona "Cancel"
**Então** deve retornar à página do carrinho.

### CHECKOUT-007 — Deve retornar ao catálogo após concluir a compra

**Status:** Automatizado

**Dado** que o usuário concluiu uma compra
**Quando** seleciona "Back Home"
**Então** deve retornar ao catálogo de produtos.

### CHECKOUT-008 — Deve validar a geração de um arquivo PDF

**Status:** Automatizado

**Dado** que o usuário está no fluxo em que a geração de PDF está disponível
**Quando** solicita a geração do documento
**Então** um arquivo PDF deve ser disponibilizado no diretório de downloads
**E** o conteúdo do arquivo deve apresentar a assinatura inicial `%PDF-`.

Esta validação comprova a identificação básica do formato PDF, mas não a correção integral do conteúdo do documento.

### CHECKOUT-009 — Deve validar campos preenchidos apenas com espaços em branco

**Status:** Pendente

**Dado** que o usuário está no formulário de informações do Checkout
**Quando** preenche os campos obrigatórios apenas com espaços
**E** tenta avançar
**Então** o comportamento observado deve ser comparado com a regra de validação esperada.

**Observação:** o teste correspondente está desabilitado com `it.skip`. A rejeição de espaços em branco ainda não deve ser apresentada como requisito confirmado.

### Cenários adicionais de Checkout

**CHECKOUT-010 — Deve validar o subtotal, as taxas e o total do pedido**
Status: Planejado. A regra de cálculo e os valores esperados devem ser confirmados.

**CHECKOUT-011 — Deve verificar o comportamento do Checkout com carrinho vazio**
Status: Planejado. A expectativa funcional deve ser estabelecida antes de classificar eventuais divergências.

---

## 7. Links externos

### LINK-001 — Deve apresentar o endereço correto do perfil do X

**Status:** Automatizado

**Dado** que o usuário está no catálogo
**Quando** consulta o link da rede social X
**Então** seu atributo `href` deve corresponder a `https://x.com/saucelabs`.

### LINK-002 — Deve apresentar o endereço correto do Facebook

**Status:** Automatizado

**Dado** que o usuário está no catálogo
**Quando** consulta o link do Facebook
**Então** seu atributo `href` deve corresponder a `https://www.facebook.com/saucelabs`.

### LINK-003 — Deve apresentar o endereço correto do LinkedIn

**Status:** Automatizado

**Dado** que o usuário está no catálogo
**Quando** consulta o link do LinkedIn
**Então** seu atributo `href` deve corresponder a `https://www.linkedin.com/company/sauce-labs/`.

A verificação do atributo `href` não comprova, isoladamente, que o site externo esteja acessível ou que a navegação tenha sido concluída.

---

## 8. Critérios de qualidade da especificação

Cada cenário deve:

1. Descrever um comportamento observável da aplicação.
2. Possuir pré-condições compreensíveis.
3. Definir ações relevantes ao comportamento testado.
4. Apresentar um resultado esperado verificável.
5. Evitar detalhes desnecessários de implementação Cypress.
6. Manter coerência com o Plano de Testes.
7. Distinguir comportamentos confirmados de hipóteses de teste.
8. Possuir status compatível com a automação existente.

## 9. Rastreabilidade

Os identificadores `LOGIN`, `COMPRA`, `CART`, `CHECKOUT` e `LINK` são referências documentais para facilitar o acompanhamento dos cenários.

Eles não representam identificadores já implementados no código Cypress.

A correspondência entre cada identificador e o respectivo `it()` poderá ser registrada em uma matriz de rastreabilidade, caso o projeto evolua nessa direção.

## 10. Documentação relacionada

- `plano-de-testes.md` — Estratégia e escopo de testes.
- `test-design.md` — Técnicas de modelagem e seleção dos cenários.
- `automacao-arquitetura.md` — Organização técnica da automação.
- `bug-reports.md` — Registro de defeitos e anomalias.
