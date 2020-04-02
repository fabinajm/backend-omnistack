const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/dataBase/connection');

describe('ONG',() => {

    beforeEach( async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    } );

    afterAll( async () => {
        await connection.destroy();
    } );

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
                                    .post('/ongs')
                                    .send({
                                        nome: "Valeria de Souza",
                                        email: "valeriasouza36@hotmail.com",
                                        whatsapp: "11999372790",
                                        city: "São Paulo",
                                        uf: "SP"
                                    });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);

        const id = response.body.id;

        const response = await request(app)
                                    .set('Authorization',id)
                                    .post('/incidents')
                                    .send({
                                        title: "Cachorro não mija no lugar certo",
                                        description: "Precisa ensinar o cachorro a mijar no lugar certo",
                                        value: 200
                                    });

    });
} )