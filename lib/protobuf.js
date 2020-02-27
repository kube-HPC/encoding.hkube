const protobuf = require('protobufjs');
const { bsonEncode, bsonDecode } = require('./bson');
const { Type, Field } = protobuf;

const HkubeMessage = new Type('HkubeMessage').add(new Field('data', 1, 'bytes'));

const protocEncode = (data) => {
    const bson = bsonEncode(data);
    const message = HkubeMessage.create({ data: bson });
    return HkubeMessage.encode(message).finish();
};

const protocDecode = (data) => {
    const decoded = HkubeMessage.decode(data);
    const bson = bsonDecode(decoded.data);
    return bson;
};

module.exports = {
    protocEncode,
    protocDecode
};
