
# Plano de Testes — E-commerce SauceDemo

## 1. Objetivo

Este documento define a estratégia, o escopo, os riscos e os critérios utilizados para planejar e executar os testes funcionais da aplicação web SauceDemo.

O projeto tem finalidade educacional e de portfólio, buscando demonstrar a aplicação prática de técnicas de teste de software, análise de riscos, elaboração de cenários e automação E2E com Cypress.

O foco é verificar os comportamentos esperados das principais jornadas de compra, desde a autenticação até a conclusão do pedido.

## 2. Escopo de testes

### 2.1. Dentro do escopo

| Módulo                  | Funcionalidades contempladas                                                             |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| Autenticação           | Login válido, credenciais inválidas, campos obrigatórios, usuário bloqueado e logout |
| Catálogo de produtos    | Adição e remoção de produtos, ordenação por nome e preço                          |
| Carrinho                 | Visualização de produtos, remoção de itens, contador, navegação e carrinho vazio   |
| Checkout                 | Preenchimento de informações, revisão do pedido e finalização da compra             |
| Download de PDF          | Verificação da geração de arquivo PDF e de sua assinatura                            |
| Navegação complementar | Verificação de links sociais da aplicação                                            |

A cobertura automatizada é organizada em quatro suítes: `login.cy.js`, `compra.cy.js`, `cart.cy.js` e `checkout.cy.js`.

### 2.2. Fora do escopo

Não estão contemplados nesta implementação:

- Testes de carga, estresse e desempenho de backend.
- Testes de segurança de infraestrutura e pentest.
- Validações diretas de banco de dados.
- Testes de API em serviços externos.
- Testes de aplicativos móveis nativos.
- Regressão visual automatizada baseada em comparação de screenshots.
- Validação integral do conteúdo e da apresentação visual de documentos PDF.

Testes de responsividade web também não são considerados cobertura implementada sem cenários específicos que os comprovem.

## 3. Estratégia de testes

### 3.1. Análise e desenho de testes

Os cenários são definidos a partir da identificação das funcionalidades, dos comportamentos esperados e dos riscos associados às jornadas do usuário.

São considerados:

- Fluxos positivos, como autenticação válida e compra concluída.
- Fluxos negativos, como credenciais inválidas e campos obrigatórios não preenchidos.
- Transições entre páginas e estados da aplicação.
- Consistência das informações apresentadas ao usuário.
- Validação de elementos e resultados após interações.

A especificação dos cenários e as técnicas de desenho são detalhadas nos documentos complementares do projeto.

### 3.2. Testes funcionais E2E

Os testes são implementados com Cypress e JavaScript, utilizando comandos de interação e assertions para verificar o comportamento da aplicação.

As suítes são executadas diretamente na interface web, simulando ações do usuário.

### 3.3. Testes negativos

Os testes negativos verificam como a aplicação responde a entradas inválidas, incompletas ou incompatíveis com os comportamentos esperados.

Exemplos incluem:

- Tentativa de login sem usuário.
- Tentativa de login sem senha.
- Autenticação com usuário bloqueado.
- Validação de campos obrigatórios do Checkout.

### 3.4. Testes de regressão

A suíte automatizada pode ser executada integralmente após alterações no código de testes ou na aplicação, permitindo identificar possíveis regressões nos fluxos contemplados.

A execução local é realizada pelo comando `npm test`.

A existência de uma pipeline CI/CD não é considerada comprovada nesta versão do plano.

### 3.5. Testes exploratórios

A exploração da aplicação apoia a identificação de comportamentos, elementos interativos e oportunidades de cobertura.

Perfis específicos disponibilizados pelo SauceDemo podem ser utilizados para investigar diferenças de comportamento, desde que os resultados sejam registrados e interpretados conforme o objetivo de cada teste.

A utilização de `visual_user` em um teste funcional não caracteriza, por si só, a implementação de regressão visual automatizada.

## 4. Matriz de riscos e priorização

A priorização considera o impacto potencial de uma falha na jornada do usuário e na conclusão da compra.

| Módulo                  | Risco identificado                                       | Impacto  | Prioridade   |
| ------------------------ | -------------------------------------------------------- | -------- | ------------ |
| Checkout                 | Impedimento de conclusão do pedido                      | Crítico | P1 — Alta   |
| Autenticação           | Usuário impedido de acessar a aplicação               | Crítico | P1 — Alta   |
| Carrinho                 | Inconsistência ou impossibilidade de gerenciar produtos | Alto     | P1 — Alta   |
| Catálogo                | Ordenação incorreta ou dificuldade de seleção        | Médio   | P2 — Média |
| Navegação complementar | Links incorretos ou indisponíveis                       | Baixo    | P3 — Baixa  |
| Apresentação visual    | Problemas estéticos sem bloqueio funcional              | Baixo    | P3 — Baixa  |

