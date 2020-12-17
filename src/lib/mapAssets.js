import { configuration} from '../lib/graphAssets.js';
import {APISource, SocketSource} from '../index.js';
import { requestAverageMeasurement} from '../requests/get.js';
import { pannelInca, pannelMeteo, pannelRealTime, pannelGraphics, infowindow } from '../lib/HtmlComponents.js';

const addZero = i => {
	if (i < 10) {
		i = '0' + i;
	}
	return i;
};
const formatDateDB = timestamp => addZero(new Date(Date.parse(timestamp)).getHours()) + 'h';
	



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
		title: `${qhawax_id}: Concentration of ${sensor}<br> from the last 24 hours <sub>(µg/m3)</sub>`,
		showlegend: true,
		colorway: ['#0000FF', '#FF0000'],
		legend:{
			orientation:'h',
			y:window.innerWidth >= 800? -0.1:2,
				},
		xaxis: {
			title: {
				text: 'Time of the day',
				font: {
					family: 'Courier New, monospace',
					size: 12,
					color: '#7f7f7f',
				},
			},
		},
		yaxis: {
			title: {
				text: 'Concentration <sub>(µg/m3)</sub>',
				font: {
					family: 'Courier New, monospace',
					size: 12,
					color: '#7f7f7f',
				},
			},
		},
	};
	let data = [];
	const json = await requestAverageMeasurement(qhawax_id,sensor)
	let yValues = [];
	let xValues = [];
	let yECA = [];
	Object.entries(json).forEach(d => {
		yValues.push(d[1].sensor);
		xValues.push(formatDateDB(d[1].timestamp_zone));
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
				name: 'Limit ECA',
				type: 'scatter',
			}),
		];
	});

	Plotly.newPlot(chart, data, layout, configuration);
};


const qualityColor ={
	good:{color: '#009966',label: 'Good' },
	moderate:{color: '#ffde33',label: 'Moderate'},
	bad:{color: '#ff9933',label: 'Bad'},
	hazardous:{color: '#cc0033',label: 'Danger' },
	noinfo:{color: 'transparent',label: '' }
}

