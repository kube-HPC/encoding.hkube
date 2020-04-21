const msgpack = require('msgpack-lite');

const msgpackEncode = (...args) => {
    return msgpack.encode(...args);
};

const msgpackDecode = (...args) => {
    return msgpack.decode(...args);
};

module.exports = {
    msgpackEncode,
    msgpackDecode
};
