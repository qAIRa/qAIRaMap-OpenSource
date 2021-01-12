import { navBarClient } from '../lib/navBarClient.js';
import { chartView } from '../lib/HtmlComponents.js';
import { requestAllQhawax, requestStatus, requestGraphicsData } from '../requests/get.js';
import { SocketSource } from '../index.js';
import { addZero } from '../lib/helpers.js';
import { configuration } from '../lib/graphAssets.js';




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


const requestOptions = async(element) => {
  const qhawax_list = await requestAllQhawax();
  qhawax_list.forEach(async(qhawax) => {
    const status = await requestStatus(qhawax.name);
    const addOptions = element.querySelector('#selectQhawax');
    const option = document.createElement('option');
    option.setAttribute('value', qhawax.name);
    option.innerText =qhawax.name + ': ' + qhawax.comercial_name;;
    status === 'ON' ? addOptions.appendChild(option) : false;
  });
};


 const createTraces = async (time, qhawax) => {
	let trace={}
    let chart={}
    let layout={}
	let traces = [];
	const charts = document.getElementById('charts')
    charts.innerHTML=''

	const json = await requestGraphicsData(qhawax, time)
	let yAxis = {
		temperature : {value:[],name: 'Temperature (C)'},
		pressure : {value:[],name: 'Pressure (hPa)'},
		humidity : {value:[],name: 'Humidity (%)'},
		 CO : {value:[],name: 'CO (ppb)'},
		 CO_ug_m3 : {value:[],name: 'CO (ug/m3)'},
		 H2S : {value:[],name: 'H2S (ppb)'},
		 H2S_ug_m3 : {value:[],name: 'H2S (ug/m3)'},
		 NO2 : {value:[],name: 'NO2 (ppb)'},
		 NO2_ug_m3 : {value:[],name: 'NO2 (ug/m3)'},
		 O3 : {value:[],name: 'O3 (ppb)'},
		 O3_ug_m3 : {value:[],name: 'O3 (ug/m3)'},
		 SO2 : {value:[],name: 'SO2 (ppb)'},
		 SO2_ug_m3 : {value:[],name: 'SO2 (ug/m3)'},
		 PM1 : {value:[],name: 'PM1 (ug/m3)'},
		 PM10 : {value:[],name: 'PM10 (ug/m3)'},
		 PM25 : {value:[],name: 'PM2,5 (ug/m3)'},
		 spl : {value:[],name: 'Noise (dB)'},
		 UV : {value:[],name: 'UV'},
		 UVA : {value:[],name: 'UVA (mW/m2)'},
		 UVB : {value:[],name: 'UVB (mW/m2)'},
	}
	 let x = [];
	json.forEach(d => {
		x.push(dateFormat(d.timestamp_zone));
		Object.entries(yAxis).forEach(([key, value]) => {
			yAxis[key].value.push(d[key])
		});
	});

	Object.entries(yAxis).forEach(([key, value]) => {
		const chart = document.createElement('div')
		const br = document.createElement('br')
		charts.appendChild(chart)
		charts.appendChild(br)
		chart.setAttribute('id',key)
		chart.setAttribute('class','container')
	 })

	Object.entries(yAxis).forEach(([key, value]) => {
		traces=[
			trace= {
				y:yAxis[key].value,
				x: x,
				name: yAxis[key].name,
				type: 'scatter',
			},
			chart= document.getElementById(key),
			layout= { title: yAxis[key].name, showlegend: false },

		]
	
		Plotly.newPlot(traces[1], [traces[0]], traces[2], configuration);
	})
	return traces;
};



const viewGraphics = () => {

	const graphElem = document.createElement('div');
	graphElem.setAttribute('class', 'container');
  navBarClient(graphElem, chartView);
	

	const graphBtn = graphElem.querySelector('#graphicBtn');

	const selection = graphElem.querySelectorAll('select');
	M.FormSelect.init(selection);

	 requestOptions(graphElem);

	let selectedQhawax = '';
	selection[0].onchange = () => {	selectedQhawax = selection[0].value.toString();};
	let selectedTime = Number;
	selection[1].onchange = () => {	selectedTime = selection[1].value;};
	
	graphBtn.addEventListener('click', () => {
		createTraces(selectedTime, selectedQhawax);

		const socket = io.connect(`${SocketSource}`);
		let sensors=['temperature',
			'pressure',
			'humidity',
			'CO',
			'CO_ug_m3',
			'H2S',
			'H2S_ug_m3',
			'NO2',
			'NO2_ug_m3',
			'O3',
			'O3_ug_m3',
			'SO2',
			'SO2_ug_m3',
			'PM1',
			'PM10',
			'PM25',
			'spl',
			'UV',
			'UVA',
			'UVB']
		socket.on('new_data_summary_processed', res => {
			if (res.ID === selectedQhawax) {
				let index=0;
				sensors.forEach(s=>{
					const chart = document.getElementById(s)
					if(chart){
						Plotly.extendTraces(
							chart,
							{ y: [[res[s]]], x: [[dateFormat(res.timestamp_zone)]] },[0]);
						index++;
					}
					
				});
			}
		});
	});

	return graphElem;
};