const airQuality = data => {
	let sensors = {
		PM10:null, SO2:null, CO:null, H2S:null, PM25:null, O3:null, NO2:null
	}
	Object.entries(sensors).forEach(([key, value]) => sensors[key]=data[key]);

	const time =addZero(new Date(data.timestamp_zone).getHours()) + ':' + addZero(new Date(data.timestamp_zone).getMinutes());
	const limits = {
		PM10:[0,50,100,167],
		SO2:[0,50,100,625],
		CO:[0,50,100,150],
		H2S:[0,50,100,1000],
		PM25:[0,50,100,500],
		O3:[0,50,100,175],
		NO2:[0,50,100,150]
	}
	let result={}
		Object.entries(sensors).forEach(([keyS, valueS]) => {
			result[keyS] = 
			(valueS >= limits[keyS][0]) && (valueS <= limits[keyS][1])
			? qualityColor.good
			: valueS > limits[keyS][1] && valueS <= limits[keyS][2]
			? qualityColor.moderate
			: valueS > limits[keyS][2] && valueS <= limits[keyS][3]
			? qualityColor.bad
			: valueS > limits[keyS][3]
			? qualityColor.hazardous
			: qualityColor.noinfo
			if (valueS===null){result[keyS]=qualityColor.noinfo}
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

const qairito = inca => {
	let gif = '';
	switch (inca) {
		case 50: gif = {q:'/img/qairito/qairito_buena.gif',b:'/img/backgrounds/qairito_green.png'};
			break;
		case 100: gif = {q:'/img/qairito/qairito_moderada.gif',b:'/img/backgrounds/qairito_yellow.png'};
			break;
		case 500: gif = {q:'/img/qairito/qairito_mala.gif',b:'/img/backgrounds/qairito_orange.png'};
			break;
		case 600: gif = {q:'/img/qairito/qairito_cuidado.gif',b:'/img/backgrounds/qairito_red.png'};
			break;
	}
	return gif;
};

const noiseLimits = {
	'Zona de Protección Especial':{day:50, night:40},
	'Zona Residencial':{day:60, night:50},
	'Zona Comercial':{day:70, night:60},
	'Zona Industrial':{day:80, night:70},
}
const zoneColorNoise = data =>{
	const newDate = new Date(data.timestamp);
	let colorData = {color:'transparent', zone:data.zone}
	const day = newDate.getHours() <= 22 &&  newDate.getHours() >= 7;
	const good = '#009966';
	const bad = '#cc0033';
	
	Object.entries(noiseLimits).forEach(([key, value]) => {
		if (key===data.zone&&day) {
			data.spl<=value.day?colorData.color=good:colorData.color=bad;
		}else if(key===data.zone&&!day) {
			data.spl<=value.night?colorData.color=good:colorData.color=bad;
		}
	});
	return colorData;
};

const uvColors = {
	Null:{color:'transparent',label:''},
	Minimum: { color: '#009966', label: 'Minimum' },
	Low: { color: '#ffde33', label: 'Low' },
	Moderate: { color: '#ff9933', label: 'Moderate' },
	High: { color: '#cc0033', label: 'High' },
	Extreme: { color: 'darkmagenta', label: 'Extreme' },
  
  };
  const uvColor = (uvValue) => (
	  uvValue===null?uvColors.Null:
	  uvValue >= 0 && uvValue < 2
	? uvColors.Minimum
	: uvValue >= 2 && uvValue < 6
	  ? uvColors.Low
	  : uvValue >= 6 && uvValue < 8
		? uvColors.Moderate
		: uvValue >= 8 && uvValue < 11
		  ? uvColors.High
		  : uvColors.Extreme);

let incaResult = {
	CO:null,
	H2S:null,
	NO2:null,
	O3:null,
	PM10:null,
	PM25:null,
	SO2:null,
}
const incaValues=(inca)=>{
	inca.qhawax_name==='qH010' ? inca.O3=null : inca.O3;
	inca.qhawax_name==='qH008' ? inca.NO2=null : inca.NO2;
	inca.qhawax_name==='qH007' ? inca.SO2=null : inca.SO2;

	incaResult.PM10 =inca.PM10===null?'__': inca.PM10;
	incaResult.SO2 =inca.SO2===null?'__': inca.SO2;
	incaResult.CO =inca.CO===null?'__': inca.CO;
	incaResult.H2S =inca.H2S===null?'__': inca.H2S;
	incaResult.PM25 =inca.PM25===null?'__': inca.PM25;
	incaResult.O3 =inca.O3===null?'__': inca.O3;
	incaResult.NO2 =inca.NO2===null?'__': inca.NO2;
	return incaResult;
}


const ejemploMeteo = {
	spl:'__',
	temperature:'__',
	pressure:'__',
	humidity:'__',
	UV:'__'
}


const ejemploRT = {
	CO_ug_m3:'__',
    NO2_ug_m3:'__',
    O3_ug_m3:'__',
    H2S_ug_m3:'__',
	SO2_ug_m3:'__',
	PM25:'__',
	PM10:'__'
}

const setPannelData = (qhawax, map) => {
	const pannelAll= document.getElementById('over_map_infowindow')
	const overMap = document.getElementById('over_map');
	const overMapQ = document.getElementById('over_map_qairito');
	overMapQ.classList.remove('none')
	overMap.classList.add('none')
	fetch(`${APISource}last_gas_inca_data/`)
		.then(res => res.json())
		.then(qhawax_inca_list => {
			qhawax_inca_list.forEach(qhawax_inca => {
				if (qhawax.name===qhawax_inca.qhawax_name) {
					pannelAll.classList.remove('none')
					pannelAll.innerHTML=infowindow(qhawax)
					overMapQ.innerHTML=`<div id="qairito-back" style="background-image: url(${qairito(qhawax.main_inca).b});"><img id="qairito-back-img" src="${qairito(qhawax.main_inca).q}" alt=""></img></div>`
					const tabs = document.querySelector('.tabs')
					M.Tabs.init(tabs);
						const INCA = document.getElementById('test1')
						const REALT = document.getElementById('test2')
						const METEO = document.getElementById('test3')
						const GRAPHS = document.getElementById('test4')
						INCA.innerHTML = pannelInca(incaValues(qhawax_inca),airQuality(qhawax_inca))
						GRAPHS.innerHTML = pannelGraphics(qhawax)
						const infoGraph = document.querySelectorAll('.infowindow-graph');
						infoGraph.forEach(ig=>{
							ig.addEventListener('click', e=>{
							const qhawax_id = e.target.dataset.infograph;
							const qhawax_sensor = e.target.dataset.label;
							drawChart(qhawax_sensor, qhawax_id);
							})
						})
						REALT.innerHTML = pannelRealTime(ejemploRT)
						METEO.innerHTML = pannelMeteo({color:'#fff',zone:''},ejemploMeteo,{color:'#fff',label:''})
						const socket = io.connect(`${SocketSource}`);
						socket.on(qhawax.name, data =>{
						REALT.innerHTML = pannelRealTime(data);
						METEO.innerHTML = pannelMeteo(zoneColorNoise(data),data,uvColor(data.UV))
					})
				}
			})
		})
		google.maps.event.addListener(map, 'click', () => {
			pannelAll.setAttribute('class','none')
			overMap.classList.remove('none')
			overMapQ.classList.add('none')
		});
}

const setInfowindow = (qhawax, map)=>{
	switch (qhawax.main_inca) {
		case -1:M.toast({
			html: `${qhawax.comercial_name}: Module ${qhawax.name} Off.`,
			classes: 'grey darken-1 rounded',
			displayLength: 6000,
		}); break;
		case 0:M.toast({
			html: `${qhawax.comercial_name}: Module ${qhawax.name} waiting for valid data.`,
			classes: 'grey darken-1 rounded',
			displayLength: 6000,
		}); break;
		case 1:M.toast({
			html: `${qhawax.comercial_name}: Module ${qhawax.name} waiting for average data.`,
			classes: 'grey darken-1 rounded',
			displayLength: 6000,
		}); break;
		case -2:M.toast({
			html: `${qhawax.comercial_name}: Module ${qhawax.name} in maintenance.`,
			classes: 'grey darken-1 rounded',
			displayLength: 6000,
		}); break;
		case 50: case 100: case 500: case 600:setPannelData(qhawax,map); break;
		default: M.toast({
			html: `Failed to get data.`,
			classes: 'grey darken-1 rounded',
			displayLength: 6000,
		}); break;
	}
}
const drawQhawaxMap = (map, qhawax, company) => {
	const previous_marker_index = map.markers.findIndex(
		marker => marker.id === qhawax.name
	);
	map.addListener('zoom_changed', () => {
		if (map.zoom >= 0 && map.zoom < 11) {
			map.markers.forEach(marker => {
				marker.icon.scaledSize.width = 45;
				marker.icon.scaledSize.height = 45;
			});
		} else if (map.zoom >= 11 && map.zoom < 14) {
			map.markers.forEach(marker => {
				marker.icon.scaledSize.width = 50;
				marker.icon.scaledSize.height = 50;
			});
		} else if (map.zoom >= 14) {
			map.markers.forEach(marker => {
				marker.icon.scaledSize.width = 70;
				marker.icon.scaledSize.height = 70;
			});
		}
	});

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
			url: qhawaxLeaf(qhawax.main_inca),
			scaledSize: new google.maps.Size(35, 35),
		},
		id: qhawax.name,
	});
	qhawax_marker.addListener('click', () => {
		setInfowindow(qhawax, map)
	});
	qhawax_marker.addListener('mouseover', () => {
		M.Toast.dismissAll();
		M.toast({
			html: `${qhawax_marker.id}: "${qhawax.comercial_name}"`,
			classes: 'green darken-1 rounded',
			displayLength: 4000,
		});
		
	});

	
	
	
	map.markers.push(qhawax_marker);
	map.latitude.push(qhawax.lat);
	map.longitude.push(qhawax.lon);
	
		
	const filteredLat = map.latitude.filter((value, index, arr)=>{ return value !== 0;});
	const filteredLng = map.longitude.filter((value, index, arr)=>{ return value !== 0;});

	const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
		map.setCenter({
		lat: average(filteredLat),
		lng: average(filteredLng),
	});
	
};

