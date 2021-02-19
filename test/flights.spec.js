import { flightViewElem, card} from '../src/html/flights.js'

const flight = {
    flight_detail: "Terrible flight",
    flight_end: "11-02-2021 14:42:15",
    flight_start: "11-02-2021 14:42:15",
    last_latitude_position: -12.0700711793011,
    last_longitude_position: -77.0798769626038,
    qhawax_name: "qH006",
    commercial_name: "Wakanda Awakening"
}

const cardHtml =`
<div class=\"col s12 m7 l4\">
<div class=\"card horizontal drone-card\">
<div class=\"card-image drone-img\">
<img style=\"border-radius: 20px;\" src=\"img/andeanDrone.png\">
<p class=\"card-title\">qH006</p>
</div>
<div class=\"card-stacked\">
<div class=\"card-content\">
<table>
<caption>Terrible flight</caption>
<caption>11/03/2021</caption>
<tr>
<td>Start time</td>
<td>14:42:15</td>
</tr>
<tr>
<td>End time</td>
<td>14:42:15</td>
</tr>
<tr>
<td>Total (min)</td>
<td>00:00:00</td>
</tr>
</table>
</div>
<div class=\"card-action\">
<div class=\"center-align\">
<button id=\"qH006\" class=\"btn waves-effect waves-light simulation-btn\"
data-start=\"11-02-2021 14:42:15\"
data-end=\"11-02-2021 14:42:15\"
data-comercialname="WakandaAwakening"
data-lat="-12.0700711793011"
data-lng="-77.0798769626038"
>SIMULATION
<i class=\"material-icons right\">send</i>
</button>
</div>
</div>
</div>
</div>
</div>`


test('flightViewElem card', () => {
    document.body.innerHTML = flightViewElem
	expect(card(flight)).toBe(cardHtml);
})