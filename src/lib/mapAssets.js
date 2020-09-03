import { infowindowComplete, infowindowPartial } from '../lib/infowindows.js';
import { requestAverageMeasurement} from '../requests/get.js'

const months = [
	'Enero',
	'Febrero',
	'Marzo',
	'Abril',
	'Mayo',
	'Junio',
	'Julio',
	'Agosto',
	'Septiembre',
	'Octubre',
	'Noviembre',
	'Diciembre',
];

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
	const date = new Date(Date.parse(timestamp) + 5 * 3600 * 1000);
	return (
		addZero(date.getHours()) +
		':' +
		addZero(date.getMinutes()) +
		':' +
		addZero(date.getSeconds())
	);
};

const ECAlimits = sensor => {
	switch (sensor) {
		case 'CO':
			return 10000;
		case 'NO2':
			return 100;
		case 'O3':
			return 100;
		case 'H2S':
			return 150;
		case 'SO2':
			return 250;
		case 'PM25':
			return 50;
		case 'PM10':
			return 100;
		default:
			break;
	}
};
const drawChart = async (sensor, qhawax_id) => {
	const chart = document.querySelector('#graphicValues');
	const layout = {
		autosize: false,
		width:
			window.innerWidth >= 800
				? window.innerWidth * 0.5
				: window.innerWidth * 0.85,
		height: window.innerHeight * 0.6,
		title: `${qhawax_id}: Concentración de ${sensor} de las últimas 24 horas (µg/m3)`,
		showlegend: true,
		colorway: ['#0000FF', '#FF0000'],
		xaxis: {
			title: {
				text: 'Hora del día',
				font: {
					family: 'Courier New, monospace',
					size: 12,
					color: '#7f7f7f',
				},
			},
		},
		yaxis: {
			title: {
				text: 'Concentración (µg/m3)',
				font: {
					family: 'Courier New, monospace',
					size: 12,
					color: '#7f7f7f',
				},
			},
		},
	};
	let data = [];

	const json = await requestAverageMeasurement(qhawax_id, sensor)

	let yValues = [];
	let xValues = [];
	let yECA = [];
	Object.entries(json).forEach(d => {
		yValues.push(d[1].sensor);
		xValues.push(formatDateDB(d[1].timestamp));
		yECA.push(ECAlimits(sensor));
		let trace1 = {};
		let trace2 = {};
		data = [
			(trace1 = {
				y: yValues,
				x: xValues,
				name: `${sensor} (µg/m3)`,
				type: 'scatter',
			}),
			(trace2 = {
				y: yECA,
				x: xValues,
				name: 'Límite ECA',
				type: 'scatter',
			}),
		];
	});

	Plotly.newPlot(chart, data, layout, configuration);
};
const addZero = i => {
	if (i < 10) {
		i = '0' + i;
	}
	return i;
};

const qualityColor ={
	good:{color: '#009966',label: 'Good' },
	moderate:{color: '#ffde33',label: 'Moderate'},
	bad:{color: '#ff9933',label: 'Bad'},
	hazardous:{color: '#cc0033',label: 'Danger' },
	noinfo:{	color: 'transparent',label: '' }
}
const limits = {
	PM10:[0,50,100,167],
	SO2:[0,50,100,625],
	CO:[0,50,100,150],
	H2S:[0,50,100,1000],
	PM25:[0,50,100,500],
	O3:[0,50,100,175],
	NO2:[0,50,100,150]
}
const airQuality = data => {
	let sensors = {	PM10:null, SO2:null, CO:null, H2S:null, PM25:null, O3:null, NO2:null}
	Object.entries(sensors).forEach(([key, value]) => sensors[key]=data[key]);
	const time =addZero(new Date(data.timestamp).getHours()) + ':' + addZero(new Date(data.timestamp).getMinutes());
	let result={PM10:null, SO2:null, CO:null, H2S:null, PM25:null, O3:null, NO2:null}
	Object.entries(sensors).forEach(([keyS, valueS]) => {
	result[keyS] = valueS >= limits[keyS][0] && valueS <= limits[keyS][1]
	? qualityColor.good
	: valueS > limits[keyS][1] && valueS <= limits[keyS][2]
	? qualityColor.moderate
	: valueS > limits[keyS][2] && valueS <= limits[keyS][3]
	? qualityColor.bad
	: valueS > limits[keyS][3]
	? qualityColor.hazardous
	: qualityColor.noinfo
});
	return {
		time,
		result,
	};
};

