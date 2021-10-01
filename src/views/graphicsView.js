import { navBarQhawax } from '../lib/navBarQhawax.js';
import { chartView } from '../html/graphics.js';
import { oneParameterRequest, requestGraphicsData, noParametersRequest } from '../requests/get.js';
import { socket } from '../index.js';
import { addZero } from '../lib/helpers.js';
import { configuration } from '../lib/graphAssets.js';

const SENSORS = [
  "temperature",
  "pressure",
  "humidity",
  "CO",
  "CO_ug_m3",
  "H2S",
  "H2S_ug_m3",
  "NO2",
  "NO2_ug_m3",
  "O3",
  "O3_ug_m3",
  "SO2",
  "SO2_ug_m3",
  "PM1",
  "PM10",
  "PM25",
  "spl",
  "UV",
  "UVA",
  "UVB",
];

const createYAxisObject = () => ({
  temperature: { value: [], name: "Temperature (C)" },
  pressure: { value: [], name: "Pressure (hPa)" },
  humidity: { value: [], name: "Humidity (%)" },
  CO: { value: [], name: "CO (ppb)" },
  CO_ug_m3: { value: [], name: "CO (ug/m3)" },
  H2S: { value: [], name: "H2S (ppb)" },
  H2S_ug_m3: { value: [], name: "H2S (ug/m3)" },
  NO2: { value: [], name: "NO2 (ppb)" },
  NO2_ug_m3: { value: [], name: "NO2 (ug/m3)" },
  O3: { value: [], name: "O3 (ppb)" },
  O3_ug_m3: { value: [], name: "O3 (ug/m3)" },
  SO2: { value: [], name: "SO2 (ppb)" },
  SO2_ug_m3: { value: [], name: "SO2 (ug/m3)" },
  PM1: { value: [], name: "PM1 (ug/m3)" },
  PM10: { value: [], name: "PM10 (ug/m3)" },
  PM25: { value: [], name: "PM2,5 (ug/m3)" },
  spl: { value: [], name: "Noise (dB)" },
  UV: { value: [], name: "UV" },
  UVA: { value: [], name: "UVA (mW/m2)" },
  UVB: { value: [], name: "UVB (mW/m2)" },
});

const dateFormat = (timestamp) => {
  const date = new Date(Date.parse(timestamp));
  return `${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}`;
};

const createSelectQhawaxOption = (name, comercial_name) => {
  const option = document.createElement('option');
	option.setAttribute('value', name);
	option.innerText = `${name}: ${comercial_name}`;
  return option;
};

const requestOptions = async(element) => {
  const addOptions = element.querySelector('#selectQhawax');
  await noParametersRequest('AllQhawaxInMap/')
  .then( q=> q.forEach(async(qhawax) => {
    await oneParameterRequest('qhawax_status/?name=',qhawax.name)
    .then(s =>
      s === 'ON' && addOptions.appendChild(
        createSelectQhawaxOption(qhawax.name, qhawax.comercial_name)))
  }));
};

const createChart = (charts, id) => {
  const chart = document.createElement('div');
	const br = document.createElement('br');
	chart.setAttribute('id', id);
	chart.setAttribute('class', 'container');
  charts.appendChild(chart);
	charts.appendChild(br);
}

 const createTraces = async (time, qhawax) => {
	const charts = document.getElementById('charts');
  charts.innerHTML = '';

	let yAxis = createYAxisObject();
	let x = [];
	await requestGraphicsData(qhawax, time)
    .then(g => g.forEach(d => {
      x.push(dateFormat(d.timestamp_zone));
      Object.entries(yAxis).forEach(([key, value]) => {
        yAxis[key].value.push(d[key]);
      });
	}));

	Object.entries(yAxis).forEach(([key, value]) => {
    createChart(charts, key);
    const trace = {
      y: yAxis[key].value,
			x: x,
			name: yAxis[key].name,
			type: 'scatter',
		};
    const chart = document.getElementById(key);
    const layout = { title: yAxis[key].name, showlegend: false };
		Plotly.newPlot(chart, [trace], layout, configuration);
	});
};

const viewGraphics = () => {
	const graphElem = document.createElement('div');
	graphElem.setAttribute('class', 'container');
  navBarQhawax(graphElem, chartView);

	const selection = graphElem.querySelectorAll('select');
	M.FormSelect.init(selection);

	requestOptions(graphElem);

	let selectedQhawax = '', selectedTime = Number;
	selection[0].onchange = () => {	selectedQhawax = selection[0].value.toString(); };
	selection[1].onchange = () => {	selectedTime = selection[1].value; };
	
  const graphBtn = graphElem.querySelector('#graphicBtn');
	graphBtn.addEventListener('click', () => {
		createTraces(selectedTime, selectedQhawax);
		socket.on(`${selectedQhawax}_processed`, res => {
			if (res.ID === selectedQhawax) {
				SENSORS.forEach(s => {
					const chart = document.getElementById(s);
					if (chart) {
						Plotly.extendTraces(
							chart,
							{ y: [[res[s]]], x: [[dateFormat(res.timestamp_zone)]] },
              [0]);
					}
				});
			}
		});
	});

	return graphElem;
};

export { viewGraphics, dateFormat, requestOptions, createTraces};
