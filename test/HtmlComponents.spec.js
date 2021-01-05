import {
    pannelGraphics,
    pannelInca,
    pannelMeteo,
    pannelRealTime,
    droneChartRow
  } from '../src/lib/HtmlComponents.js';

  const htmlGraph = `
<p>Graphics from the last 24 hours. Click en <i class=\"tiny material-icons\">remove_red_eye</i></p>
<table class=\"responsive-table stripped centered pannel-inca\">
<thead id=\"graph-head\">
<th>Carbon monoxide (CO)</th>
<th>Nitrogen dioxide (NO<sub>2</sub>)</th>
<th>Ozone (O<sub>3</sub>)</th>
<th>Hydrogen sulfide (H<sub>2</sub>S)</th>
<th>Sulfur dioxide (SO<sub>2</sub>)</th>
<th>Particulate material 2,5&micro;</th>
<th>Particulate material 10&micro;</th>
</tr>
</thead>
<tbody>
<tr>
<td class=\"infowindow-graph icon-eye\" ><a class=\"modal-trigger\" href=\"#modalGraphic\" ><i class=\"material-icons icon-green\" data-infograph=\"qH004\" data-label=\"CO\">remove_red_eye</i></a></td>
<td class=\"infowindow-graph icon-eye\" ><a class=\"modal-trigger\" href=\"#modalGraphic\" ><i class=\"material-icons icon-green\" data-infograph=\"qH004\" data-label=\"NO2\">remove_red_eye</i></a></td>
<td class=\"infowindow-graph icon-eye\" ><a class=\"modal-trigger\" href=\"#modalGraphic\" ><i class=\"material-icons icon-green\" data-infograph=\"qH004\" data-label=\"O3\">remove_red_eye</i></a></td>
<td class=\"infowindow-graph icon-eye\" ><a class=\"modal-trigger\" href=\"#modalGraphic\" ><i class=\"material-icons icon-green\" data-infograph=\"qH004\" data-label=\"H2S\">remove_red_eye</i></a></td>
<td class=\"infowindow-graph icon-eye\" ><a class=\"modal-trigger\" href=\"#modalGraphic\" ><i class=\"material-icons icon-green\" data-infograph=\"qH004\" data-label=\"SO2\">remove_red_eye</i></a></td>
<td class=\"infowindow-graph icon-eye\" ><a class=\"modal-trigger\" href=\"#modalGraphic\" ><i class=\"material-icons icon-green\" data-infograph=\"qH004\" data-label=\"PM25\">remove_red_eye</i></a></td>
<td class=\"infowindow-graph icon-eye\" ><a class=\"modal-trigger\" href=\"#modalGraphic\" ><i class=\"material-icons icon-green\" data-infograph=\"qH004\" data-label=\"PM10\">remove_red_eye</i></a></td>
</tr>
</tbody>
</table>
`;

const htmlInca = `
<table class=\"responsive-table stripped centered pannel-inca\">
<thead>
<tr>
<th>Carbon monoxide (CO)</th>
<th>Nitrogen dioxide (NO<sub>2</sub>)</th>
<th>Ozone (O<sub>3</sub>)</th>
<th>Hydrogen sulfide (H<sub>2</sub>S)</th>
<th>Sulfur dioxide (SO<sub>2</sub>)</th>
<th>Particulate material 2,5&micro;</th>
<th>Particulate material 10&micro;</th>
<th>Hour</th>
</tr>
</thead>
<tbody>
<tr>
<td bgcolor=\"#009966\">1</td>
<td bgcolor=\"#009966\">1</td>
<td bgcolor=\"#009966\">1</td>
<td bgcolor=\"#009966\">1</td>
<td bgcolor=\"#009966\">1</td>
<td bgcolor=\"#009966\">1</td>
<td bgcolor=\"#009966\">1</td>
<td>14:00</td>
</tr>
</tbody>
</table>
`;

const htmlMeteo=`
<p>Zone Type: </p>
<table class=\"responsive-table stripped centered pannel-inca\">
<thead>
<tr>
<th>Noise<sub>(dB)</sub></th>
<th>Temperature <sub>(°C)</sub></th>
<th>Ultra Violet <sub>(UVI)</sub><br></th>
<th>Pressure <sub>(hPa)</sub></th>
<th>Humidity <sub>(%)</sub></th>
</tr>
</thead>
<tbody>
<tr>
<td bgcolor=\"#fff\">__</td>
<td>__</td>
<td bgcolor=\"#fff\">__</td>
<td>__</td>
<td>__</td>
</tr>
</tbody>
</table>
`;