const qhawaxLeaf = inca => {
	let leaf = '';
	switch (inca) {
		case -1: case null: leaf = '/img/leafs/leaf_out_of_service.png';
			break;
		case -3: case -2: case 1: case 0: leaf = '/img/leafs/leaf_helmet.png';
			break;
		case 50: leaf = '/img/leafs/leaf_inca_good.png';
			break;
		case 100: leaf = '/img/leafs/leaf_inca_moderate.png';
			break;
		case 500: leaf = '/img/leafs/leaf_inca_bad.png';
			break;
		case 600: leaf = '/img/leafs/leaf_inca_hazardous.png';
			break;
		default: leaf = '/img/leafs/leaf_out_of_service.png';
			break;
	}
	return leaf;
};

const zoneColorNoise = data =>{
	const newDate = new Date(data.timestamp);
	let colorData = {color:null, zone:data.zone}

	if (newDate.getHours() <= 22 &&  newDate.getHours() >= 7) {
		data.zone==='Zona de Protección Especial'&&data.spl <= 50? colorData.color='#009966':
		data.zone==='Zona Residencial'&&data.spl <= 60? colorData.color='#009966':
		data.zone==='Zona Comercial'&&data.spl <= 70? colorData.color='#009966':
		data.zone==='Zona Industrial'&&data.spl <= 80? colorData.color='#009966':colorData.color='#cc0033';
	} else {
		data.zone==='Zona de Protección Especial'&&data.spl <= 40? colorData.color='#009966':
		data.zone==='Zona Residencial'&&data.spl <= 50? colorData.color='#009966':
		data.zone==='Zona Comercial'&&data.spl <= 60? colorData.color='#009966':
		data.zone==='Zona Industrial'&&data.spl <= 70? colorData.color='#009966':colorData.color='#cc0033';
		
	}
	return colorData;
};


const uvColor = uvValue => {
	return uvValue >= 0 && uvValue < 3
		? {
				color: '#009966',
				label: 'Minimum',
		  }
		: uvValue >= 3 && uvValue < 6
		? {
				color: '#ffde33',
				label: 'Low',
		  }
		: uvValue >= 6 && uvValue < 8
		? {
				color: '#ff9933',
				label: 'Moderate',
		  }
		: uvValue >= 8 && uvValue < 11
		? {
				color: '#cc0033',
				label: 'High',
		  }
		: {
				color: 'darkmagenta',
				label: 'Extreme',
		  };
};

const indexValue = data => {
	const lat = data.lat.toFixed(5);
	const lng = data.lon.toFixed(5);
	const UV = Number(data.UV.toFixed(1));
	const spl = Number(data.spl.toFixed(1));

	const newDate = new Date(data.timestamp);

	const time =
		newDate.getDate() +
		' de ' +
		months[newDate.getMonth()] +
		' de ' +
		newDate.getFullYear() +
		', ' +
		newDate.getHours() +
		':' +
		newDate.getMinutes();

	const PM1 = Number(data.PM1);
	const humidity = Number(data.humidity.toFixed(1));
	const pressure = Number((data.pressure / 1000).toFixed(1));
	const temperature = Number(data.temperature.toFixed(1));

	const PM10 = Number(data.PM10.toFixed(1));
	const SO2 = Number(data.SO2.toFixed(1));
	const CO = Number(data.CO.toFixed(1));
	const H2S = Number(data.H2S.toFixed(1));
	const PM25 = Number(data.PM25.toFixed(1));
	const O3 = Number(data.O3.toFixed(1));
	const NO2 = Number(data.NO2.toFixed(1));

	return {
		lat,
		lng,
		UV,
		spl,
		time,
		PM1,
		PM1label: 'PM1',
		humidity,
		pressure,
		temperature,
		PM10,
		PM10label: 'PM10',
		SO2,
		SO2label: 'SO2',
		CO,
		COlabel: 'CO',
		H2S,
		H2Slabel: 'H2S',
		PM25,
		PM25label: 'PM25',
		O3,
		O3label: 'O3',
		NO2,
		NO2label: 'NO2',
	};
};

