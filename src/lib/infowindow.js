export const infoWindowT = (telemetry, drone, timer)=>`
<table class="tg">
<caption>${drone.name}: ${drone.comercial_name}</caption>
<thead>
  <tr>
    <th class="tg-wa1i">Height</th>
    <th class="tg-wa1i">Distance</th>
    <th class="tg-wa1i">Time min</th>
    <th class="tg-wa1i">Speed</th>
    <th class="tg-wa1i">Voltage</th>
    <th class="tg-wa1i">Current</th>
    <th class="tg-wa1i">GPS fix type</th>
    <th class="tg-wa1i">Satellites</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-6k50">${telemetry.alt}</td>
    <td class="tg-6k50">${telemetry.dist_home}</td>
    <td class="tg-6k50">${timer.minutes}:${timer.seconds}</td>
    <td class="tg-6k50">${telemetry.airspeed}</td>
    <td class="tg-6k50">${telemetry.voltage}</td>
    <td class="tg-6k50">${telemetry.current}</td>
    <td class="tg-6k50">${telemetry.fix_type}</td>
    <td class="tg-6k50">${telemetry.num_gps}</td>
  </tr>
</tbody>
</table>
`;

const notNull = (value) => {
  return value===null||value<0?'-':value;
}

// style="border:1px double ${ cellColor('CO',data.CO_ug_m3)};
// bgcolor=${ cellColor('SO2',data.SO2_ug_m3)}
export const infoWindowM = (data, q_mobile, timer)=>`
<table class="tg stripped centered info-mobile">
<caption>${q_mobile.name}: ${q_mobile.comercial_name}</caption>
<thead>
  <tr>
    <th class="tg-wa1i">CO<br>(&micro;g/m<sup>3</sup>)</th>
    <th class="tg-wa1i">SO<sub>2</sub><br>(&micro;g/m<sup>3</sup>)</th>
    <th class="tg-wa1i">NO<sub>2</sub><br>(&micro;g/m<sup>3</sup>)</th>
    <th class="tg-wa1i">O<sub>3</sub><br>(&micro;g/m<sup>3</sup>)</th>
    <th class="tg-wa1i">H<sub>2</sub>S<br>(&micro;g/m<sup>3</sup>)</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-6k50">${notNull(data.CO_ug_m3)}</td>
    <td class="tg-6k50">${notNull(data.SO2_ug_m3)}</td>
    <td class="tg-6k50">${notNull(data.NO2_ug_m3)}</td>
    <td class="tg-6k50">${notNull(data.O3_ug_m3)}</td>
    <td class="tg-6k50">${notNull(data.H2S_ug_m3)}</td>
  </tr>
</tbody>
</table>

<table class="tg stripped centered info-mobile">
<thead>
  <tr>
    <th class="tg-wa1i">PM<sub>2,5</sub><br>(&micro;g/m<sup>3</sup>)</th>
    <th class="tg-wa1i">PM<sub>10</sub><br>(&micro;g/m<sup>3</sup>)</th>
    <th class="tg-wa1i">T<br>(°C)</th>
    <th class="tg-wa1i">H<br>(%)</th>
    <th class="tg-wa1i">Tiempo (min)</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-6k50">${notNull(data.PM25)}</td>
    <td class="tg-6k50">${notNull(data.PM10)}</td>
    <td class="tg-6k50">${notNull(data.temperature)}</td>
    <td class="tg-6k50">${notNull(data.humidity)}</td>
    <td class="tg-6k50">${timer.hours}:${timer.minutes}:${timer.seconds}</td>
  </tr>
</tbody>
</table>
`;
