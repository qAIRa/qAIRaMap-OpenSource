import {navBarClient} from '../lib/navBarClient.js';
import {viewBoard } from '../lib/HtmlComponents.js'
import { requestAllQhawax} from '../requests/get.js';
import { addZero} from '../lib/mapAssets.js';
const ppbToECAdash = sensor => {
	switch (sensor) {
		case 'CO':
			return { ECA: 10000 * 0.87, factor: 1.144919906 };
		case 'NO2':
			return { ECA: 100 * 0.532, factor: 1.880677075 };
		case 'O3':
			return { ECA: 100 * 0.51, factor: 1.962019118 };
		case 'H2S':
			return { ECA: 150 * 0.719, factor: 1.393033574 };
		case 'SO2':
			return { ECA: 250 * 0.382, factor: 2.618478014 };
		case 'PM25':
			return { ECA: 50, factor: 1 };
		case 'PM10':
			return { ECA: 100, factor: 1 };
		default:
			break;
	}
};

const indexValue = data => {
	const id = data.ID;

	const lat = data.lat.toFixed(5);
	const lng = data.lon.toFixed(5);
	const UV = Number(data.UV.toFixed(1));
	const spl = Number(data.spl.toFixed(1));

	const newDate = new Date(Date.parse(data.timestamp))
	const time =
		addZero(newDate.getHours()) +
		':' +
		addZero(newDate.getMinutes()) +
		':' +
		addZero(newDate.getSeconds());

	const PM1 = Number(data.PM1.toFixed(1));
	const humidity = Number(data.humidity).toFixed(1);
	const pressure = Number(data.pressure / 1000).toFixed(1);
	const temperature = Number(data.temperature).toFixed(1);

	const PM10 = Number((data.PM10 * ppbToECAdash('PM10').factor).toFixed(1));
	const SO2 = Number((data.SO2 * ppbToECAdash('SO2').factor).toFixed(1));
	const CO = Number((data.CO * ppbToECAdash('CO').factor).toFixed(1));
	const H2S = Number((data.H2S * ppbToECAdash('H2S').factor).toFixed(1));
	const PM25 = Number((data.PM25 * ppbToECAdash('PM25').factor).toFixed(1));
	const O3 = Number((data.O3 * ppbToECAdash('O3').factor).toFixed(1));
	const NO2 = Number((data.NO2 * ppbToECAdash('NO2').factor).toFixed(1));

	const UVcolor = UV === 0 ? 'red' : 'black';
	const PM1color = PM1 === 0 ? 'red' : 'black';
	const PM10color =
		PM10 === 0 || PM10 >= ppbToECAdash('PM10').ECA ? 'red' : 'black';
	const SO2color = SO2 === 0 || SO2 >= ppbToECAdash('SO2').ECA ? 'red' : 'black';
	const COcolor = CO === 0 || CO >= ppbToECAdash('CO').ECA ? 'red' : 'black';
	const H2Scolor = H2S === 0 || H2S >= ppbToECAdash('H2S').ECA ? 'red' : 'black';
	const PM25color =
		PM25 === 0 || PM25 >= ppbToECAdash('PM25').ECA ? 'red' : 'black';
	const O3color = O3 === 0 || O3 >= ppbToECAdash('O3').ECA ? 'red' : 'black';
	const NO2color = NO2 === 0 || NO2 >= ppbToECAdash('NO2').ECA ? 'red' : 'black';

	return {
		id,
		lat,
		lng,
		UV,
		UVcolor,
		spl,
		time,
		PM1,
		PM1color,
		humidity,
		pressure,
		temperature,
		PM10,
		PM10color,
		SO2,
		SO2color,
		CO,
		COcolor,
		H2S,
		H2Scolor,
		PM25,
		PM25color,
		O3,
		O3color,
		NO2,
		NO2color,
	};
};
const request = async (element,qhawax_asigned) => {
	//COMPANY
	const table_body = element.querySelector('tbody');
			 const qhawax_list = await requestAllQhawax();
			 
			 qhawax_list.forEach(q => qhawax_asigned.push(q));
		 
 
			 qhawax_asigned.forEach(q => {
				 const row_table = document.createElement('tr');
 
				 row_table.setAttribute('data-name', `${q.name}`);
				 table_body.appendChild(row_table);
 
				 let row_data = `
		   <td><strong>${q.name}</strong></td> 
		   <td>${q.comercial_name}</td> 
		   <td>-</td>
		   <td>-</td>
		   <td>-</td>
		   <td>-</td>
		   <td>-</td>
		   <td>-</td>
		   <td>-</td>
		   <td>-</td>
		   <td>-</td>
		   <td>-</td>
		   <td>-</td>
		   <td>-</td>
		   <td>-</td>
		   <td><i class="material-icons" style="color:gray">signal_wifi_off</i></td>
		   `;
				 row_table.innerHTML = row_data;
				 const socket = io.connect('https://qairamapnapi-dev-opensource.qairadrones.com/');
				 socket.on('new_data_summary_processed', data => {
					 console.log(data);
					 if (q.name === data.ID) {
						 const value = indexValue(data);
						 row_data = `
			   <td><strong>${data.ID}</strong></td>
			   <td>${q.comercial_name}</td>
			   <td>${value.time}</td>
			   <td style="color:${value.SO2color}">${value.SO2}</td> 
			   <td style="color:${value.NO2color}">${value.NO2}</td> 
			   <td style="color:${value.COcolor}">${value.CO}</td> 
			   <td style="color:${value.H2Scolor}">${value.H2S}</td>
			   <td style="color:${value.O3color}">${value.O3}</td>  
			   <td style="color:${value.PM25color}">${value.PM25}</td> 
			   <td style="color:${value.PM10color}">${value.PM10}</td> 
			   <td style="color:${value.UVcolor}">${value.UV}</td> 
			   <td>${value.spl}</td>
			   <td>${value.temperature}</td>
			   <td>${value.humidity}</td>
			   <td>${value.pressure}</td>  
			   <td><i class="material-icons" style="color:#32CD32">wifi</i></td>
			   `;
						 row_table.innerHTML = row_data;
					 }
				 });
			 });
	 }
const viewDashboard =()  => {
	const dashboardElem = document.createElement('div');
	dashboardElem.classList.add('dashboard')
	navBarClient(dashboardElem, viewBoard);
		let qhawax_asigned = [];
		
	request(dashboardElem,qhawax_asigned);	
	return dashboardElem;
};

export { viewDashboard, addZero, ppbToECAdash, indexValue, request };
