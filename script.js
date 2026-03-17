const data = {
  claude: {
    label: "Claude Code",
    subtitle:
      "Slash commands, skills y atajos del flujo actual de Claude Code, organizados para uso diario.",
    pulseTitle: "Comandos para memorizar primero",
    pulseIntro:
      "La mezcla ganadora suele ser contexto limpio, permisos controlados y herramientas externas bien conectadas.",
    notices: [
      [
        "Fuente principal",
        "La base sale de la referencia oficial de comandos, skills y modo interactivo de Claude Code.",
      ],
      [
        "Ojo con versiones",
        "Hay nombres que cambiaron con el tiempo, como /fork y /branch. Donde importa, la nota queda dentro de la card.",
      ],
    ],
    pulse: [
      ["/init", "arranque"],
      ["/compact", "limpia contexto"],
      ["/mcp", "conecta herramientas"],
      ["/agents", "subagentes"],
      ["/permissions", "control de acceso"],
      ["/security-review", "revision de riesgo"],
    ],
    cards: [
      {
        t: "Arranque Esencial",
        s: "Lo primero que conviene usar",
        l: "narrow",
        i: "Estos comandos te dejan listo el proyecto, la configuracion y el diagnostico basico sin perder tiempo.",
        n: "Si algo no cierra en la instalacion, la combinacion mas util suele ser /doctor + /config.",
        c: [
          ["/init", "built-in", "Crea o actualiza el CLAUDE.md inicial del proyecto para dejar memoria compartida."],
          ["/doctor", "built-in", "Diagnostica problemas de instalacion, settings y entorno."],
          ["/config", "built-in", "Abre la configuracion. Alias oficial: /settings."],
          ["/help", "built-in", "Muestra ayuda y todos los comandos disponibles en tu entorno actual."],
        ],
      },
      {
        t: "Contexto y Limpieza",
        s: "Mantener la sesion respirando",
        l: "tall",
        i: "Claude Code trabaja mejor cuando controlas contexto, compactacion y continuidad entre sesiones.",
        c: [
          ["/compact [instrucciones]", "built-in", "Compacta la conversacion y puede enfocar el resumen en un tema concreto."],
          ["/context", "built-in", "Visualiza el uso de contexto y te muestra alertas de saturacion."],
          ["/clear", "built-in", "Limpia la conversacion actual. Alias: /reset y /new."],
          ["/resume [sesion]", "built-in", "Retoma una conversacion previa por nombre o por ID. Alias: /continue."],
          ["/fork [nombre]", "built-in", "Abre una bifurcacion de la sesion actual. El changelog reciente habla de /branch como renombre, pero la referencia built-in sigue mostrando /fork."],
        ],
      },
      {
        t: "Memoria y Proyecto",
        s: "Que queda persistido",
        l: "narrow",
        i: "La memoria en Claude Code no es solo CLAUDE.md; tambien podes sumar directorios y renombrar sesiones.",
        c: [
          ["/memory", "built-in", "Edita memorias CLAUDE.md, activa auto-memory y revisa entradas persistidas."],
          ["/add-dir <path>", "built-in", "Agrega un directorio extra a la sesion actual sin reiniciar el contexto."],
          ["/rename [nombre]", "built-in", "Renombra la sesion para que reaparezca clara al retomarla."],
          ["/status", "built-in", "Abre la pestania de estado con version, modelo, cuenta y conectividad."],
        ],
      },
      {
        t: "Modelos y Costo",
        s: "Control fino de rendimiento",
        l: "narrow",
        i: "Cuando queres ajustar velocidad, capacidad o consumo, estos son los atajos importantes.",
        c: [
          ["/model [modelo]", "built-in", "Selecciona o cambia el modelo activo."],
          ["/effort [low|medium|high|max|auto]", "built-in", "Define el nivel de razonamiento para la sesion o muestra el valor actual."],
          ["/fast [on|off]", "built-in", "Activa o desactiva fast mode."],
          ["/cost", "built-in", "Muestra estadisticas de tokens consumidos."],
          ["/usage", "built-in", "Ensenia limites del plan y estado de rate limits."],
        ],
      },
      {
        t: "Git y Revision",
        s: "Para trabajar sobre cambios reales",
        l: "tall",
        i: "Esta es la parte que mas valor da en repos grandes: diff, comentarios de PR y revision de seguridad.",
        n: "La documentacion actual marca /review como deprecado y recomienda migrar al plugin code-review.",
        c: [
          ["/diff", "built-in", "Abre un diff interactivo con cambios no committeados y diffs por turno."],
          ["/pr-comments [PR]", "built-in", "Trae comentarios de un pull request de GitHub; detecta el PR actual si usas gh."],
          ["/security-review", "built-in", "Analiza el diff de la rama para detectar vulnerabilidades o riesgos de seguridad."],
          ["/rewind", "built-in", "Vuelve a un punto anterior de la conversacion o del codigo. Alias: /checkpoint."],
          ["/export [archivo]", "built-in", "Exporta la conversacion actual a texto plano."],
        ],
      },
      {
        t: "Skills Oficiales",
        s: "No son built-ins, pero aparecen junto al slash menu",
        l: "narrow",
        i: "Claude Code mezcla comandos nativos con skills empaquetadas. Estas son de las mas utiles para trabajo real.",
        c: [
          ["/batch <instruction>", "skill", "Orquesta cambios grandes en paralelo con agentes separados y worktrees."],
          ["/debug [descripcion]", "skill", "Inspecciona el debug log de la sesion para ayudarte a diagnosticar fallos."],
          ["/loop [intervalo] <prompt>", "skill", "Ejecuta un prompt en intervalos mientras la sesion siga viva."],
          ["/simplify [focus]", "skill", "Revisa cambios recientes, detecta duplicaciones y aplica mejoras con varios agentes."],
          ["/claude-api", "skill", "Carga referencia de SDK y API para proyectos que integran Anthropic."],
        ],
      },
      {
        t: "Agentes y Tareas",
        s: "El nucleo del trabajo paralelo",
        l: "narrow",
        i: "Si queres exprimir Claude Code de verdad, esta es la zona clave: planificar, abrir subagentes y vigilar tareas de fondo.",
        c: [
          ["/agents", "agent", "Gestiona configuraciones de agentes personalizados."],
          ["/plan", "built-in", "Entra directo en plan mode desde la barra de prompt."],
          ["/tasks", "agent", "Lista y administra tareas en segundo plano."],
          ["/btw <pregunta>", "built-in", "Pregunta lateral rapida que no contamina la conversacion principal."],
          ["/remote-control", "update", "Expone la sesion para control remoto desde claude.ai."],
        ],
      },
      {
        t: "MCP, Hooks y Plugins",
        s: "Extender el sistema",
        l: "tall",
        i: "Estos son los comandos de integracion: conectar servidores MCP, activar hooks y administrar plugins sin salir del flujo.",
        c: [
          ["/mcp", "built-in", "Gestiona conexiones MCP y autenticacion OAuth para herramientas externas."],
          ["/hooks", "built-in", "Muestra configuraciones de hooks asociadas a eventos de herramientas."],
          ["/plugin", "built-in", "Administra plugins de Claude Code."],
          ["/reload-plugins", "update", "Recarga plugins activos para aplicar cambios sin reiniciar."],
          ["/skills", "built-in", "Lista skills disponibles, incluyendo las de proyecto, personales y de plugins."],
        ],
      },
      {
        t: "Terminal y Entorno",
        s: "Fluidez de uso diario",
        l: "narrow",
        i: "Varios comandos estan pensados para la ergonomia del terminal mas que para el codigo en si.",
        c: [
          ["/terminal-setup", "built-in", "Configura atajos como Shift+Enter en terminales que lo necesitan."],
          ["/statusline", "built-in", "Personaliza la status line o la integra con tu prompt del shell."],
          ["/theme", "built-in", "Cambia el tema visual del CLI."],
          ["/keybindings", "built-in", "Abre o crea la configuracion de keybindings."],
          ["/vim", "built-in", "Activa o desactiva modo Vim para edicion de input."],
        ],
      },
      {
        t: "Permisos y Seguridad",
        s: "No volar a ciegas",
        l: "narrow",
        i: "La capa de permisos cambio bastante desde las primeras versiones. Estos comandos son los mas relevantes para controlarla.",
        n: "La documentacion oficial aclara que algunos comandos no se muestran a todos los usuarios. /privacy-settings y /upgrade, por ejemplo, dependen del plan.",
        c: [
          ["/permissions", "built-in", "Ve o actualiza permisos. Alias oficial: /allowed-tools."],
          ["/sandbox", "built-in", "Alterna sandbox mode en plataformas compatibles."],
          ["/privacy-settings", "built-in", "Abre configuracion de privacidad. Solo visible en algunos planes."],
          ["/doctor", "built-in", "Sigue siendo el mejor primer paso para entender fallos de permisos y configuracion."],
        ],
      },
      {
        t: "Recientes y Destacados",
        s: "Lo que conviene sumar hoy",
        l: "wide",
        i: "Ademas del set clasico de la cheatsheet original, estos comandos y cambios aparecen como relevantes en la documentacion actual y en el changelog.",
        c: [
          ["/mcp", "update", "Integra OAuth, servidores remotos y herramientas externas via MCP.", "June 18, 2025 / v1.0.27+"],
          ["/batch", "update", "Bundled skill destacada para cambios grandes en paralelo con worktrees y agentes por unidad de trabajo.", "v2.1.63"],
          ["/loop", "update", "Permite correr prompts o slash commands en intervalos recurrentes.", "v2.1.71"],
          ["/copy", "update", "Paso de ser una copia simple a un picker interactivo y siguio mejorando hasta aceptar indice opcional.", "v2.1.59 / v2.1.63 / v2.1.77"],
          ["/effort", "update", "Ajusta el nivel de esfuerzo del modelo sin cambiar de sesion.", "v2.1.76"],
          ["/reload-plugins", "update", "Recarga plugins activos sin reiniciar Claude Code.", "v2.1.69"],
          ["/branch / /fork", "update", "El changelog indica el renombre de /fork a /branch, pero la referencia built-in aun muestra /fork.", "v2.1.76"],
        ],
      },
      {
        t: "Quick Reference",
        s: "Para fijar en memoria",
        l: "narrow",
        i: "Resumen de atajos y patrones de entrada que mas se usan durante una sesion interactiva.",
        c: [
          ["/", "shortcut", "Al inicio del prompt abre comandos y skills."],
          ["!", "shortcut", "Activa bash mode para ejecutar comandos directos y sumar su output al contexto."],
          ["@", "shortcut", "Dispara autocomplete de archivos o rutas."],
          ["Shift+Tab", "shortcut", "Alterna modos de permisos o plan mode, segun la configuracion."],
          ["Ctrl+B", "shortcut", "Mueve tareas o comandos largos al background."],
          ["Esc Esc", "shortcut", "Abre rewind o resumen desde el modo interactivo."],
        ],
      },
      {
        t: "GSD Library",
        s: "Workflow spec-driven para Claude Code",
        l: "wide",
        i: "Get Shit Done agrega una capa completa de planificacion, ejecucion por fases y auditoria para proyectos nuevos o brownfield.",
        n: "Estos comandos vienen del repositorio comunitario get-shit-done y funcionan como comandos de Claude Code una vez instalado el paquete.",
        c: [
          ["/gsd:help", "skill", "Muestra todos los comandos y la guia de uso de GSD."],
          ["/gsd:new-project [--auto]", "skill", "Flujo completo de inicializacion: preguntas, research, requirements y roadmap."],
          ["/gsd:map-codebase [area]", "skill", "Analiza una base existente antes de planificar trabajo nuevo."],
          ["/gsd:discuss-phase [N] [--auto]", "skill", "Captura decisiones de implementacion antes de planificar una fase."],
          ["/gsd:plan-phase [N] [--auto]", "skill", "Hace research, plan y verificacion para una fase."],
          ["/gsd:execute-phase <N>", "skill", "Ejecuta todos los planes de una fase en olas paralelas."],
          ["/gsd:quick [--full] [--discuss] [--research]", "skill", "Ejecuta tareas ad-hoc con las garantias de GSD y un flujo mas corto."],
          ["/gsd:verify-work [N]", "skill", "Guia pruebas de aceptacion y diagnostica fallos automaticamente."],
          ["/gsd:ui-review [N]", "skill", "Hace una auditoria visual retroactiva sobre frontend implementado."],
          ["/gsd:complete-milestone", "skill", "Archiva el milestone actual y etiqueta el release."],
          ["/gsd:new-milestone [name]", "skill", "Arranca el siguiente ciclo de version con nuevo roadmap."],
        ],
      },
      {
        t: "Claude SEO",
        s: "Skill SEO especializada",
        l: "wide",
        i: "claude-seo convierte Claude Code en una consola de auditoria SEO, schema, GEO/AEO y planeamiento estrategico con subagents.",
        n: "Estos comandos salen del repositorio claude-seo y se presentan como comandos /seo dentro de Claude Code despues de instalar la skill.",
        c: [
          ["/seo audit <url>", "skill", "Auditoria completa del sitio con delegacion paralela de subagentes."],
          ["/seo page <url>", "skill", "Analisis profundo de una sola pagina."],
          ["/seo technical <url>", "skill", "Auditoria tecnica SEO por categorias."],
          ["/seo content <url>", "skill", "Analisis de calidad de contenido y E-E-A-T."],
          ["/seo schema <url>", "skill", "Detecta, valida y genera marcado Schema.org."],
          ["/seo images <url>", "skill", "Analiza optimizacion de imagenes y activos visuales."],
          ["/seo sitemap <url>", "skill", "Analiza un sitemap XML existente."],
          ["/seo sitemap generate", "skill", "Genera un sitemap nuevo usando plantillas."],
          ["/seo geo <url>", "skill", "Analiza presencia para AI Overviews y Generative Engine Optimization."],
          ["/seo plan <type>", "skill", "Planificacion estrategica SEO por tipo de negocio."],
          ["/seo programmatic <url>", "skill", "Analiza oportunidades y riesgos de SEO programatico."],
          ["/seo hreflang <url>", "skill", "Audita y genera configuracion hreflang para i18n."],
        ],
      },
      {
        t: "Superpowers",
        s: "Plugin-workflow para Claude Code",
        l: "wide",
        i: "Superpowers mete una metodologia completa arriba de Claude Code: brainstorming, planes, worktrees, TDD y ejecucion con subagentes o batches.",
        n: "El repo mantiene /brainstorm, /write-plan y /execute-plan dentro de commands/, pero hoy estan marcados como deprecated y redirigen a skills superpowers:*.",
        c: [
          ["/plugin install superpowers@claude-plugins-official", "built-in", "Instala Superpowers desde el marketplace oficial de Claude."],
          ["/plugin marketplace add obra/superpowers-marketplace", "built-in", "Registra el marketplace alternativo mantenido por el proyecto."],
          ["/plugin install superpowers@superpowers-marketplace", "built-in", "Instala Superpowers desde el marketplace propio del repo."],
          ["/plugin update superpowers", "built-in", "Actualiza el plugin y baja nuevas versiones de skills y assets."],
          ["/brainstorm", "skill", "Comando legacy del repo; hoy te pide usar la skill superpowers:brainstorming.", "deprecated"],
          ["/write-plan", "skill", "Comando legacy que deriva a superpowers:writing-plans.", "deprecated"],
          ["/execute-plan", "skill", "Comando legacy que deriva a superpowers:executing-plans.", "deprecated"],
          ["superpowers:brainstorming", "skill", "Skill actual para refinar el problema y cerrar una spec antes de escribir codigo."],
          ["superpowers:writing-plans", "skill", "Skill actual para partir la implementacion en tareas chicas, concretas y verificables."],
          ["superpowers:executing-plans", "skill", "Skill actual para ejecutar el plan por lotes con checkpoints humanos."],
          ["superpowers:subagent-driven-development", "agent", "Camino alternativo del workflow para resolver tareas con subagentes y revision entre pasos."],
          ["superpowers:using-git-worktrees", "skill", "Skill del flujo base para abrir una rama aislada y validar el baseline antes de implementar."],
        ],
      },
    ],
    sources: [
      ["Built-in commands", "https://code.claude.com/docs/en/commands", "Referencia principal de comandos built-in visibles hoy."],
      ["Slash commands / skills", "https://code.claude.com/docs/en/slash-commands", "Base para skills empaquetadas como /batch y /loop."],
      ["Interactive mode", "https://code.claude.com/docs/en/interactive-mode", "Atajos y ergonomia del terminal."],
      ["Claude Code changelog", "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md", "Sirve para cambios recientes como /reload-plugins y la transicion /fork -> /branch."],
      ["GSD library", "https://github.com/gsd-build/get-shit-done", "Repositorio comunitario con comandos /gsd para planificacion, ejecucion por fases y auditorias."],
      ["Claude SEO", "https://github.com/AgriciDaniel/claude-seo", "Repositorio comunitario con comandos /seo para auditorias SEO, schema, GEO/AEO y planning."],
      ["Superpowers", "https://github.com/obra/superpowers", "Instalacion del plugin, workflow base y nombres actuales de las skills superpowers:*."],
      ["Superpowers commands", "https://github.com/obra/superpowers/tree/main/commands", "Shims /brainstorm, /write-plan y /execute-plan; hoy publicados como deprecated."],
    ],
  },
  codex: {
    label: "Codex",
    subtitle:
      "Comandos del Codex CLI actual, validados con la ayuda local del binario y complementados con recursos oficiales de OpenAI.",
    pulseTitle: "Comandos CLI que conviene fijar",
    pulseIntro:
      "En Codex pesa menos el slash command y mas el subcomando, los flags de runtime y los controles de sandbox.",
    notices: [
      ["Validacion local", "La estructura base de esta pestana se tomo del resultado actual de codex --help en este equipo."],
      ["Experimental", "cloud y app-server aparecen marcados como experimentales en la ayuda del CLI."],
    ],
    pulse: [
      ["codex", "sesion interactiva"],
      ["codex exec", "modo no interactivo"],
      ["codex review", "review por CLI"],
      ["codex mcp", "servidores externos"],
      ["--full-auto", "ejecucion con menos friccion"],
      ["--search", "web search en runtime"],
    ],
    cards: [
      {
        t: "Entrada Rapida",
        s: "Como arrancar una sesion",
        l: "wide",
        i: "Codex acepta prompt directo o un subcomando. Si no hay subcomando, todo se enruta a la interfaz interactiva.",
        c: [
          ["codex [PROMPT]", "cli", "Inicia la sesion interactiva; si pasas un prompt, arranca con ese contexto."],
          ["codex -m <model>", "flag", "Define el modelo que debe usar el agente."],
          ["codex -C <dir>", "flag", "Cambia el directorio de trabajo raiz para la sesion."],
          ["codex -i <file>...", "flag", "Adjunta imagenes al prompt inicial."],
          ["codex -p <profile>", "flag", "Carga un perfil desde config.toml."],
        ],
      },
      {
        t: "Modo No Interactivo y Sesiones",
        s: "Ejecucion, review y continuidad",
        l: "wide",
        i: "Aca esta la parte util para automatizar pipelines o retomar trabajo sin abrir el TUI completo.",
        c: [
          ["codex exec", "cli", "Ejecuta Codex en modo no interactivo."],
          ["codex review", "cli", "Corre una revision de codigo no interactiva."],
          ["codex apply", "cli", "Aplica el ultimo diff generado por Codex como git apply."],
          ["codex resume [--last]", "cli", "Retoma una sesion previa; con --last usa la mas reciente."],
          ["codex fork [--last]", "cli", "Bifurca una sesion previa para explorar otra linea de trabajo."],
          ["codex cloud", "experimental", "Navega tareas de Codex Cloud y permite aplicar cambios localmente."],
        ],
      },
      {
        t: "Auth y Config",
        s: "Control del entorno",
        l: "narrow",
        i: "La mayor parte del ajuste fino entra por config.toml o por flags de override.",
        c: [
          ["codex login", "cli", "Gestiona login y credenciales."],
          ["codex logout", "cli", "Elimina credenciales almacenadas."],
          ["codex -c key=value", "setting", "Sobrescribe una clave de config.toml para esta ejecucion."],
          ["codex --enable / --disable <feature>", "setting", "Activa o desactiva feature flags sin tocar el archivo."],
          ["codex features", "setting", "Inspecciona flags de caracteristicas."],
        ],
      },
      {
        t: "MCP, Server Mode y Shell",
        s: "Integraciones y tooling",
        l: "wide",
        i: "Codex no solo consume MCP: tambien puede exponerse como servidor o generar integraciones para shell.",
        c: [
          ["codex mcp", "cli", "Administra servidores MCP externos para Codex."],
          ["codex mcp-server", "cli", "Levanta Codex como servidor MCP via stdio."],
          ["codex app-server", "experimental", "Ejecuta el app server o tooling relacionado."],
          ["codex completion", "cli", "Genera scripts de autocompletado para tu shell."],
          ["codex debug", "cli", "Abre herramientas de debugging."],
        ],
      },
      {
        t: "Sandbox, Modelos Locales y Web",
        s: "Autonomia con limites claros",
        l: "wide",
        i: "En Codex el control de seguridad entra muy fuerte por flags del proceso.",
        n: "El flag --dangerously-bypass-approvals-and-sandbox existe, pero el propio CLI lo marca como extremadamente peligroso.",
        c: [
          ["codex -s read-only|workspace-write|danger-full-access", "flag", "Define la politica de sandbox para comandos del modelo."],
          ["codex -a untrusted|on-request|never", "flag", "Controla cuando el agente pide aprobacion humana."],
          ["codex --full-auto", "flag", "Alias de ejecucion con menos friccion y sandbox workspace-write."],
          ["codex --dangerously-bypass-approvals-and-sandbox", "experimental", "Desactiva prompts y sandbox."],
          ["codex --oss", "flag", "Selecciona el provider local open source."],
          ["codex --local-provider lmstudio|ollama", "flag", "Fija explicitamente que proveedor local usar."],
          ["codex --search", "flag", "Habilita web search en vivo para el agente."],
          ["codex --add-dir <dir>", "flag", "Suma directorios adicionales con permisos de escritura."],
        ],
      },
    ],
    sources: [
      ["Local validation: codex --help", "", "Base principal de subcomandos y flags de esta pestana, capturada hoy desde el CLI instalado."],
      ["OpenAI for developers", "https://developers.openai.com/", "Contexto oficial del producto Codex y recursos asociados."],
      ["codex-mini-latest model", "https://developers.openai.com/api/docs/models/codex-mini-latest", "OpenAI describe este modelo como optimizado para el Codex CLI."],
    ],
  },
  copilot: {
    label: "GitHub Copilot",
    subtitle:
      "Comandos actuales de GitHub Copilot CLI segun GitHub Docs, incluyendo slash commands, atajos y manejo de MCP.",
    pulseTitle: "Comandos y atajos para arrancar",
    pulseIntro:
      "Copilot CLI mezcla comandos del binario, slash commands interactivos y atajos de navegacion dentro de la misma experiencia.",
    notices: [
      ["Fuente oficial", "Esta pestana se armo con la referencia oficial de GitHub Copilot CLI, no con la extension antigua de GitHub CLI."],
      ["CLI distinto", "No confundir con gh copilot. La documentacion actual describe un binario copilot con su propia interfaz."],
    ],
    pulse: [
      ["copilot", "lanza la UI"],
      ["/init", "prepara el repo"],
      ["/model", "cambia el modelo"],
      ["/delegate", "delegacion remota"],
      ["/fleet", "subagentes en paralelo"],
      ["/review", "revision en CLI"],
    ],
    cards: [
      {
        t: "CLI Base",
        s: "Comandos de terminal",
        l: "wide",
        i: "La referencia actual de GitHub separa claramente los comandos del binario y los slash commands interactivos.",
        c: [
          ["copilot", "cli", "Lanza la interfaz interactiva."],
          ["copilot help [topic]", "cli", "Muestra ayuda. Topics oficiales: config, commands, environment, logging y permissions."],
          ["copilot init", "cli", "Inicializa custom instructions y funciones agenticas para el repositorio."],
          ["copilot update", "cli", "Descarga e instala la ultima version."],
          ["copilot version", "cli", "Muestra la version y chequea updates."],
        ],
      },
      {
        t: "Login, Workspace y Contexto",
        s: "Auth y raiz de trabajo",
        l: "wide",
        i: "Copilot CLI tiene comandos separados para autenticacion, directorios permitidos y monitoreo del contexto activo.",
        c: [
          ["copilot login", "cli", "Autentica por OAuth device flow. Acepta --host para especificar el host de GitHub."],
          ["copilot logout", "cli", "Cierra sesion y borra credenciales almacenadas."],
          ["/cwd", "built-in", "Muestra el directorio actual de trabajo."],
          ["/cd [PATH]", "built-in", "Cambia el working directory sin reiniciar la sesion."],
          ["/add-dir PATH", "built-in", "Agrega un directorio a la lista permitida para acceso de archivos."],
          ["/list-dirs", "built-in", "Lista todos los directorios con acceso permitido."],
          ["/context", "built-in", "Muestra el uso actual de tokens y su visualizacion."],
          ["/compact", "built-in", "Resume historial para reducir el uso de contexto."],
        ],
      },
      {
        t: "Revision y Planificacion",
        s: "Trabajo real sobre cambios",
        l: "wide",
        i: "La referencia oficial actual ya incluye review, plan y manejo de sesion como parte del flujo estandar.",
        c: [
          ["/plan [PROMPT]", "built-in", "Crea un plan de implementacion antes de codear."],
          ["/diff", "built-in", "Revisa los cambios hechos en el directorio actual."],
          ["/review [PROMPT]", "agent", "Ejecuta el agente de code review para analizar cambios."],
          ["/session [checkpoints|files|plan|rename NAME]", "built-in", "Muestra informacion de sesion y resumen del workspace."],
          ["/share [file|gist] [PATH]", "built-in", "Comparte la sesion a Markdown o a un gist secreto."],
          ["/resume [SESSION-ID]", "built-in", "Cambia a otra sesion desde una lista o por ID."],
        ],
      },
      {
        t: "Agentes, Plugins y MCP",
        s: "El costado mas agentico",
        l: "tall",
        i: "GitHub empuja fuerte las capacidades de delegacion y extensibilidad directamente desde el prompt.",
        c: [
          ["/agent", "agent", "Navega y selecciona agentes disponibles."],
          ["/delegate [PROMPT]", "agent", "Delegacion remota con AI-generated pull request."],
          ["/fleet [PROMPT]", "agent", "Divide el trabajo y ejecuta subagentes en paralelo."],
          ["/plugin [marketplace|install|uninstall|update|list] [ARGS...]", "built-in", "Administra plugins y marketplaces."],
          ["/skills [list|info|add|remove|reload] [ARGS...]", "skill", "Gestiona skills para capacidades extra."],
          ["/mcp [show|add|edit|delete|disable|enable] [SERVER-NAME]", "built-in", "Gestiona configuracion MCP del CLI."],
          ["/lsp [show|test|reload|help] [SERVER-NAME]", "built-in", "Administra la configuracion de language servers."],
          ["/ide", "built-in", "Conecta la sesion con un workspace del IDE."],
        ],
      },
      {
        t: "Permisos y Quick Reference",
        s: "Autopilot sin regalar control",
        l: "wide",
        i: "La referencia oficial deja claro que las aprobaciones y shortcuts siguen siendo una capa central del producto.",
        c: [
          ["/allow-all", "built-in", "Habilita todos los permisos. Alias: /yolo."],
          ["/reset-allowed-tools", "built-in", "Resetea la lista de herramientas permitidas."],
          ["/model", "built-in", "Selecciona el modelo activo. La documentacion tambien menciona la opcion --model."],
          ["/user [show|list|switch]", "built-in", "Administra el usuario actual de GitHub."],
          ["@ FILENAME", "shortcut", "Incluye el contenido de un archivo en el contexto."],
          ["Ctrl+X then /", "shortcut", "Dispara un slash command sin borrar lo que ya escribiste."],
          ["! COMMAND", "shortcut", "Ejecuta un comando local en el shell, bypassing Copilot."],
          ["Shift+Tab", "shortcut", "Cicla entre modo standard, plan y autopilot."],
          ["Ctrl+C", "shortcut", "Cancela la operacion o limpia el input. Dos veces para salir."],
        ],
      },
    ],
    sources: [
      ["GitHub Copilot CLI command reference", "https://docs.github.com/en/copilot/reference/cli-command-reference", "Fuente principal de comandos del binario, slash commands y shortcuts."],
      ["Using GitHub Copilot CLI", "https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli", "Contexto de uso, gestion de contexto y help topics."],
      ["About GitHub Copilot CLI", "https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli", "Contexto del producto y cambio de modelo via /model o --model."],
    ],
  },
};

