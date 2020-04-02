const { Segments, Joi  } = require('celebrate');

module.exports = {
    index(){

        const schema = {
            [Segments.HEADERS]: Joi.object({
                authorization: Joi.string().required()
            }).unknown()
        };

        return schema
    }
}