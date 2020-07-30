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
const airQuality = data => {
	const PM10 = data.PM10;
	const SO2 = data.SO2;
	const CO = data.CO;
	const H2S = data.H2S;
	const PM25 = data.PM25;
	const O3 = data.O3;
	const NO2 = data.NO2;
	const UV = data.UV;

	const newDate = new Date(data.timestamp);

	const time =
		addZero(newDate.getHours()) + ':' + addZero(newDate.getMinutes());

	const qPM10 =
		PM10 >= 0 && PM10 <= 50
			? {
					color: 'green',
					label: 'Buena',
			  }
			: PM10 > 50 && PM10 <= 100
			? {
					color: 'yellow',
					label: 'Moderada',
			  }
			: PM10 > 100 && PM10 <= 167
			? {
					color: 'orange',
					label: 'Mala',
			  }
			: PM10 > 167
			? {
					color: 'red',
					label: 'Cuidado',
			  }
			: {
					color: 'transparent',
					label: '',
			  };

	const qSO2 =
		SO2 >= 0 && SO2 <= 50
			? {
					color: 'green',
					label: 'Buena',
			  }
			: SO2 > 50 && SO2 <= 100
			? {
					color: 'yellow',
					label: 'Moderada',
			  }
			: SO2 > 100 && SO2 <= 625
			? {
					color: 'orange',
					label: 'Mala',
			  }
			: SO2 > 625
			? {
					color: 'red',
					label: 'Cuidado',
			  }
			: {
					color: 'transparent',
					label: '',
			  };

	const qCO =
		CO >= 0 && CO <= 50
			? {
					color: 'green',
					label: 'Buena',
			  }
			: CO > 50 && CO <= 100
			? {
					color: 'yellow',
					label: 'Moderada',
			  }
			: CO > 100 && CO <= 150
			? {
					color: 'orange',
					label: 'Mala',
			  }
			: CO > 150
			? {
					color: 'red',
					label: 'Cuidado',
			  }
			: {
					color: 'transparent',
					label: '',
			  };

	const qH2S =
		H2S >= 0 && H2S <= 50
			? {
					color: 'green',
					label: 'Buena',
			  }
			: H2S > 50 && H2S <= 100
			? {
					color: 'yellow',
					label: 'Moderada',
			  }
			: H2S > 100 && H2S <= 1000
			? {
					color: 'orange',
					label: 'Mala',
			  }
			: H2S > 1000
			? {
					color: 'red',
					label: 'Cuidado',
			  }
			: {
					color: 'transparent',
					label: '',
			  };

	const qPM25 =
		PM25 >= 0 && PM25 <= 50
			? {
					color: 'green',
					label: 'Buena',
			  }
			: PM25 > 50 && PM25 <= 100
			? {
					color: 'yellow',
					label: 'Moderada',
			  }
			: PM25 > 100 && PM25 <= 500
			? {
					color: 'orange',
					label: 'Mala',
			  }
			: PM25 > 500
			? {
					color: 'red',
					label: 'Cuidado',
			  }
			: {
					color: 'transparent',
					label: '',
			  };

	const qO3 =
		O3 >= 0 && O3 <= 50
			? {
					color: 'green',
					label: 'Buena',
			  }
			: O3 > 50 && O3 <= 100
			? {
					color: 'yellow',
					label: 'Moderada',
			  }
			: O3 > 100 && O3 <= 175
			? {
					color: 'orange',
					label: 'Mala',
			  }
			: O3 > 175
			? {
					color: 'red',
					label: 'Cuidado',
			  }
			: {
					color: 'transparent',
					label: '',
			  };

	const qNO2 =
		NO2 >= 0 && NO2 <= 50
			? {
					color: 'green',
					label: 'Buena',
			  }
			: NO2 > 50 && NO2 <= 100
			? {
					color: 'yellow',
					label: 'Moderada',
			  }
			: NO2 > 100 && NO2 <= 150
			? {
					color: 'orange',
					label: 'Mala',
			  }
			: NO2 > 150
			? {
					color: 'red',
					label: 'Cuidado',
			  }
			: {
					color: 'transparent',
					label: '',
			  };

	const qUV =
		0 <= UV && UV < 3
			? 'green'
			: 3 <= UV && UV < 6
			? 'yellow'
			: 6 <= UV && UV < 9
			? 'orange'
			: 9 <= UV && UV < 12
			? 'red'
			: 12 <= UV && UV <= 14
			? 'orchid'
			: UV > 14
			? 'blueviolet'
			: 'transparent';

	const airColor =
		qPM10 === 'red' ||
		qSO2 === 'red' ||
		qCO === 'red' ||
		qH2S === 'red' ||
		qPM25 === 'red' ||
		qO3 === 'red' ||
		qNO2 === 'red'
			? 'red'
			: qPM10 === 'orange' ||
			  qSO2 === 'orange' ||
			  qCO === 'orange' ||
			  qH2S === 'orange' ||
			  qPM25 === 'orange' ||
			  qO3 === 'orange' ||
			  qNO2 === 'orange'
			? 'orange'
			: qPM10 === 'yellow' ||
			  qSO2 === 'yellow' ||
			  qCO === 'yellow' ||
			  qH2S === 'yellow' ||
			  qPM25 === 'yellow' ||
			  qO3 === 'yellow' ||
			  qNO2 === 'yellow'
			? 'yellow'
			: qPM10 === 'green' ||
			  qSO2 === 'green' ||
			  qCO === 'green' ||
			  qH2S === 'green' ||
			  qPM25 === 'green' ||
			  qO3 === 'green' ||
			  qNO2 === 'green'
			? 'green'
			: 'transparent';

	return {
		time,
		qPM10,
		qSO2,
		qCO,
		qH2S,
		qPM25,
		qO3,
		qNO2,
		qUV,
		airColor,
	};
};

