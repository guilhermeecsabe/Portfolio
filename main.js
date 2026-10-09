
const toggle = document.getElementById('cyber-toggle');
const temaSalvo = localStorage.getItem('tema');
if (temaSalvo === 'light') {
    document.body.classList.add('light');
    toggle.checked = true;
}
toggle.addEventListener('change', () => {
    document.body.classList.toggle('light', toggle.checked);
    localStorage.setItem('tema', toggle.checked ? 'light' : 'dark');
});


const menu = document.getElementById('menu');
const menuBtn = document.getElementById('menu-btn');
menuBtn.addEventListener('click', () => {
    const aberto = menu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', aberto);
});
menu.querySelectorAll('a[href^="#"]').forEach(a =>
    a.addEventListener('click', () => menu.classList.remove('open')));


new Typed('#typed', {
    strings: ['desenvolvimento.', 'redes.', 'cybersecurity.'],
    typeSpeed: 60, backSpeed: 35, backDelay: 1500, loop: true
});


document.querySelectorAll(
    '.section-number, .section h2, .about-text, .timeline-item, .skill-card, .project, .objective > *, .form, .contact-button'
).forEach((el, i) => {
    el.setAttribute('data-aos', 'fade-up');
    el.setAttribute('data-aos-delay', (i % 3) * 100);
});
AOS.init({ duration: 800, once: true, offset: 60 });


const modal = document.getElementById('modal');
function abrirModal(titulo, texto) {
    document.getElementById('modal-titulo').textContent = titulo;
    document.getElementById('modal-texto').textContent = texto;
    modal.hidden = false;
    document.getElementById('modal-fechar').focus();
}
function fecharModal() { modal.hidden = true; }
document.getElementById('modal-fechar').addEventListener('click', fecharModal);
modal.addEventListener('click', e => { if (e.target === modal) fecharModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') fecharModal(); });


const form = document.getElementById('form-contato');
const nome = document.getElementById('nome');
const telefone = document.getElementById('telefone');
const email = document.getElementById('email');
const mensagem = document.getElementById('mensagem');
const contador = document.getElementById('contador');


nome.addEventListener('input', () => {
    nome.value = nome.value
        .replace(/[^A-Za-zÀ-ÿ\s'-]/g, '')
        .replace(/\s{2,}/g, ' ')
        .replace(/(^|\s)([a-zà-ÿ])/g, (m, a, b) => a + b.toUpperCase());
});


telefone.addEventListener('input', () => {
    let v = telefone.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 10)      v = v.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    else if (v.length > 6)  v = v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    else if (v.length > 2)  v = v.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    else if (v.length > 0)  v = v.replace(/^(\d*)/, '($1');
    telefone.value = v;
});


email.addEventListener('input', () => {
    email.value = email.value.toLowerCase().replace(/\s/g, '');
});


mensagem.addEventListener('input', () => {
    contador.textContent = mensagem.value.length + '/500';
});


function erro(campo, msg) {
    const f = campo.closest('.field');
    f.classList.toggle('invalid', !!msg);
    f.querySelector('.erro').textContent = msg;
    return !msg;
}
function validar() {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value);
    const digitos = telefone.value.replace(/\D/g, '').length;
    return [
        erro(nome, nome.value.trim().split(' ').filter(Boolean).length >= 2 ? '' : 'Digite nome e sobrenome.'),
        erro(telefone, digitos >= 10 ? '' : 'Telefone inválido. Use DDD + número.'),
        erro(email, emailOk ? '' : 'Digite um email válido.'),
        erro(mensagem, mensagem.value.trim().length >= 10 ? '' : 'A mensagem precisa ter ao menos 10 caracteres.')
    ].every(Boolean);
}
[nome, telefone, email, mensagem].forEach(c =>
    c.addEventListener('blur', () => { if (c.value) validar(); }));

form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validar()) {
        abrirModal('ATENÇÃO ⚠', 'Alguns campos estão incorretos. Confira as mensagens em vermelho.');
        return;
    }
    
    abrirModal('MENSAGEM ENVIADA ✓', `Obrigado, ${nome.value.split(' ')[0]}! Responderei em breve.`);
    form.reset();
    contador.textContent = '0/500';
});