const order = ["claude", "codex", "copilot"];
const search = { raw: "", norm: "" };
let active = "claude";

const total = (tool) => data[tool].cards.reduce((n, card) => n + card.c.length, 0);
const norm = (v) =>
  String(v ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
const esc = (v) =>
  String(v)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
const label = (kind) =>
  ({
    cli: "cli",
    flag: "flag",
    setting: "setting",
    skill: "skill",
    agent: "agent",
    shortcut: "atajo",
    experimental: "experimental",
    update: "destacado",
  }[kind] || "built-in");

function renderTabs() {
  document.getElementById("tool-switcher").innerHTML = order
    .map((tool) => {
      const item = data[tool];
      const on = tool === active;
      return `<button class="tool-tab tool-tab--${tool} ${on ? "is-active" : ""}" type="button" data-tool="${tool}" aria-pressed="${on}"><span>${item.label}</span><small>${total(tool)} cmds</small></button>`;
    })
    .join("");
}

function renderHero() {
  const item = data[active];
  document.getElementById("hero-subtitle").textContent = item.subtitle;
  document.getElementById("active-kicker").textContent = item.label;
  document.getElementById("search-heading").textContent = `Buscar comandos de ${item.label}`;
  document.getElementById("command-search").placeholder = `Ej: ${item.pulse
    .slice(0, 4)
    .map((p) => p[0])
    .join(", ")}...`;
}

function renderNotices() {
  document.getElementById("notice-strip").innerHTML = data[active].notices
    .map(([title, text]) => `<article class="notice"><strong>${esc(title)}:</strong> ${esc(text)}</article>`)
    .join("");
}

function renderPulse() {
  const item = data[active];
  document.getElementById("pulse-kicker").textContent = item.label;
  document.getElementById("pulse-title").textContent = item.pulseTitle;
  document.getElementById("pulse-intro").textContent = item.pulseIntro;
  document.getElementById("pulse-commands").innerHTML = item.pulse
    .map(([cmd, desc]) => `<div class="command-chip"><code>${esc(cmd)}</code><span>${esc(desc)}</span></div>`)
    .join("");
}

function matchCard(card, q) {
  return norm([card.t, card.s, card.i, card.n].filter(Boolean).join(" ")).includes(q);
}

function matchCommand(command, q) {
  return norm(command.join(" ")).includes(q);
}

function visibleCommands(card, q) {
  if (!q) return card.c;
  if (matchCard(card, q)) return card.c;
  return card.c.filter((command) => matchCommand(command, q));
}

function renderCards() {
  const item = data[active];
  let cards = 0;
  let commands = 0;
  const html = item.cards
    .map((card, index) => {
      const shown = visibleCommands(card, search.norm);
      if (!shown.length) return "";
      cards += 1;
      commands += shown.length;
      const commandHtml = shown
        .map(
          ([cmd, kind, desc, meta]) => `
            <article class="command-item">
              <div class="command-topline">
                <code>${esc(cmd)}</code>
                <span class="pill ${kind}">${label(kind)}</span>
                ${meta ? `<span class="pill update">${esc(meta)}</span>` : ""}
              </div>
              <p class="command-desc">${esc(desc)}</p>
            </article>`
        )
        .join("");
      return `
        <section class="card ${card.l}">
          <header class="card-header">
            <div class="badge">${index + 1}</div>
            <div class="card-title">
              <h3>${esc(card.t)}</h3>
              <p>${esc(card.s)}</p>
            </div>
          </header>
          ${search.norm ? `<span class="card-match-count">${shown.length} resultado${shown.length === 1 ? "" : "s"}</span>` : ""}
          <p class="card-intro">${esc(card.i)}</p>
          <div class="command-list">${commandHtml}</div>
          ${card.n ? `<div class="card-note">${esc(card.n)}</div>` : ""}
        </section>`;
    })
    .filter(Boolean)
    .join("");
  document.getElementById("cheatsheet-grid").innerHTML =
    html ||
    `<section class="empty-state"><strong>Sin resultados</strong><p>No encontre comandos para "${esc(
      search.raw
    )}" en ${esc(item.label)}.</p></section>`;
  renderSummary(cards, commands);
}

function renderSummary(cards, commands) {
  const item = data[active];
  const summary = document.getElementById("search-summary");
  const clear = document.getElementById("search-clear");
  if (!search.norm) {
    summary.textContent = `${item.label}: ${item.cards.length} bloques y ${total(active)} comandos visibles.`;
    clear.hidden = true;
    return;
  }
  clear.hidden = false;
  summary.textContent = cards
    ? `${commands} comando${commands === 1 ? "" : "s"} en ${cards} bloque${cards === 1 ? "" : "s"} para "${search.raw}".`
    : `No hay resultados para "${search.raw}" en ${item.label}.`;
}

function renderSources() {
  document.getElementById("source-list").innerHTML = data[active].sources
    .map(([title, url, note]) => {
      const head = url
        ? `<a href="${url}" target="_blank" rel="noreferrer">${esc(title)}</a>`
        : `<strong>${esc(title)}</strong>`;
      return `<li>${head}<p>${esc(note)}</p></li>`;
    })
    .join("");
}

function renderAll() {
  document.body.dataset.tool = active;
  renderTabs();
  renderHero();
  renderNotices();
  renderPulse();
  renderCards();
  renderSources();
}

document.getElementById("tool-switcher").addEventListener("click", (event) => {
  const button = event.target.closest("[data-tool]");
  if (!button) return;
  active = button.dataset.tool;
  renderAll();
});

document.getElementById("command-search").addEventListener("input", (event) => {
  search.raw = event.target.value.trim();
  search.norm = norm(search.raw);
  renderCards();
});

document.getElementById("search-clear").addEventListener("click", () => {
  search.raw = "";
  search.norm = "";
  const input = document.getElementById("command-search");
  input.value = "";
  input.focus();
  renderCards();
});

renderAll();
