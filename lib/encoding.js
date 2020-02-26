
const encoding = Symbol('encoding');
const validator = require('./validator');
const { bsonDecode, bsonEncode } = require('./bson');

const encodingTypes = {
    json: {
        decode: JSON.parse,
        encode: JSON.stringify
    },
    bson: {
        decode: bsonDecode,
        encode: bsonEncode
    }
};

class Encoding {
    constructor(options) {
        const option = validator.validate(options);
        this._type = option.type;
        this[encoding] = encodingTypes[option.type];
    }

    decode(...args) {
        return this[encoding].decode(...args);
    }

    encode(...args) {
        return this[encoding].encode(...args);
    }
}


module.exports = Encoding;
