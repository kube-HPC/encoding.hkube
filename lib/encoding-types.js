const { bsonEncode, bsonDecode } = require('./bson');
const { protocEncode, protocDecode } = require('./protobuf');

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
    }
};

const EncodingTypes = Object.keys(encodings);

module.exports = {
    encodings,
    EncodingTypes
};
