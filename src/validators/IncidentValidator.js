const { Segments, Joi  } = require('celebrate');

module.exports = {
    delete(){

        const schema = {
            [Segments.HEADERS]: Joi.object({
                authorization: Joi.string().required()
            }).unknown(),
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required()
            })
        };

        return schema
    },
    create(){

        const schema = {
            [Segments.HEADERS]: Joi.object({
                authorization: Joi.string().required()
            }).unknown(),
            [Segments.BODY]: Joi.object().keys({
                title: Joi.string().required(),
                description: Joi.string().required(),
                value: Joi.number().min(10)
            })
        };

        return schema
    },    
    index(){

        const schema = {
            [Segments.QUERY]: Joi.object().keys({
                page: Joi.number()
            })
        };

        return schema

    }
}