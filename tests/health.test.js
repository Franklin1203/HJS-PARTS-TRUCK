
const request = require('supertest');
const app = require('../src/app');


describe('Health & 404',()=>{

    test('GET /health que responda 200 con status ok',async()=>{

        const res = await request(app).get('/health');
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('ok');
        expect(typeof res.body.uptime).toBe('number');

    });


    test('GET /ruta-inexistente que responda 404 con formato manejado',async()=>{

        const res = await request(app).get('/ruta-inexistente');
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('error');


    });

});
