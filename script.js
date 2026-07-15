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
      ["LinkedIn — Claude", "https://www.linkedin.com/showcase/claude/posts/?feedView=all", "Fuente oficial de noticias y actualizaciones de Claude. Cada post incluye un link con mas detalle."],
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
      ["LinkedIn — Claude", "https://www.linkedin.com/showcase/claude/posts/?feedView=all", "Fuente de referencia de tendencias en AI coding agents."],
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
      ["LinkedIn — Claude", "https://www.linkedin.com/showcase/claude/posts/?feedView=all", "Fuente de referencia de tendencias en AI coding agents."],
    ],
  },
};

const changelog = [
  // { date: "YYYY-MM-DD", entries: [{ tool: "claude", title: "...", body: "...", url: "..." }] }
  { date: "2026-07-15", entries: [{ tool: "claude", title: "🎬 Build data-driven lesson plans with Claude for Teachers", body: "High school teacher Zac shows how he uses Claude for Teachers to analyze classroom data and build differentiated lesson plans tailored to each student’s level and mapped to state standards.", url: "https://www.youtube.com/watch?v=255IGB63nTY" }] },
  { date: "2026-07-14", entries: [{ tool: "claude", title: "🎬 Regenerative beekeeping with Claude", body: "When a swarm of bees shows up in someone's yard, Onyx Baird gets the call. Ten years of regenerative beekeeping taught her to rely on both instinct and a wealth of information. With the help of Claude...", url: "https://www.youtube.com/watch?v=YCSeSVHNj7k" }] },
  { date: "2026-07-14", entries: [{ tool: "claude", title: "🎬 Plan smarter with Claude for Teachers", body: "Elementary teacher Karina shares how she uses Claude for Teachers to get daily feedback and build that coaching into her lesson plans automatically, all grounded in real standards by connecting to Tea...", url: "https://www.youtube.com/watch?v=V-OOEC5RNaQ" }] },
  { date: "2026-07-13", entries: [{ tool: "claude", title: "🎬 The Briefing: AI for Science", body: "Some of the world's leading researchers and pharmaceutical companies are now using Claude to accelerate their science. Last month, the people behind that work joined us to share what they've built -- ...", url: "https://www.youtube.com/watch?v=cd3PsBoGYkc" }] },
  { date: "2026-07-13", entries: [{ tool: "claude", title: "🎬 Building AI-native across industries with NTT, Mizuho and Mercari", body: "Leaders from NTT, Mizuho, and Mercari compare what building AI native looks like across telecommunications, banking, and consumer commerce. The conversation covers where each company placed its first ...", url: "https://www.youtube.com/watch?v=HrEy6MmqI-g" }] },
  { date: "2026-07-13", entries: [{ tool: "claude", title: "🎬 The Briefing: AI for Science", body: "Some of the world's leading researchers and pharmaceutical companies are now using Claude to accelerate their science. Last month, the people behind that work joined us to share what they've built -- ...", url: "https://www.youtube.com/watch?v=cd3PsBoGYkc" }] },
  { date: "2026-07-10", entries: [{ tool: "claude", title: "🎬 Building the future of agentic infrastructure", body: "Agents are moving from tools you prompt to infrastructure that runs your business. But what does it take to run them in production?  Jess Yann (Product Manager, Claude Managed Agents), Katelyn Lesse (...", url: "https://www.youtube.com/watch?v=ksfm6jeTg3Q" }] },
  { date: "2026-07-09", entries: [{ tool: "claude", title: "🎬 There’s hope in hard questions", body: "We don’t get the benefits of AI without addressing the hard questions. Share your own: https://claude.com/hard-questions  All voices featured in this film are from real people we’ve spoken with. You c...", url: "https://www.youtube.com/watch?v=iCdbe0SZt0A" }] },
  { date: "2026-07-09", entries: [{ tool: "claude", title: "🎬 There’s hope in hard questions", body: "We don’t get the benefits of AI without addressing the hard questions. Share your own: https://claude.com/hard-questions  All voices featured in this film are from real people we’ve spoken with. You c...", url: "https://www.youtube.com/watch?v=jVbGX7zJHi8" }] },
  { date: "2026-07-08", entries: [{ tool: "claude", title: "🎬 Making New York City miniature with Claude", body: "Danny Cortes makes miniatures of the New York City details most people walk right past: bodegas, mailboxes, dumpsters, storefronts. To him, every rusted corner and faded sign is worth preserving. With...", url: "https://www.youtube.com/watch?v=r7b_EsFgeyM" }] },
  { date: "2026-07-08", entries: [{ tool: "claude", title: "🎬 Working at the Frontier: Thomson Reuters", body: "Thomson Reuters has spent more than 150 years serving professions where being right is non-negotiable, like law, tax, and compliance. CTO Joel Hron explains how legal research went from a tedious, man...", url: "https://www.youtube.com/watch?v=bGCL-Ahb1Z8" }] },
  { date: "2026-07-07", entries: [{ tool: "claude", title: "🎬 Photographing the stars with Claude", body: "The Milky Way is invisible to the naked eye but that didn't stop Shane Auckland from chasing it. With the help of Claude, he mastered everything from exposure times to stitching the panorama together,...", url: "https://www.youtube.com/watch?v=JdqNda9JeaU" }] },
  { date: "2026-07-07", entries: [{ tool: "claude", title: "🎬 Regenerative beekeeping with Claude", body: "When a swarm of bees shows up in someone's yard, Onyx Baird gets the call. Ten years of regenerative beekeeping taught her to rely on both instinct and a wealth of information. With the help of Claude...", url: "https://www.youtube.com/watch?v=CuzipWWYvFo" }] },
  { date: "2026-07-07", entries: [{ tool: "claude", title: "🎬 Claude Cowork: coming to mobile and web", body: "Your work goes everywhere with you, and keeps going without you. Claude Cowork is now rolling out to mobile and web: start a task at your desk, check on it from your phone, and pick up the finished ou...", url: "https://www.youtube.com/watch?v=XNbc2HhL7J4" }] },
  { date: "2026-07-06", entries: [{ tool: "claude", title: "🎬 Photograph The Milky Way With Claude", body: "The Milky Way is invisible to the naked eye but that didn't stop Shane Auckland from chasing it. With the help of Claude, he mastered everything from exposure times to stitching the panorama together,...", url: "https://www.youtube.com/watch?v=8--srKGAaMQ" }] },
  { date: "2026-07-06", entries: [{ tool: "claude", title: "🎬 What’s at the center of Claude’s mind?", body: "Out of everything happening in your brain right now, only a tiny fraction is consciously accessible — thoughts you can describe, hold in mind, and reason with. We found a strikingly similar divide ins...", url: "https://www.youtube.com/watch?v=rKV5JcALQoQ" }] },
  { date: "2026-07-06", entries: [{ tool: "claude", title: "🎬 Claude Fable 5: Working At The Frontier", body: "We asked 5 teams what’s now possible with Claude Fable 5. In this film, teams at Thomson Reuters, Hebbia, Cognition, Cursor, and Base44 describe the before and after in their own words.  Working at th...", url: "https://www.youtube.com/watch?v=fQ3BuPPfovk" }] },
  { date: "2026-07-03", entries: [{ tool: "claude", title: "🎬 How Squidsoup makes art installations with Claude", body: "Squidsoup is a collective of artists and designers who make immersive experiences with sound, light and space. We caught up with them before one of their largest projects to date: a live performance w...", url: "https://www.youtube.com/watch?v=YovuEy7ufhE" }] },
  { date: "2026-07-02", entries: [{ tool: "claude", title: "🎬 The future of work with @Claude", body: "&quot;In the past, you had to open Claude and ask. With Claude Tag, Claude jumps in.&quot; In this conversation, Boris Cherny (Head of Claude Code) and Cat Wu (Head of Product, Claude Code) walk throu...", url: "https://www.youtube.com/watch?v=MhfnicQVkgY" }] },
  { date: "2026-06-30", entries: [{ tool: "claude", title: "🎬 Introducing Claude Science (now in beta)", body: "Introducing Claude Science, a new research app from Anthropic now in public beta.  It runs analyses, searches databases, and traces steps from data wrangling to validation. Every artifact ships with t...", url: "https://www.youtube.com/watch?v=idtMsa_1yNk" }] },
  { date: "2026-06-29", entries: [{ tool: "claude", title: "🎬 How Spotify runs agents across 20M+ lines of code, with Niklas Gustavsson", body: "At Spotify, employees can describe an idea and have Claude build a working prototype in an hour or two. VP of Engineering Niklas Gustavsson walked us through it.  Claude Cowork: anthropic.com/product/...", url: "https://www.youtube.com/watch?v=9DHZLw5653E" }] },
  { date: "2026-06-23", entries: [{ tool: "claude", title: "🎬 Tag Claude in, right where you already work", body: "@Claude works right alongside your team in Slack, with the channel's context, your org's tools, and the persistence to see work through over days. @Claude in any thread and it picks up what the channe...", url: "https://www.youtube.com/watch?v=VojDzHaciKQ" }] },
  { date: "2026-06-23", entries: [{ tool: "claude", title: "🎬 Agent identity: A new access model for Claude Tag", body: "@Claude joins your Slack channels as a teammate that picks up the thread, does the work, and reports back when it's done. To keep that safe across autonomous, multiplayer sessions, it acts under its o...", url: "https://www.youtube.com/watch?v=JhipXUs1Y98" }] },
  { date: "2026-06-21", entries: [{ tool: "claude", title: "🎬 Delegate and schedule tasks in Claude Cowork", body: "Use Claude Cowork to delegate work and schedule recurring tasks. From meeting prep to hourly content scans, Cowork can handle it.   Learn more: Claude.com/tutorials", url: "https://www.youtube.com/watch?v=tYOI-WoLS_o" }] },
  { date: "2026-06-18", entries: [{ tool: "claude", title: "🎬 Artifacts in Claude Code: share your work as it happens", body: "With Artifacts in Claude Code, Claude turns raw output — data, mockups, a wall of JSON — into a clear visual page you can share with your team. Generate an artifact in any session so anyone on your te...", url: "https://www.youtube.com/watch?v=m7TJqx8CYG8" }] },
  { date: "2026-06-18", entries: [{ tool: "claude", title: "🎬 Enterprise-managed auth for MCP connectors", body: "Admins can now authorize and authenticate MCP connectors for their whole organization through their identity provider — no individual set-up required. See it in action, from admin setup to an employee...", url: "https://www.youtube.com/watch?v=5kTDt9ewTwE" }] },
  { date: "2026-06-16", entries: [{ tool: "claude", title: "🎬 The Briefing: Financial Services", body: "Some of the world's largest banks are now running Claude across their organizations. Last month, the leaders behind that work joined us for The Briefing: Financial Services to share what they've built...", url: "https://www.youtube.com/watch?v=H3XQeGNia8o" }] },
  { date: "2026-06-12", entries: [{ tool: "claude", title: "🎬 Claude FM 🎵 music for thinking and building", body: "Press play and keep thinking. Made and curated by musicians.", url: "https://www.youtube.com/watch?v=tRsQsTMvPNg" }] },
  { date: "2026-05-09", entries: [{ tool: "claude", title: "🎬 Claude FM 🎵 music for thinking and building", body: "Press play and keep thinking. Made and curated by musicians.", url: "https://www.youtube.com/watch?v=Dp5zx9rD-Qc" }] },
  { date: "2026-06-12", entries: [{ tool: "claude", title: "🎬 Code with Claude Tokyo 2026: Opening Keynote", body: "", url: "https://www.youtube.com/watch?v=N4efO8viXXo" }] },
  { date: "2026-06-10", entries: [{ tool: "claude", title: "🎬 The Problem Solvers | Michael Truell at Cursor", body: "Michael Truell started coding at 12 and fell in love with building without barriers. He's been chasing that feeling ever since, and Cursor exists to give it to everyone who writes code. The AI-native ...", url: "https://www.youtube.com/watch?v=8NVZMRyCrn4" }] },
  { date: "2026-06-09", entries: [{ tool: "claude", title: "🎬 Claude Fable 5 beats Pokémon FireRed only using vision", body: "A timelapse of Claude playing Pokémon FireRed from start to finish using only raw game screenshots — with no maps, navigation aids, or extra game-state information. Earlier Claude models needed a comp...", url: "https://www.youtube.com/watch?v=Ty_50J84fMY" }] },
  { date: "2026-06-09", entries: [{ tool: "claude", title: "🎬 Code with Claude 2026 | Tokyo", body: "Pull up a chair and watch the main stage live from Code with Claude Tokyo. We're discussing what's new with our models, the Claude Platform, and  Claude Code. After that, listen as Canva, Mizuho and N...", url: "https://www.youtube.com/watch?v=GiqyYQdYoIY" }] },
  { date: "2026-06-09", entries: [{ tool: "claude", title: "🎬 Claude Fable 5 beats Pokémon FireRed only using vision", body: "A timelapse of Claude playing Pokémon FireRed from start to finish using only raw game screenshots — with no maps, navigation aids, or extra game-state information. Earlier Claude models needed a comp...", url: "https://www.youtube.com/watch?v=Ty_50J84fMY" }] },
  { date: "2026-06-09", entries: [{ tool: "claude", title: "🎬 Introducing Claude Fable 5", body: "Claude Fable 5 is our most capable model yet, now generally available. It’s a Mythos-class model with safeguards that let us share it broadly without compromising on safety.  It can stay with complex ...", url: "https://www.youtube.com/watch?v=Y9Wz2PV404E" }] },
  { date: "2026-06-09", entries: [{ tool: "claude", title: "🎬 Claude Fable 5 plays Factorio", body: "Claude Fable 5 autonomously plays Factorio, the factory-building game beloved by engineers, strategizing and building an automated factory on its own.", url: "https://www.youtube.com/watch?v=6YPqoARpYuQ" }] },
  { date: "2026-06-09", entries: [{ tool: "claude", title: "🎬 Code with Claude 2026 | Tokyo", body: "Pull up a chair and watch the main stage live from Code with Claude Tokyo. We're discussing what's new with our models, the Claude Platform, and  Claude Code. After that, listen as Canva, Mizuho and N...", url: "https://www.youtube.com/watch?v=GiqyYQdYoIY" }] },
  { date: "2026-06-08", entries: [{ tool: "claude", title: "🎬 Working Like a Lawyer with Claude", body: "Mark Pike, Legal Counsel at Anthropic, talks with Anna Gressel, Partner and Global Co-Head of AI at Freshfields, about how lawyers use Claude.  They get into how legal work is changing with AI, and wh...", url: "https://www.youtube.com/watch?v=LrZHnKS_L6k" }] },
  { date: "2026-06-08", entries: [{ tool: "claude", title: "🎬 Reflecting on a year of Claude Code", body: "One year ago, we made Claude Code generally available. What started as an internal project—an agentic coding tool that runs in your terminal—is now used by developers and organizations worldwide.  Bor...", url: "https://www.youtube.com/watch?v=Hth_tLaC2j8" }] },
  { date: "2026-06-05", entries: [{ tool: "claude", title: "🎬 How Anthropic uses Claude in GTM Engineering", body: "Sales reps drown in administrative work, from digging through scattered documentation to answering customer emails late into the night. Jared Sires, GTM Product Manager, shares how he went from accoun...", url: "https://www.youtube.com/watch?v=n4ZxEznNaIY" }] },
  { date: "2026-06-04", entries: [{ tool: "claude", title: "🎬 The Problem Solvers | Anton Osika at Lovable", body: "Anton Osika thinks moving fast and doing it right are the same job. Lovable lets anyone build software through conversation, no engineering team required. Two months after launch, millions of people w...", url: "https://www.youtube.com/watch?v=rjSvJYrVY2k" }] },
  { date: "2026-06-03", entries: [{ tool: "claude", title: "🎬 Team thinking, visualized by Claude", body: "The thinking behind every lap, visualized with Claude. Pattern of Thought, created with the Atlassian Williams F1 Team, debuts at Monaco.  Every race is decided by work no camera catches: the focus, j...", url: "https://www.youtube.com/watch?v=8N1-XHNupfg" }] },
  { date: "2026-06-02", entries: [{ tool: "claude", title: "🎬 The Problem Solvers | Max Junestrand at Legora", body: "Legora is the AI-native operating system, where legal teams can autonomously plan, execute, review, and complete complex legal work end-to-end. Max Junestrand says one of the oldest jobs in the world ...", url: "https://www.youtube.com/watch?v=bjrmYsFae_g" }] },
  { date: "2026-05-28", entries: [{ tool: "claude", title: "🎬 Before we ship a Claude model, these teams try to break it.", body: "They don't just test the latest Claude models, they put them through the wringer. Working at the Frontier goes inside that process: what they build, what they push back on, and how their feedback shap...", url: "https://www.youtube.com/watch?v=CG7Rcl49C2w" }] },
  { date: "2026-05-28", entries: [{ tool: "claude", title: "🎬 Embrace long-running tasks with Opus 4.8 and Claude Code", body: "With Opus 4.8, you can hand off long-running coding work to Claude Code and walk away. Ship features with /goal and step away from your computer with /remote-control. Claude Code handles complex work ...", url: "https://www.youtube.com/watch?v=5HVPeux24WU" }] },
  { date: "2026-05-27", entries: [{ tool: "claude", title: "🎬 The Problem Solvers: Michele Catasta at Replit", body: "At 16, Michele Catasta set out to make software open to everyone. What followed was a decade of research at Stanford and Google X in training state-of-the-art models, all in service of that goal. He j...", url: "https://www.youtube.com/watch?v=kUQD5ZElyB4" }] },
  { date: "2026-05-26", entries: [{ tool: "claude", title: "🎬 Ship your first Managed Agent", body: "Build and ship a working incident-investigator agent on Anthropic's Managed Agents platform: define an Agent, Environment, and Session, stream events, and wire up custom tools, all in six functions. Y...", url: "https://www.youtube.com/watch?v=19HDQ9HppOA" }] },
  { date: "2026-05-23", entries: [{ tool: "claude", title: "🎬 Tool, skill, or subagent? Decomposing an agent that outgrew its prompt", body: "When does logic belong in a tool, a skill, or a subagent? You'll learn the decision framework by doing: inherit a 402-line inventory agent, decompose it live on Claude Managed Agents, and run evals af...", url: "https://www.youtube.com/watch?v=mWvtOHlZM-I" }] },
  { date: "2026-05-22", entries: [{ tool: "claude", title: "🎬 Making agentic workflows trustworthy and verifiable with a custom DSL", body: "System design of agentic research assistant built unconventionally: one component outputs plan in custom Turing-incomplete programming language, another interprets it, quiver of models executes concre...", url: "https://www.youtube.com/watch?v=qOjleN2-50c" }] },
  { date: "2026-05-22", entries: [{ tool: "claude", title: "🎬 The Problem Solvers: Kay Zhu at Genspark", body: "Kay Zhu built Genspark on a belief he's living at home: that AI should free people to follow their heart. His teenage son is studying commercial dance instead of computer science with his full support...", url: "https://www.youtube.com/watch?v=MyYe6C4NVu0" }] },
  { date: "2026-05-22", entries: [{ tool: "claude", title: "🎬 The prompting playbook", body: "How to apply core prompting principles to agentic systems that plan, act, and adapt.", url: "https://www.youtube.com/watch?v=G2B0YWuJUgI" }] },
  { date: "2026-05-22", entries: [{ tool: "claude", title: "🎬 The capability curve", body: "Frontier models are getting more capable, fast. Where the curve is going, and what it means for developers building on Claude.", url: "https://www.youtube.com/watch?v=DNRddIEoH3c" }] },
  { date: "2026-05-21", entries: [{ tool: "claude", title: "🎬 Building the best agentic analytics harness: Powered by Claude, built with Claude Code", body: "Omni built the best agentic harness for analytics tailored for and powered by Claude models, with 99% of the platform's code written using Claude Code. Cofounder &amp; CTO Chris Merrick shows how they...", url: "https://www.youtube.com/watch?v=K4-flzsPraE" }] },
  { date: "2026-05-21", entries: [{ tool: "claude", title: "🎬 Building with Claude on Google Cloud", body: "A live build from zero to deployed in thirty minutes. We'll build a feedback app spanning five roles and the full software lifecycle, using Claude and Google Cloud alongside subagents, MCP servers, an...", url: "https://www.youtube.com/watch?v=l8fxVYIP4HQ" }] },
  { date: "2026-05-21", entries: [{ tool: "claude", title: "🎬 Memory and dreaming for self learning agents", body: "How memory and dreaming turn Claude Managed Agents into self-learning systems. This session walks through design considerations for memory architectures and how dreaming verifies and enriches memory b...", url: "https://www.youtube.com/watch?v=IGo225tfF2I" }] },
  { date: "2026-05-21", entries: [{ tool: "claude", title: "🎬 How to get to production faster with Claude Managed Agents", body: "Building agents used to mean spending development cycles on secure infrastructure, state management, permissioning, and reworking your agent loops for every model upgrade. Managed Agents, on the Claud...", url: "https://www.youtube.com/watch?v=zenIB7XLZxQ" }] },
  { date: "2026-05-21", entries: [{ tool: "claude", title: "🎬 Build a production-ready agent with Claude Managed Agents", body: "A hands-on build session for Claude Managed Agents. You'll deploy a production-ready agent from scratch, then debug and monitor it live in the developer console.", url: "https://www.youtube.com/watch?v=jWWsLe4Gh5Y" }] },
  { date: "2026-05-20", entries: [{ tool: "claude", title: "🎬 The thinking lever", body: "Adaptive thinking and effort controls give developers a new decision: how much should Claude reason for a given task? This session covers thinking budgets, effort levels, and the cost, latency, and qu...", url: "https://www.youtube.com/watch?v=T7KqH7kYnE4" }] },
  { date: "2026-05-20", entries: [{ tool: "claude", title: "🎬 How Lovable vibecodes production software at scale", body: "Vibecoding a beautiful, working prototype is easier than ever. Running a platform that non-developers use to ship production software is a different engineering problem. Today, software built on Lovab...", url: "https://www.youtube.com/watch?v=mhW-XXnDFSU" }] },
  { date: "2026-05-20", entries: [{ tool: "claude", title: "🎬 Building AI-native at enterprise scale: monday.com, Doctolib, and Delivery Hero", body: "Three of Europe's fastest-scaling tech companies made three different bets on Claude: Delivery Hero built an autonomous agent that now merges 100+ PRs a day, Doctolib governs Claude Code across its en...", url: "https://www.youtube.com/watch?v=XFaeIbL-lvE" }] },
  { date: "2026-05-20", entries: [{ tool: "claude", title: "🎬 From one person to 80: Scaling a hypergrowth engineering org with Claude Code", body: "Base44 went from one engineer to hyper-growth — getting acquired by Wix, absorbing a wave of new engineers, then shipping faster than any reasonable hiring plan could carry. Claude Code is what kept t...", url: "https://www.youtube.com/watch?v=VueeyKcquoA" }] },
  { date: "2026-05-19", entries: [{ tool: "claude", title: "🎬 Code with Claude London 2026: Opening Keynote", body: "Get the latest updates from Anthropic's engineering and product leaders at the Code with Claude 2026 opening keynote in London.", url: "https://www.youtube.com/watch?v=6amLO7I9xdg" }] },
  { date: "2026-05-19", entries: [{ tool: "claude", title: "🎬 The Problem Solvers: Scott Wu at Cognition", body: "Scott Wu was world champion of competitive programming at 17. For years he wondered whether AI would do what he could. Now he runs Cognition, the team behind the first AI software engineer. When they ...", url: "https://www.youtube.com/watch?v=_kSAptN8TAY" }] },
  { date: "2026-05-18", entries: [{ tool: "claude", title: "🎬 Code with Claude 2026 | London", body: "Pull up a chair and watch the main stage live from Code with Claude London. We're discussing what's new with our models and the platform, and then Claude Code takes center stage. After that, listen as...", url: "https://www.youtube.com/watch?v=AgQ4cwL5eOM" }] },
  { date: "2026-05-18", entries: [{ tool: "claude", title: "🎬 Claude Cowork for legal teams", body: "Legal teams are being asked to do more with less. A big part of the job is coming up to speed fast: a question lands about a feature that launched months ago, and the context you had when you wrote th...", url: "https://www.youtube.com/watch?v=EPUg9pmfPk0" }] },
  { date: "2026-05-18", entries: [{ tool: "claude", title: "🎬 Context Management in Claude Code", body: "Context is Claude's working memory, and managing it well is key to productive sessions.  Learn when to use /compact vs /clear and practical tips for keeping your context window lean.  Take the full co...", url: "https://www.youtube.com/watch?v=eW3oTyfeWZ0" }] },
  { date: "2026-05-17", entries: [{ tool: "claude", title: "🎬 The Explore → Plan → Code → Commit workflow in Claude Code", body: "The single most important workflow for using Claude Code effectively. Learn how to let Claude research before coding, define success criteria, and use subagent reviewers before pushing.  Take the full...", url: "https://www.youtube.com/watch?v=xJQuF02NAK8" }] },
  { date: "2026-05-15", entries: [{ tool: "claude", title: "🎬 Your first Claude Code prompt", body: "Writing your first prompt in Claude Code can be intimidating. In this video, we tell you how to prompt Claude Code for the best results and the differences between approval mode and auto-accept.  To s...", url: "https://www.youtube.com/watch?v=gbetp6D7J_Q" }] },
  { date: "2026-05-14", entries: [{ tool: "claude", title: "🎬 Installing Claude Code", body: "Claude Code can be installed in almost anywhere you develop. This can be: in the terminal, VS Code, JetBrains, Claude Desktop, or on the web.  We walk you through installation steps for each platform ...", url: "https://www.youtube.com/watch?v=0kILa02vKuI" }] },
  { date: "2026-05-14", entries: [{ tool: "claude", title: "🎬 How Claude Code Works", body: "Claude Code runs on an &quot;agentic&quot; loop that gathers context, takes action, and verifies results.  In this video, we break down the loop, the context window, tools, and permission modes so tha...", url: "https://www.youtube.com/watch?v=6bs5b4FltCU" }] },
  { date: "2026-05-13", entries: [{ tool: "claude", title: "🎬 How Emergent is making app building more accessible with Claude", body: "Emergent reached $100M ARR in eight months, with 70–80% of users having never written a line of code. In this conversation, Co-founder and CEO Mukund Jha sits down with Anthropic's Carly Ryan to talk ...", url: "https://www.youtube.com/watch?v=IGAVa4uyo2w" }] },
  { date: "2026-05-12", entries: [{ tool: "claude", title: "🎬 How Anthropic uses Claude in Cybersecurity", body: "Security teams drown in alerts, jumping between tools and query languages for every investigation. Jackie Bow, Technical Lead on Anthropic's Detection Platform Engineering team, shares how her team us...", url: "https://www.youtube.com/watch?v=FPPTnI88RR8" }] },
  { date: "2026-05-11", entries: [{ tool: "claude", title: "🎬 Introducing agent view in Claude Code", body: "Agent view in Claude Code provides one place to manage all your Claude Code sessions. Available as a research preview on Pro, Max, Team, Enterprise, and Claude API plans.  Read more in our documentati...", url: "https://www.youtube.com/watch?v=-INveHwbRz4" }] },
  { date: "2026-05-10", entries: [{ tool: "claude", title: "🎬 The CLAUDE.md file", body: "Give Claude Code persistent memory about your project with a simple Markdown file called the: &quot;CLAUDE.md&quot;  In this video, we cover what to put in your CLAUDE.md file, how the file hierarchy ...", url: "https://www.youtube.com/watch?v=O0FGCxkHM-U" }] },
  { date: "2026-05-09", entries: [{ tool: "claude", title: "🎬 Claude FM 🎵 music for thinking and building", body: "Press play and keep thinking. Made and curated by musicians.", url: "https://www.youtube.com/watch?v=YmQ7jRgf4f0" }] },
  { date: "2026-05-09", entries: [{ tool: "claude", title: "🎬 MCP in Claude Code", body: "MCP connects Claude Code to external tools and data sources like Linear, GitHub, and documentation servers.  This video covers adding servers, scoping them for your team, and managing context costs.  ...", url: "https://www.youtube.com/watch?v=kkBFmwkDzdo" }] },
  { date: "2026-05-08", entries: [{ tool: "claude", title: "🎬 The expanding toolkit", body: "Over the last year, capabilities that used to require heavy scaffolding have moved into the model: reliable tool use, context management, writing and running code, computer use, and more. This session...", url: "https://www.youtube.com/watch?v=KLCuxMDZSDg" }] },
  { date: "2026-05-08", entries: [{ tool: "claude", title: "🎬 The capability curve", body: "Frontier models are getting more capable, fast. Where the curve is going, and what it means for developers building on Claude.", url: "https://www.youtube.com/watch?v=tP4MGcJ80Y0" }] },
  { date: "2026-05-08", entries: [{ tool: "claude", title: "🎬 Getting Started with Claude Cowork", body: "Learn how to use Claude Cowork to edit your files directly and work in your favorite apps. If it’s on your computer, Claude can find and edit it. Describe what you need done, and Claude does it.   Lea...", url: "https://www.youtube.com/watch?v=Lbml7IuGJYw" }] },
  { date: "2026-05-07", entries: [{ tool: "claude", title: "🎬 Collaborate with Claude across Microsoft365 apps", body: "Claude now works across your open Outlook, Word, Excel, and PowerPoint files in a single continuous session — triaging email, drafting documents, building models, updating slides, and carrying full co...", url: "https://www.youtube.com/watch?v=F6dzjaBCBtU" }] },
  { date: "2026-05-07", entries: [{ tool: "claude", title: "🎬 Translating Claude’s thoughts into language", body: "AI models like Claude talk in words but think in numbers. These numbers, called activations, encode Claude’s thoughts, but not in a language we can read.  We are introducing Natural Language Autoencod...", url: "https://www.youtube.com/watch?v=j2knrqAzYVY" }] },
  { date: "2026-05-07", entries: [{ tool: "claude", title: "🎬 Hooks in Claude Code", body: "Hooks give you deterministic control over Claude Code's behavior at key lifecycle events.  Learn how to auto-format after edits, block dangerous operations, and share hooks with your team.  Take the f...", url: "https://www.youtube.com/watch?v=IkaPHiMDazM" }] },
  { date: "2026-05-06", entries: [{ tool: "claude", title: "🎬 Code with Claude 2026: Opening Keynote", body: "", url: "https://www.youtube.com/watch?v=GMIWm5y90xA" }] },
  { date: "2026-05-05", entries: [{ tool: "claude", title: "🎬 The capability curve", body: "Frontier models are getting more capable, fast. Where the curve is going, and what it means for developers building on Claude.", url: "https://www.youtube.com/watch?v=tP4MGcJ80Y0" }] },
  { date: "2026-05-05", entries: [{ tool: "claude", title: "🎬 How Datadog built a universal machine tool for Claude Code", body: "At Datadog, 90% of engineers adopted AI coding tools for production work in the last four months, with Claude Code driving two-thirds of that usage. As sessions grew more ambitious, the reusable tools...", url: "https://www.youtube.com/watch?v=EdmuYPBt_EM" }] },
  { date: "2026-05-05", entries: [{ tool: "claude", title: "🎬 Architecting for model step-changes: A fireside with Vercel's Guillermo Rauch", body: "When Opus 4.5 landed, v0 was ready on day one — not by luck, but by design. Guillermo Rauch sits down with Angela Jiang at Anthropic to unpack how Vercel architects for model step-changes: the bets th...", url: "https://www.youtube.com/watch?v=bJKdXhnw7NU" }] },
  { date: "2026-05-05", entries: [{ tool: "claude", title: "🎬 Building AI-native: Inside the stacks powering Cognition, Gamma, and Harvey", body: "Three teams building AI-native products — Cognition, Gamma, and Harvey — discuss the architectural decisions behind their stacks. The conversation covers multi-agent orchestration, MCP in production, ...", url: "https://www.youtube.com/watch?v=OFDm3T7pVlc" }] },
  { date: "2026-05-05", entries: [{ tool: "claude", title: "🎬 How to get to production faster with Claude Managed Agents", body: "Most of shipping an agent isn't the agent itself — it's the infrastructure around it: state, long-running sessions, orchestration, guardrails. Claude Managed Agents handles that layer. This session co...", url: "https://www.youtube.com/watch?v=E9gaQHrw_rg" }] },
  { date: "2026-05-06", entries: [{ tool: "claude", title: "🎬 Code with Claude Opening Keynote", body: "", url: "https://www.youtube.com/watch?v=GMIWm5y90xA" }] },
  { date: "2026-05-05", entries: [{ tool: "claude", title: "🎬 What is Claude Code?", body: "Claude Code is an agentic coding tool that reads your codebase, edits files, and runs commands directly in your terminal.  This video covers what makes it different from Claude.ai and what it means to...", url: "https://www.youtube.com/watch?v=fl1DSmwQKKY" }] },
  { date: "2026-05-05", entries: [{ tool: "claude", title: "🎬 New agents for financial services | Claude Cowork + Claude Managed Agents", body: "We're introducing 10 purpose-built agent templates for financial services spanning research and analysis, risk and compliance, client operations, and finance workflows. Each agent ships with the conte...", url: "https://www.youtube.com/watch?v=foxeK2AXfHQ" }] },
  { date: "2026-04-30", entries: [{ tool: "claude", title: "🎬 Find and fix security vulnerabilities with Claude", body: "Claude Security, now available in public beta, scans codebases for vulnerabilities and suggests targeted software patches for human review, allowing teams to find and fix issues that traditional metho...", url: "https://www.youtube.com/watch?v=0SgCiUfoYo8" }] },
  { date: "2026-04-28", entries: [{ tool: "claude", title: "🎬 Claude now connects to Autodesk Fusion", body: "Claude now connects to the tools creative professionals already use.  With the Autodesk Fusion connector, designers and engineers can turn natural language into design actions, iterate without startin...", url: "https://www.youtube.com/watch?v=Gen8rG40ntA" }] },
  { date: "2026-04-24", entries: [{ tool: "claude", title: "🎬 Why does bias exist in AI models?", body: "Today, we dive into political bias as one type of bias that may exist in models. Learn why it may occur, what we do about it, and tactics you can use to spot this in your conversations.", url: "https://www.youtube.com/watch?v=RnOWJoHU_NY" }] },
  { date: "2026-04-23", entries: [{ tool: "claude", title: "🎬 All your everyday apps, in one conversation", body: "Claude now also connects to the apps you use outside of work, from travel and food to entertainment and home. Ask for what you need, and Claude pulls in the right app. Available on web, desktop, and m...", url: "https://www.youtube.com/watch?v=U9jGOz_Lcbo" }] },
  { date: "2026-04-20", entries: [{ tool: "claude", title: "🎬 How Anthropic uses Claude in Product Engineering", body: "Product engineers lose hours toggling between tools and tackling subtasks one at a time. Software engineer Chuma Kabaghe shows how she uses Claude Code to onboard onto unfamiliar codebases in minutes,...", url: "https://www.youtube.com/watch?v=ma7oe_5h0ag" }] },
  { date: "2026-04-17", entries: [{ tool: "claude", title: "🎬 Introducing Claude Design by Anthropic Labs", body: "Claude Design is a new Anthropic Labs product that lets you collaborate with Claude to create polished visual work like prototypes, slides, one-pagers, and more.", url: "https://www.youtube.com/watch?v=t_LBECIQQqs" }] },
  { date: "2026-04-16", entries: [{ tool: "claude", title: "🎬 Working smarter with Claude in PowerPoint", body: "Part 3 of 3. Learn how to use Claude in PowerPoint to pulling data from other sources and analyze your findings.  Learn more: claude.com/tutorials", url: "https://www.youtube.com/watch?v=gRLMG5YNNTo" }] },
  { date: "2026-04-15", entries: [{ tool: "claude", title: "🎬 Why do AI models hallucinate?", body: "Learn what AI researchers mean when they talk about hallucination in AI models, why it may occur, and tactics you can use to spot this in your conversations.  Learn more: anthropic.com/ai-fluency", url: "https://www.youtube.com/watch?v=005JLRt3gXI" }] },
  { date: "2026-04-14", entries: [{ tool: "claude", title: "🎬 The new Claude Code desktop app, redesigned for parallel agents", body: "The Claude Code desktop app has been redesigned for agentic coding: many things in flight, and you in the orchestrator seat. A new sidebar lets you run and manage sessions in parallel across repos, an...", url: "https://www.youtube.com/watch?v=rWaQSQEm_aY" }] },
  { date: "2026-04-10", entries: [{ tool: "claude", title: "🎬 Claude works inside your Word document", body: "Claude now edits directly in Microsoft Word — reading your comments, making changes as native tracked changes, and preserving your heading styles, numbering, and defined terms so the rest of the docum...", url: "https://www.youtube.com/watch?v=CnAPjeQt5Jg" }] },
  { date: "2026-04-09", entries: [{ tool: "claude", title: "🎬 What is Managed Agents?", body: "Claude Managed Agents is a suite of APIs for building production-ready agents. You define the tools, environments, and success criteria. Claude works until the job is done.  Outcomes, multi-agent orch...", url: "https://www.youtube.com/watch?v=NLWiIj47IdI" }] },
  { date: "2026-04-09", entries: [{ tool: "claude", title: "🎬 Cowork is now generally available", body: "Cowork is now generally available. Built for how teams work — across the tools they already use, with the controls enterprises need. Read more: https://claude.com/blog/cowork-for-enterprise", url: "https://www.youtube.com/watch?v=-AkiUPvAqbU" }] },
  { date: "2026-04-08", entries: [{ tool: "claude", title: "🎬 Introducing Claude Managed Agents", body: "Claude Managed Agents is a suite of composable APIs for building and deploying agents at scale. Out of the box, it includes native MCP, tool integrations, memory, and all the infrastructure you need t...", url: "https://www.youtube.com/watch?v=I1BvAHOsjBU" }] },
  { date: "2026-04-07", entries: [{ tool: "claude", title: "🎬 An initiative to secure the world's software | Project Glasswing", body: "Project Glasswing is a new initiative that brings together Amazon Web Services, Anthropic, Apple, Broadcom, Cisco, CrowdStrike, Google, JPMorganChase, the Linux Foundation, Microsoft, NVIDIA, and Palo...", url: "https://www.youtube.com/watch?v=INGOC6-LLv0" }] },
  { date: "2026-04-02", entries: [{ tool: "claude", title: "🎬 We scanned Claude to look for emotions", body: "AI models sometimes act like they have emotions—why?   We studied one of our recent models and found that it draws on emotion concepts learned from text to inhabit its role as Claude, the AI assistant...", url: "https://www.youtube.com/watch?v=D4XTefP3Lsc" }] },
  { date: "2026-03-21", entries: [{ tool: "claude", title: "Projects now available in Cowork", body: "Projects are now available in Cowork. Keep your tasks and context in one place, focused on one area of work. Files and instructions stay on your computer. Import existing projects in one click, or start fresh.", url: "https://lnkd.in/gZrAJjqb" }] },
];

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
  const tabs = order.map((tool) => {
    const item = data[tool];
    const on = tool === active;
    return `<button class="tool-tab tool-tab--${tool} ${on ? "is-active" : ""}" type="button" data-tool="${tool}" aria-pressed="${on}"><span>${item.label}</span><small>${total(tool)} cmds</small></button>`;
  });
  const totalEntries = changelog.reduce((n, e) => n + e.entries.length, 0);
  const rnOn = active === "changelog";
  tabs.push(`<button class="tool-tab tool-tab--changelog ${rnOn ? "is-active" : ""}" type="button" data-tool="changelog" aria-pressed="${rnOn}"><span>Release Notes</span><small>${totalEntries} nuevo${totalEntries === 1 ? "" : "s"}</small></button>`);
  document.getElementById("tool-switcher").innerHTML = tabs.join("");
}

