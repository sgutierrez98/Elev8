const request = require('supertest');
const { expect } = require('chai');
const app = require('../../src/app');

describe('Robustez y seguridad de la API', () => {

    it('responde 400 ante JSON malformado', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send('{"email": "a@b.com", ');

        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('JSON malformado');
    });

    it('responde 413 ante cuerpo demasiado grande', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'a@b.com', password: 'x'.repeat(150000) });

        expect(res.status).to.equal(413);
        expect(res.body.success).to.equal(false);
    });

    it('no expone la cabecera X-Powered-By', async () => {
        const res = await request(app).get('/');

        expect(res.status).to.equal(200);
        expect(res.headers).to.not.have.property('x-powered-by');
    });

    it('incluye las cabeceras de seguridad de helmet', async () => {
        const res = await request(app).get('/');

        expect(res.headers['x-content-type-options']).to.equal('nosniff');
        expect(res.headers).to.have.property('strict-transport-security');
    });

    it('responde 404 con formato JSON ante una ruta inexistente', async () => {
        const res = await request(app).get('/api/no-existe');

        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
    });

    // Debe ir al final: consume el límite de intentos de login
    it('limita los intentos de login (responde 429)', async () => {
        const estados = [];
        for (let i = 0; i < 12; i++) {
            const res = await request(app)
                .post('/api/auth/login')
                .set('Content-Type', 'application/json')
                .send('{"email": "a@b.com", ');
            estados.push(res.status);
        }

        expect(estados).to.include(429);
    });
});
