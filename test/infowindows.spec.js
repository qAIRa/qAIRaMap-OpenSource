import {generateGif, infowindowComplete, infowindowPartial} from '../src/lib/infowindows.js';

const qhawax= {
area_name: "Zona Residencial",
comercial_name: "Parque de la Felicidad (Pentagonito)",
eca_noise_id: 2,
id: 3,
lat: -12.1030555555556,
lon: -76.9891666666667,
main_inca: 100,
mode: "Cliente",
name: "qH008",
qhawax_id: 8,
qhawax_type: "STATIC",
state: "ON",
}
const qhawaxSensorColor = {
time: "04:00",
result: {
    CO: {color: "#009966", label: "Buena"},
H2S: {color: "#009966", label: "Buena"},
NO2: {color: "#009966", label: "Buena"},
O3: {color: "#ffde33", label: "Moderada"},
PM10: {color: "#009966", label: "Buena"},
PM25: {color: "#ffde33", label: "Moderada"},
SO2: {color: "#009966", label: "Buena"}
}
}
const qhawaxInca = {
CO: 1,
H2S: 16,
NO2: null,
O3: 59,
PM10: 32,
PM25: 81,
SO2: 3,
main_inca: 100,
qhawax_id: 8,
qhawax_name: "qH008",
timestamp_zone: "Sun, 27 Sep 2020 09:00:00 GMT",
}
const data = {
    colorUV: {color: "#009966", label: "Bajo"},
values: {
CO: 113.6,
H2S: 17.7,
NO2: 183.4,
O3: 38.2,
PM1: 8.37,
PM10: 65.7,
PM25: 20.1,
SO2: 0,
UV: 0,
humidity: 96.2,
lat: "-12.10306",
lng: "-76.98917",
pressure: 99.5,
spl: 52.9,
temperature: 14.3,
time: "27 de Septiembre de 2020, 5:2",
},
zoneColor: {color: "#cc0033", zone: "Zona Residencial"}
}

const marker ={
    id: "qH008"
}
const infowindow = `
<div class=\"infoWindow\">
<h6 class=\"header\">
Parque de la Felicidad (Pentagonito)
<br/>
<img src=\"/img/qairito/qairito_cuidado.gif\"alt=\"Hoja Calidad aire\"class=\"qairito-img\"/>
</h6>
<h7 class=\"header\"><strong>Zona Residencial</strong></h7><br />
<h7 class=\"header\">27 de Septiembre de 2020, 5:2</h7>
<div class=\"gas-table\">
<table class=\"responsive-table centered\">
<thead>
<tr>
<th><br/>(qH008)<br /></th>
<th>Monóxido de Carbono (CO)</th>
<th>Dióxido de Nitrógeno (NO<sub>2</sub>)</th>
<th>Ozono (O<sub>3</sub>)</th>
<th>Sulfuro de Hidrógeno (H<sub>2</sub>S)</th>
<th>Dióxido de Azúfre (SO<sub>2</sub>)</th>
<th>Material Particulado (2,5&micro;)</th>
<th>Material Particulado (10&micro;)</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>INCA</strong><br />(promedio<br />04:00)</td>
<td bgcolor=\"#009966\">Buena<br />(1)</td>
<td bgcolor=\"transparent\"> <br />(-)</td>
<td bgcolor=\"#ffde33\">Moderada<br />(59)</td>
<td bgcolor=\"#009966\">Buena <br />(16)</td>
<td bgcolor=\"#009966\">Buena <br />(3)</td>
<td bgcolor=\"#ffde33\">Moderada <br />(81)</td>
<td bgcolor=\"#009966\">Buena <br />(32)</td>
</tr>
<tr>
<td>Concentración<br />Tiempo Real</td>
<td class=\"infowindow-graph\"><a class=\"modal-trigger\" href=\"#modalGraphic\" data-infograph=\"qH008\" data-label=\"CO\">113.6<br />(&micro;g/m<sup>3</sup>)</a></td>
<td class=\"infowindow-graph\"><a class=\"modal-trigger\" href=\"#modalGraphic\" data-infograph=\"qH008\" data-label=\"NO2\">183.4<br />(&micro;g/m<sup>3</sup>)</a></td>
<td class=\"infowindow-graph\"><a class=\"modal-trigger\" href=\"#modalGraphic\" data-infograph=\"qH008\" data-label=\"O3\">38.2<br />(&micro;g/m<sup>3</sup>)</a></td>
<td class=\"infowindow-graph\"><a class=\"modal-trigger\" href=\"#modalGraphic\" data-infograph=\"qH008\" data-label=\"H2S\">17.7<br />(&micro;g/m<sup>3</sup>)</a></td>
<td class=\"infowindow-graph\"><a class=\"modal-trigger\" href=\"#modalGraphic\" data-infograph=\"qH008\" data-label=\"SO2\">0<br />(&micro;g/m<sup>3</sup>)</a></td>
<td class=\"infowindow-graph\"><a class=\"modal-trigger\" href=\"#modalGraphic\" data-infograph=\"qH008\" data-label=\"PM25\">20.1<br />(&micro;g/m<sup>3</sup>)</a></td>
<td class=\"infowindow-graph\"><a class=\"modal-trigger\" href=\"#modalGraphic\" data-infograph=\"qH008\" data-label=\"PM10\">65.7<br />(&micro;g/m<sup>3</sup>)</a></td>
</tr>
</tbody>
</table>
</div>
<div class=\"\">
<table class=\"responsive-table centered\">
<thead>
<tr>
<th></th>
<th>Ruido (dB)</th><th>Temperatura (°C)</th>
<th>Ultra Violeta </th>
<th>Presión (kPa)</th>
<th>Humedad  (%)</th></tr>
</thead>
<tbody>
<tr>
<td><strong>Tiempo<br />Real</strong></td>
<td bgcolor=\"#cc0033\">52.9</td>
<td>14.3</td>
<td bgcolor=\"#009966\">Bajo<br />0</td>
<td>99.5</td>
<td>96.2</td>
</tr>
</tbody>
</table>
<p class=\"center\"><strong><sub>Los datos no han pasado un control de calidad.</sub></strong></p>
</div>
</div>
`

