document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");
    const toTop = document.getElementById("toTop");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.getElementById("year").textContent = new Date().getFullYear();

  /* Menú responsive */
    const closeMenu = () => {
    navMenu.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    };
    navToggle.addEventListener("click", () => {
    const open = navMenu.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    });
    navLinks.forEach((l) => l.addEventListener("click", closeMenu));

  /* Header, botón subir y link activo */
    const sections = document.querySelectorAll("main section[id]");
    const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 30);
    toTop.classList.toggle("show", window.scrollY > 500);

    let current = "";
    sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 140) current = s.id;
    });
    navLinks.forEach((l) => {
        l.classList.toggle("active", l.getAttribute("href") === "#" + current);
    });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* Animaciones al hacer scroll */
    const reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
        if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
        }
        });
    }, { threshold: 0.15 });
    reveals.forEach((el) => io.observe(el));
    } else {
    reveals.forEach((el) => el.classList.add("visible"));
    }

  /* Efecto de escritura */
    const typedEl = document.getElementById("typed");
    const roles = [
    "Ingeniero Informático",
    "Especialista en Ciberseguridad",
    "Desarrollador Full-Stack",
    "Redes & Microcontroladores",
    ];
    if (reduceMotion) {
    typedEl.textContent = roles[0];
    } else {
    let r = 0, c = 0, deleting = false;
    const type = () => {
    const word = roles[r];
    typedEl.textContent = word.slice(0, c);
    if (!deleting && c < word.length) { c++; setTimeout(type, 70); }
    else if (!deleting) { deleting = true; setTimeout(type, 1500); }
    else if (c > 0) { c--; setTimeout(type, 35); }
    else { deleting = false; r = (r + 1) % roles.length; setTimeout(type, 300); }
    };
    type();
    }

  /* Fondo estilo Matrix */
    const canvas = document.getElementById("matrix");
    if (canvas && !reduceMotion) {
    const ctx = canvas.getContext("2d");
    const chars = "01{}[]<>/;$#ABCDEF".split("");
    const size = 16;
    let drops = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drops = Array(Math.ceil(canvas.width / size)).fill(1);
    };
    resize();
    window.addEventListener("resize", resize);

    setInterval(() => {
      ctx.fillStyle = "rgba(10, 14, 20, 0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff9c";
      ctx.font = size + "px monospace";
      drops.forEach((y, i) => {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * size, y * size);
        if (y * size > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }, 60);
  }
});