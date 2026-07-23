/* Deixar a cor e borda de navegação ativa */
const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('header nav a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });



/* (CELULAR/TABLET) Ao clicar na barrinha lateral, o header aparece */
function menuLateral() {
        const nav = document.querySelector('.header-nav');
        nav.classList.toggle('open');
}



/* ANIMAÇÕES */
document.addEventListener("DOMContentLoaded", function() {

    /* (INÍCIO) Animação do sub texto de mercados (slide sequencial) */
    const items = document.querySelectorAll(".apt-sub-lista");
    items.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add("animate");
        }, index * 1000); 
    });

    /* Animação dos botões de Fale Conosco e Serviços (aparecer ao scroll, com delay) */
    const buttons = document.querySelectorAll(".apt-botao a");
    if (buttons.length > 0 && buttons[0].parentElement) {
        const buttonsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    buttons.forEach((btn, index) => {
                        setTimeout(() => {
                            btn.classList.add("animate");
                        }, index * 600);
                    });
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });
        buttonsObserver.observe(buttons[0].parentElement);
    }

    /* (SOBRE NÓS) titulo + texto + foto */
    const target = document.querySelector('#apresentacao');
    if (target) {
        const sobreNosObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelector('.sobre-apt-infos').classList.add('animate-titulo');
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });

        sobreNosObserver.observe(target);
    }

    /* (SOBRE NÓS) Animação dos valores (slide sequencial) */
    const container = document.querySelector(".valores-infos");
    if (container) {
        const valores = container.querySelectorAll(".valores-lista");

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    valores.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add("animate");
                        }, index * 900);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(container);
    }
});

/* Carrossel do MVD */
let currentSlide = 0;
const slides = document.querySelectorAll('.mvd-slide');
const dots = document.querySelectorAll('.dot');

function mostrarSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
}

function proximoSlide() {
    const next = (currentSlide + 1) % slides.length;
    mostrarSlide(next);
}

function irParaSlide(index) {
    mostrarSlide(index);
}

if (typeof slides !== 'undefined' && slides && slides.length) {
    mostrarSlide(0);
    setInterval(proximoSlide, 6000);
}

/* (GERAL) BOTAO VOLTAR AO TOPO */
const scrollBtn = document.querySelector('.scroll');
if (scrollBtn) {
    scrollBtn.addEventListener('click', function (event) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* (HOME) Hero photo carousel */
(function () {
    const heroSlides = document.querySelectorAll('#heroCarousel .hero-slide');
    const heroDots = document.querySelectorAll('#heroCarousel .hero-dot');
    if (!heroSlides.length) return;
    let current = 0;
    function showHero(n) {
        heroSlides.forEach((s, x) => s.classList.toggle('active', x === n));
        heroDots.forEach((d, x) => d.classList.toggle('active', x === n));
        current = n;
    }
    heroDots.forEach((d, x) => d.addEventListener('click', () => showHero(x)));
    setInterval(() => showHero((current + 1) % heroSlides.length), 5000);
})();
