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
const result =[{"chart": '<div class="chart" id="chart1" />', "layout": {"showlegend": false, "title": "Temperatura (C)"}, "trace": {"name": "Temperatura (C)", "type": "scatter", "x": ["17:06:08"], "y": [18.4]}}, {"chart": undefined, "layout": {"showlegend": false, "title": "Presión (Pa)"}, "trace": {"name": "Presión (Pa)", "type": "scatter", "x": ["17:06:08"], "y": [100558.17]}}, {"chart": undefined, "layout": {"showlegend": false, "title": "Humedad (%)"}, "trace": {"name": "Humedad (%)", "type": "scatter", "x": ["17:06:08"], "y": [76.4]}}, {"chart": undefined, "layout": {"showlegend": false, "title": "CO (ppb)"}, "trace": {"name": "CO (ppb)", "type": "scatter", "x": ["17:06:08"], "y": [1]}}, {"chart": undefined, "layout": {"showlegend": false, "title": "H2S (ppb)"}, "trace": {"name": "H2S (ppb)", "type": "scatter", "x": ["17:06:08"], "y": [3]}}, {"chart": undefined, "layout": {"showlegend": false, "title": "NO2 (ppb)"}, "trace": {"name": "NO2 (ppb)", "type": "scatter", "x": ["17:06:08"], "y": [240]}}, {"chart": undefined, "layout": {"showlegend": false, "title": "O3 (ppb)"}, "trace": {"name": "O3 (ppb)", "type": "scatter", "x": ["17:06:08"], "y": [5]}}, {"chart": undefined, "layout": {"showlegend": false, "title": "SO2 (ppb)"}, "trace": {"name": "SO2 (ppb)", "type": "scatter", "x": ["17:06:08"], "y": [2]}}, {"chart": undefined, "layout": {"showlegend": false, "title": "PM1 (ug/m3)"}, "trace": {"name": "PM1 (ug/m3)", "type": "scatter", "x": ["17:06:08"], "y": [3.907]}}, {"chart": undefined, "layout": {"showlegend": false, "title": "PM10 (ug/m3)"}, "trace": {"name": "PM10 (ug/m3)", "type": "scatter", "x": ["17:06:08"], "y": [7.99]}}, {"chart": undefined, "layout": {"showlegend": false, "title": "PM2,5 (ug/m3)"}, "trace": {"name": "PM2,5 (ug/m3)", "type": "scatter", "x": ["17:06:08"], "y": [3.704]}}, {"chart": undefined, "layout": {"showlegend": false, "title": "Ruido (dB)"}, "trace": {"name": "Ruido (dB)", "type": "scatter", "x": ["17:06:08"], "y": [75.6]}}, {"chart": undefined, "layout": {"showlegend": false, "title": "UV"}, "trace": {"name": "UV", "type": "scatter", "x": ["17:06:08"], "y": [0]}}, {"chart": undefined, "layout": {"showlegend": false, "title": "UVA (mW/m2)"}, "trace": {"name": "UVA (mW/m2)", "type": "scatter", "x": ["17:06:08"], "y": [0]}}, {"chart": undefined, "layout": {"showlegend": false, "title": "UVA (mW/m2)"}, "trace": {"name": "UVA (mW/m2)", "type": "scatter", "x": ["17:06:08"], "y": [0]}}]

test('format for date', () => {
	expect(dateFormat('2020-07-29 23:00:00')).toStrictEqual('23:00:00');
})

it('create traces for graphic', () => {
      document.body.innerHTML =` <div class="row" id="charts"></div>`
const charts = document.querySelectorAll('.chart')
fetch.mockResponseOnce(JSON.stringify(response))
global.Plotly = jest.fn()
Plotly.newPlot = jest.fn()
  return createTraces(5,'qH004').then(data => expect(data).toEqual(
    expect.not.arrayContaining(result)),
  );
});

const html = '[object HTMLDivElement]';

test('graphics page', () => {
    document.body.innerHTML = `
    <header></header>
      <div id="content-page"></div>
    `;
    require('../build/js/materialize.min.js')
	expect(viewGraphics().toString()).toMatch(html);
})