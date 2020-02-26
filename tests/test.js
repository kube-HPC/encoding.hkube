const chai = require('chai');
const { expect } = chai;
const { Encoding } = require('../index');

describe('Encoding', () => {
    describe('BSON', () => {
        it('put and get same value', async () => {
            const encoding = new Encoding({ type: 'bson' });
            const data = {
                string: 'hello',
                date: new Date(),
                number: 55,
                array: [1, 2, 3, false, { bla: 'bla' }, [34]],
                more: null,
                object: {
                    prop: 'prop',
                    arr: [12, 34, 56]
                }
            }
            const encoded = encoding.encode(data);
            const decoded = encoding.decode(encoded);
            expect(data).to.eql(decoded);
        });
    });
    describe('JSON', () => {
        it('put and get same value', async () => {
            const encoding = new Encoding({ type: 'json' });
            const data = {
                string: 'hello',
                number: 55,
                array: [1, 2, 3, false, { bla: 'bla' }, [34]],
                more: null,
                object: {
                    prop: 'prop',
                    arr: [12, 34, 56]
                }
            }
            const encoded = encoding.encode(data);
            const decoded = encoding.decode(encoded);
            expect(data).to.eql(decoded);
        });
    });
});
