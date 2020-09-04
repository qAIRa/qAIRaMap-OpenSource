import {viewDashboard, indexValue, request, dashboardRow, dashboardRowActive } from '../src/views/dashboardView.js';

const data = {
    CO: 1,
    CO_ug_m3: 1.15,
    H2S: 3,
    H2S_ug_m3: 4.17,
    ID: "qH004",
    NO2: 240,
    NO2_ug_m3: 451.2,
    O3: 5,
    O3_ug_m3: 9.8,
    PM1: 1.9,
    PM10: 2.398,
    PM25: 1.652,
    SO2: 2,
    SO2_ug_m3: 5.24,
    UV: 0,
    UVA: 0,
    UVB: 0,
    humidity: 71.6,
    lat: -12.072736,
    lon: -77.082687,
    pressure: 100680.49,
    spl: 84.3,
    temperature: 19.1,
    timestamp: "2020-09-01 15:27:42",
    timestamp_zone: "2020-09-01 15:27:42",
    zone: "Zona de Protección Especial"
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
<td>9/1/2020, 2:27:42 PM</td>
<td style="color:black">2.0</td>
<td style="color:red">240.0</td>
<td style="color:black">1.0</td>
<td style="color:black">3.0</td>
<td style="color:black">5.0</td>
<td style="color:black">1.7</td>
<td style="color:black">2.4</td>
<td style="color:red">0</td>
<td>84.3</td>
<td>19.1</td>
<td>71.6</td>
<td>100.7</td>
<td><i class="material-icons" style="color:#32CD32">wifi</i></td>`;
const indexResult = {"CO": {"color": "black", "value": 1}, "H2S": {"color": "black", "value": 3}, "ID": {"color": "black", "value": "qH004"}, "NO2": {"color": "red", "value": 240}, "O3": {"color": "black", "value": 5}, "PM1": {"color": "red", "value": 1.9}, "PM10": {"color": "black", "value": 2.398}, "PM25": {"color": "black", "value": 1.652}, "SO2": {"color": "black", "value": 2}, "UV": {"color": "red", "value": 0}, "humidity": {"color": "red", "value": 71.6}, "lat": {"color": "black", "value": -12.072736}, "lon": {"color": "black", "value": -77.082687}, "pressure": {"color": "red", "value": 100680.49}, "spl": {"color": "red", "value": 84.3}, "temperature": {"color": "black", "value": 19.1}, "timestamp": {"color": "black", "value": "2020-09-01 15:27:42"}}

test('values for dashboard display', () => {
	expect(indexValue(data)).toStrictEqual(indexResult);
})

test('dashboard empty row', () => {
	expect(dashboardRow(q)).toStrictEqual(rowOutput);
})

test('dashboard active row', () => {
	expect(dashboardRowActive(data,q,indexResult)).toStrictEqual(activeRowOutput);
})