const htmlRealTime= `
<table class="responsive-table stripped centered pannel-inca">
<thead>
<th>Carbon monoxide (CO)<sub>(&microg/m<sup>3</sup>)</sub></th>
<th>Nitrogen dioxide (NO<sub>2</sub>) <sub>(&microg/m<sup>3</sup>)</sub></th>
<th>Ozone <br> (O<sub>3</sub>)<sub>(&microg/m<sup>3</sup>)</sub></th>
<th>Hydrogen sulfide (H<sub>2</sub>S)<sub>(&microg/m<sup>3</sup>)</sub></th>
<th>Sulfur dioxide  <br> (SO<sub>2</sub>)<sub>(&microg/m<sup>3</sup>)</sub></th>
<th>Particulate material PM2,5&micro<sub>(&microg/m<sup>3</sup>)</sub></th>
<th>Particulate material PM10&micro<sub>(&microg/m<sup>3</sup>)</sub></th>
</tr>
</thead>
<tbody>
<tr>
<td>__</td>
<td>__</td>
<td>__</td>
<td>__</td>
<td>__</td>
<td>__</td>
<td>__</td>
</tr>
</tbody>
</table>
`;

const htmlDroneChart = `
<tr class="drone_position" id="-12.135387,-77.025062">
<td><i class="material-icons small scale-transition">airplanemode_active</i></td>
<td>Wakanda Forever</td>
<td>Lat: -12.135387, Lng: -77.025062</td>
</tr>
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

  const inca = {
    CO: 1,
    H2S: 1,
    NO2: 1,
    O3: 1,
    PM10: 1,
    PM25: 1,
    SO2: 1
  }

  const color = {
    time: "14:00",
    result:{ 
      CO: {color: "#009966", label: "Good"},
      H2S: {color: "#009966", label: "Good"},
      NO2: {color: "#009966", label: "Good"},
      O3: {color: "#009966", label: "Good"},
      PM10: {color: "#009966", label: "Good"},
      PM25: {color: "#009966", label: "Good"},
      SO2: {color: "#009966", label: "Good"}
    }
  }

const zone = {color:'#fff',zone:''};

const meteo ={
	spl:'__',
	temperature:'__',
	pressure:'__',
	humidity:'__',
	UV:'__'
};

const uv= {color:'#fff',label:''};

const realTime = {
	CO_ug_m3:'__',
    NO2_ug_m3:'__',
    O3_ug_m3:'__',
    H2S_ug_m3:'__',
	SO2_ug_m3:'__',
	PM25:'__',
	PM10:'__'
}

const position = {lat: -12.135387, lng: -77.025062}

  test('infowindow pannelGraphics', () => {
    document.body.innerHTML = `
    <div class="animate__animated animate__zoomIn z-depth-4 none" id="over_map_infowindow"></div>
    <div class="animate__animated animate__swing" id="over_map_qairito"></div>
    <div class="animate__animated animate__swing" id="over_map">
    `;
	expect(pannelGraphics(qhawax)).toBe(htmlGraph);
})

  test('infowindow pannelInca', () => {
    document.body.innerHTML = `
    <div class="animate__animated animate__zoomIn z-depth-4 none" id="over_map_infowindow"></div>
    <div class="animate__animated animate__swing" id="over_map_qairito"></div>
    <div class="animate__animated animate__swing" id="over_map">
    `;
  expect(pannelInca(inca, color)).toBe(htmlInca);
})

  test('infowindow pannelMeteo', () => {
    document.body.innerHTML = `
    <div class="animate__animated animate__zoomIn z-depth-4 none" id="over_map_infowindow"></div>
    <div class="animate__animated animate__swing" id="over_map_qairito"></div>
    <div class="animate__animated animate__swing" id="over_map">
    `;
  expect(pannelMeteo(zone, meteo, uv)).toBe(htmlMeteo);
})

  test('infowindow pannelRealTime', () => {
    document.body.innerHTML = `
    <div class="animate__animated animate__zoomIn z-depth-4 none" id="over_map_infowindow"></div>
    <div class="animate__animated animate__swing" id="over_map_qairito"></div>
    <div class="animate__animated animate__swing" id="over_map">
    `;
  expect(pannelRealTime(realTime)).toBe(htmlRealTime);
})

test('droneChartRow', () => {
  document.body.innerHTML = `<tbody></tbody>`;
expect(droneChartRow('Wakanda Forever', position)).toBe(htmlDroneChart);
})