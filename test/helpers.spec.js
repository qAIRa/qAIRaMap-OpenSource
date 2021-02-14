import { addZero} from '../src/lib/helpers'

test('addZero', () =>{
	expect(addZero(2)).toStrictEqual('02');
});
