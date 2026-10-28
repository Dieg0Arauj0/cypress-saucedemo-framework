# Registro de Defeitos e Comportamentos Divergentes — SauceDemo

Este documento reúne comportamentos inesperados identificados durante os testes funcionais da aplicação SauceDemo.

Os registros distinguem resultados observados, expectativas de validação e defeitos confirmados.

---

# [QA-001] Investigação da validação de campos obrigatórios no Checkout

**Status:** Em investigação
**Severidade proposta:** Alta — pendente de confirmação
**Prioridade proposta:** P2 — sujeita à análise de impacto
**Módulo:** Checkout
**Tipo:** Validação de dados de entra

## 1. Descrição

Durante a execução de um cenário negativo no Checkout do SauceDemo, foi observado que a aplicação permite avançar da etapa de informações do cliente quando os campos obrigatórios são preenchidos exclusivamente com espaços em branco.

O teste automatizado esperava a apresentação de uma mensagem de validação. Entretanto, o elemento correspondente à mensagem de erro não foi encontrado.

O comportamento indica uma possível inconsistência na validação das informações fornecidas pelo usuário.

A classificação definitiva como defeito depende da confirmação da regra funcional esperada para entradas compostas somente por espaços em branco.

## 2. Ambiente

| Informação        | Valor                                 |
| ------------------- | ------------------------------------- |
| Aplicação         | SauceDemo                             |
| URL                 | https://www.saucedemo.com/            |
| Perfil              | `standard_user`                     |
| Navegador           | Google Chrome                         |
| Sistema operacional | Windows — versão a confirmar        |
| Framework           | Cypress                               |
| Suíte              | `checkout.cy.js`                    |
| Caminho             | `cypress/e2e/ui-raw/checkout.cy.js` |
| Resolução         | Não confirmada                       |

A versão exata do navegador, a resolução e o sistema operacional devem ser registrados a partir do ambiente utilizado na reprodução.

## 3. Pré-condições

1. Aplicação SauceDemo acessível.
2. Usuário autenticado com o perfil `standard_user`.
3. Pelo menos um produto adicionado ao carrinho.
4. Checkout iniciado.
5. Formulário de informações do cliente disponível.

## 4. Passos para reprodução

1. Acessar https://www.saucedemo.com/.
2. Autenticar com o perfil `standard_user`.
3. Adicionar um produto ao carrinho.
4. Acessar o carrinho.
5. Selecionar "Checkout".
6. Preencher o campo "First Name" apenas com espaços em branco.
7. Preencher o campo "Last Name" apenas com espaços em branco.
8. Preencher o campo "Zip/Postal Code" apenas com espaços em branco.
9. Selecionar "Continue".
10. Observar se a aplicação apresenta uma mensagem de validação ou avança para a revisão do pedido.

## 5. Resultado esperado — hipótese de teste

Considerando a hipótese de que campos obrigatórios devem conter caracteres não brancos, a aplicação deveria:

- Rejeitar entradas compostas exclusivamente por espaços em branco.
- Permanecer na etapa de informações do cliente.
- Apresentar uma mensagem de validação adequada.
- Impedir o avanço enquanto as informações forem consideradas inválidas.

**Observação:** essa expectativa ainda precisa ser confirmada como requisito funcional da aplicação.

## 6. Resultado observado

Na execução registrada, o sistema permitiu avançar no fluxo de Checkout com os campos preenchidos somente por espaços em branco.

A mensagem de erro esperada pelo teste não foi encontrada.

O Cypress apresentou a seguinte falha:

```text
AssertionError: Timed out retrying after 4000ms:
Expected to find element: `[data-test="error"]`,
but never found it.
```

A falha da assertion demonstra divergência entre a expectativa automatizada e o comportamento observado.

Não foi apresentada evidência suficiente para afirmar que a compra foi efetivamente concluída com esses dados.

## 7. Evidências

| Evidência                                        | Situação                            |
| ------------------------------------------------- | ------------------------------------- |
| Mensagem de falha da assertion Cypress            | Disponível no registro da execução |
| Screenshot do formulário preenchido com espaços | Pendente de anexação                |
| Screenshot da etapa seguinte                      | Pendente de anexação                |
| Vídeo da reprodução                            | Pendente de anexação                |
| Confirmação de conclusão do pedido             | Não verificada                       |

## 8. Análise de impacto

O comportamento pode representar um problema de integridade dos dados do cliente caso a aplicação exija informações válidas para o processamento do pedido.

Entretanto, o SauceDemo é uma aplicação demonstrativa e não há, neste registro, comprovação de processamento financeiro ou de impacto operacional real.

A severidade e a prioridade devem ser confirmadas considerando o requisito esperado, a possibilidade de reprodução e a extensão do impacto.

## 9. Hipótese técnica

Uma possível explicação é que a validação considere apenas a existência de caracteres nos campos, sem verificar se o conteúdo possui caracteres diferentes de espaços em branco.

Uma abordagem possível para tratar esse caso seria normalizar os valores antes da validação, utilizando operações equivalentes a `trim()`.

Essa hipótese não representa uma análise confirmada do código-fonte da aplicação.

## 10. Critérios para conclusão da investigação

A investigação poderá ser concluída após:

1. Reproduzir manualmente o comportamento.
2. Registrar evidências da entrada e do avanço.
3. Verificar se a compra pode ser finalizada.
4. Identificar a regra funcional esperada.
5. Confirmar se existe divergência entre requisito e implementação.
6. Definir a classificação final, a severidade e a prioridade.

## 11. Relação com a automação

**Arquivo:** `cypress/e2e/ui-raw/checkout.cy.js`

**Cenário:** Validação de campos obrigatórios preenchidos apenas com espaços em branco.

**Situação atual:** teste desabilitado com `it.skip`, aguardando esclarecimento do comportamento esperado.

O teste não deve ser contabilizado como aprovado enquanto estiver pendente.

## 12. Conclusão preliminar

Foi identificada uma divergência entre a expectativa do cenário negativo e o comportamento observado na aplicação.

O caso permanece registrado para investigação, sem classificação definitiva como defeito confirmado.

---

## Referências internas

- `plano-de-testes.md`
- `test-design.md`
- `especificacao-bdd.md`
- `automacao-arquitetura.md`
