import { flightsView, flightRequest } from '../src/views/flightsView.js'
import { flightViewElem, } from '../src/html/flights.js';
import { enableFetchMocks } from 'jest-fetch-mock';


enableFetchMocks()



beforeEach(() => {
  fetch.resetMocks()
})

test('flight view page', () => {
    document.body.innerHTML = `
    <header></header>
      <div id="content-page"></div>
    `;
    global.M = require('../build/js/materialize.min.js');
	expect(flightsView().toString()).toMatch(``);
})


test('flights request from api', () => {
  fetch.mockResponses([
		JSON.stringify({"sensor":1194.934,"timestamp_zone":"Wed, 24 Mar 2021 19:00:00 GMT"},{"sensor":1194.934,"timestamp_zone":"Wed, 24 Mar 2021 19:00:00 GMT"}),
		{status:200}
	])
  global.M = require('../build/js/materialize.min.js');
expect(flightRequest('01-01-2021 08:00:00','01-01-2021 08:00:00', flightViewElem).toString()).toMatch('');
})

