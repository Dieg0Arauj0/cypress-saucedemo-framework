
const fs = require('node:fs');
const path = require('node:path');

const raiz = path.resolve(__dirname, '..');
const jsonPath = path.join(raiz, 'cypress/reports/html/index.json');
const assetsPath = path.join(raiz, 'docs/assets');

if (!fs.existsSync(jsonPath)) {
    console.error('Relatório JSON não encontrado. Execute npm test primeiro.');
    process.exit(1);
}

const relatorio = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const { stats, results } = relatorio;

fs.mkdirSync(assetsPath, { recursive: true });

const cores = {
    fundo: '#101827',
    texto: '#f1f5f9',
    secundario: '#94a3b8',
    aprovado: '#34c77b',
    pendente: '#e5a83b',
    falha: '#f06a77'
};

const escapar = valor => String(valor)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

function salvar(nome, conteudo) {
    fs.writeFileSync(path.join(assetsPath, nome), conteudo, 'utf8');
    console.log(`Gráfico atualizado: ${nome}`);
}

function gerarDistribuicao() {
    const total = stats.tests;
    const aprovados = stats.passes;
    const pendentes = stats.pending;
    const falhas = stats.failures;

    const raio = 94;
    const circunferencia = 2 * Math.PI * raio;

    const tamanhoAprovados = total ? aprovados / total * circunferencia : 0;
    const tamanhoPendentes = total ? pendentes / total * circunferencia : 0;

    const percentual = total ? (aprovados / total * 100) : 0;
    const percentualFormatado = percentual.toFixed(2).replace('.', ',');

    const svg = `
<svg xmlns="http://www.w3.org/2000/svg"
     width="760" height="350" viewBox="0 0 760 350">
  <rect width="760" height="350" rx="16" fill="${cores.fundo}"/>

  <text x="36" y="48" fill="${cores.texto}"
        font-family="Arial, sans-serif" font-size="22" font-weight="700">
    Distribuição dos resultados
  </text>

  <circle cx="195" cy="205" r="${raio}"
          fill="none" stroke="#344256" stroke-width="27"/>

  <circle cx="195" cy="205" r="${raio}"
          fill="none" stroke="${cores.aprovado}" stroke-width="27"
          stroke-dasharray="${tamanhoAprovados} ${circunferencia}"
          transform="rotate(-90 195 205)"/>

  <circle cx="195" cy="205" r="${raio}"
          fill="none" stroke="${cores.pendente}" stroke-width="27"
          stroke-dasharray="${tamanhoPendentes} ${circunferencia}"
          stroke-dashoffset="${-tamanhoAprovados}"
          transform="rotate(-90 195 205)"/>

  <text x="195" y="203" text-anchor="middle"
        fill="${cores.texto}" font-family="Arial, sans-serif"
        font-size="34" font-weight="700">${percentualFormatado}%</text>

  <text x="195" y="228" text-anchor="middle"
        fill="${cores.secundario}" font-family="Arial, sans-serif"
        font-size="14">aprovação</text>

  ${[
            ['Aprovados', aprovados, cores.aprovado, 145],
            ['Pendentes', pendentes, cores.pendente, 200],
            ['Falhas', falhas, cores.falha, 255]
        ].map(([nome, valor, cor, y]) => `
    <rect x="388" y="${y - 11}" width="13" height="13"
          rx="3" fill="${cor}"/>
    <text x="417" y="${y}" fill="${cores.texto}"
          font-family="Arial, sans-serif" font-size="17">${nome}</text>
    <text x="691" y="${y}" text-anchor="end"
          fill="${cores.texto}" font-family="Arial, sans-serif"
          font-size="20" font-weight="700">${valor}</text>
  `).join('')}

  <line x1="360" y1="292" x2="724" y2="292" stroke="#344256"/>
  <text x="388" y="320" fill="${cores.secundario}"
        font-family="Arial, sans-serif" font-size="13">Total de testes</text>
  <text x="691" y="320" text-anchor="end" fill="${cores.texto}"
        font-family="Arial, sans-serif" font-size="18"
        font-weight="700">${total}</text>
</svg>`;

    salvar('distribuicao-resultados.svg', svg);
}

