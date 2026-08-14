const request = require('supertest');
const app = require('../src/app');


describe('Validacion de /auth/register', () => {

    test('rechaza registro sin email valido', async () => {

        const res = await request(app)
            .post('/auth/register')
            .send({ name: 'testUser', email: 'noValido', password: 'test1234' })

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');
    });



    test('rechaza registro con clave muy corta', async () => {

        const res = await request(app)
            .post('/auth/register')
            .send({ name: 'testUser', email: 'testUser@talendig.com', password: '123' });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');


    });


    test('rechaza registro sin nombre', async () => {

        const res = await request(app)
            .post('/auth/register')
            .send({ email: 'testUser@talendig.com', password: 'test1234' });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');


    })

});


describe('Validacion de /auth/login', () => {

    test('rechaza login sin clave', async () => {

        const res = await request(app)
            .post('/auth/login')
            .send({ email: 'admin@hjspartstruck.com' })

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');


    });


    test('rechaza login con email invalido', async () => {

        const res = await request(app)
            .post('/auth/login')
            .send({ email: 'noValido', password: 'admin123' })

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');
    });


});


describe('Proteccion de rutas de productos', () => {

    test('POST /product sin token responde 401', async () => {

        const res = await request(app)
            .post('/product')
            .send({ name: 'Sin Token' })

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('error');
    });


    test('POST /product con token invalido responde con 401', async () => {

        const res = await request(app)
            .post('/product')
            .set('Authorization', 'Bearer token-invalido')
            .send({ name: 'Token falso' });


        expect(res.status).toBe(401);

    });


});