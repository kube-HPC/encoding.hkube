const chai = require('chai');
const { expect } = chai;
const { Encoding, EncodingTypes } = require('../index');

describe('Encoding', () => {
    describe('Validation', () => {
        it('default json encoding', async () => {
            // expect(new Encoding()).to.throw();
        });
    });
    EncodingTypes.forEach(e => {
        describe(`${e} encoding`, () => {
            let type = e;
            it('put and get same string value', () => {
                const encoding = new Encoding({ type });
                const data = 'hello';
                const encoded = encoding.encode(data);
                const decoded = encoding.decode(encoded);
                expect(data).to.eql(decoded);
            });
            it('put and get same number value', () => {
                const encoding = new Encoding({ type });
                const data = 590.45;
                const encoded = encoding.encode(data);
                const decoded = encoding.decode(encoded);
                expect(data).to.eql(decoded);
            });
            it('put and get same array value', () => {
                const encoding = new Encoding({ type });
                const data = [1, 2, 3, false, { bla: 'bla' }, [34]];
                const encoded = encoding.encode(data);
                const decoded = encoding.decode(encoded);
                expect(data).to.eql(decoded);
            });
            it('put and get same object value', () => {
                const encoding = new Encoding({ type });
                const data = {
                    string: 'hello',
                    number: 55,
                    array: [1, 2, 3, false, { bla: 'bla' }, [34]],
                    object: {
                        prop: 'prop',
                        arr: [12, 34, 56]
                    }
                }
                const encoded = encoding.encode(data);
                const decoded = encoding.decode(encoded);
                expect(data).to.eql(decoded);
            });
            it('put and get same buffer value', () => {
                if (type === 'json') {
                    return
                }
                const encoding = new Encoding({ type });
                const data = Buffer.alloc(1024, 'ff', 'hex');
                const encoded = encoding.encode(data);
                const decoded = encoding.decode(encoded);
                expect(data).to.eql(Buffer.from(decoded));
            });
            it('check isBinary', () => {
                const encoding = new Encoding({ type });
                expect(encoding).to.have.property('isBinary');
            });
        });
        describe(`${e} custom encoding`, () => {
            let type = e;
            it('put and get same string value', () => {
                const encoding = new Encoding({ type });
                const data = 'hello';
                const encoded = encoding.encode(data, { customEncode: true });
                const decoded = encoding.decode(encoded, { customEncode: true });
                expect(data).to.eql(decoded);
            });
            it('put and get same number value', () => {
                const encoding = new Encoding({ type });
                const data = 590.45;
                const encoded = encoding.encode(data, { customEncode: true });
                const decoded = encoding.decode(encoded, { customEncode: true });
                expect(data).to.eql(decoded);
            });
            it('put and get same array value', () => {
                const encoding = new Encoding({ type });
                const data = [1, 2, 3, false, { bla: 'bla' }, [34]];
                const encoded = encoding.encode(data, { customEncode: true });
                const decoded = encoding.decode(encoded, { customEncode: true });
                expect(data).to.eql(decoded);
            });
            it('put and get same object value', () => {
                const encoding = new Encoding({ type });
                const data = {
                    string: 'hello',
                    number: 55,
                    array: [1, 2, 3, false, { bla: 'bla' }, [34]],
                    object: {
                        prop: 'prop',
                        arr: [12, 34, 56]
                    }
                }
                const encoded = encoding.encode(data, { customEncode: true });
                const decoded = encoding.decode(encoded, { customEncode: true });
                expect(data).to.eql(decoded);
            });
            it('put and get same buffer value', () => {
                if (type === 'json') {
                    return
                }
                const encoding = new Encoding({ type });
                const data = Buffer.alloc(1024, 'ff', 'hex');
                const encoded = encoding.encode(data, { customEncode: true });
                const decoded = encoding.decode(encoded, { customEncode: true });
                expect(data).to.eql(decoded);
            });
            it('check isBinary', () => {
                const encoding = new Encoding({ type });
                expect(encoding).to.have.property('isBinary');
            });
        });
    })
});
