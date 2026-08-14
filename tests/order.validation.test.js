const request = require('supertest');
const app = require('../src/app');


describe('Validacion de ordenes', () => {


    let token = '';

    beforeAll(async () => {

        const login = await request(app)
            .post('/auth/login')
            .send({ email: 'admin@hjspartstruck.com', password: 'admin123' })

        token = login.body.token;

    });

    test('rechaza creacion de orden sin ninguna lista de productos', async () => {

        const res = await request(app)
            .post('/order')
            .set('Authorization', `Bearer ${token}`)
            .send({})

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');

    })

    test('rechaza creacion de orden con id de producto que no sea un numero entero', async () => {

        const res = await request(app)
            .post('/order')
            .set('Authorization', `Bearer ${token}`)
            .send({ products: [{ productId: 10.55, cantidad: 5 }] })

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');


    })

    test('rechaza creacion de orden con cantidad 0 de productos', async () => {

        const res = await request(app)
            .post('/order')
            .set('Authorization', `Bearer ${token}`)
            .send({ products: [{ productId: 1, cantidad: 0 }] })


        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');

    });



});