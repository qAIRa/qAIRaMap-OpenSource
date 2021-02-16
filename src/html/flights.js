import {duration } from "../lib/helpers.js";

const flightViewElem = `
<form class="form-flights container">
<h5 class="center-align">Please select a period to list the flights</h5><br>
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
<button id="submit-btn" class="btn waves-effect waves-light" >Show Flights
<i class="material-icons right">send</i>
</button>
</div>
</div>
</form>
`;

const card = (flight)=>`
<div class="col s12 m7 l4">
<div class="card horizontal drone-card">
<div class="card-image drone-img">
<img style="border-radius: 20px;" src="img/andeanDrone.png">
<p class="card-title">${flight.qhawax_name}</p>
</div>
<div class="card-stacked">
<div class="card-content">
<table>
<caption>${flight.flight_detail}</caption>
<caption>${flight.flight_start.slice(0,10)}</caption>
<tr>
<td>Start time</td>
<td>${flight.flight_start.slice(11,19)}</td>
</tr>
<tr>
<td>End time</td>
<td>${flight.flight_end.slice(11,19)}</td>
</tr>
<tr>
<td>Total (min)</td>
<td>${duration(flight)}</td>
</tr>
</table>
</div>
<div class="card-action">
<div class="center-align">
<button id="${flight.qhawax_name}" class="btn waves-effect waves-light simulation-btn"
data-start="${flight.flight_start}"
data-end="${flight.flight_end}"
>SIMULATION
<i class="material-icons right">send</i>
</button>
</div>
</div>
</div>
</div>
</div>`;

export { flightViewElem, card}