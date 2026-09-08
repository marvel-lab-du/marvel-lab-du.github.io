// Shared nav + footer for MARVEL Lab pages.

(function () {

    const WORDMARK_SVG = '<svg class="wm-marvel-svg" viewBox="0 0 599 62" fill="currentColor" aria-hidden="true"><polygon points="0,0 32,0 54.5,56 77,0 109,0 109,62 87,62 87,26 59,62 50,62 22,26 22,62 0,62"/><polygon points="116,62 165,0 214,62 190,62 165,38.9 140,62"/><path fill-rule="evenodd" d="M221,62 L221,0 H291 V32 H243 V62 Z M243,14 H273 V26 H243 Z"/><polygon points="247,24 281,24 311,62 289,62"/><polygon points="316,0 340,0 361,23.1 382,0 406,0 361,62"/><polygon points="425,0 505,0 505,17 425,17"/><polygon points="425,23 505,23 505,39 425,39"/><polygon points="425,45 505,45 505,62 425,62"/><polygon points="526,0 548,0 548,45 599,45 599,62 526,62"/></svg>';

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
