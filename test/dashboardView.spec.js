import {viewDashboard, indexValue, request, dashboardRow, dashboardRowActive, createRow } from '../src/views/dashboardView.js';
import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks()
beforeEach(() => {
    fetch.resetMocks()
 
  })


const data = {
CO: 613.882,
CO2: null,
CO_ug_m3: 705.964,
H2S: 394.052,
H2S_ug_m3: 547.732,
ID: "qH004",
I_temperature: null,
NO2: 224.794,
NO2_ug_m3: 422.613,
O3: 230.641,
O3_ug_m3: 452.056,
PM1: 0,
PM10: 44.792,
PM25: 23.261,
SO2: 375.459,
SO2_ug_m3: 983.703,
UV: 0,
UVA: 0,
UVB: 0,
VOC: 0,
humidity: 79.42,
lat: -12.072736,
lon: -77.082687,
pressure: 1007.81,
spl: 19,
temperature: 25.9,
timestamp: "2020-01-01 00:30:00.0-05:00",
timestamp_zone: "2020-01-01 00:30:00.0-05:00",
zone: "Residential Zone",
}
const q = {name:'qH004', comercial_name:'The Boss'}
const rowOutput = `
<td><strong>qH004</strong></td>
<td>The Boss</td>
<td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td>
<td><i class=\"material-icons\" style=\"color:gray\">signal_wifi_off</i></td>`;
const activeRowOutput = `
<td><strong>qH004</strong></td>
<td>The Boss</td>
<td>1/1/2020, 5:30:00 AM</td>
<td>_</td>
<td>_</td>
<td>705.964</td>
<td>_</td>
<td>_</td>
<td>23.261</td>
<td>44.792</td>
<td>0</td>
<td>_</td>
<td>25.9</td>
<td>_</td>
<td>_</td>
<td><i class="material-icons" style="color:#32CD32">wifi</i></td>`;
const indexResult = {"CO_ug_m3": 705.964, "H2S_ug_m3": "_", "ID": "qH004", "I_temperature": "_", "NO2_ug_m3": "_", "O3_ug_m3": "_", "PM1": "_", "PM10": 44.792, "PM25": 23.261, "SO2_ug_m3": "_", "UV": 0, "humidity": "_", "lat": "_", "lon": "_", "pressure": "_", "spl": "_", "temperature": 25.9, "timestamp": "2020-01-01 00:30:00.0-05:00"}

test('indexValue: values for dashboard display', () => {
expect(indexValue(data)).toStrictEqual(indexResult);
})

test('dashboardRow: dashboard empty row', () => {
expect(dashboardRow(q)).toStrictEqual(rowOutput);
})

test('dashboardRowActive: dashboard active row', () => {
expect(dashboardRowActive(data,q,indexResult)).toStrictEqual(activeRowOutput);
})

const html = '[object HTMLDivElement]';

test('viewDashboard: dashboard page', () => {
  
  document.body.innerHTML = `
  <header></header>
    <div id="content-page"></div>
  `;
  global.M = require('../build/js/materialize.min.js');
expect(viewDashboard().toString()).toMatch(html);
})

const element =`
<div class="dashboard">···
<table class="responsive-table highlight centered table-calibration">
<thead>
<tr>
<th align="justify">Qhawax</th>·
<th align="justify">Name</th>··
<th align="justify">Time</th>
<th align="justify">SO<sub>2</sub><br />(µg/m<sup>3</sup>)</th>
<th align="justify">NO<sub>2</sub><br />(µg/m<sup>3</sup>)</th>
<th align="justify">CO<br />(µg/m<sup>3</sup>)</th>
<th align="justify">H<sub>2</sub>S<br />(µg/m<sup>3</sup>)</th>
<th align="justify">O<sub>3</sub><br />(µg/m<sup>3</sup>)</th>
<th align="justify">PM<sub>2,5</sub><br />(µg/m<sup>3</sup>)</th>
<th align="justify">PM<sub>10</sub><br />(µg/m<sup>3</sup>)</th>
<th align="justify">UV</th>····
<th align="justify">dB</th>
<th align="justify">°C</th>
<th align="justify" scope="row">H (%)</th>
<th align="justify" scope="row">P<br />(hPa)</th>
<th align="justify">Conection</th>
</tr>
</thead>
<tbody>
</tbody>
<tfoot>
<tr>
<th align="center" colspan="16" id="wrapper-pagination" scope="row">
</th>
</tr>
</tfoot>
</table>
</div>
`;

test('request: dashboard page', () => {
  document.body.innerHTML = element;
  require('../build/js/materialize.min.js')
  fetch.mockResponses([
		JSON.stringify( {"area_name":"Residential Zone","comercial_name":"Wakanda Awakening","eca_noise_id":2,"id":179,"lat":-12.3578897,"lon":-76.7912213,"main_inca":-2.0,"mode":"Calibration","name":"qH006","qhawax_id":179,"qhawax_type":"AEREAL","state":"OFF"},{"area_name":"Special Protection Zone","comercial_name":"Aereo Prueba","eca_noise_id":1,"id":184,"lat":-11.998472864017,"lon":-76.9984387510529,"main_inca":-1.0,"mode":"Customer","name":"qH058","qhawax_id":184,"qhawax_type":"AEREAL","state":"OFF"}),
		{status:200}
	])
  expect(request(HTMLDivElement).toString()).toBe('[object Promise]');
})


//Need to mock socket
// test('create row in dashboard', () => {
//   document.body.innerHTML = element;

//   expect(createRow(document, ['qH004','qH006'])).toBe('');
// })