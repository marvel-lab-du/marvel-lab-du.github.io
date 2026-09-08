// Shared nav + footer for MARVEL Lab pages.

(function () {

    const WORDMARK_SVG = '<svg class="wm-marvel-svg" viewBox="0 0 445 80" fill="currentColor" aria-hidden="true"><polygon points="0,76 0,4 13,4 40,74.5 67,4 80,4 80,76 67,76 67,37.8 45.46,76 34.54,76 13,37.8 13,76"/><polygon points="97,76 133,1.6 169,76 153.4,76 133,30.2 112.6,76"/><path fill-rule="evenodd" d="M182,76 L182,4 H216 V37.12 H195 V76 Z M195,17 H203 V24.12 H195 Z"/><polygon points="200,24.12 203,24.12 240,76 224.4,76"/><polygon points="255,4 270.6,4 291,49.8 311.4,4 327,4 291,78.4"/><rect x="340" y="4" width="44" height="13"/><rect x="340" y="33.5" width="44" height="13"/><rect x="340" y="63" width="44" height="13"/><polygon points="399,4 412,4 412,63 445,63 445,76 399,76"/></svg>';

    function wordmarkHtml() {
        return WORDMARK_SVG + '<span class="wm-lab">LAB</span>';
    }

    function getActivePage() {
        const path = window.location.pathname;
        if (/\/research\.html/.test(path))     return 'research';
        if (/\/projects\.html/.test(path))     return 'projects';
        if (/\/publications\.html/.test(path)) return 'publications';
        if (/\/team\.html/.test(path))         return 'team';
        if (/\/photos\.html/.test(path))       return 'photos';
        if (/\/contact\.html/.test(path))      return 'contact';
        return 'home';
    }

    function navLink(href, label, active, key) {
        const cls = active === key ? 'active' : '';
        return `<a href="${href}" class="${cls}">${label}</a>`;
    }

    function injectNav() {
        const placeholder = document.getElementById('nav-placeholder');
        if (!placeholder) return;

        const active = getActivePage();
        const links = [
            ['index.html',        'Home',          'home'],
            ['research.html',     'Research',      'research'],
            ['projects.html',     'Projects',      'projects'],
            ['publications.html', 'Publications',  'publications'],
            ['team.html',         'People',        'team'],
            ['photos.html',       'Photos',        'photos'],
            ['contact.html',      'Contact',       'contact'],
        ];

        const desktop = links.map(([href, label, key]) => navLink(href, label, active, key)).join('\n                ');
        const mobile  = links.map(([href, label, key]) => navLink(href, label, active, key)).join('\n            ');

        placeholder.outerHTML = `
    <header id="navbar">
        <div class="nav-inner">
            <a href="index.html" class="nav-brand wordmark" aria-label="MARVEL Lab">
                ${wordmarkHtml()}
            </a>
            <nav class="nav-links">
                ${desktop}
            </nav>
            <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode" title="Toggle dark mode"><i class="fas fa-moon"></i></button>
            <button class="nav-toggle" id="mobile-menu-btn" aria-label="Menu"><i class="fas fa-bars"></i></button>
        </div>
        <div id="mobile-menu">
            ${mobile}
        </div>
    </header>`;
        initMobileMenu();
        initThemeToggle();
    }

    function initThemeToggle() {
        const root = document.documentElement;
        const btn  = document.getElementById('theme-toggle');
        if (!btn) return;
        const icon = btn.querySelector('i');

        function current() { return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; }
        function syncIcon() { if (icon) icon.className = current() === 'dark' ? 'fas fa-sun' : 'fas fa-moon'; }

        syncIcon();
        btn.addEventListener('click', function () {
            const next = current() === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            try { localStorage.setItem('theme', next); } catch (e) {}
            syncIcon();
        });
    }

    function injectFooter() {
        const placeholder = document.getElementById('footer-placeholder');
        if (!placeholder) return;

        placeholder.outerHTML = `
    <footer>
        <div class="footer-inner">
            <div>
                <div class="footer-brand wordmark" aria-label="MARVEL Lab">
                    ${wordmarkHtml()}
                </div>
                <div class="footer-tag">Dept. of Robotics and Mechatronics Engineering · University of Dhaka</div>
            </div>
            <div class="footer-social">
                <a href="https://scholar.google.com/citations?user=j8XhiIEAAAAJ" target="_blank" rel="noopener" aria-label="Google Scholar"><i class="ai ai-google-scholar"></i></a>
                <a href="https://www.researchgate.net/profile/Sejuti-Rahman" target="_blank" rel="noopener" aria-label="ResearchGate"><i class="ai ai-researchgate"></i></a>
                <a href="https://github.com/marvel-lab-du" target="_blank" rel="noopener" aria-label="GitHub"><i class="fab fa-github"></i></a>
                <a href="mailto:sejuti@gmail.com" aria-label="Email"><i class="fas fa-envelope"></i></a>
            </div>
        </div>
        <div class="footer-meta">
            <span class="footer-clock"></span>
        </div>
    </footer>`;
    }

    function initMobileMenu() {
        const btn  = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        if (!btn || !menu) return;
        const icon = btn.querySelector('i');

        btn.addEventListener('click', function () {
            const isOpen = menu.classList.toggle('open');
            if (icon) icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
        });
        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                menu.classList.remove('open');
                if (icon) icon.className = 'fas fa-bars';
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        injectNav();
        injectFooter();
    });

})();
