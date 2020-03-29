const msgpack = require('msgpack');

const msgpackEncode = (...args) => {
    return msgpack.pack(...args);
};

const msgpackDecode = (...args) => {
    return msgpack.unpack(...args);
};

module.exports = {
    msgpackEncode,
    msgpackDecode
};