function gerarFuncionalidades() {
    const suites = results.flatMap(resultado =>
        (resultado.suites || []).map(suite => {
            const testes = suite.tests || [];

            return {
                nome: suite.title,
                total: testes.length,
                aprovados: testes.filter(t => t.state === 'passed').length,
                pendentes: testes.filter(t => t.pending === true).length,
                falhas: testes.filter(t => t.state === 'failed').length
            };
        })
    );

    const altura = 125 + suites.length * 95;

    const linhas = suites.map((suite, indice) => {
        const y = 125 + indice * 95;
        const largura = 660;
        const proporcao = valor =>
            suite.total ? valor / suite.total * largura : 0;

        const aprovados = proporcao(suite.aprovados);
        const pendentes = proporcao(suite.pendentes);
        const falhas = proporcao(suite.falhas);

        const percentual = suite.total
            ? (suite.aprovados / suite.total * 100).toFixed(1).replace('.', ',')
            : '0,0';

        return `
      <text x="40" y="${y}" fill="${cores.texto}"
            font-family="Arial, sans-serif" font-size="16">
        ${escapar(suite.nome)}
      </text>

      <text x="720" y="${y}" text-anchor="end"
            fill="${cores.secundario}" font-family="Arial, sans-serif"
            font-size="14">
        ${suite.aprovados}/${suite.total} · ${percentual}%
      </text>

      <rect x="40" y="${y + 16}" width="${largura}" height="15"
            rx="7" fill="#344256"/>

      <rect x="40" y="${y + 16}" width="${aprovados}" height="15"
            fill="${cores.aprovado}"/>

      <rect x="${40 + aprovados}" y="${y + 16}"
            width="${pendentes}" height="15"
            fill="${cores.pendente}"/>

      <rect x="${40 + aprovados + pendentes}" y="${y + 16}"
            width="${falhas}" height="15"
            fill="${cores.falha}"/>
    `;
    }).join('');

    const svg = `
<svg xmlns="http://www.w3.org/2000/svg"
     width="760" height="${altura}"
     viewBox="0 0 760 ${altura}">
  <rect width="760" height="${altura}" rx="16" fill="${cores.fundo}"/>

  <text x="40" y="48" fill="${cores.texto}"
        font-family="Arial, sans-serif" font-size="22" font-weight="700">
    Resultados por funcionalidade
  </text>

  <text x="40" y="76" fill="${cores.secundario}"
        font-family="Arial, sans-serif" font-size="13">
    Testes aprovados em relação ao total por suíte
  </text>

  ${linhas}
</svg>`;

    salvar('resultados-funcionalidade.svg', svg);
}
function atualizarIndicadores() {
    const caminho = path.join(raiz, 'docs/qa-status-report.md');

    if (!fs.existsSync(caminho)) {
        throw new Error('Arquivo qa-status-report.md não encontrado.');
    }

    const inicio = '<!-- INICIO_INDICADORES -->';
    const fim = '<!-- FIM_INDICADORES -->';

    const conteudo = fs.readFileSync(caminho, 'utf8');

    // Preserva a recomendação definida manualmente pelo QA.
const recomendacaoAtual = conteudo.match(
  /^\|\s*Recomendação de Liberação\s*\|\s*([^|\r\n]+)\s*\|/m
);

const recomendacao = recomendacaoAtual
  ? recomendacaoAtual[1].trim()
  : 'Não avaliada';

    const posicaoInicio = conteudo.indexOf(inicio);
    const posicaoFim = conteudo.indexOf(fim);

    if (posicaoInicio === -1 || posicaoFim <= posicaoInicio) {
        throw new Error('Marcadores dos indicadores não encontrados no Markdown.');
    }

    const percentual = stats.tests
        ? (stats.passes / stats.tests * 100).toFixed(2).replace('.', ',')
        : '0,00';

    const duracao = (stats.duration / 1000)
        .toFixed(2)
        .replace('.', ',');

    const tabela = `${inicio}

| Indicador | Resultado |
|---|---:|
| Total de testes | ${stats.tests} |
| Aprovados | ${stats.passes} |
| Falhas | ${stats.failures} |
| Pendentes | ${stats.pending} |
| Taxa de aprovação | ${percentual}% |
| Tempo de execução | ${duracao} segundos |
| Suítes de testes | ${stats.suites} |

${fim}`;

    const atualizado =
        conteudo.slice(0, posicaoInicio) +
        tabela +
        conteudo.slice(posicaoFim + fim.length);

    fs.writeFileSync(caminho, atualizado, 'utf8');

    console.log('Indicadores do Status Report atualizados.');
}
function atualizarResultadosFuncionalidade() {
    const caminho = path.join(raiz, 'docs/qa-status-report.md');

    if (!fs.existsSync(caminho)) {
        throw new Error('Arquivo qa-status-report.md não encontrado.');
    }

    const inicio = '<!-- INICIO_RESULTADOS_FUNCIONALIDADE -->';
    const fim = '<!-- FIM_RESULTADOS_FUNCIONALIDADE -->';

    const conteudo = fs.readFileSync(caminho, 'utf8');

    const posicaoInicio = conteudo.indexOf(inicio);
    const posicaoFim = conteudo.indexOf(fim);

    if (posicaoInicio === -1 || posicaoFim <= posicaoInicio) {
        throw new Error('Marcadores de resultados por funcionalidade não encontrados.');
    }

    const formatarPercentual = (aprovados, total) =>
        total > 0
            ? `${(aprovados / total * 100).toFixed(2).replace('.', ',')}%`
            : '0,00%';

    const formatarCelula = valor =>
        String(valor).replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');

    const linhas = [
        '| Suíte de Testes | Total | Aprovados | Falhas | Pendentes | Taxa de Aprovação |',
        '|---|---:|---:|---:|---:|---:|'
    ];

    for (const resultado of results) {
        for (const suite of resultado.suites || []) {
            const testes = suite.tests || [];

            const total = testes.length;
            const aprovados = testes.filter(t => t.state === 'passed').length;
            const falhas = testes.filter(t => t.state === 'failed').length;
            const pendentes = testes.filter(t => t.pending === true).length;

            linhas.push(
                `| ${formatarCelula(suite.title)} | ${total} | ${aprovados} | ${falhas} | ${pendentes} | ${formatarPercentual(aprovados, total)} |`
            );
        }
    }

    linhas.push(
        `| **Total** | **${stats.tests}** | **${stats.passes}** | **${stats.failures}** | **${stats.pending}** | **${formatarPercentual(stats.passes, stats.tests)}** |`
    );

    const tabela = `${inicio}\n\n${linhas.join('\n')}\n\n${fim}`;

    const atualizado =
        conteudo.slice(0, posicaoInicio) +
        tabela +
        conteudo.slice(posicaoFim + fim.length);

    fs.writeFileSync(caminho, atualizado, 'utf8');

    console.log('Resultados por funcionalidade atualizados.');
}