const zoomByCompany = company => {
	switch (company) {
		case 0:case 1:case 3:case 8:case 14: return 12;
		default: return 14;
	}
};

const optionsDatePicker = {
    format: 'mm-dd-yyyy',
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
	zoomByCompany,
	drawChart,
	airQuality,
	qhawaxLeaf,
	zoneColorNoise,
	uvColor,
	optionsDatePicker,
	optionsTimePicker,
	addZero
};


// import { infowindowComplete, infowindowPartial } from './infowindows.js';
// import { requestAverageMeasurement } from '../requests/get.js';
// import { configuration } from './graphAssets.js';

// const months = [
//   'Enero',
//   'Febrero',
//   'Marzo',
//   'Abril',
//   'Mayo',
//   'Junio',
//   'Julio',
//   'Agosto',
//   'Septiembre',
//   'Octubre',
//   'Noviembre',
//   'Diciembre',
// ];

// const addZero = i => {
// 	if (i < 10) {
// 		i = '0' + i;
// 	}
// 	return i;
// };

// const formatDateDB = timestamp => addZero(new Date(Date.parse(timestamp)).getHours()) + 'h';

// const ECAlimits = (sensor) => {
//   switch (sensor) {
//   case 'CO':
//     return 10000;
//   case 'NO2': case 'O3': case 'PM10':
//     return 100;
//   case 'H2S':
//     return 150;
//   case 'SO2':
//     return 250;
//   case 'PM25':
//     return 50;
//   default:
//     break;
//   }
// };
// const drawChart = async(sensor, qhawaxId) => {
//   const chart = document.querySelector('#graphicValues');
//   const layout = {
//     autosize: false,
//     width:
//     window.innerWidth >= 800 ? window.innerWidth * 0.5 : window.innerWidth * 0.85,
//     height: window.innerHeight * 0.6,
//     title: `${qhawax_id}: Concentration of ${sensor}<br> from the last 24 hours <sub>(µg/m3)</sub>`,
//     showlegend: true,
//     colorway: ['#0000FF', '#FF0000'],
//     legend:{
// 			orientation:'h',
// 			y:window.innerWidth >= 800? -0.1:2,
// 				},
//     xaxis: {
//       title: {
//         text: 'Time',
//         font: {
//           family: 'Courier New, monospace',
//           size: 12,
//           color: '#7f7f7f',
//         },
//       },
//     },
//     yaxis: {
//       title: {
//         text: 'Concentration <sub>(µg/m3)</sub>',
//         font: {
//           family: 'Courier New, monospace',
//           size: 12,
//           color: '#7f7f7f',
//         },
//       },
//     },
//   };
//   let data = [];

