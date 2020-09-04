const generateGif = (inca) => {
  if (inca >= 0 && inca <= 50) {
    return '/img/qairito/qairito_buena.gif';
  } if (inca <= 100) {
    return '/img/qairito/qairito_moderada.gif';
  } if (inca <= 500) {
    return '/img/qairito/qairito_mala.gif';
  }
  return '/img/qairito/qairito_cuidado.gif';
};

const infowindowComplete = (
  qhawax,
  qhawaxSensorColor,
  qhawaxInca,
  company,
  marker,
  data,
) => `
<div class="infoWindow">
<h6 class="header">
${qhawax.comercial_name}
<br/>
<img src="${generateGif(qhawax, company)}"alt="Hoja Calidad aire"class="qairito-img"/>
</h6>
<h7 class="header"><strong>${data.zoneColor.zone}</strong></h7><br />
<h7 class="header">${data.values.time}</h7>
<div class="gas-table">
<table class="responsive-table centered">
<thead>
<tr>
<th><br/>(${qhawax.name})<br /></th>
<th>${window.innerWidth > 768 ? 'Monóxido de Carbono ' : ''}(CO)</th>
<th>${window.innerWidth > 768 ? 'Dióxido de Nitrógeno ' : ''}(NO<sub>2</sub>)</th>
<th>${window.innerWidth > 768 ? 'Ozono ' : ''}(O<sub>3</sub>)</th>
<th>${window.innerWidth > 768 ? 'Sulfuro de Hidrógeno ' : ''}(H<sub>2</sub>S)</th>
<th>${window.innerWidth > 768 ? 'Dióxido de Azúfre ' : ''}(SO<sub>2</sub>)</th>
<th>${window.innerWidth > 768 ? 'Material Particulado ' : 'PM'}(2,5&micro;)</th>
<th>${window.innerWidth > 768 ? 'Material Particulado ' : 'PM'}(10&micro;)</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>INCA</strong><br />(promedio<br />${qhawaxSensorColor.time})</td>
<td bgcolor="${qhawaxInca.CO === 0 || qhawaxInca.CO ? qhawaxSensorColor.result.CO.color : 'transparent'}">${qhawaxInca.CO === 0 || qhawaxInca.CO ? qhawaxSensorColor.result.CO.label : ''}<br />(${qhawaxInca.CO === 0 || qhawaxInca.CO ? qhawaxInca.CO : '-'})</td>
<td bgcolor="${qhawaxInca.NO2 === 0 || qhawaxInca.NO2 ? qhawaxSensorColor.result.NO2.color : 'transparent'}">${qhawaxInca.NO2 === 0 || qhawaxInca.NO2 ? qhawaxSensorColor.result.NO2.label : ''} <br />(${qhawaxInca.NO2 === 0 || qhawaxInca.NO2 ? qhawaxInca.NO2 : '-'})</td>
<td bgcolor="${qhawaxInca.O3 === 0 || qhawaxInca.O3 ? qhawaxSensorColor.result.O3.color : 'transparent'}">${qhawaxInca.O3 === 0 || qhawaxInca.O3 ? qhawaxSensorColor.result.O3.label : ''}<br />(${qhawaxInca.O3 === 0 || qhawaxInca.O3 ? qhawaxInca.O3 : '-'})</td>
<td bgcolor="${qhawaxInca.H2S === 0 || qhawaxInca.H2S ? qhawaxSensorColor.result.H2S.color : 'transparent'}">${qhawaxInca.H2S === 0 || qhawaxInca.H2S ? qhawaxSensorColor.result.H2S.label : ''} <br />(${qhawaxInca.H2S === 0 || qhawaxInca.H2S ? qhawaxInca.H2S : '-'})</td>
<td bgcolor="${qhawaxInca.SO2 === 0 || qhawaxInca.SO2 ? qhawaxSensorColor.result.SO2.color : 'transparent'}">${qhawaxInca.SO2 === 0 || qhawaxInca.SO2 ? qhawaxSensorColor.result.SO2.label : ''} <br />(${qhawaxInca.SO2 === 0 || qhawaxInca.SO2 ? qhawaxInca.SO2 : '-'})</td>
<td bgcolor="${qhawaxInca.PM25 === 0 || qhawaxInca.PM25 ? qhawaxSensorColor.result.PM25.color : 'transparent'}">${qhawaxInca.PM25 === 0 || qhawaxInca.PM25 ? qhawaxSensorColor.result.PM25.label : ''} <br />(${qhawaxInca.PM25 === 0 || qhawaxInca.PM25 ? qhawaxInca.PM25 : '-'})</td>
<td bgcolor="${qhawaxInca.PM10 === 0 || qhawaxInca.PM10 ? qhawaxSensorColor.result.PM10.color : 'transparent'}">${qhawaxInca.PM10 === 0 || qhawaxInca.PM10 ? qhawaxSensorColor.result.PM10.label : ''} <br />(${qhawaxInca.PM10 === 0 || qhawaxInca.PM10 ? qhawaxInca.PM10 : '-'})</td>
</tr>
<tr>
<td>Concentración<br />Tiempo Real</td>
<td class="infowindow-graph"><a class="modal-trigger" href="#modalGraphic" data-infograph="${marker.id}" data-label="CO">${data.values.CO}<br />(&micro;g/m<sup>3</sup>)</a></td>
<td class="infowindow-graph"><a class="modal-trigger" href="#modalGraphic" data-infograph="${marker.id}" data-label="NO2">${data.values.NO2}<br />(&micro;g/m<sup>3</sup>)</a></td>
<td class="infowindow-graph"><a class="modal-trigger" href="#modalGraphic" data-infograph="${marker.id}" data-label="O3">${data.values.O3}<br />(&micro;g/m<sup>3</sup>)</a></td>
<td class="infowindow-graph"><a class="modal-trigger" href="#modalGraphic" data-infograph="${marker.id}" data-label="H2S">${data.values.H2S}<br />(&micro;g/m<sup>3</sup>)</a></td>
<td class="infowindow-graph"><a class="modal-trigger" href="#modalGraphic" data-infograph="${marker.id}" data-label="SO2">${data.values.SO2}<br />(&micro;g/m<sup>3</sup>)</a></td>
<td class="infowindow-graph"><a class="modal-trigger" href="#modalGraphic" data-infograph="${marker.id}" data-label="PM25">${data.values.PM25}<br />(&micro;g/m<sup>3</sup>)</a></td>
<td class="infowindow-graph"><a class="modal-trigger" href="#modalGraphic" data-infograph="${marker.id}" data-label="PM10">${data.values.PM10}<br />(&micro;g/m<sup>3</sup>)</a></td>
</tr>
</tbody>
</table>
</div>
<div class="">
<table class="responsive-table centered">
<thead>
<tr>
<th></th>
<th>${window.innerWidth > 768 ? 'Ruido ' : 'Ruido '}(dB)</th><th>${window.innerWidth > 768 ? 'Temperatura ' : 'T '}(°C)</th>
<th>${window.innerWidth > 768 ? 'Ultra Violeta ' : 'UV '}</th>
<th>${window.innerWidth > 768 ? 'Presión ' : 'P '}(kPa)</th>
<th>${window.innerWidth > 768 ? 'Humedad ' : 'H '} (%)</th></tr>
</thead>
<tbody>
<tr>
<td><strong>Tiempo<br />Real</strong></td>
<td bgcolor="${data.zoneColor.color}">${data.values.spl}</td>
<td>${data.values.temperature}</td>
<td bgcolor="${data.colorUV.color}">${data.colorUV.label}<br />${data.values.UV}</td>
<td>${data.values.pressure}</td>
<td>${data.values.humidity}</td>
</tr>
</tbody>
</table>
<p class="center"><strong><sub>Los datos no han pasado un control de calidad.</sub></strong></p>
</div>
</div>
`;