As prioridades representam uma avaliação de risco para fins de planejamento de testes, não dados financeiros ou operacionais reais do SauceDemo.

## 5. Ambiente e ferramentas

| Recurso                      | Utilização                                    |
| ---------------------------- | ----------------------------------------------- |
| SauceDemo                    | Aplicação web sob teste                       |
| Cypress                      | Framework de automação E2E                    |
| JavaScript                   | Linguagem de implementação                    |
| Node.js e npm                | Ambiente e gerenciamento de dependências       |
| Cypress Mochawesome Reporter | Geração de relatórios de execução          |
| Chrome                       | Navegador utilizado nas execuções registradas |

A implementação adota Cypress Raw, com comandos escritos diretamente nos arquivos `.cy.js`.

Não são utilizados Page Object Model, comandos personalizados ou fixtures JSON para alimentação dos cenários na estrutura revisada.

As configurações são centralizadas em `cypress.config.js`.

## 6. Critérios de entrada

Para iniciar a execução dos testes, devem ser atendidas as seguintes condições:

1. Dependências do projeto instaladas corretamente.
2. Aplicação SauceDemo acessível.
3. Arquivos de teste e configuração disponíveis.
4. Ambiente de execução compatível com Cypress.
5. Cenários e resultados esperados definidos.

## 7. Critérios de saída

Uma execução será considerada concluída quando:

1. Todos os testes previstos para a execução tiverem um resultado registrado.
2. As falhas identificadas tiverem sido analisadas.
3. Os testes pendentes estiverem identificados e justificados.
4. Os resultados puderem ser consultados no terminal ou nos relatórios gerados.
5. Os comportamentos divergentes relevantes estiverem documentados.

A presença de um teste pendente não deve ser confundida com aprovação de seu comportamento esperado.

## 8. Critérios de conclusão da automação

Um cenário automatizado será considerado concluído quando:

- Representar um comportamento verificável.
- Possuir um objetivo claro.
- Executar as ações necessárias para reproduzir o fluxo.
- Conter assertions relevantes ao resultado esperado.
- Ser executado com sucesso ou ter sua pendência devidamente justificada.
- Estiver organizado na suíte correspondente à funcionalidade.

Não é exigida ausência absoluta de valores fixos no código, pois o projeto utiliza dados de teste explícitos e conhecidos da aplicação demonstrativa.

## 9. Gestão de defeitos e comportamentos divergentes

Comportamentos inesperados devem ser analisados antes de serem classificados como defeitos.

Os registros devem apresentar, quando aplicável:

- Identificação e descrição do comportamento.
- Pré-condições.
- Passos para reprodução.
- Resultado esperado.
- Resultado observado.
- Evidências.
- Severidade e prioridade propostas.

O documento `bug-reports.md` centraliza os registros de defeitos e anomalias identificados.

### Caso em acompanhamento: campos com espaços em branco

Existe um cenário pendente relacionado à aceitação de entradas contendo apenas espaços em branco no Checkout.

Esse caso deve permanecer identificado até que a expectativa de validação seja confrontada com os requisitos aplicáveis e o comportamento observado seja devidamente documentado.

## 10. Resultado de execução de referência

Na execução completa mais recente registrada durante a revisão do projeto:

| Indicador         |  Quantidade |
| ----------------- | ----------: |
| Testes declarados |          38 |
| Testes aprovados  |          37 |
| Testes com falha  |           0 |
| Testes pendentes  |           1 |
| Tempo total       | 25 segundos |

O resultado corresponde a uma execução específica e deve ser atualizado quando houver alterações relevantes na suíte.

## 11. Documentos relacionados

- `automacao-arquitetura.md` — Organização técnica e arquitetura da automação.
- `test-design.md` — Técnicas e decisões de desenho de testes.
- `especificacao-bdd.md` — Especificação dos cenários de comportamento.
- `bug-reports.md` — Registro e acompanhamento de defeitos e anomalias.

Este plano orienta a estratégia de qualidade, enquanto os documentos complementares detalham a implementação e as evidências do trabalho realizado.
