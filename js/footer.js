/*
 * Shared site footer component (single source of truth).
 * Every page includes this script plus a `<div id="site-footer"></div>` placeholder
 * where the footer should render, so the footer only ever needs to be edited here.
 */
(function () {
    var FOOTER_HTML = '<footer>\n<div class="foot-container">\n<div class="foot-grid">\n<div>\n<img class="foot-logo" src="/assets/logos/PCI-logo-escrita-branca.png" alt="Projetos Consultoria Integrada">\n<div class="foot-contacts">\n<p><img src="/assets/icons/email-icon.png" alt="Email">negocios@projetosintegrada.com.br</p>\n<p><img src="/assets/icons/telefone-icon.png" alt="Telefone">(61) 99853-8516</p>\n</div>\n<div class="foot-social">\n<a href="https://www.instagram.com/projetosintegrada/" target="_blank" rel="noopener"><img src="/assets/icons/instagram-icon.png" alt="Instagram"></a>\n<a href="mailto:negocios@projetosintegrada.com.br?subject=Contato%20via%20site&body=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre..."><img src="/assets/icons/email-icon.png" alt="Email"></a>\n</div>\n</div>\n<div>\n<h4>Atendimento</h4>\n<div class="foot-contacts">\n<p><img src="/assets/icons/relogio-icon.png" alt="Horário"> Segunda a Sexta, das 09h às 18h.</p>\n<p><img src="/assets/icons/pin-icon.png" alt="Localização"> SEPN 707/907, CEUB - Asa Norte, Bloco 2, Sala 2311 - CEP: 70790-075</p>\n</div>\n</div>\n<div>\n<h4>Navegação</h4>\n<ul>\n<li><a href="/">Início</a></li>\n<li><a href="/pages/sobre/">Sobre Nós</a></li>\n<li><a href="/pages/servicos/">Consultorias</a></li>\n<li><a href="/pages/arquitetura/">Arquitetura</a></li>\n<li><a href="/pages/parceiros/">Parceiros</a></li>\n<li><a href="/pages/cases/">Cases</a></li>\n</ul>\n</div>\n</div>\n<div class="foot-bottom">\n<p>© 2026 Projetos Consultoria Integrada. Todos os direitos reservados.</p>\n</div>\n</div>\n</footer>';

    var FOOTER_CSS = 'footer{background:#1a1a1a;color:#fff;padding:60px 0 30px}' +
        '.foot-container{max-width:1180px;margin:0 auto;padding:0 24px}' +
        '.foot-grid{display:grid;grid-template-columns:1.6fr 1.2fr 1fr;gap:40px;margin-bottom:40px}' +
        '.foot-logo{height:60px;width:auto;margin-bottom:18px}' +
        'footer p,footer a,footer li{color:rgba(255,255,255,.75);font-size:.92rem}' +
        'footer h4{font-size:.85rem;text-transform:uppercase;letter-spacing:.08em;margin-bottom:16px;color:#fff}' +
        'footer ul{list-style:none}' +
        'footer li{margin-bottom:10px}' +
        'footer a:hover{color:var(--primary,#c40001)}' +
        '.foot-contacts p{display:flex;align-items:flex-start;gap:10px;margin-bottom:10px}' +
        '.foot-contacts img{width:18px;filter:brightness(0) invert(1);opacity:.8;margin-top:3px;flex-shrink:0}' +
        '.foot-social{display:flex;gap:14px;margin-top:16px}' +
        '.foot-social img{width:26px;filter:brightness(0) invert(1);opacity:.8;transition:opacity .2s}' +
        '.foot-social a:hover img{opacity:1}' +
        '.foot-bottom{border-top:1px solid rgba(255,255,255,.12);padding-top:24px;text-align:center;font-size:.85rem}' +
        '@media(max-width:900px){.foot-grid{grid-template-columns:1fr}}';

    function mountFooter() {
        var mountPoint = document.getElementById('site-footer');
        if (!mountPoint) { return; }
        if (!document.getElementById('site-footer-style')) {
            var styleEl = document.createElement('style');
            styleEl.id = 'site-footer-style';
            styleEl.textContent = FOOTER_CSS;
            document.head.appendChild(styleEl);
        }
        mountPoint.outerHTML = FOOTER_HTML;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mountFooter);
    } else {
        mountFooter();
    }
})();