//   const json = await requestAverageMeasurement(qhawaxId, sensor);

//   const yValues = [];
//   const xValues = [];
//   const yECA = [];
//   Object.entries(json).forEach((d) => {
//     yValues.push(d[1].sensor);
//     xValues.push(formatDateDB(d[1].timestamp));
//     yECA.push(ECAlimits(sensor));
//     let trace1 = {};
//     let trace2 = {};
//     data = [
//       (trace1 = {
//         y: yValues,
//         x: xValues,
//         name: `${sensor} (µg/m3)`,
//         type: 'scatter',
//       }),
//       (trace2 = {
//         y: yECA,
//         x: xValues,
//         name: 'Límite ECA',
//         type: 'scatter',
//       }),
//     ];
//   });

//   Plotly.newPlot(chart, data, layout, configuration);
// };

// const qualityColor = {
//   good: { color: '#009966', label: 'Good' },
//   moderate: { color: '#ffde33', label: 'Moderate' },
//   bad: { color: '#ff9933', label: 'Bad' },
//   hazardous: { color: '#cc0033', label: 'Danger' },
//   noinfo: { color: 'transparent', label: '' },
// };
// const limits = {
//   PM10: [0, 50, 100, 167],
//   SO2: [0, 50, 100, 625],
//   CO: [0, 50, 100, 150],
//   H2S: [0, 50, 100, 1000],
//   PM25: [0, 50, 100, 500],
//   O3: [0, 50, 100, 175],
//   NO2: [0, 50, 100, 150],
// };
// const airQuality = (data) => {
//   const sensors = {
//     PM10: null, SO2: null, CO: null, H2S: null, PM25: null, O3: null, NO2: null,
//   };
//   Object.entries(sensors).forEach(([key]) => { sensors[key] = data[key]; });
//   const time = addZero(new Date(data.timestamp).getHours())+':' + addZero(new Date(data.timestamp).getMinutes());
//   const result = {
//     PM10: null, SO2: null, CO: null, H2S: null, PM25: null, O3: null, NO2: null,
//   };
//   Object.entries(sensors).forEach(([keyS, valueS]) => {
//     result[keyS] = valueS >= limits[keyS][0] && valueS <= limits[keyS][1]
//       ? qualityColor.good
//       : valueS > limits[keyS][1] && valueS <= limits[keyS][2]
//         ? qualityColor.moderate
//         : valueS > limits[keyS][2] && valueS <= limits[keyS][3]
//           ? qualityColor.bad
//           : valueS > limits[keyS][3]
//             ? qualityColor.hazardous
//             : qualityColor.noinfo;
//   });
//   return {
//     time,
//     result,
//   };
// };

