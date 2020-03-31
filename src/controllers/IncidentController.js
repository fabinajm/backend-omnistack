const connection = require('../dataBase/connection');

module.exports = {

    async create(request,response){

        const {title, description, value} = request.body;
        const ongs_id = request.headers.authorization;
        
        const [id] = await connection('incidents').insert({
            description,
            ongs_id,
            title,
            value,
        });
        

        return response.json({ id });

    },
    async index(request,response)
    {
        const { page = 1 } = request.query;
        const qtdPage = 5;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
                            .join('ongs','ongs.id','=','incidents.ongs_id')
                            .limit(qtdPage)
                            .offset( ( page - 1 ) * qtdPage)
                            .select('incidents.*',
                                    'ongs.nome',
                                    'ongs.whatsapp',
                                    'ongs.email',
                                    'ongs.city',
                                    'ongs.uf');

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    }
    ,
    async delete(request,response)
    {
        const {id} = request.params;
        const ongs_id = request.headers.authorization;

        const incidents = await connection('incidents')
                                .where('id', id)
                                .select('ongs_id')
                                .first();

        if ( incidents.ongs_id !== ongs_id )
        {
            return response.status(401).json({error: "opera��o n�o permitida" } );
        }

        await connection('incidents').where('id',id).delete();

        return response.status(204).send();
    }

}