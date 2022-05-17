const msgpack = require('@msgpack/msgpack');

const msgpackEncode = (...args) => {
    const encoded = msgpack.encode(...args);
    return Buffer.from(encoded.buffer, encoded.byteOffset, encoded.byteLength);
};

const msgpackDecode = (...args) => {
    return msgpack.decode(...args);
};

module.exports = {
    msgpackEncode,
    msgpackDecode
};
