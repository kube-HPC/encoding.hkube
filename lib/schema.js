const mainSchema = {
    type: 'object',
    properties: {
        type: {
            type: 'string',
            default: 'json',
            enum: ['json', 'bson']
        }
    },
    default: {}
};

module.exports = {
    mainSchema
};