function atualizarResumoExecutivo() {
  const caminho = path.join(raiz, 'docs/qa-status-report.md');

  if (!fs.existsSync(caminho)) {
    throw new Error('Arquivo qa-status-report.md não encontrado.');
  }

  const inicio = '<!-- INICIO_RESUMO_EXECUTIVO -->';
  const fim = '<!-- FIM_RESUMO_EXECUTIVO -->';

  const conteudo = fs.readFileSync(caminho, 'utf8');

  const posicaoInicio = conteudo.indexOf(inicio);
  const posicaoFim = conteudo.indexOf(fim);

  if (posicaoInicio === -1 || posicaoFim <= posicaoInicio) {
    throw new Error('Marcadores do resumo executivo não encontrados.');
  }

  const percentual = stats.tests > 0
    ? (stats.passes / stats.tests * 100).toFixed(2).replace('.', ',')
    : '0,00';

  const numero = valor =>
    new Intl.NumberFormat('pt-BR').format(valor);

  // Ajusta automaticamente singular e plural.
  const textoPendentes = stats.pending === 1
    ? '1 teste pendente'
    : `${numero(stats.pending)} testes pendentes`;

  const resumo = `${inicio}

A execução automatizada registrou **${numero(stats.tests)} casos de teste**, distribuídos entre ${numero(stats.suites)} suítes funcionais.

Foram contabilizados **${numero(stats.passes)} testes aprovados**, **${numero(stats.failures)} falhas** e **${textoPendentes}**.

A taxa de aprovação foi de **${percentual}%**, considerando o total de testes registrados. Esse indicador representa a proporção de testes aprovados em relação ao total, incluindo os pendentes.

Os resultados apresentados refletem exclusivamente as verificações realizadas pelos testes automatizados.

${fim}`;

  const atualizado =
    conteudo.slice(0, posicaoInicio) +
    resumo +
    conteudo.slice(posicaoFim + fim.length);

  fs.writeFileSync(caminho, atualizado, 'utf8');

  console.log('Resumo executivo atualizado.');
}