const setQhawaxInfowindow = (map, marker, infoWindow, qhawax, company) => {
	const socket = io.connect('https://qairamapnapi.qairadrones.com/');

	let content = 'Loading...';
	infoWindow.setContent(content);
	if (qhawax.main_inca === -1) {
		content = `Module ${qhawax.name} OFF.`;
		infoWindow.setContent(content);
	} else if (qhawax.main_inca === -2) {
		content = `Module ${qhawax.name} in Calibration.`;
		infoWindow.setContent(content);
	} else if (qhawax.main_inca === 0) {
		content = `Module ${qhawax.name} waiting for valid data.`;
		infoWindow.setContent(content);
	} else if (qhawax.main_inca === 1) {
		socket.on('new_data_summary_valid', res => {
			if (res.ID === marker.id) {
				const values = indexValue(res);
				const zoneColor = zoneColorNoise(res);
				const colorUV = uvColor(res.UV);

				content = infowindowPartial(
					qhawax,
					zoneColor,
					values,
					company,
					marker,
					colorUV
				);
				infoWindow.setContent(content);
				const infograph = document.querySelectorAll(
					'.infowindow-graph'
				);

				infograph.forEach(ig =>
					ig.addEventListener('click', e => {
						const qhawax_id = e.target.dataset.infograph;
						const qhawax_sensor = e.target.dataset.label;
						drawChart(qhawax_sensor, qhawax_id);
					})
				);
			}
		});
	} else {
		socket.on('new_data_summary_valid', res => {
			if (res.ID === marker.id) {
				const values = indexValue(res);
				const zoneColor = zoneColorNoise(res);
				const colorUV = uvColor(res.UV);

				fetch(
					'https://qairamapnapi-dev-opensource.qairadrones.com/api/last_gas_inca_data/'
				)
					.then(res => res.json())
					.then(qhawax_inca_list => {
						qhawax_inca_list.forEach(qhawax_inca => {
							if (qhawax_inca.qhawax_name === res.ID) {
								const qhawax_sensor_color = airQuality(
									qhawax_inca
								);

								content = infowindowComplete(
									qhawax,
									zoneColor,
									values,
									qhawax_sensor_color,
									qhawax_inca,
									company,
									marker,
									colorUV
								);
								infoWindow.setContent(content);
								const infograph = document.querySelectorAll(
									'.infowindow-graph'
								);

								infograph.forEach(ig =>
									ig.addEventListener('click', e => {
										const qhawax_id =
											e.target.dataset.infograph;
										const qhawax_sensor =
											e.target.dataset.label;

										drawChart(qhawax_sensor, qhawax_id);
									})
								);
							}
						});
					});
			}
		});
	}

	infoWindow.open(map, marker);
	google.maps.event.addListener(map, 'click', () => {
		infoWindow.close(map, marker);
	});
};

const drawQhawaxMap = (map, qhawax, company) => {
	const previous_marker_index = map.markers.findIndex(
		marker => marker.id === qhawax.name
	);

	if (previous_marker_index != -1) {
		map.markers[previous_marker_index].setMap(null);
		map.markers.splice(previous_marker_index, 1);
	}

	const qhawax_marker = new google.maps.Marker({
		position: {
			lat: qhawax.lat,
			lng: qhawax.lon,
		},
		map: map,
		icon: {
			url: qhawaxLeaf(qhawax.main_inca, qhawax.name),
			scaledSize: new google.maps.Size(35, 35),
		},
		id: qhawax.name,
	});
	const infoWindow = new google.maps.InfoWindow();
	qhawax_marker.addListener('click', () => {
		setQhawaxInfowindow(map, qhawax_marker, infoWindow, qhawax, company);
	});

	map.markers.push(qhawax_marker);
};

const optionsDatePicker = {
    format: 'dd-mm-yyyy',
	i18n: {
		months: [
			'Enero',
			'Febrero',
			'Marzo',
			'Abril',
			'Mayo',
			'Junio',
			'Julio',
			'Agosto',
			'Septiembre',
			'Octubre',
			'Noviembre',
			'Diciembre',
		],
		monthsShort: [
			'Ene',
			'Feb',
			'Mar',
			'Abr',
			'May',
			'Jun',
			'Jul',
			'Ago',
			'Set',
			'Oct',
			'Nov',
			'Dic',
		],
		weekdays: [
			'Domingo',
			'Lunes',
			'Martes',
			'Miércoles',
			'Jueves',
			'Viernes',
			'Sábado',
		],
		weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
		weekdaysAbbrev: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
		selectMonths: true,
		cancel: 'Cancelar',
		clear: 'Limpiar',
		today: 'hoy',
		done: 'Ok',
	},
};

const optionsTimePicker = {
	i18n: {
		cancel: 'Cancelar',
		done: 'Ok',
	},
	twelveHour: false,
	vibrate: false,
};
export {
	drawQhawaxMap,
	drawChart,
	airQuality,
	qhawaxLeaf,
	zoneColorNoise,
	indexValue,
	setQhawaxInfowindow,
	uvColor,
	ECAlimits,
	addZero,
	optionsDatePicker,
	optionsTimePicker
};
