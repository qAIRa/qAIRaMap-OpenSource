import {durationMobile, newDateLocal } from "../lib/helpers.js";
import { format } from 'date-fns';
// format(new Date(jsonData[i].timestamp_zone), 'dd/MM/yyyy HH:mm:ss');

const tripViewElem = `
<form class="form-flights container">
<h5 class="center-align">Please select a period to list the trips</h5><br>
<div class="container">
<div class="row center-align">
<div class="col s6">
<label for="initDate">Initial Date</label>
<input type="text" class="datepicker center-align" name="initDate">
</div>
<div class="col s6">
<label for="endDate">Final Date</label>
<input type="text" class="datepicker center-align" name="endDate">
</div>
</div>
</div>
<div class="container">
<div class="row">
<div class="center-align">
<button id="submit-btn" class="btn waves-effect waves-light" >Show trips
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
<caption>${format(newDateLocal(trip.trip_start),'dd/MM/yyyy')}</caption>
<tr>
<td>Start time</td>
<td>${format(newDateLocal(trip.trip_start),'HH:mm:ss')}</td>
</tr>
<tr>
<td>End time</td>
<td>${format(newDateLocal(trip.trip_end),'HH:mm:ss')}</td>
</tr>
<tr>
<td>Total (min)</td>
<td>${durationMobile(trip)}</td>
</tr>
</table>
</div>
<div class="card-action">
<div class="center-align">
<button id="${trip.qhawax_name}" class="btn waves-effect waves-light simulation-btn"
data-start="${trip.trip_start}"
data-end="${trip.trip_end}"
data-comercialname="${trip.comercial_name}"
data-lat="${trip.last_latitude_position}"
data-lng="${trip.last_longitude_position}"
>SIMULATION
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