function atualizarCabecalho() {
  const caminho = path.join(raiz, 'docs/qa-status-report.md');

  if (!fs.existsSync(caminho)) {
    throw new Error('Arquivo qa-status-report.md não encontrado.');
  }

  const inicio = '<!-- INICIO_CABECALHO -->';
  const fim = '<!-- FIM_CABECALHO -->';

  const conteudo = fs.readFileSync(caminho, 'utf8');
  // Preserva a recomendação manual registrada no Markdown.
const recomendacaoAtual = conteudo.match(
  /^\|\s*Recomendação de Liberação\s*\|\s*([^|\r\n]+)\s*\|/m
);

const recomendacao = recomendacaoAtual
  ? recomendacaoAtual[1].trim()
  : 'Não avaliada';

  const posicaoInicio = conteudo.indexOf(inicio);
  const posicaoFim = conteudo.indexOf(fim);

  if (posicaoInicio === -1 || posicaoFim <= posicaoInicio) {
    throw new Error('Marcadores do cabeçalho não encontrados.');
  }

  // Utiliza a data registrada pelo Mochawesome.
  const dataExecucao = new Date(stats.start);

  if (Number.isNaN(dataExecucao.getTime())) {
    throw new Error('Data de execução inválida no index.json.');
  }

  const dataFormatada = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(dataExecucao);

  let statusExecucao;

  if (stats.failures > 0) {
    statusExecucao = 'Concluída com falhas';
  } else if (stats.pending > 0) {
    statusExecucao = 'Concluída com testes pendentes';
  } else if (stats.tests === 0) {
    statusExecucao = 'Sem testes registrados';
  } else {
    statusExecucao = 'Concluída sem falhas ou pendências';
  }

  const cabecalho = `${inicio}

| Informação | Valor |
|---|---|
| Projeto | SauceDemo |
| Tipo de Teste | End-to-End (E2E) |
| Framework | Cypress |
| Relatório | Mochawesome |
| Data da Execução | ${dataFormatada} |
| Status da Execução | ${statusExecucao} |
| Recomendação de Liberação | ${recomendacao} |

${fim}`;

  const atualizado =
    conteudo.slice(0, posicaoInicio) +
    cabecalho +
    conteudo.slice(posicaoFim + fim.length);

  fs.writeFileSync(caminho, atualizado, 'utf8');

  console.log('Cabeçalho do Status Report atualizado.');
}

gerarDistribuicao();
gerarFuncionalidades();
atualizarIndicadores();
atualizarResultadosFuncionalidade();
atualizarResumoExecutivo();
atualizarCabecalho();

console.log('Atualização do Status Report concluída.');