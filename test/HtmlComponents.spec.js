import {
    pannelGraphics,
    pannelInca,
    pannelMeteo,
    pannelRealTime,
    droneChartRow
  } from '../src/lib/HtmlComponents.js';

  const html = `
  <p>qH004: Wakanda The Only One</p>
  `;
  const qhawax = {
    area_name: "Comercial Zone",
    comercial_name: "Wakanda The Only One",
    eca_noise_id: 3,
    id: 136,
    lat: 0,
    lon: 0,
    main_inca: 50,
    mode: "Cliente",
    name: "qH004",
    qhawax_id: 236,
    qhawax_type: "STATIC",
    state: "ON"
  }

  test('infowindow', () => {
    document.body.innerHTML = `
    <div class="animate__animated animate__zoomIn z-depth-4 none" id="over_map_infowindow"></div>
    <div class="animate__animated animate__swing" id="over_map_qairito"></div>
    <div class="animate__animated animate__swing" id="over_map">
    `;
    require('../build/js/materialize.min.js')
    pannelGraphics(qhawax)
    const GRAPHS = pannelGraphics(qhawax)
    const khe=GRAPHS.getElementById('test4')
    const list=document.querySelectorAll('[data-infograph]')
	expect(khe).toBe(html);
})