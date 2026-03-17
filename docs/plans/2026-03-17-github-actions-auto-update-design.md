# Design: GitHub Actions Auto-Update + GitHub Pages

**Date:** 2026-03-17
**Status:** Approved

## Goal

Subir el proyecto a GitHub, publicarlo en GitHub Pages y agregar un workflow que corra diariamente para detectar nuevos comandos en changelogs y docs oficiales, y actualizarlos automáticamente en `script.js` usando GitHub Models API.

## New Files

```
.github/
  workflows/
    update-commands.yml
update-commands.js
```

## Architecture

### `update-commands.js`

Node.js script sin dependencias externas. Pasos:

1. Lee `script.js` y extrae los comandos existentes por herramienta (claude/codex/copilot) para evitar duplicados.
2. Descarga fuentes de contenido:
   - **Claude Code:** CHANGELOG.md de `anthropics/claude-code` vía GitHub REST API
   - **Codex:** Docs de OpenAI developers (URL hardcodeada, editable)
   - **Copilot:** Docs de GitHub CLI command reference (URL hardcodeada, editable)
3. Llama a GitHub Models API (endpoint `https://models.inference.ai.azure.com`, modelo `gpt-4o-mini`, auth `Bearer $GITHUB_TOKEN`) con:
   - Los comandos existentes como contexto
   - El contenido de changelogs/docs
   - Instrucción: devolver JSON con nuevos comandos en el mismo formato del objeto `data` de `script.js`
4. Valida que la respuesta sea JSON parseable y tenga la estructura correcta.
5. Inyecta los nuevos comandos en `script.js` (append a los arrays `cards[].c` correspondientes, o agrega cards nuevas).
6. Si no hay cambios, sale con código 0 sin tocar ningún archivo.

### `.github/workflows/update-commands.yml`

- **Trigger:** `schedule: cron: '0 6 * * *'` + `workflow_dispatch` para correr manualmente
- **Runner:** `ubuntu-latest`, Node.js 20
- **Permisos:** `contents: write`
- **Auth:** `GITHUB_TOKEN` automático (sin secrets adicionales)
- **Pasos:**
  1. Checkout del repo
  2. Setup Node.js 20
  3. Correr `node update-commands.js`
  4. Si `script.js` cambió, commitear con mensaje `chore: auto-update commands [skip ci]`
  5. Push a `main`

### GitHub Pages

- Se activa una sola vez desde Settings del repo → Pages → Branch: `main`, folder: `/`
- Cada push a `main` (incluyendo los commits del workflow) redeploya el site automáticamente.
- No se necesita un workflow adicional de deploy.

## Error Handling

- Si la GitHub API falla (rate limit, red), el script termina con exit code 1. El workflow queda en estado "failed" pero no modifica `script.js`.
- Si la respuesta de la AI no es JSON válido, el script descarta la respuesta y sale sin commitear.
- Si no se detectan comandos nuevos, no se crea commit (evita ruido en el historial).

## Data Flow

```
GitHub API (CHANGELOG) ──┐
Docs URLs (fetch)        ├──► update-commands.js ──► script.js ──► commit ──► Pages
script.js (existente)   ──┘         │
                                    └── GitHub Models API (gpt-4o-mini)
```

## Constraints

- Sin dependencias npm: todo con `fetch` nativo y módulos built-in de Node 20.
- El `GITHUB_TOKEN` tiene permisos de lectura en repos públicos por defecto; es suficiente para leer el CHANGELOG de `anthropics/claude-code`.
- GitHub Models API está disponible para cuentas con acceso a GitHub Models (free tier incluido).
