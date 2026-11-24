/**
 * Enmascara un correo para los registros (logs).
 * Ejemplo: santiago@gmail.com -> s***@gmail.com
 */
const maskEmail = (email = '') => {
    const [local, domain] = String(email).split('@');
    if (!domain) return '***';
    return `${local.charAt(0)}***@${domain}`;
};

module.exports = maskEmail;
