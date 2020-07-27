import {addZero} from '../lib/navMenus.js';
import {navBarClient} from '../lib/navBarClient.js';
import { chartView} from '../lib/HtmlComponents.js';
import { requestAllQhawaxByCompany, requestStatus} from '../requests/get.js';

const configuration = {
	toImageButtonOptions: {
		format: 'png', // one of png, svg, jpeg, webp
		filename: 'custom_image',
		height: 500,
		width: 700,
		scale: 1, // Multiply title/legend/axis/canvas sizes by this factor
	},
	modeBarButtonsToRemove: [
		'sendDataToCloud',
		'editInChartStudio',
		'zoom2d',
		'pan2d',
		'select2d',
		'lasso2d',
		'zoomIn2d',
		'zoomOut2d',
		'autoScale2d',
		'resetScale2d',
		'hoverClosestCartesian',
		'toggleSpikelines',
		'hoverCompareCartesian',
	],
	displaylogo: false,
	responsive: true,
};


const formatDateDB = timestamp => {
	const date = new Date(Date.parse(timestamp) + (new Date().getTimezoneOffset()/60)* 3600 * 1000);
	return (
		addZero(date.getHours()) +
		':' +
		addZero(date.getMinutes()) +
		':' +
		addZero(date.getSeconds())
	);
};

const formatDateDBsocket = timestamp => {
	const date = new Date(Date.parse(timestamp)- (new Date().getTimezoneOffset()/60)* 3600 * 1000);
	return (
		addZero(date.getHours()) +
		':' +
		addZero(date.getMinutes()) +
		':' +
		addZero(date.getSeconds())
	);
};

const dateFormat = (timestamp)=>{

	const date = new Date(Date.parse(timestamp));
	return (
		addZero(date.getHours()) +
		':' +
		addZero(date.getMinutes()) +
		':' +
		addZero(date.getSeconds())
	);

}

const requestOptions = async (element, company) => {
	const qhawax_list = await requestAllQhawaxByCompany(company);
	qhawax_list.forEach(async qhawax => {
		const status = await requestStatus(qhawax.name);
		const addOptions = element.querySelector('#selectQhawax');
		const option = document.createElement('option');
		option.setAttribute('value', qhawax.name);
		option.innerText =
			qhawax.name + ': ' + qhawax.comercial_name;
		status==='ON'?addOptions.appendChild(option):false;
	});
 };


 const createTraces = async (time, qhawax) => {
	let traces = [];

	const response = await fetch(
		`https://qairamapnapi-dev.qairadrones.com/api/processed_measurements/?name=${qhawax}&interval_minutes=${time}&time_zone=${new Date(Date.now()).getTimezoneOffset()*-1/60}`
	);
	const json = await response.json();

	let y = [];
	let yCO = [];
	let yH2S = [];
	let yNO2 = [];
	let yO3 = [];
	let ySO2 = [];
	let yPM1 = [];
	let yPM10 = [];
	let yPM25 = [];
	let yUV = [];
	let yUVA = [];
	let yUVB = [];
	let yhumidity = [];
	let ypressure = [];
	let yspl = [];
	let ytemperature = [];
	let x = [];
	json.forEach(d => {
		yCO.push(d.CO);
		yH2S.push(d.H2S);
		yNO2.push(d.NO2);
		yO3.push(d.O3);
		ySO2.push(d.SO2);
		yPM1.push(d.PM1);
		yPM10.push(d.PM10);
		yPM25.push(d.PM25);
		yUV.push(d.UV);
		yUVA.push(d.UVA);
		yUVB.push(d.UVB);
		yhumidity.push(d.humidity);
		ypressure.push(d.pressure);
		yspl.push(d.spl);
		ytemperature.push(d.temperature);
		x.push(dateFormat(d.timestamp_zone));

		traces = [
			{
				trace: {
					y: yCO,
					x: x,
					name: 'CO (ppb)',
					type: 'scatter',
				},
				chart: charts[3],
				layout: { title: 'CO (ppb)', showlegend: false },
			},
			{
				trace: {
					y: yH2S,
					x: x,
					name: 'H2S (ppb)',
					type: 'scatter',
				},
				chart: charts[4],
				layout: { title: 'H2S (ppb)', showlegend: false },
			},
			{
				trace: {
					y: yNO2,
					x: x,
					name: 'NO2 (ppb)',
					type: 'scatter',
				},
				chart: charts[5],
				layout: { title: 'NO2 (ppb)', showlegend: false },
			},
			{
				trace: {
					y: yO3,
					x: x,
					name: 'O3 (ppb)',
					type: 'scatter',
				},
				chart: charts[6],
				layout: { title: 'O3 (ppb)', showlegend: false },
			},
			{
				trace: {
					y: ySO2,
					x: x,
					name: 'SO2 (ppb)',
					type: 'scatter',
				},
				chart: charts[7],
				layout: { title: 'SO2 (ppb)', showlegend: false },
			},
			{
				trace: {
					y: yPM1,
					x: x,
					name: 'PM1 (ug/m3)',
					type: 'scatter',
				},
				chart: charts[8],
				layout: { title: 'PM1 (ug/m3)', showlegend: false },
			},
			{
				trace: {
					y: yPM10,
					x: x,
					name: 'PM10 (ug/m3)',
					type: 'scatter',
				},
				chart: charts[9],
				layout: { title: 'PM10 (ug/m3)', showlegend: false },
			},
			{
				trace: {
					y: yPM25,
					x: x,
					name: 'PM2,5 (ug/m3)',
					type: 'scatter',
				},
				chart: charts[10],
				layout: { title: 'PM25 (ug/m3)', showlegend: false },
			},
			{
				trace: {
					y: yUV,
					x: x,
					name: 'UV ',
					type: 'scatter',
				},
				chart: charts[12],
				layout: { title: 'UV ', showlegend: false },
			},
			{
				trace: {
					y: yUVA,
					x: x,
					name: 'UVA (mW/m2)',
					type: 'scatter',
				},
				chart: charts[13],
				layout: { title: 'UVA (mW/m2)', showlegend: false },
			},
			{
				trace: {
					y: yUVB,
					x: x,
					name: 'UVB (mW/m2)',
					type: 'scatter',
				},
				chart: charts[14],
				layout: { title: 'UVB (mW/m2)', showlegend: false },
			},
			{
				trace: {
					y: yhumidity,
					x: x,
					name: 'Humedad (%)',
					type: 'scatter',
				},
				chart: charts[2],
				layout: { title: 'Humedad (%)', showlegend: false },
			},
			{
				trace: {
					y: ypressure,
					x: x,
					name: 'Presión (Pa)',
					type: 'scatter',
				},
				chart: charts[1],
				layout: { title: 'Presión (Pa)', showlegend: false },
			},
			{
				trace: {
					y: yspl,
					x: x,
					name: 'Ruido (dB)',
					type: 'scatter',
				},
				chart: charts[11],
				layout: { title: 'Ruido (dB)', showlegend: false },
			},
			{
				trace: {
					y: ytemperature,
					x: x,
					name: 'Temperatura (C)',
					type: 'scatter',
				},
				chart: charts[0],
				layout: { title: 'Temperatura (C)', showlegend: false },
			},
		];
	});
	traces.forEach(trace => {
		Plotly.newPlot(trace.chart, [trace.trace], trace.layout, configuration);
	});

	return traces;
};



