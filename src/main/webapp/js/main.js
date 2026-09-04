/* ============================================================
   ELEV8 SPORTSWEAR – JavaScript Principal
   GA6-220501096-AA4-EV03
   ============================================================ */

// ── Toast ──────────────────────────────────────────────────
const Toast = {
    _timer: null,
    _el: null,
    
    show(message, duration = 3000) {
        if (!this._el) {
            this._el = document.createElement('div');
            this._el.className = 'toast';
            this._el.id = 'toast';
            document.body.appendChild(this._el);
        }
        
        this._el.innerHTML = `<span>${message}</span>`;
        this._el.classList.add('show');
        
        clearTimeout(this._timer);
        this._timer = setTimeout(() => {
            this._el.classList.remove('show');
        }, duration);
    }
};

// ── Mobile Nav ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
    const burgerBtn = document.getElementById('burgerBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    if (burgerBtn && mobileNav) {
        burgerBtn.addEventListener('click', function() {
            const isOpen = mobileNav.classList.toggle('open');
            this.textContent = isOpen ? '✕' : '☰';
            this.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
        
        // Cerrar al hacer click en un enlace
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('open');
                burgerBtn.textContent = '☰';
                burgerBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }
    
    // Navbar scroll shadow
    const navbar = document.getElementById('elev8-navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            navbar.classList.toggle('scrolled', window.scrollY > 10);
        }, { passive: true });
    }
});

// ── Toggle password visibility ───────────────────────────
function togglePass(id) {
    const input = document.getElementById(id);
    if (input) {
        input.type = input.type === 'password' ? 'text' : 'password';
    }
}

// ── Product card interactions ────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
    // Agregar al carrito con AJAX (si existe el formulario)
    document.querySelectorAll('.add-to-cart-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const url = this.action;
            
            fetch(url, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    Toast.show('✅ Producto agregado al carrito');
                } else {
                    Toast.show('❌ ' + (data.message || 'Error al agregar'));
                }
            })
            .catch(error => {
                Toast.show('❌ Error de conexión');
            });
        });
    });
});

// ── Exponer funciones globalmente ────────────────────────
window.Toast = Toast;
window.togglePass = togglePass;