import { downloadView, reorderDate, withLocalTime, requestQhawaxs} from '../src/views/downloadView.js';

const html = '[object HTMLDivElement]';

test('download page', () => {
    document.body.innerHTML = `
    <header></header>
      <div id="content-page"></div>
    `;
    require('../build/js/materialize.min.js')
	expect(downloadView().toString()).toMatch(html);
})

const str1 = '09-26-2020';
const resultdate = '2020-26-09';
test('reorder Date', () =>{
	expect(reorderDate(str1)).toStrictEqual(resultdate);
});

const str2 = '09-26-2020 12:00:00';
const resulttime = '26-09-2020 17:00:00';
test('local time', () =>{
	expect(withLocalTime(str2)).toStrictEqual(resulttime);
});

