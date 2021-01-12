import { addZero, formatDateDB } from '../src/lib/helpers'

test('addZero', () =>{
	expect(addZero(2)).toStrictEqual('02');
});

test('formatDateDB', () =>{
	expect(formatDateDB('Tue, 12 Jan 2021 11:00:00 GMT')).toStrictEqual('11h');
});