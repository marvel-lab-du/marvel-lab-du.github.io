document.addEventListener('DOMContentLoaded', function () {

    const revealables = document.querySelectorAll('[data-reveal]');
    if (revealables.length && 'IntersectionObserver' in window) {
        const io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

        revealables.forEach(function (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(14px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            io.observe(el);
        });
        setTimeout(function () {
            revealables.forEach(function (el) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        }, 1200);
    }

    function updateFooterClock() {
        const clocks = document.querySelectorAll('.footer-clock');
        if (!clocks.length) return;
        const now = new Date();
        const opts = { hour: 'numeric', minute: '2-digit', hour12: true };
        const local = now.toLocaleTimeString(undefined, opts);
        const dhaka = now.toLocaleTimeString('en-US', Object.assign({ timeZone: 'Asia/Dhaka' }, opts));
        clocks.forEach(function (el) {
            el.textContent = `Dhaka ${dhaka}  ·  your time ${local}  ·  © ${now.getFullYear()} MARVEL Lab, University of Dhaka`;
        });
    }
    updateFooterClock();
    setInterval(updateFooterClock, 30000);

    const buttons = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('[data-filter]');
    if (buttons.length && items.length) {
        buttons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                buttons.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                const key = btn.getAttribute('data-key');
                items.forEach(function (el) {
                    const tags = (el.getAttribute('data-filter') || '').split(/\s+/);
                    const show = key === 'all' || tags.indexOf(key) !== -1;
                    el.classList.toggle('hidden', !show);
                });
            });
        });
    }

    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = (form.querySelector('[name=name]') || {}).value || '';
            const email = (form.querySelector('[name=email]') || {}).value || '';
            const subject = (form.querySelector('[name=subject]') || {}).value || 'MARVEL Lab inquiry';
            const message = (form.querySelector('[name=message]') || {}).value || '';
            const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
            window.location.href = `mailto:sejuti@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
        });
    }
});
