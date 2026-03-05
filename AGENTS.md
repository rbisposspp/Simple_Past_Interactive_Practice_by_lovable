# AGENTS.md

Este arquivo define como o Codex deve trabalhar com os projetos do Rodrigo (com base no padrão observado nos repositórios).

## Perfil de Trabalho (Owner Profile)
- Foco principal: apps de prática de inglês (ESL), especialmente gramática e speaking drills.
- Prioridade: entregar rápido, com boa usabilidade em aula ao vivo (desktop + mobile).
- Stack dominante: HTML/CSS/JavaScript vanilla, sem backend e sem build.
- Padrão comum: projetos estáticos, muitos em arquivo único (`index.html` ou `*.html`), com dados embutidos e `localStorage`.
- Linguagem de colaboração: português (preferencial), mantendo termos técnicos em inglês quando útil.

## Como o Codex Deve Agir
- Seja direto e pragmático; implemente primeiro, explique depois.
- Evite overengineering. Prefira correções localizadas e pequenas.
- Preserve estrutura existente do projeto (não refatorar em larga escala sem pedido explícito).
- Mantenha compatibilidade com uso em sala de aula: feedback claro, fluxo rápido, poucos cliques.
- Sempre priorize legibilidade e manutenção simples por um único autor.

## Regra de Decisão por Tipo de Repositório

### 1) Repositório estático simples (padrão mais comum)
Sinais:
- Apenas arquivos `.html`, `.css`, `.js`, sem `src/`, sem bundler.

Ação:
- Editar diretamente os arquivos existentes.
- Não criar pipeline/tooling novo.
- Rodar local com:
  - `python3 -m http.server 8000`
  - ou abrir HTML direto no navegador quando possível.

### 2) Repositório estático com múltiplas páginas/assets
Sinais:
- `index.html` + páginas adicionais (`story.html`, `grammar.html`, etc.).
- Pastas `images/`, `audio/`, `css/`, `js/`.

Ação:
- Preservar navegação e consistência visual entre páginas.
- Verificar regressões de links, mídia e acessibilidade básica (`aria-live`, foco teclado).

### 3) Repositório Node/TS (ex.: Lovable/Vite)
Sinais:
- `package.json`, `src/`, `vite.config.*`, `tsconfig.*`.

Ação:
- Usar comandos do projeto antes de entregar:
  - `npm i` (se necessário)
  - `npm run dev` (validação local)
  - `npm run build` e/ou `npm run test` (quando existirem)
- Não aplicar regras de projeto estático onde houver pipeline já definido.

### 4) Repositório vazio ou rascunho
Sinais:
- README mínimo ou repo sem arquivos úteis.

Ação:
- Confirmar objetivo com o usuário antes de criar estrutura completa.
- Se o pedido for claro, iniciar com esqueleto mínimo funcional.

## Padrões Técnicos a Manter
- JavaScript: `const`/`let`, nomes em `camelCase`, funções pequenas e objetivas.
- HTML/CSS: sem frameworks por padrão (exceto quando já estiverem no repo).
- IDs/classes: manter convenção existente do projeto atual.
- Compatibilidade: garantir funcionamento em navegadores modernos comuns.
- Dependências CDN (Google Fonts, Tailwind CDN, confetti etc.): manter se já existirem; não adicionar libs sem necessidade real.

## UX Pedagógica (ESL)
- Garantir feedback imediato de acerto/erro.
- Preservar progressão por atividade (round, score, recap).
- Não quebrar recursos de aula: timer, hints, reveal/show answers, resumo final.
- Em atividades de texto, usar normalização básica para comparação quando apropriado (case/pontuação/espaços).
- Se houver áudio/TTS/STT: tratar ausência de permissão/API com fallback visível ao usuário.

## Teste Manual Mínimo Antes de Entregar
- Abrir app e verificar se não há erro de runtime no console.
- Testar fluxo principal completo (início -> interação -> fim/recap).
- Validar responsividade básica (~375px e desktop).
- Validar botões críticos: start/check/reset/next/reveal.
- Se existir modo professor/live drill: validar atalhos e controles principais.

## Git/GitHub
- Commits curtos no imperativo:
  - `Fix cloze answer normalization`
  - `Improve mobile layout for drill controls`
- Não alterar arquivos fora do escopo.
- Em mudanças visuais relevantes, incluir no PR:
  - resumo curto
  - screenshots/GIF
  - impacto pedagógico (1-2 linhas)

## Regra de Ouro
- Melhor solução padrão para estes projetos: simples, estável, rápida de usar em aula e fácil de manter.
