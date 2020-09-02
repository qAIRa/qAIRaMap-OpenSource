import { viewGraphics, dateFormat, requestOptions, createTraces } from '../src/views/graphicsView.js';
import { enableFetchMocks } from 'jest-fetch-mock';

enableFetchMocks()
beforeEach(() => {
    fetch.resetMocks()
 
  })

  const response = [
      { CO: 1,
        CO2: null,
        H2S: 3,
        NO: null,
        NO2: 240,
        O3: 5,
        PM1: 3.907,
        PM10: 7.99,
        PM25: 3.704,
        SO2: 2,
        UV: 0,
        UVA: 0,
        UVB: 0,
        VOC: null,
        alt: null,
        humidity: 76.4,
        lat: -12.072736,
        lon: -77.082687,
        pressure: 100558.17,
        spl: 75.6,
        temperature: 18.4,
        timestamp_zone: "Wed, 02 Sep 2020 22:06:08 GMT"}
  ]

test('format for date', () => {
	expect(dateFormat('2020-07-29 23:00:00')).toStrictEqual('23:00:00');
})

// test('create traces for chart',async () => {
//     document.body.innerHTML =
// '<div id="chart1" class="chart">'+'</div>'
// '<div id="chart2" class="chart">'+'</div>'
// '<div id="chart3" class="chart">'+'</div>'
// '<div id="chart4" class="chart">'+'</div>'
// '<div id="chart5" class="chart">'+'</div>'
// '<div id="chart6" class="chart">'+'</div>'
// '<div id="chart7" class="chart">'+'</div>'
// global.Plotly = jest.fn()
// Plotly.newPlot = jest.fn()
// fetch.mockResponseOnce(JSON.stringify(response))
//     const charts = document.querySelectorAll('.chart')
// 	expect(await createTraces('5','qH004',charts)).toBe(traces)
// })