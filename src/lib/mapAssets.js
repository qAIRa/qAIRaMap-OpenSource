import { configuration} from '../lib/graphAssets.js';
import {APISource, socket} from '../index.js';
import { requestAverageMeasurement} from '../requests/get.js';
import { 
	addZero,
    elementMeteo,
    elementRT,
    incaResult,
    uvColors,
    noiseLimits,
	qualityColor,
	sensors,
	limits,
	toast
 } from '../lib/helpers.js';
 import { format } from 'date-fns';
import { pannelInca, pannelMeteo, pannelRealTime, pannelGraphics, infowindow } from '../html/infowindow.js';

const firstMap =(element, containerID) => new google.maps.Map(element.querySelector(`#${containerID}`), {
	mapTypeId: google.maps.MapTypeId.ROADMAP,
	center: { lat: -12.1215361, lng: -77.0463574},
	zoom: 8,
	markers:[],
	latitude:[],
	longitude:[],
	infowindows:[]
  });


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
		xValues.push(format(new Date(d[1].timestamp_zone), 'HH')+'H');
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

const airQuality = data => {	
	Object.entries(sensors).forEach(([key, value]) => sensors[key]=data[key]);
	const time =addZero(new Date(data.timestamp_zone).getHours()) + ':' + addZero(new Date(data.timestamp_zone).getMinutes());
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
	return {time,result};
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

const incaValues=(inca)=>{
	Object.entries(inca).forEach(o=>{
		incaResult[o[0]]===undefined?'__':incaResult[o[0]]=o[1];
		});
	return incaResult;
};

const setPannelData = (qhawax, map) => {
	const pannelAll= document.getElementById('over_map_infowindow')
	const overMap = document.getElementById('over_map');
	const overMapQ = document.getElementById('over_map_qairito');
	overMapQ.classList.remove('none')
	overMap.classList.add('none')
	fetch(`${APISource}last_gas_inca_data/`)
		.then(res => res.json())
		.catch(e=>null)
		.then(qhawax_inca_list => {
			qhawax_inca_list.forEach(qhawax_inca => {
				if (qhawax.name===qhawax_inca.qhawax_name) {
					pannelAll.classList.remove('none')
					pannelAll.innerHTML=`<p>${qhawax.name}: ${qhawax.comercial_name}</p>`+infowindow;
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
						REALT.innerHTML = pannelRealTime(elementRT)
						METEO.innerHTML = pannelMeteo({color:'#fff',zone:''},elementMeteo,{color:'#fff',label:''})
						socket.on(qhawax.name, data =>{
						REALT.innerHTML = pannelRealTime(data);
						METEO.innerHTML = pannelMeteo(zoneColorNoise(data),data,uvColor(data.UV))
					})
				}
			})
		})
		.catch(e=>null)
		google.maps.event.addListener(map, 'click', () => {
			pannelAll.setAttribute('class','none')
			overMap.classList.remove('none')
			overMapQ.classList.add('none')
		});
};

const setInfowindow = (qhawax, map)=>{
	const html = `${qhawax.comercial_name}: Module ${qhawax.name}`;
	const classes ='grey darken-1 rounded';
	switch (qhawax.main_inca) {
		case -1:html+= ` Off.`; 
		case  0:html+= ` waiting for valid data.`; 
		case  1:html+= ` waiting for average data.`; 
		case -2:html+= ` in maintenance.`;
		case 50: case 100: case 500: case 600:setPannelData(qhawax,map);break;
		default:html= ` Failed to get data.`; 
		return toast(html, classes);
	}
};

const markerZoom = (zoom) =>{
		switch(true){
			case zoom < 11: return 45;
			case zoom >= 11 && zoom < 14: return 50;
			case zoom >= 14:return 70;
			default: break;
		}
};

const drawQhawaxMap = (map, qhawax) => {
	const previous_marker_index = map.markers.findIndex(
		marker => marker.id === qhawax.name
	);
	map.addListener('zoom_changed', () => {
		const zoom = map.getZoom();
		map.markers.forEach(marker => {
			marker.icon.scaledSize.width = markerZoom(zoom);
			marker.icon.scaledSize.height = markerZoom(zoom);
		});
		
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
		toast(`${qhawax_marker.id}: "${qhawax.comercial_name}"`,'green darken-1 rounded')
	});

	
	map.markers.push(qhawax_marker);

	const bounds = new google.maps.LatLngBounds();
	map.markers.forEach(m=> bounds.extend(m.getPosition()))
	map.fitBounds(bounds);
	const zoom = map.getZoom();
	map.setZoom(zoom > 13 ? 13 : zoom);
};


export {
	drawQhawaxMap,
	drawChart,
	airQuality,
	qhawaxLeaf,
	zoneColorNoise,
	uvColor,
	ECAlimits,
	qairito,
	incaValues,
	setPannelData,
	setInfowindow,
	firstMap
};

