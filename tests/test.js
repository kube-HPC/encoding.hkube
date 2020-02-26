const chai = require('chai');
const { expect } = chai;
const { Encoding } = require('../index');

describe('Encoding', () => {
    describe('Validation', () => {
        it('default json encoding', async () => {
            const encoding = new Encoding();
            expect(encoding._type).to.eql('json');
        });
    });
    describe('BSON', () => {
        it('put and get same string value', async () => {
            const encoding = new Encoding({ type: 'bson' });
            const data = 'hello';
            const encoded = encoding.encode(data);
            const decoded = encoding.decode(encoded);
            expect(data).to.eql(decoded);
        });
        it('put and get same number value', async () => {
            const encoding = new Encoding({ type: 'bson' });
            const data = 590.45;
            const encoded = encoding.encode(data);
            const decoded = encoding.decode(encoded);
            expect(data).to.eql(decoded);
        });
        it('put and get same array value', async () => {
            const encoding = new Encoding({ type: 'bson' });
            const data = [1, 2, 3, false, { bla: 'bla' }, [34]];
            const encoded = encoding.encode(data);
            const decoded = encoding.decode(encoded);
            expect(data).to.eql(decoded);
        });
        it('put and get same object value', async () => {
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
        it('put and get same string value', async () => {
            const encoding = new Encoding({ type: 'json' });
            const data = 'hello';
            const encoded = encoding.encode(data);
            const decoded = encoding.decode(encoded);
            expect(data).to.eql(decoded);
        });
        it('put and get same number value', async () => {
            const encoding = new Encoding({ type: 'json' });
            const data = 590.45;
            const encoded = encoding.encode(data);
            const decoded = encoding.decode(encoded);
            expect(data).to.eql(decoded);
        });
        it('put and get same array value', async () => {
            const encoding = new Encoding({ type: 'json' });
            const data = [1, 2, 3, false, { bla: 'bla' }, [34]];
            const encoded = encoding.encode(data);
            const decoded = encoding.decode(encoded);
            expect(data).to.eql(decoded);
        });
        it('put and get same object value', async () => {
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
