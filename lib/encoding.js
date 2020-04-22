
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
const MAGIC_NUMBER1 = 0x48; // H
const MAGIC_NUMBER2 = 0x4b; // K
const MagicNumberBytes = 2;

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
        const magicNumber = value.slice(totalLength - MagicNumberBytes, totalLength);
        const mg = magicNumber.toString('hex');
        if (mg !== '484b') {
            return this._decode(value);
        }
        const footerL = value.slice(totalLength - 3, totalLength - MagicNumberBytes);
        const footerLength = footerL[0];
        const footer = value.slice(totalLength - footerLength, totalLength);

        // const protocolType = footer[1];
        const dataType = footer[2];
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
        footer[1] = protocolType;
        footer[2] = dataType;
        footer[3] = UNUSED;
        footer[4] = UNUSED;
        footer[5] = FOOTER_LENGTH;
        footer[6] = MAGIC_NUMBER1;
        footer[7] = MAGIC_NUMBER2;
        return footer;
    }
}

module.exports = {
    Encoding,
    EncodingTypes
};
