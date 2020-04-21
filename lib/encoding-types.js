const { bsonEncode, bsonDecode } = require('./bson');
const { protocEncode, protocDecode } = require('./protobuf');
const { msgpackEncode, msgpackDecode } = require('./msgpack');

const encodings = {
    json: {
        encode: JSON.stringify,
        decode: JSON.parse,
        isBinary: false,
        protocolType: 2
    },
    bson: {
        encode: bsonEncode,
        decode: bsonDecode,
        isBinary: true,
        protocolType: 1
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
        protocolType: 3
    }
};

const EncodingTypes = Object.keys(encodings);

module.exports = {
    encodings,
    EncodingTypes
};