const infoWindow2 = `
<div class=\"infoWindow\">
<h6 class=\"header\">Parque de la Felicidad (Pentagonito)<br /><img src=\"/img/qairito/qairito_moderada.gif\" alt=\"Hoja Calidad aire\" class=\"qairito-img\"/></h6>
<h7 class=\"header\"><strong>undefined</strong></h7>
<br />
<h7 class=\"header\">undefined</h7>
<div class=\"gas-table\">
<table class=\"responsive-table centered\">
<thead>
<tr>
<th><br />(qH008)<br /></th>
<th>Monóxido de Carbono (CO)</th>
<th>Dióxido de Nitrógeno (NO<sub>2</sub>)</th><th>Ozono (O<sub>3</sub>)</th>
<th>Sulfuro de Hidrógeno (H<sub>2</sub>S)</th>
<th>Dióxido de Azúfre (SO<sub>2</sub>)</th><th>Material Particulado (2,5&micro;)</th>
<th>Material Particulado (10&micro;)</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>INCA</strong><br />(a la espera de data promedio)</td>
<td><br />(...)</td>
<td><br />(...)</td>
<td><br />(...)</td>
<td><br />(...)</td>
<td><br />(...)</td>
<td><br />(...)</td>
<td><br />(...)</td>
</tr>
<tr>
<td>Concentración<br />Tiempo Real</td>
<td class=\"infowindow-graph\"><a class=\"modal-trigger\" href=\"#modalGraphic\" data-infograph=\"qH008\" data-label=\"CO\">1<br />(&micro;g/m<sup>3</sup>)</a></td>
<td class=\"infowindow-graph\"><a class=\"modal-trigger\" href=\"#modalGraphic\" data-infograph=\"qH008\" data-label=\"NO2\">null<br />(&micro;g/m<sup>3</sup>)</a></td>
<td class=\"infowindow-graph\"><a class=\"modal-trigger\" href=\"#modalGraphic\" data-infograph=\"qH008\" data-label=\"O3\">59<br />(&micro;g/m<sup>3</sup>)</a></td>
<td class=\"infowindow-graph\"><a class=\"modal-trigger\" href=\"#modalGraphic\" data-infograph=\"qH008\" data-label=\"H2S\">16<br />(&micro;g/m<sup>3</sup>)</a></td>
<td class=\"infowindow-graph\"><a class=\"modal-trigger\" href=\"#modalGraphic\" data-infograph=\"qH008\" data-label=\"SO2\">3<br />(&micro;g/m<sup>3</sup>)</a></td>
<td class=\"infowindow-graph\"><a class=\"modal-trigger\" href=\"#modalGraphic\" data-infograph=\"qH008\" data-label=\"PM25\">81<br />(&micro;g/m<sup>3</sup>)</a></td>
<td class=\"infowindow-graph\"><a class=\"modal-trigger\" href=\"#modalGraphic\" data-infograph=\"qH008\" data-label=\"PM10\">32<br />(&micro;g/m<sup>3</sup>)</a></td>
</tr>
</tbody>
</table>
</div>
<div>
<table class=\"responsive-table centered\">
<thead>
<tr>
<th></th>
<th>Ruido (dB)</th>
<th>Temperatura (°C)</th>
<th>Ultra Violeta </th>
<th>Presión (kPa)</th>
<th>Humedad  (%)</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Tiempo<br />Real</strong></td>
<td bgcolor=\"undefined\">undefined</td>
<td>undefined</td>
<td bgcolor=\"undefined\">undefined<br />undefined</td>
<td>undefined</td>
<td>undefined</td>
</tr>
</tbody>
</table>
<p class=\"center\"><strong><sub>Los datos no han pasado un control de calidad.</sub></strong></p>
</div>
</div>`
test('gif', () => {
    expect(generateGif(0)).toEqual('/img/qairito/qairito_buena.gif');
    expect(generateGif(51)).toEqual('/img/qairito/qairito_moderada.gif');
    expect(generateGif(101)).toEqual('/img/qairito/qairito_mala.gif');
    expect(generateGif(501)).toEqual('/img/qairito/qairito_cuidado.gif');
    });

test('infowindow complete', () => {
    expect(infowindowComplete(qhawax,
        qhawaxSensorColor,
        qhawaxInca,
        marker,
        data)).toEqual(infowindow);
    });
    test('infowindow partial', () => {
        expect(infowindowPartial(qhawax,
            qhawaxSensorColor,
            qhawaxInca,
            marker,
            data)).toEqual(infoWindow2);
        });