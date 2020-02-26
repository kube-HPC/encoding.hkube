const bson = require('bson');

const bsonDecode = (data) => {
    const ret = bson.deserialize(data, { promoteBuffers: true, promoteValues: true });
    return ret;
};

const bsonEncode = (data) => {
    const size = bson.calculateObjectSize(data);
    return bson.serialize(data, { minInternalBufferSize: Math.floor(size * 1.1) });
};

module.exports = {
    bsonDecode,
    bsonEncode
};
