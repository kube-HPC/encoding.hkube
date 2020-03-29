const { bsonEncode, bsonDecode } = require('./bson');
const { protocEncode, protocDecode } = require('./protobuf');
const { msgpackEncode, msgpackDecode } = require('./msgpack');

const encodings = {
    json: {
        encode: JSON.stringify,
        decode: JSON.parse
    },
    bson: {
        encode: bsonEncode,
        decode: bsonDecode
    },
    protoc: {
        encode: protocEncode,
        decode: protocDecode
    },
    msgpack: {
        encode: msgpackEncode,
        decode: msgpackDecode
    }
};

const EncodingTypes = Object.keys(encodings);

module.exports = {
    encodings,
    EncodingTypes
};
