const fs = require('node:fs');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const raiz = path.resolve(__dirname, '..');
const caminhoJson = path.join(
  raiz,
  'cypress/reports/html/index.json'
);

// Remove o relatório anterior antes de executar os testes.
if (fs.existsSync(caminhoJson)) {
  fs.unlinkSync(caminhoJson);
  console.log('Relatório JSON anterior removido.');
}

console.log('\nExecutando testes Cypress...\n');

const cypress = spawnSync(
  process.platform === 'win32' ? 'npx.cmd' : 'npx',
  ['cypress', 'run'],
  {
    cwd: raiz,
    stdio: 'inherit',
    shell: process.platform === 'win32'
  }
);

if (cypress.error) {
  console.error('Erro ao executar Cypress:', cypress.error.message);
  process.exit(1);
}
if (!fs.existsSync(caminhoJson)) {
  console.error(
    'Nenhum novo relatório JSON foi gerado. ' +
    'O QA Status Report não será atualizado.'
  );

  process.exit(cypress.status || 1);
}
console.log('\nAtualizando QA Status Report...\n');

const relatorio = spawnSync(
  process.execPath,
  [path.join(__dirname, 'gerar-graficos.js')],
  {
    cwd: raiz,
    stdio: 'inherit'
  }
);

if (relatorio.error || relatorio.status !== 0) {
  console.error('Falha ao atualizar o QA Status Report.');
  process.exit(1);
}

console.log('\nProcesso de testes e atualização do relatório finalizado.');

process.exit(cypress.status ?? 1);