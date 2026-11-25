/**
 * Build Bright University (BBU) — Main Static JavaScript
 * Handles: mobile sidebar, user dropdown, toast messages,
 * copy-to-clipboard buttons and the login "fill demo account" helper.
 * No external libraries required.
 */
(function () {
    'use strict';

    var body = document.body;

    /* ---------- Mobile sidebar ---------- */
    function closeSide() { body.classList.remove('side-open'); }
    document.addEventListener('click', function (e) {
        var toggle = e.target.closest('[data-toggle-side]');
        if (toggle) { body.classList.toggle('side-open'); return; }
        if (e.target.closest('[data-close-side]')) { closeSide(); }
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeSide();
            document.querySelectorAll('.dropdown.is-open').forEach(function (d) { d.classList.remove('is-open'); });
        }
    });

    /* ---------- Dropdown menus ---------- */
    document.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-dropdown]');
        var openOnes = document.querySelectorAll('.dropdown.is-open');
        if (btn) {
            var wrap = btn.closest('.dropdown');
            var wasOpen = wrap.classList.contains('is-open');
            openOnes.forEach(function (d) { d.classList.remove('is-open'); });
            if (!wasOpen) { wrap.classList.add('is-open'); }
            btn.setAttribute('aria-expanded', String(!wasOpen));
            e.preventDefault();
            return;
        }
        if (!e.target.closest('.dropdown')) {
            openOnes.forEach(function (d) { d.classList.remove('is-open'); });
        }
    });

    /* ---------- Toast messages ---------- */
    function dismissToast(t) {
        if (!t || t.classList.contains('is-leaving')) { return; }
        t.classList.add('is-leaving');
        setTimeout(function () { if (t.parentNode) { t.parentNode.removeChild(t); } }, 420);
    }
    document.querySelectorAll('.toast').forEach(function (t, i) {
        setTimeout(function () { dismissToast(t); }, 6000 + i * 600);
    });
    document.addEventListener('click', function (e) {
        var close = e.target.closest('[data-dismiss-toast]');
        if (close) { dismissToast(close.closest('.toast')); }
    });

    /* ---------- Copy to clipboard ---------- */
    function fallbackCopy(text) {
        var tmp = document.createElement('input');
        tmp.value = text;
        document.body.appendChild(tmp);
        tmp.select();
        try { document.execCommand('copy'); } catch (err) { /* ignore */ }
        document.body.removeChild(tmp);
    }
    document.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-copy]');
        if (!btn) { return; }
        var text = btn.getAttribute('data-copy');
        var done = function () {
            var label = btn.querySelector('.copy-label');
            var original = label ? label.textContent : '';
            btn.classList.add('is-copied');
            if (label) { label.textContent = 'Copied'; }
            setTimeout(function () {
                btn.classList.remove('is-copied');
                if (label) { label.textContent = original; }
            }, 1400);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(done).catch(function () { fallbackCopy(text); done(); });
        } else {
            fallbackCopy(text);
            done();
        }
    });

    /* ---------- Login: fill demo account ---------- */
    document.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-fill-user]');
        if (!btn) { return; }
        var u = document.getElementById('id_username');
        var p = document.getElementById('id_password');
        if (u && p) {
            u.value = btn.getAttribute('data-fill-user');
            p.value = btn.getAttribute('data-fill-pass');
            u.focus();
        }
    });
})();
