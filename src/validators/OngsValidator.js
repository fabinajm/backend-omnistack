const { Segments, Joi  } = require('celebrate');

module.exports = {
    create(){

        const schema = {
            [Segments.BODY]: Joi.object().keys(
                {
                    nome: Joi.string().required(),
                    email: Joi.string().required().email(),
                    whatsapp: Joi.string().required().min(10).max(12),
                    city: Joi.string().required(),
                    uf: Joi.string().required().length(2)
                }
            ) 
        };

        return schema
    }
}