function renderChangelogPage() {
  if (!changelog.length) {
    document.getElementById("cheatsheet-grid").innerHTML =
      `<section class="empty-state"><strong>Sin actualizaciones aún</strong><p>El workflow diario agregará noticias nuevas aquí cuando las detecte.</p></section>`;
    return;
  }
  document.getElementById("cheatsheet-grid").innerHTML = changelog.map((entry) => {
    const rows = entry.entries.map(e =>
      `<article class="command-item">
        <div class="command-topline">
          <span class="news-title-inline">${esc(e.title)}</span>
          <span class="pill rn-pill rn-pill--${e.tool}">${e.tool}</span>
        </div>
        <p class="command-desc">${esc(e.body)}</p>
        ${e.url ? `<a class="news-link" href="${esc(e.url)}" target="_blank" rel="noreferrer">${esc(e.url)}</a>` : ""}
      </article>`
    ).join("");
    return `<section class="card wide">
      <header class="card-header">
        <div class="card-title"><h3>${esc(entry.date)}</h3><p>${entry.entries.length} novedad${entry.entries.length === 1 ? "" : "es"}</p></div>
      </header>
      <div class="command-list">${rows}</div>
    </section>`;
  }).join("");
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
  if (active === "changelog") {
    renderChangelogPage();
    return;
  }
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
