
const encoding = Symbol('encoding');
const { encodings, EncodingTypes } = require('./encoding-types');

class Encoding {
    constructor(options) {
        const config = options || {};
        if (!EncodingTypes.includes(config.type)) {
            throw new Error(`encoding type is invalid (${EncodingTypes.join(',')})`);
        }
        this._type = config.type;
        this[encoding] = encodings[config.type];
    }

    decode(...args) {
        return this[encoding].decode(...args);
    }

    encode(...args) {
        return this[encoding].encode(...args);
    }

    get isBinary() {
        return this[encoding].isBinary;
    }
}

module.exports = Encoding;
