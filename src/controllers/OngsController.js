const cryto = require('crypto');
const connection = require('../dataBase/connection');

module.exports = {

    async create(request,response) {

        const {nome, email, whatsapp, city, uf} = request.body;

        const id = cryto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            nome,
            email,
            whatsapp,
            city,
            uf
        });

        return response.json({ id });

    },

    async list(request,response) {

        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
        
    }

}