// const qhawaxLeaf = (inca) => {
//   let leaf = '';
//   switch (inca) {
//   case -1: case null: leaf = '/img/leafs/leaf_out_of_service.png';
//     break;
//   case -3: case -2: case 1: case 0: leaf = '/img/leafs/leaf_helmet.png';
//     break;
//   case 50: leaf = '/img/leafs/leaf_inca_good.png';
//     break;
//   case 100: leaf = '/img/leafs/leaf_inca_moderate.png';
//     break;
//   case 500: leaf = '/img/leafs/leaf_inca_bad.png';
//     break;
//   case 600: leaf = '/img/leafs/leaf_inca_hazardous.png';
//     break;
//   default: leaf = '/img/leafs/leaf_out_of_service.png';
//     break;
//   }
//   return leaf;
// };
// const noiseLimits = {
//   'Zona de Protección Especial': { day: 50, night: 40 },
//   'Zona Residencial': { day: 60, night: 50 },
//   'Zona Comercial': { day: 70, night: 60 },
//   'Zona Industrial': { day: 80, night: 70 },
// };
// const zoneColorNoise = (data) => {
//   const newDate = new Date(data.timestamp);
//   const colorData = { color: null, zone: data.zone };
//   const day = newDate.getHours() <= 22 && newDate.getHours() >= 7;
//   const good = '#009966';
//   const bad = '#cc0033';

//   Object.entries(noiseLimits).forEach(([key, value]) => {
//     if (key === data.zone && day) {
//       data.spl <= value.day ? colorData.color = good : colorData.color = bad;
//     } else if (key === data.zone && !day) {
//       data.spl <= value.night ? colorData.color = good : colorData.color = bad;
//     }
//   });
//   return colorData;
// };

// const uvColors = {
//   Minimum: { color: '#009966', label: 'Minimum' },
//   Low: { color: '#ffde33', label: 'Low' },
//   Moderate: { color: '#ff9933', label: 'Moderate' },
//   High: { color: '#cc0033', label: 'High' },
//   Extreme: { color: 'darkmagenta', label: 'Extreme' },

