import {openModalDateAlert, openModalEmptyAlert} from '../src/lib/pickerErrors.js';

test('Modal Date Alert', () =>{
    document.body.innerHTML = `
    <header></header>
      <div id="content-page"></div>
    `;
    global.M = require('../build/js/materialize.min.js');
    expect(openModalDateAlert()).toBe();
    expect(openModalEmptyAlert()).toBe();
});
