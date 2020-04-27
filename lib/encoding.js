const encoding = Symbol('encoding');
const { bsonEncode, bsonDecode } = require('./bson');
const { protocEncode, protocDecode } = require('./protobuf');
const { msgpackEncode, msgpackDecode } = require('./msgpack');

const VERSION = 0x01;
const FOOTER_LENGTH = 0x08;
const PROTOCOL_TYPE_BSON = 0x01;
const PROTOCOL_TYPE_JSON = 0x02;
const PROTOCOL_TYPE_MSGPACK = 0x03;
const DATA_TYPE_RAW = 0x01;
const DATA_TYPE_ENCODED = 0x02;
const UNUSED = 0x00;
const MagicNumber = 'HK'; // 0x484b

const encodings = {
    json: {
        encode: JSON.stringify,
        decode: JSON.parse,
        isBinary: false,
        protocolType: PROTOCOL_TYPE_JSON
    },
    bson: {
        encode: bsonEncode,
        decode: bsonDecode,
        isBinary: true,
        protocolType: PROTOCOL_TYPE_BSON
    },
    protoc: {
        encode: protocEncode,
        decode: protocDecode,
        isBinary: true
    },
    msgpack: {
        encode: msgpackEncode,
        decode: msgpackDecode,
        isBinary: true,
        protocolType: PROTOCOL_TYPE_MSGPACK
    }
};

const EncodingTypes = Object.keys(encodings);

class Encoding {
    constructor(options) {
        const config = options || {};
        if (!EncodingTypes.includes(config.type)) {
            throw new Error(`encoding type is invalid (${EncodingTypes.join(',')})`);
        }
        this._type = config.type;
        this[encoding] = encodings[config.type];
    }

    encode(value, options = {}) {
        if (!this.isBinary || !options.customEncode) {
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

    decode(value, options = {}) {
        if (!this.isBinary || !options.customEncode) {
            return this._decode(value);
        }

        const totalLength = value.length;
        if (totalLength <= this.footerLength) {
            return this._decode(value);
        }

        const footer = value.slice(totalLength - this.footerLength, totalLength);
        const magicNumber = footer.slice(this.footerLength - MagicNumber.length, this.footerLength).toString();
        if (this.magicNumber !== magicNumber) {
            return this._decode(value);
        }

        const dataType = footer[2];
        const data = value.slice(0, totalLength - this.footerLength);

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

    get footerLength() {
        return FOOTER_LENGTH;
    }

    get magicNumber() {
        return MagicNumber;
    }

    createFooter(dataType, protocolType) {
        const footer = Buffer.alloc(FOOTER_LENGTH);
        footer[0] = VERSION;
        footer[1] = protocolType;
        footer[2] = dataType;
        footer[3] = UNUSED;
        footer[4] = UNUSED;
        footer[5] = FOOTER_LENGTH;
        footer.write(MagicNumber, footer.length - MagicNumber.length);
        return footer;
    }
}

module.exports = {
    Encoding,
    EncodingTypes
};