const infowindowPartial = (
  qhawax,
  zoneColor,
  values,
  company,
  marker,
  colorUV,
) => `
<div class="infoWindow">
<h6 class="header">${qhawax.comercial_name}<br /><img src="${generateGif(qhawax.main_inca)}" alt="Hoja Calidad aire" class="qairito-img"/></h6>
<h7 class="header"><strong>${zoneColor.zone}</strong></h7>
<br />
<h7 class="header">${values.time}</h7>
<div class="gas-table">
<table class="responsive-table centered">
<thead>
<tr>
<th><br />(${qhawax.name})<br /></th>
<th>${window.innerWidth > 768 ? 'Monóxido de Carbono ' : ''}(CO)</th>
<th>${window.innerWidth > 768 ? 'Dióxido de Nitrógeno ' : ''}(NO<sub>2</sub>)</th><th>${window.innerWidth > 768 ? 'Ozono ' : ''}(O<sub>3</sub>)</th>
<th>${window.innerWidth > 768 ? 'Sulfuro de Hidrógeno ' : ''}(H<sub>2</sub>S)</th>
<th>${window.innerWidth > 768 ? 'Dióxido de Azúfre ' : ''}(SO<sub>2</sub>)</th><th>${window.innerWidth > 768 ? 'Material Particulado ' : 'PM'}(2,5&micro;)</th>
<th>${window.innerWidth > 768 ? 'Material Particulado ' : 'PM'}(10&micro;)</th>
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
<td class="infowindow-graph"><a class="modal-trigger" href="#modalGraphic" data-infograph="${marker.id}" data-label="CO">${values.CO}<br />(&micro;g/m<sup>3</sup>)</a></td>
<td class="infowindow-graph"><a class="modal-trigger" href="#modalGraphic" data-infograph="${marker.id}" data-label="NO2">${values.NO2}<br />(&micro;g/m<sup>3</sup>)</a></td>
<td class="infowindow-graph"><a class="modal-trigger" href="#modalGraphic" data-infograph="${marker.id}" data-label="O3">${values.O3}<br />(&micro;g/m<sup>3</sup>)</a></td>
<td class="infowindow-graph"><a class="modal-trigger" href="#modalGraphic" data-infograph="${marker.id}" data-label="H2S">${values.H2S}<br />(&micro;g/m<sup>3</sup>)</a></td>
<td class="infowindow-graph"><a class="modal-trigger" href="#modalGraphic" data-infograph="${marker.id}" data-label="SO2">${values.SO2}<br />(&micro;g/m<sup>3</sup>)</a></td>
<td class="infowindow-graph"><a class="modal-trigger" href="#modalGraphic" data-infograph="${marker.id}" data-label="PM25">${values.PM25}<br />(&micro;g/m<sup>3</sup>)</a></td>
<td class="infowindow-graph"><a class="modal-trigger" href="#modalGraphic" data-infograph="${marker.id}" data-label="PM10">${values.PM10}<br />(&micro;g/m<sup>3</sup>)</a></td>
</tr>
</tbody>
</table>
</div>
<div>
<table class="responsive-table centered">
<thead>
<tr>
<th></th>
<th>${window.innerWidth > 768 ? 'Ruido ' : 'Ruido '}(dB)</th>
<th>${window.innerWidth > 768 ? 'Temperatura ' : 'T '}(°C)</th>
<th>${window.innerWidth > 768 ? 'Ultra Violeta ' : 'UV '}</th>
<th>${window.innerWidth > 768 ? 'Presión ' : 'P '}(kPa)</th>
<th>${window.innerWidth > 768 ? 'Humedad ' : 'H '} (%)</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Tiempo<br />Real</strong></td>
<td bgcolor="${zoneColor.color}">${values.spl}</td>
<td>${values.temperature}</td>
<td bgcolor="${colorUV.color}">${colorUV.label}<br />${values.UV}</td>
<td>${values.pressure}</td>
<td>${values.humidity}</td>
</tr>
</tbody>
</table>
<p class="center"><strong><sub>Los datos no han pasado un control de calidad.</sub></strong></p>
</div>
</div>`;

export { infowindowComplete, infowindowPartial, generateGif };
