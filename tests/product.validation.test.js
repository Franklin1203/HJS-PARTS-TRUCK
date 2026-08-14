const request = require('supertest');
const app = require('../src/app');

describe('Validacion de los productos', () => {

    let token = '';

    beforeAll(async () => {

        const login = await request(app)
            .post('/auth/login')
            .send({ email: 'admin@hjspartstruck.com', password: 'admin123' })

          

        token = login.body.token;

    });


    test('rechaza creacion de producto sin nombre', async () => {

        const res = await request(app)
            .post('/product')
            .set('Authorization', `Bearer ${token}`)
            .send({ descripcion: 'probando validacion', precio: 1500.00, stock: 5, categoryId: 1 })


        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');

    });

    test('rechaza creacion de producto con precio que no sea un numero', async () => {

        const res = await request(app)

            .post('/product')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'productoTest', descripcion: 'probando producto', precio: 'precio-invalido', stock: 10, categoryId: 1 })

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');

    });


    test('rechaza creacion de producto con valor de stock negativo', async () => {

        const res = await request(app)

            .post('/product')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'productoTest', descripcion: 'probando producto', precio: 1500.00, stock: -20, categoryId: 1 })

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');

    });


    test('rechaza creacion de producto con categoria que no existe', async () => {

        const res = await request(app)

            .post('/product')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'productoTest', descripcion: 'probando producto', precio: 1500.00, stock: 5, categoryId: 100000 })


        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');
    })


})