// };
// const uvColor = (uvValue) => (uvValue >= 0 && uvValue < 3
//   ? uvColors.Minimum
//   : uvValue >= 3 && uvValue < 6
//     ? uvColors.Low
//     : uvValue >= 6 && uvValue < 8
//       ? uvColors.Moderate
//       : uvValue >= 8 && uvValue < 11
//         ? uvColors.High
//         : uvColors.Extreme);

// const indexResult = {
//   lat: null,
//   lng: null,
//   UV: null,
//   spl: null,
//   time: null,
//   PM1: null,
//   humidity: null,
//   pressure: null,
//   temperature: null,
//   PM10: null,
//   SO2: null,
//   CO: null,
//   H2S: null,
//   PM25: null,
//   O3: null,
//   NO2: null,
// };

// const indexValue = (data) => {
//   const newDate = new Date(data.timestamp);
//   indexResult.lat = data.lat.toFixed(5);
//   indexResult.lng = data.lon.toFixed(5);
//   indexResult.UV = Number(data.UV.toFixed(1));
//   indexResult.spl = Number(data.spl.toFixed(1));
//   indexResult.time = newDate.getDate() +' de ' +months[newDate.getMonth()] +' de ' +newDate.getFullYear() +', ' +	newDate.getHours() +':' +newDate.getMinutes();
//   indexResult.PM1 = Number(data.PM1);
//   indexResult.humidity = Number(data.humidity.toFixed(1));
//   indexResult.pressure = Number((data.pressure / 1000).toFixed(1));
//   indexResult.temperature = Number(data.temperature.toFixed(1));
//   indexResult.PM10 = Number(data.PM10.toFixed(1));
//   indexResult.SO2 = Number(data.SO2.toFixed(1));
//   indexResult.CO = Number(data.CO.toFixed(1));
//   indexResult.H2S = Number(data.H2S.toFixed(1));
//   indexResult.PM25 = Number(data.PM25.toFixed(1));
//   indexResult.O3 = Number(data.O3.toFixed(1));
//   indexResult.NO2 = Number(data.NO2.toFixed(1));
//   return indexResult;
// };

// const valuesInfo = (res) => ({
//   values: indexValue(res),
//   zoneColor: zoneColorNoise(res),
//   colorUV: uvColor(res.UV),
// });
// const setQhawaxInfowindow = (map, marker, infoWindow, qhawax) => {
//   const socket = io.connect('https://qairamapnapi.qairadrones.com/');

//   let content = 'Loading...';
//   infoWindow.setContent(content);
//   if (qhawax.main_inca === -1) {
//     content = `Module ${qhawax.name} OFF.`;
//     infoWindow.setContent(content);
//   } else if (qhawax.main_inca === -2) {
//     content = `Module ${qhawax.name} in Calibration.`;
//     infoWindow.setContent(content);
//   } else if (qhawax.main_inca === 0) {
//     content = `Module ${qhawax.name} waiting for valid data.`;
//     infoWindow.setContent(content);
//   } else if (qhawax.main_inca === 1) {
//     socket.on('new_data_summary_valid', (res) => {
//       if (res.ID === marker.id) {
//         const values = indexValue(res);
//         const zoneColor = zoneColorNoise(res);
//         const colorUV = uvColor(res.UV);

//         content = infowindowPartial(
//           qhawax,
//           zoneColor,
//           values,
//           marker,
//           colorUV,
//         );
//         infoWindow.setContent(content);
//         const infograph = document.querySelectorAll(
//           '.infowindow-graph',
//         );

