const msToMin = (ms) => {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
	//ES6 interpolated literals/template literals 
  	//If seconds is less than 10 put a zero in front.
    return `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
}

const infoWindow = (telemetry)=>`
<table class="tg">
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
    <td class="tg-6k50">${msToMin(telemetry.start)}</td>
    <td class="tg-6k50">${telemetry.airspeed}</td>
    <td class="tg-6k50">${telemetry.voltage}</td>
    <td class="tg-6k50">${telemetry.current}</td>
    <td class="tg-6k50">${telemetry.fix_type}</td>
    <td class="tg-6k50">${telemetry.num_gps}</td>
  </tr>
</tbody>
</table>

`;

export {infoWindow}