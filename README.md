# AI Coding Agent Command Atlas

Cheatsheet visual con comandos de **Claude Code**, **Codex** y **GitHub Copilot**, organizado por categorías con búsqueda en tiempo real.

## Qué hace

- Una sola página para comparar comandos, flujos y atajos de los CLIs agénticos más usados
- Búsqueda instantánea por comando, categoría o descripción
- Tabs para alternar entre Claude Code, Codex y GitHub Copilot

## Actualización automática

Un workflow de GitHub Actions corre todos los días a las **8:30am hora Montevideo (UTC-3)** y:

1. Descarga el CHANGELOG oficial de `anthropics/claude-code` y la documentación de Codex y Copilot
2. Consulta a GitHub Models (`gpt-4o-mini`) para identificar comandos nuevos que no estén ya en el cheatsheet
3. Si encuentra novedades, actualiza `script.js` automáticamente y hace commit
4. Si no hay cambios, no toca nada

No requiere configuración de API keys — usa el `GITHUB_TOKEN` automático de GitHub Actions.

## Site

Publicado en GitHub Pages: https://braiантuck.github.io/claude_copilot_codex

## Historial de actualizaciones

Ver [docs/HISTORY.md](docs/HISTORY.md).