const viewGraphics = company => {

	company=1
	const graphElem = document.createElement('div');
	graphElem.setAttribute('class', 'container');
	navBarClient(graphElem, chartView)
	

	const graphBtn = graphElem.querySelector('#graphicBtn');

	const selection = graphElem.querySelectorAll('select');
	M.FormSelect.init(selection);

	 requestOptions(graphElem, company);
const charts = graphElem.querySelectorAll('.chart');


	let selectedQhawax = '';
	selection[0].onchange = () => {
		selectedQhawax = selection[0].value.toString();
	};
	let selectedTime = Number;
	selection[1].onchange = () => {
		selectedTime = selection[1].value;
	};
	

	graphBtn.addEventListener('click', () => {
		createTraces(selectedTime, selectedQhawax);

		const socket = io.connect('https://qairamapnapi-dev.qairadrones.com/');

		socket.on('new_data_summary_processed', res => {
			if (res.ID === selectedQhawax) {
				Plotly.extendTraces(
					charts[3],
					{ y: [[res.CO]], x: [[dateFormat(res.timestamp_zone)]] },
					[0]
				);
				Plotly.extendTraces(
					charts[4],
					{
						y: [[res.H2S]],
						x: [[dateFormat(res.timestamp_zone)]],
					},
					[0]
				);
				Plotly.extendTraces(
					charts[5],
					{
						y: [[res.NO2]],
						x: [[dateFormat(res.timestamp_zone)]],
					},
					[0]
				);
				Plotly.extendTraces(
					charts[6],
					{ y: [[res.O3]], x: [[dateFormat(res.timestamp_zone)]] },
					[0]
				);
				Plotly.extendTraces(
					charts[7],
					{
						y: [[res.SO2]],
						x: [[dateFormat(res.timestamp_zone)]],
					},
					[0]
				);
				Plotly.extendTraces(
					charts[8],
					{
						y: [[res.PM1]],
						x: [[dateFormat(res.timestamp_zone)]],
					},
					[0]
				);
				Plotly.extendTraces(
					charts[9],
					{
						y: [[res.PM10]],
						x: [[dateFormat(res.timestamp_zone)]],
					},
					[0]
				);
				Plotly.extendTraces(
					charts[10],
					{
						y: [[res.PM25]],
						x: [[dateFormat(res.timestamp_zone)]],
					},
					[0]
				);
				Plotly.extendTraces(
					charts[12],
					{
						y: [[res.UV]],
						x: [[dateFormat(res.timestamp_zone)]],
					},
					[0]
				);
				Plotly.extendTraces(
					charts[13],
					{
						y: [[res.UVA]],
						x: [[dateFormat(res.timestamp_zone)]],
					},
					[0]
				);
				Plotly.extendTraces(
					charts[14],
					{
						y: [[res.UVB]],
						x: [[dateFormat(res.timestamp_zone)]],
					},
					[0]
				);
				Plotly.extendTraces(
					charts[2],
					{
						y: [[res.humidity]],
						x: [[dateFormat(res.timestamp_zone)]],
					},
					[0]
				);
				Plotly.extendTraces(
					charts[1],
					{
						y: [[res.pressure]],
						x: [[dateFormat(res.timestamp_zone)]],
					},
					[0]
				);
				Plotly.extendTraces(
					charts[11],
					{
						y: [[res.spl]],
						x: [[dateFormat(res.timestamp_zone)]],
					},
					[0]
				);
				Plotly.extendTraces(
					charts[0],
					{
						y: [[res.temperature]],
						x: [[dateFormat(res.timestamp_zone)]],
					},
					[0]
				);
			}
		});
	});

	return graphElem;
};

export { viewGraphics, formatDateDB, configuration };
