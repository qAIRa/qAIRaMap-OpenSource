
import {navBarClient} from '../lib/navBarClient.js';
import { chartView} from '../lib/HtmlComponents.js';
import { requestAllQhawax, requestStatus, requestGraphicsData} from '../requests/get.js';
import { SocketSource } from '../index.js';
import {addZero} from '../lib/mapAssets.js'
import { configuration} from '../lib/graphAssets.js';

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

const requestOptions = async (element) => {
	const qhawax_list = await requestAllQhawax();
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

 const createTraces = async (time, qhawax, charts) => {
	let traces = [];

	const json = await requestGraphicsData(qhawax, time)
	let yAxis = {
		temperature : {value:[],name: 'Temperatura (C)'},
		pressure : {value:[],name: 'Presión (Pa)'},
		humidity : {value:[],name: 'Humedad (%)'},
		 CO : {value:[],name: 'CO (ppb)'},
		 H2S : {value:[],name: 'H2S (ppb)'},
		 NO2 : {value:[],name: 'NO2 (ppb)'},
		 O3 : {value:[],name: 'O3 (ppb)'},
		 SO2 : {value:[],name: 'SO2 (ppb)'},
		 PM1 : {value:[],name: 'PM1 (ug/m3)'},
		 PM10 : {value:[],name: 'PM10 (ug/m3)'},
		 PM25 : {value:[],name: 'PM2,5 (ug/m3)'},
		 spl : {value:[],name: 'Ruido (dB)'},
		 UV : {value:[],name: 'UV'},
		 UVA : {value:[],name: 'UVA (mW/m2)'},
		 UVB : {value:[],name: 'UVA (mW/m2)'},	 
		 
	}
	 let y = [];
	 let x = [];
	json.forEach(d => {
		let index = 0;
		Object.entries(yAxis).forEach(([key, value]) => {
			yAxis[key].value.push(d[key])

			traces.push({
				trace: {
					y:yAxis[key].value,
					x: x,
					name: yAxis[key].name,
					type: 'scatter',
				},
				chart: charts[index],
				layout: { title: yAxis[key].name, showlegend: false },
			},)
			index++;
		});
		x.push(dateFormat(d.timestamp_zone));

	});
	traces.forEach(trace => {
		Plotly.newPlot(trace.chart, [trace.trace], trace.layout, configuration);
	});
	
	return traces;
};

const viewGraphics = () => {

	const graphElem = document.createElement('div');
	graphElem.setAttribute('class', 'container');
	navBarClient(graphElem, chartView, )
	

	const graphBtn = graphElem.querySelector('#graphicBtn');

	const selection = graphElem.querySelectorAll('select');
	M.FormSelect.init(selection);

	 requestOptions(graphElem );
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
		createTraces(selectedTime, selectedQhawax, charts);

		const socket = io.connect(`${SocketSource}`);

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

export { viewGraphics, configuration, dateFormat, requestOptions, createTraces };
