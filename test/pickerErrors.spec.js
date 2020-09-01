import {openModalDateAlert, openModalEmptyAlert} from '../src/lib/pickerErrors.js';

test('Modal Date Alert', () =>{
    document.body.innerHTML = `
    <header></header>
      <div id="content-page"></div>
    `;
    require('../build/js/materialize.min.js');
    require('../build/css/materialize.min.css');
    const container = document.getElementById('content-page')
    expect(openModalDateAlert()).toBe();
    expect(openModalEmptyAlert()).toBe();
});