export { viewGraphics, dateFormat, requestOptions, createTraces};


// const dateFormat = (timestamp)=>{
	
// 	const date = new Date(Date.parse(timestamp));
// 	return (
// 		addZero(date.getHours()) +
// 		':' +
// 		addZero(date.getMinutes()) +
// 		':' +
// 		addZero(date.getSeconds())
// 	);

// }

// const requestOptions = async(element) => {
//   const qhawax_list = await requestAllQhawax();
//   qhawax_list.forEach(async(qhawax) => {
//     const status = await requestStatus(qhawax.name);
//     const addOptions = element.querySelector('#selectQhawax');
//     const option = document.createElement('option');
//     option.setAttribute('value', qhawax.name);
//     option.innerText =qhawax.name + ': ' + qhawax.comercial_name;;
//     status === 'ON' ? addOptions.appendChild(option) : false;
//   });
// };
// const yAxis = {
//   temperature: { value: [], name: 'Temperatura (C)' },
//   pressure: { value: [], name: 'Presión (Pa)' },
//   humidity: { value: [], name: 'Humedad (%)' },
// 	 CO: { value: [], name: 'CO (ppb)' },
// 	 H2S: { value: [], name: 'H2S (ppb)' },
// 	 NO2: { value: [], name: 'NO2 (ppb)' },
// 	 O3: { value: [], name: 'O3 (ppb)' },
// 	 SO2: { value: [], name: 'SO2 (ppb)' },
// 	 PM1: { value: [], name: 'PM1 (ug/m3)' },
// 	 PM10: { value: [], name: 'PM10 (ug/m3)' },
// 	 PM25: { value: [], name: 'PM2,5 (ug/m3)' },
// 	 spl: { value: [], name: 'Ruido (dB)' },
// 	 UV: { value: [], name: 'UV' },
// 	 UVA: { value: [], name: 'UVA (mW/m2)' },
// 	 UVB: { value: [], name: 'UVA (mW/m2)' },

// };
// const sensors = ['temperature',
//   'pressure',
//   'humidity',
//   'CO',
//   'H2S',
//   'NO2',
//   'O3',
//   'SO2',
//   'PM1',
//   'PM10',
//   'PM25',
//   'spl',
//   'UV',
//   'UVA',
//   'UVB',
// ];

// const createTraces = async(time, qhawax, charts) => {
//   const traces = [];

//   const json = await requestGraphicsData(qhawax, time);
// 	 const y = [];
// 	 const x = [];
//   json.forEach((d) => {
//     let index = 0;
//     Object.entries(yAxis).forEach(([key, value]) => {
//       yAxis[key].value.push(d[key]);

//       traces.push({
//         trace: {
//           y: yAxis[key].value,
//           x,
//           name: yAxis[key].name,
//           type: 'scatter',
//         },
//         chart: charts[index],
//         layout: { title: yAxis[key].name, showlegend: false },
//       });
//       index++;
//     });
//     x.push(dateFormat(d.timestamp_zone));
//   });
//   traces.forEach((trace) => {
//     Plotly.newPlot(trace.chart, [trace.trace], trace.layout, configuration);
//   });

//   return traces;
// };

// const viewGraphics = () => {
//   const graphElem = document.createElement('div');
//   graphElem.setAttribute('class', 'container');
//   navBarClient(graphElem, chartView);
//   const graphBtn = graphElem.querySelector('#graphicBtn');

//   const selection = graphElem.querySelectorAll('select');
//   M.FormSelect.init(selection);
// 	 requestOptions(graphElem);
//   const charts = graphElem.querySelectorAll('.chart');
//   let selectedQhawax = '';
//   selection[0].onchange = () => {
//     selectedQhawax = selection[0].value.toString();
//   };
//   let selectedTime = Number;
//   selection[1].onchange = () => {
//     selectedTime = selection[1].value;
//   };

//   graphBtn.addEventListener('click', () => {
//     createTraces(selectedTime, selectedQhawax, charts);
//     const socket = io.connect(`${SocketSource}`);
//     socket.on('new_data_summary_processed', (res) => {
//       if (res.ID === selectedQhawax) {
//         let index = 0;
//         sensors.forEach((s) => {
//           Plotly.extendTraces(
//             charts[index],
//             { y: [[res[s]]], x: [[dateFormat(res.timestamp_zone)]] }, [0],
//           );
//           index++;
//         });
//       }
//     });
//   });
//   return graphElem;
// };

// export {
//   viewGraphics, dateFormat, requestOptions, createTraces,
// };