const qhawaxLeaf = inca => {
	let leaf = '';
	inca === -1 || inca===null
		? (leaf =
				'/img/leafs/leaf_out_of_service.png')
		: inca === 0 || inca === 1 || inca === -2 ||inca === -3
		? (leaf =
				'/img/leafs/leaf_helmet.png')
		: inca === 50
		? (leaf =
				'/img/leafs/leaf_inca_good.png')
		: inca === 100
		? (leaf =
				'/img/leafs/leaf_inca_moderate.png')
		: inca === 500
		? (leaf =
				'/img/leafs/leaf_inca_bad.png')
		: inca === 600
		? (leaf =
				'/img/leafs/leaf_inca_hazardous.png')
		: (leaf = false);
	return leaf;
};

const zoneColorNoise = data =>{
	const newDate = new Date(data.timestamp);
	let colorData = {color:null, zone:data.zone}

	if (newDate.getHours() <= 22 &&  newDate.getHours() >= 7) {
		data.zone==='Zona de Protección Especial'&&data.spl <= 50? colorData.color='green':
		data.zone==='Zona Residencial'&&data.spl <= 60? colorData.color='green':
		data.zone==='Zona Comercial'&&data.spl <= 70? colorData.color='green':
		data.zone==='Zona Industrial'&&data.spl <= 80? colorData.color='green':colorData.color='red';
	} else {
		data.zone==='Zona de Protección Especial'&&data.spl <= 40? colorData.color='green':
		data.zone==='Zona Residencial'&&data.spl <= 50? colorData.color='green':
		data.zone==='Zona Comercial'&&data.spl <= 60? colorData.color='green':
		data.zone==='Zona Industrial'&&data.spl <= 70? colorData.color='green':colorData.color='red';
		
	}
	return colorData;
};


const uvColor = uvValue => {
	return uvValue >= 0 && uvValue < 3
		? {
				color: 'green',
				label: 'Mínimo',
		  }
		: uvValue >= 3 && uvValue < 6
		? {
				color: 'yellow',
				label: 'Bajo',
		  }
		: uvValue >= 6 && uvValue < 8
		? {
				color: 'orange',
				label: 'Moderado',
		  }
		: uvValue >= 8 && uvValue < 11
		? {
				color: 'red',
				label: 'Alto',
		  }
		: {
				color: 'darkmagenta',
				label: 'Extremo',
		  };
};

const indexValue = data => {
	const lat = data.lat.toFixed(5);
	const lng = data.lon.toFixed(5);
	const UV = Number(data.UV.toFixed(1));
	const spl = Number(data.spl.toFixed(1));

	const newDate = new Date(data.timestamp);

	const time =
		(newDate.getDate()-1) +
		' de ' +
		months[newDate.getMonth()] +
		' de ' +
		newDate.getFullYear() +
		', ' +
		(newDate.getHours()-5) +
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

	let content = 'Cargando...';
	infoWindow.setContent(content);
	if (qhawax.main_inca === -1) {
		content = `Módulo ${qhawax.name} Apagado.`;
		infoWindow.setContent(content);
	} else if (qhawax.main_inca === -2) {
		content = `Módulo ${qhawax.name} en Calibración.`;
		infoWindow.setContent(content);
	} else if (qhawax.main_inca === 0) {
		content = `Módulo ${qhawax.name} a la espera de data válida.`;
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
					'https://qairamapnapi-dev.qairadrones.com/api/last_gas_inca_data/'
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
	addZero
};
