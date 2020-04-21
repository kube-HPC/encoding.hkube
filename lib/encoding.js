
const encoding = Symbol('encoding');
const { encodings, EncodingTypes } = require('./encoding-types');

const VERSION = 1;
const FOOTER_LENGTH = 5;
const UNUSED = 1;
const DATA_TYPE_RAW = 1;
const DATA_TYPE_ENCODED = 2;

class Encoding {
    constructor(options) {
        const config = options || {};
        if (!EncodingTypes.includes(config.type)) {
            throw new Error(`encoding type is invalid (${EncodingTypes.join(',')})`);
        }
        this._type = config.type;
        this[encoding] = encodings[config.type];
    }

    encode(value, decodeOptions = {}) {
        if (!this.isBinary || !decodeOptions.customEncode) {
            return this._encode(value);
        }
        let payload;
        let dataType;
        if (Buffer.isBuffer(value)) {
            dataType = DATA_TYPE_RAW;
            payload = value;
        }
        else {
            dataType = DATA_TYPE_ENCODED;
            payload = this._encode(value);
        }

        const footer = this.createFooter(dataType, this[encoding].protocolType);
        const buf = Buffer.concat([payload, footer]);
        return buf;
    }

    decode(value, decodeOptions = {}) {
        if (!this.isBinary || !decodeOptions.customEncode) {
            return this._decode(value);
        }

        const totalLength = value.length;
        const footer = value.slice(totalLength - 5, totalLength);
        const version = footer[0];
        const footerLength = footer[1];
        const dataType = footer[3];
        const data = value.slice(0, totalLength - footerLength);

        let payload = null;
        if (dataType === DATA_TYPE_ENCODED) {
            payload = this._decode(data);
        }
        else {
            payload = data;
        }
        return payload;
    }

    _decode(...args) {
        return this[encoding].decode(...args);
    }

    _encode(...args) {
        return this[encoding].encode(...args);
    }

    get isBinary() {
        return this[encoding].isBinary;
    }

    createFooter(dataType, protocolType) {
        const footer = Buffer.alloc(FOOTER_LENGTH);
        footer[0] = VERSION;
        footer[1] = FOOTER_LENGTH;
        footer[2] = protocolType;
        footer[3] = dataType;
        footer[4] = UNUSED;
        return footer;
    }
}

module.exports = Encoding;
