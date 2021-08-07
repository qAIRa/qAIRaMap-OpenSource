import {durationMobile, newDateLocal } from "../lib/helpers.js";
import { format } from 'date-fns';
// format(new Date(jsonData[i].timestamp_zone), 'dd/MM/yyyy HH:mm:ss');

const tripViewElem = `
<form class="form-flights container">
<h5 class="center-align">Por favor seleccione un periodo para listar los viajes</h5><br>

<div class="row center-align">
<div class="col s6">
<label for="initDate">Fecha inicial</label>
<input type="text" class="datepicker center-align" name="initDate">
</div>
<div class="col s6">
<label for="endDate">Fecha final</label>
<input type="text" class="datepicker center-align" name="endDate">
</div>
</div>

<div class="container">
<div class="row">
<div class="center-align">
<button id="submit-btn" class="btn waves-effect waves-light" >Mostrar Viajes
<i class="material-icons right">send</i>
</button>
</div>
</div>
</form>
`;

const card = (trip)=>`
<div class="col s12 m7 l4">
<div class="card horizontal drone-card">
<div class="card-image drone-img">
<img style="border-radius: 20px;" src="img/qhawax_movil.png">
<p class="card-title">${trip.qhawax_name}</p>
</div>
<div class="card-stacked">
<div class="card-content">
<table>
<caption>${trip.details}</caption>
<caption>${trip.trip_start.slice(0,10).replaceAll('-','/')}</caption>
<tr>
<td>Inicio</td>
<td>${format(newDateLocal(trip.trip_start),'HH:mm:ss')}</td>
</tr>
<tr>
<td>Término</td>
<td>${format(newDateLocal(trip.trip_end),'HH:mm:ss')}</td>
</tr>
<tr>
<td>Total (min)</td>
<td>${durationMobile(trip)}</td>
</tr>
</table>
<div class="input-field col s12">
<select class="browser-default select-turn" id="${trip.trip_id}">
<option value="" disabled selected>Escoja el turno</option>
<option value="1">Turno 8am a 10am</option>
<option value="2">Turno 10am a 12pm</option>
<option value="3">Turno 14pm a 16pm</option>
<option value="4">Turno 16pm a 18pm</option>
</select>
</div>
</div>

<div class="card-action">
<div class="center-align">
<button id="${trip.qhawax_name}_${trip.trip_id}" class="btn waves-effect waves-light simulation-btn disabled"
data-start="${trip.trip_start}"
data-end="${trip.trip_end}"
data-comercialname="${trip.comercial_name}"
data-lat="${trip.last_latitude_position}"
data-lng="${trip.last_longitude_position}"
data-tripid="${trip.trip_id}"
>SIMULAR
<i class="material-icons right">send</i>
</button>
</div>
</div>
</div>
</div>
</div>`;

const newSearch_btn =`
<div class="center-align">
<button id="new-search-btn" class="btn waves-effect waves-light" style="
margin-top: 1em;
margin-bottom: 1em;">New Search
<i class="material-icons right">send</i>
</button>
</div>
`

export { tripViewElem, card, newSearch_btn}