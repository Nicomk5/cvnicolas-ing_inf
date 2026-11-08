/* ==========================================================================
   PORTAFOLIO (Tutoría) — navegación por hash, sin librerías
   Rutas:  #/                      → inicio del portafolio (3 categorías)
           #/<categoria>           → actividades de la categoría
           #/<categoria>/<actividad> → vista individual de la actividad

   PARA AGREGAR UNA ACTIVIDAD NUEVA:
   1) Crea en portafolio.html un <template id="tpl-<id-de-la-actividad>">.
   2) Agrega aquí, en esa actividad, la propiedad  tpl: "tpl-<id-de-la-actividad>"
      (y opcionalmente un resumen en  summary).
   ========================================================================== */
(() => {
    "use strict";

    const root = document.getElementById("pf-root");
    if (!root) return;

    const SITE = "Portafolio de Tutoría | Nicolas De La Cruz Villafaña";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- Datos: 3 categorías × 2 actividades ---------- */
    const PF = [
        {
            id: "personal-social",
            title: "Desarrollo personal y social",
            icon: "🧠",
            accent: "green",
            desc: "Evidencias sobre el reconocimiento de mis emociones y el desarrollo de mi creatividad.",
            activities: [
                {
                    id: "manejo-emocional",
                    title: "Manejo emocional",
                    icon: "💭",
                    tpl: "tpl-manejo-emocional",
                    summary: "Análisis de situaciones académicas, estrategia de autorregulación, reflexión y conclusión."
                },
                {
                    id: "creatividad",
                    title: "Creatividad",
                    icon: "💡",
                    tpl: "tpl-creatividad",
                    summary: "Optimización de la distribución de salones en el edificio de Informática."
                }
            ]
        },
        {
            id: "aprendizaje-proyectos",
            title: "Aprendizaje y proyectos",
            icon: "🚀",
            accent: "cyan",
            desc: "Evidencias de mis proyectos de software y prototipos, y de mi trabajo en emprendimiento social y económico.",
            activities: [
                {
                    id: "proyectos-software",
                    title: "Mis proyectos de software y prototipos",
                    icon: "💻",
                    tpl: "tpl-proyectos-software",
                    summary: "Control y análisis de consumo energético para los hogares y sistema web de gestión de vacantes para programadores."
                },
                {
                    id: "emprendimiento",
                    title: "Emprendimiento social y económico",
                    icon: "📈",
                    tpl: "tpl-emprendimiento",
                    summary: "NegocioFácil: propuesta de plataforma web, en etapa de planificación, para administrar productos, inventario y ventas de pequeños negocios."
                }
            ]
        },
        {
            id: "profesional-vocacional",
            title: "Identidad profesional y vocación",
            icon: "🎯",
            accent: "violet",
            desc: "Evidencias de mi plan de carrera y de mis relaciones industriales.",
            activities: [
                {
                    id: "plan-carrera",
                    title: "Plan de carrera",
                    icon: "🗺️",
                    tpl: "tpl-plan-carrera",
                    summary: "Ruta de carrera en desarrollo de software y ciberseguridad: competencias, mapa de brechas de habilidades y plan de formación de seis meses."
                },
                {
                    id: "relaciones-industriales",
                    title: "Relaciones industriales",
                    icon: "🤝",
                    tpl: "tpl-relaciones-industriales",
                    summary: "Propuesta de acercamiento a PI Automation para una visita académica o charla técnica sobre automatización industrial."
                }
            ]
        }
    ];

    /* ---------- Piezas reutilizables ---------- */
    const status = (a) =>
        a.tpl
            ? '<span class="pf-status ready mono">Disponible</span>'
            : '<span class="pf-status soon mono">Próximamente</span>';

    const crumbs = (items) =>
        '<nav class="pf-crumbs mono" aria-label="Ruta de navegación">' +
        items
            .map((it, i) => {
                const last = i === items.length - 1;
                const node = last
                    ? `<span aria-current="page">${it.label}</span>`
                    : `<a href="${it.href}">${it.label}</a>`;
                return node + (last ? "" : '<span class="sep">/</span>');
            })
            .join("") +
        "</nav>";

    /* ---------- Vistas ---------- */
    function homeView() {
        const cards = PF.map(
            (c, i) => `
      <article class="pf-card reveal" data-accent="${c.accent}">
        <span class="pf-axis mono">Eje ${"ABC"[i]}</span>
        <div class="pf-card-icon" aria-hidden="true">${c.icon}</div>
        <h2>${c.title}</h2>
        <p>${c.desc}</p>
        <ul class="pf-list">
          ${c.activities
                    .map(
                        (a) =>
                            `<li><a href="#/${c.id}/${a.id}"><span>${a.icon} ${a.title}</span>${status(a)}</a></li>`
                    )
                    .join("")}
        </ul>
        <a class="pf-more" href="#/${c.id}">Ver categoría →</a>
      </article>`
        ).join("");

        return {
            title: SITE,
            html: `
      <div class="container">
        <div class="pf-intro">
          <p class="hero-tag mono reveal">$ cd ./portafolio-tutoria</p>
          <h1 class="reveal" tabindex="-1">Portafolio de <span class="accent">Tutoría</span></h1>
          <p class="reveal">Aquí reúno las evidencias de mi desarrollo personal, académico y profesional,
            organizadas en tres ejes. Cada eje agrupa las actividades de Tutoría que le corresponden.</p>
        </div>
        <div class="pf-grid">${cards}</div>
      </div>`
        };
    }

    function categoryView(c) {
        const acts = c.activities
            .map(
                (a) => `
      <a class="pf-act-card reveal" data-accent="${c.accent}" href="#/${c.id}/${a.id}">
        <div class="pf-card-icon" aria-hidden="true">${a.icon}</div>
        <h2>${a.title}</h2>
        ${a.summary ? `<p>${a.summary}</p>` : ""}
        ${status(a)}
      </a>`
            )
            .join("");

        return {
            title: `${c.title} | ${SITE}`,
            html: `
      <div class="container" data-accent="${c.accent}">
        ${crumbs([{ label: "Portafolio", href: "#/" }, { label: c.title }])}
        <header class="pf-cat-head reveal">
          <span class="pf-badge mono">${c.icon} Categoría</span>
          <h1 tabindex="-1">${c.title}</h1>
          <p>${c.desc}</p>
        </header>
        <div class="pf-act-grid">${acts}</div>
        <div class="pf-actions">
          <a class="btn btn-outline" href="#/">← Inicio del portafolio</a>
        </div>
      </div>`
        };
    }

    function activityView(c, a) {
        const body = a.tpl
            ? '<div id="pf-act-body"></div>'
            : `<div class="pf-soon reveal">
           <div class="pf-card-icon" aria-hidden="true">${a.icon}</div>
           <p>Esta actividad todavía no está disponible. Su contenido se agregará próximamente.</p>
         </div>`;

        return {
            title: `${a.title} | ${SITE}`,
            html: `
      <div class="container" data-accent="${c.accent}">
        ${crumbs([
                { label: "Portafolio", href: "#/" },
                { label: c.title, href: `#/${c.id}` },
                { label: a.title }
            ])}
        <header class="pf-act-head reveal">
          <span class="pf-badge mono">${c.icon} ${c.title}</span>
          <h1 tabindex="-1">${a.title}</h1>
        </header>
        ${body}
        <div class="pf-actions">
          <a class="btn btn-outline" href="#/${c.id}">← Volver a ${c.title}</a>
          <a class="btn btn-outline" href="#/">Inicio del portafolio</a>
        </div>
      </div>`
        };
    }

    /* ---------- Animación de entrada (scroll reveal) ---------- */
    const io =
        "IntersectionObserver" in window && !reduceMotion
            ? new IntersectionObserver(
                (entries) => {
                    entries.forEach((e) => {
                        if (!e.isIntersecting) return;
                        const el = e.target;
                        el.classList.add("visible");
                        io.unobserve(el);
                        setTimeout(() => (el.style.transitionDelay = ""), 900);
                    });
                },
                { threshold: 0.12 }
            )
            : null;

    function reveal(scope) {
        scope.querySelectorAll(".reveal").forEach((el, i) => {
            if (!io) return el.classList.add("visible");
            el.style.transitionDelay = (i % 5) * 70 + "ms";
            io.observe(el);
        });
    }

    /* ---------- Router ---------- */
    function render() {
        const [catId, actId] = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
        const cat = PF.find((c) => c.id === catId);
        const act = cat && cat.activities.find((a) => a.id === actId);

        const view = !cat ? homeView() : !act ? categoryView(cat) : activityView(cat, act);
        root.innerHTML = view.html;
        document.title = view.title;

        if (act && act.tpl) {
            const tpl = document.getElementById(act.tpl);
            const slot = document.getElementById("pf-act-body");
            if (tpl && slot) slot.appendChild(tpl.content.cloneNode(true));
        }

        window.scrollTo({ top: 0, behavior: "auto" });
        reveal(root);
        const h1 = root.querySelector("h1");
        if (h1) h1.focus({ preventScroll: true });
    }

    window.addEventListener("hashchange", render);
    render();
})();
