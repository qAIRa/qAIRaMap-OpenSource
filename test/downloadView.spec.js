import { downloadView, reorderDate, withLocalTime} from '../src/views/downloadView.js';

const html = '[object HTMLDivElement]';

test('download page', () => {
    document.body.innerHTML = `
    <header></header>
      <div id="content-page"></div>
    `;
    require('../build/js/materialize.min.js')
	expect(downloadView().toString()).toMatch(html);
})

