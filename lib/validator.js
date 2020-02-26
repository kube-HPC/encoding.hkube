const Validate = require('ajv');
const { mainSchema } = require('./schema');
const validator = new Validate({ useDefaults: true, coerceTypes: true });

class Validator {
    constructor() {
        this._schema = validator.compile(mainSchema);
    }

    validate(object = {}) {
        const valid = this._schema(object);
        if (!valid) {
            throw new Error(validator.errorsText(this._schema.errors));
        }
        return object;
    }
}

module.exports = new Validator();
