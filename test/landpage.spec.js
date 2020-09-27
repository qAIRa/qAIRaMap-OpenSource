import { landPage } from '../src/views/landpageView.js';

const html = '[object HTMLDivElement]';

test('landing page', () => {
    document.body.innerHTML = `
    <header></header>
      <div id="content-page"></div>
    `;
	expect(landPage().toString()).toMatch(html);
})