//         infograph.forEach((ig) => ig.addEventListener('click', (e) => {
//           const qhawaxId = e.target.dataset.infograph;
//           const qhawaxSensor = e.target.dataset.label;
//           drawChart(qhawaxSensor, qhawaxId);
//         }));
//       }
//     });
//   } else {
//     socket.on('new_data_summary_valid', (res) => {
//       if (res.ID === marker.id) {
//         fetch(
//           'https://qairamapnapi-dev-opensource.qairadrones.com/api/last_gas_inca_data/',
//         )
//           .then((res) => res.json())
//           .then((qhawaxIncaList) => {
//             qhawaxIncaList.forEach((qhawaxInca) => {
//               if (qhawaxInca.qhawax_name === res.ID) {
//                 const qhawaxSensorColor = airQuality(
//                   qhawaxInca,
//                 );

//                 content = infowindowComplete(
//                   qhawax,
//                   qhawaxSensorColor,
//                   qhawaxInca,
//                   marker,
//                   valuesInfo(res),
//                 );
//                 infoWindow.setContent(content);
//                 const infograph = document.querySelectorAll(
//                   '.infowindow-graph',
//                 );

//                 infograph.forEach((ig) => ig.addEventListener('click', (e) => {
//                   const qhawaxId = e.target.dataset.infograph;
//                   const qhawaxSensor = e.target.dataset.label;

//                   drawChart(qhawaxSensor, qhawaxId);
//                 }));
//               }
//             });
//           });
//       }
//     });
//   }

//   infoWindow.open(map, marker);
//   google.maps.event.addListener(map, 'click', () => {
//     infoWindow.close(map, marker);
//   });
// };

// const drawQhawaxMap = (map, qhawax) => {
//   const previousMarkerIndex = map.markers.findIndex(
//     (marker) => marker.id === qhawax.name,
//   );

//   if (previousMarkerIndex !== -1) {
//     map.markers[previousMarkerIndex].setMap(null);
//     map.markers.splice(previousMarkerIndex, 1);
//   }

//   const qhawaxMarker = new google.maps.Marker({
//     position: {
//       lat: qhawax.lat,
//       lng: qhawax.lon,
//     },
//     map,
//     icon: {
//       url: qhawaxLeaf(qhawax.main_inca, qhawax.name),
//       scaledSize: new google.maps.Size(35, 35),
//     },
//     id: qhawax.name,
//   });
//   const infoWindow = new google.maps.InfoWindow();
//   qhawaxMarker.addListener('click', () => {
//     setQhawaxInfowindow(map, qhawaxMarker, infoWindow, qhawax);
//   });

//   map.markers.push(qhawaxMarker);
// };

// const optionsDatePicker = {
//   format: 'dd-mm-yyyy',
//   i18n: {
//     months: [
//       'Enero',
//       'Febrero',
//       'Marzo',
//       'Abril',
//       'Mayo',
//       'Junio',
//       'Julio',
//       'Agosto',
//       'Septiembre',
//       'Octubre',
//       'Noviembre',
//       'Diciembre',
//     ],
//     monthsShort: [
//       'Ene',
//       'Feb',
//       'Mar',
//       'Abr',
//       'May',
//       'Jun',
//       'Jul',
//       'Ago',
//       'Set',
//       'Oct',
//       'Nov',
//       'Dic',
//     ],
//     weekdays: [
//       'Domingo',
//       'Lunes',
//       'Martes',
//       'Miércoles',
//       'Jueves',
//       'Viernes',
//       'Sábado',
//     ],
//     weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
//     weekdaysAbbrev: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
//     selectMonths: true,
//     cancel: 'Cancelar',
//     clear: 'Limpiar',
//     today: 'hoy',
//     done: 'Ok',
//   },
// };

// const optionsTimePicker = {
//   i18n: {
//     cancel: 'Cancelar',
//     done: 'Ok',
//   },
//   twelveHour: false,
//   vibrate: false,
// };
// export {
//   drawQhawaxMap,
//   drawChart,
//   airQuality,
//   qhawaxLeaf,
//   zoneColorNoise,
//   indexValue,
//   setQhawaxInfowindow,
//   uvColor,
//   ECAlimits,
//   addZero,
//   optionsDatePicker,
//   optionsTimePicker,
// };
