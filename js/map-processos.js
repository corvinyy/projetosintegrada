document.documentElement.classList.add("js-ready");

/**
 * Configurações globais do template.
 * Centralize aqui o que muda entre páginas (ex: número de WhatsApp)
 * para não precisar caçar strings espalhadas pelo código.
 */
const PCI_CONFIG = {
  whatsappNumber: "5561998538516",
  whatsappDefaultMessage: "Gostaria de agendar um diagnóstico de Mapeamento de Processos."
};

/**
 * Navbar: alterna o menu mobile e fecha ao clicar fora ou em um link.
 */
function initNavbar() {
  const header = document.querySelector("[data-nav]");
  if (!header) return;

  const toggle = header.querySelector("[data-nav-toggle]");
  const nav = header.querySelector(".main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

/**
 * Scroll Reveal: revela elementos marcados com [data-reveal]
 * conforme entram na viewport. Respeita prefers-reduced-motion
 * mostrando tudo de uma vez, sem animação.
 */
function initScrollReveal() {
  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  items.forEach((item) => observer.observe(item));
}

/**
 * Contadores: anima os números de [data-counter] de 0 até o valor alvo
 * quando o bloco de indicadores entra na viewport. Roda uma única vez.
 */
function initCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute("data-counter"), 10) || 0;

    if (prefersReducedMotion) {
      el.textContent = target;
      return;
    }

    const duration = 1200;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };

  if (!("IntersectionObserver" in window)) {
    counters.forEach(animateCounter);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

/**
 * FAQ: acordeão acessível — um item aberto por vez,
 * com aria-expanded sincronizado para leitores de tela.
 */
function initFAQ() {
  const faqList = document.querySelector("[data-faq]");
  if (!faqList) return;

  const items = faqList.querySelectorAll(".faq-item");

  items.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    if (!question || !answer) return;

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      items.forEach((other) => {
        other.classList.remove("is-open");
        other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        other.querySelector(".faq-answer").style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add("is-open");
        question.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

/**
 * Formulário: monta a mensagem de WhatsApp a partir dos campos
 * preenchidos e abre o link — sem dependência de backend.
 * Reutilizável: basta que o form tenha [data-lead-form] e os
 * campos #cta-nome / #cta-whats (ou adapte os seletores por página).
 */
function initLeadForm() {
  const form = document.querySelector("[data-lead-form]");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = form.querySelector("#cta-nome")?.value.trim() || "";
    const whats = form.querySelector("#cta-whats")?.value.trim() || "";

    const message = `Olá! Meu nome é ${nome}. ${PCI_CONFIG.whatsappDefaultMessage}`;
    const url = `https://wa.me/${PCI_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Conversão do Google Ads (Mapeamento de Processos)
    if (typeof gtag === "function") {
      gtag('event', 'conversion', {'send_to': 'AW-16481631509/5AjWCPfoxswcEJX6hrM9'});
    }

    window.open(url, "_blank", "noopener");
  });
}

/**
 * Botão voltar ao topo: aparece depois de rolar a página,
 * some perto do topo, e faz scroll suave ao clicar.
 */
function initBackToTop() {
  const btn = document.querySelector(".back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      btn.classList.add("show");
    } else {
      btn.classList.remove("show");
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/**
 * Bootstrap: inicializa todos os módulos quando o DOM estiver pronto.
 */
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initScrollReveal();
  initCounters();
  initFAQ();
  initLeadForm();
  initBackToTop();
});
