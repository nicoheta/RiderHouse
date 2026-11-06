// RIDERHOUSE - LÓGICA GENERAL INTERACTIVA

// --- NAVEGACIÓN MÓVIL ---
document.querySelectorAll('.mobile-nav-toggle').forEach(button => {
    const nav = document.getElementById(button.getAttribute('aria-controls'));
    if (!nav) return;

    const setMenuOpen = isOpen => {
        nav.classList.toggle('show', isOpen);
        button.setAttribute('aria-expanded', String(isOpen));
        button.setAttribute('aria-label', isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    };

    button.addEventListener('click', () => {
        setMenuOpen(button.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', event => {
        if (event.target instanceof Element && event.target.closest('a')) {
            setMenuOpen(false);
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') setMenuOpen(false);
    });
});

// --- CARRUSEL HERO ---
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    if (!slides.length) return;
    slides.forEach((s, i) => {
        s.classList.remove('active');
        if (dots[i]) dots[i].classList.remove('active');
    });
    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;
    
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
}

function moveSlide(step) {
    currentSlide += step;
    showSlide(currentSlide);
}

function setSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

if (slides.length > 0) {
    setInterval(() => { moveSlide(1); }, 5000);
}

// --- MODAL DE AUTENTICACIÓN (LOGIN / REGISTRO USUARIO) ---
function openModal(mode) {
    const modal = document.getElementById('modal-auth');
    const loginView = document.getElementById('form-login-view');
    const regView = document.getElementById('form-register-view');
    
    if (!modal) return;
    modal.style.display = 'flex';
    
    if (mode === 'login') {
        loginView.style.display = 'block';
        regView.style.display = 'none';
    } else {
        loginView.style.display = 'none';
        regView.style.display = 'block';
    }
}

function closeModal() {
    const modal = document.getElementById('modal-auth');
    if (modal) modal.style.display = 'none';
}

// SIMULACIONES DE ACCIONES
function simularLogin(e) {
    e.preventDefault();
    const username = document.getElementById('login-user').value;
    alert(`¡Bienvenido a RiderHouse, @${username}! Sesión iniciada correctamente.`);
    closeModal();
    window.location.href = "dashboard.html";
}

function simularRegistroUsuario(e) {
    e.preventDefault();
    const username = document.getElementById('reg-username').value;
    const nombre = document.getElementById('reg-nombre').value;
    alert(`¡Cuenta creada con éxito para ${nombre} (@${username})! Ya puedes iniciar sesión.`);
    openModal('login');
}

function simularRegistroMoto(e) {
    e.preventDefault();
    const placa = document.getElementById('moto-placa').value.toUpperCase();
    const marcaModelo = document.getElementById('moto-modelo').value;
    
    alert(`¡Motocicleta ${marcaModelo} con placa ${placa} registrada correctamente!`);
    
    const container = document.getElementById('motos-container');
    if (container) {
        const newCard = document.createElement('div');
        newCard.className = 'card';
        newCard.innerHTML = `
            <div class="moto-header">
                <div>
                    <h3>${marcaModelo}</h3>
                    <p style="color:var(--text-gray); font-size:0.9rem;">Color: ${document.getElementById('moto-color').value} | ${document.getElementById('moto-cc').value} cc</p>
                </div>
                <span class="moto-tag">${placa}</span>
            </div>
            <p>Odómetro Inicial: <strong>${Number(document.getElementById('moto-km').value).toLocaleString()} km</strong></p>
        `;
        container.appendChild(newCard);
    }
    e.target.reset();
}

function simularGuardarGasto(e) {
    e.preventDefault();
    const placa = document.getElementById('gasto-placa').value.toUpperCase();
    const tipo = document.getElementById('gasto-tipo').value;
    const monto = document.getElementById('gasto-monto').value;
    const fecha = document.getElementById('gasto-fecha').value;
    const km = document.getElementById('gasto-km').value;

    const randomCode = 'GST-' + Math.floor(1000 + Math.random() * 9000);
    const tabla = document.getElementById('tabla-gastos-body');
    if (tabla) {
        const newRow = tabla.insertRow(0);
        newRow.innerHTML = `
            <td><span class="badge-code">${randomCode}</span></td>
            <td><strong>${placa}</strong></td>
            <td>${tipo}</td>
            <td style="color:#00f5d4; font-weight:bold;">$${Number(monto).toLocaleString()}</td>
            <td>${fecha}</td>
            <td>${Number(km).toLocaleString()} km</td>
        `;
    }
    alert(`Gasto guardado con código asignado: ${randomCode}`);
    e.target.reset();
}

function simularGuardarMantenimiento(e) {
    e.preventDefault();
    const placa = document.getElementById('mant-placa').value.toUpperCase();
    const km = document.getElementById('mant-km').value;
    const fecha = document.getElementById('mant-fecha').value;
    const costo = document.getElementById('mant-costo').value;

    const randomCode = 'MNT-' + Math.floor(1000 + Math.random() * 9000);
    const tabla = document.getElementById('tabla-mant-body');
    if (tabla) {
        const newRow = tabla.insertRow(0);
        newRow.innerHTML = `
            <td><span class="badge-code">${randomCode}</span></td>
            <td><strong>${placa}</strong></td>
            <td>${Number(km).toLocaleString()} km</td>
            <td>${fecha}</td>
            <td style="color:var(--accent-red); font-weight:bold;">$${Number(costo).toLocaleString()}</td>
        `;
    }
    alert(`Mantenimiento registrado con código asignado: ${randomCode}`);
    e.target.reset();
}

// TABS CASCOS
function switchTab(tabId) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    event.target.classList.add('active');
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) selectedTab.classList.add('active');
}

// FILTRO DE SÍNTOMAS
function filtrarSintomas() {
    const query = document.getElementById('search-sintoma').value.toLowerCase();
    const cards = document.querySelectorAll('.sintoma-card');

    cards.forEach(card => {
        const text = card.getAttribute('data-nombre').toLowerCase();
        if (text.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
