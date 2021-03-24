import { navBarQhawax } from '../lib/navBarQhawax.js';
import {viewBoard} from '../html/dashboard.js'
import { noParametersRequest} from '../requests/get.js';
import { socket } from '../index.js';

const ECAlimits = {
	CO_ug_m3:30000,
	NO2_ug_m3:200,
	O3_ug_m3:100,
	H2S_ug_m3:150,
	SO2_ug_m3:250,
	PM25:50,
	PM10:100,
	ID:0,
	lat:0,
	lon:0,
	UV:20,
	spl:0,
	timestamp:0,
	humidity:0,
	pressure:0,
	termperature:0,
	PM1:0
  }
  
  let valuesForDashboard = {
	ID:null,
	lat:null,
	lon:null,
	UV:null,
	spl:null,
	timestamp:null,
	PM1:null,
	humidity:null,
	pressure:null,
	temperature:null,
	I_temperature:null,
	PM10:null,
	SO2_ug_m3:null,
	CO_ug_m3:null,
	H2S_ug_m3:null,
	PM25:null,
	O3_ug_m3:null,
	NO2_ug_m3:null,
  }
  
  
export  const indexValue = (data) => {
	Object.entries(valuesForDashboard).forEach(([key]) => { 
	  valuesForDashboard[key]=data[key]
	  valuesForDashboard[key] >= ECAlimits[key] ||
	  valuesForDashboard[key] < 0  ||
	  valuesForDashboard[key] ===null
	  ? valuesForDashboard[key]='_': valuesForDashboard[key]=data[key];
	 });
  return valuesForDashboard;
  };

 export const dashboardRow = (q) =>`
<td><strong>${q.name}</strong></td>
<td>${q.comercial_name}</td>
<td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td>
<td><i class="material-icons" style="color:gray">signal_wifi_off</i></td>`;
 export const dashboardRowActive =(data,q,value)=>`
<td><strong>${data.ID}</strong></td>
<td>${q.comercial_name}</td>
<td>${new Date(Date.parse(value.timestamp)).toLocaleString('en-EN')}</td>
<td>${value.SO2_ug_m3}</td>
<td>${value.NO2_ug_m3}</td>
<td>${value.CO_ug_m3}</td>
<td>${value.H2S_ug_m3}</td>
<td>${value.O3_ug_m3}</td>
<td>${value.PM25}</td>
<td>${value.PM10}</td>
<td>${value.UV}</td>
<td>${value.spl}</td>
<td>${value.temperature}</td>
<td>${value.humidity}</td>
<td>${value.pressure}</td>
<td><i class="material-icons" style="color:#32CD32">wifi</i></td>`;

const callSocket = (q, row_table) => {
		socket.on(`${q.name}_processed`, data => {
			if (q.name === data.ID) {
				const value = indexValue(data);
				let row_data = dashboardRowActive(data,q,value);
				row_table.innerHTML = row_data;
			}
		});
}


 export const createRow = (element, qhawax_asigned) => {
	const table_body = element.querySelector('tbody');
	qhawax_asigned.forEach(q => {
		const row_table = document.createElement('tr');
		row_table.setAttribute('data-name', `${q.name}`);
		table_body.appendChild(row_table);
		row_table.innerHTML = dashboardRow(q);
		callSocket(q, row_table)
	});
}
 export const request = async () => {
	const qhawax_asigned = [];
	await noParametersRequest('AllQhawaxInMap/')
	.then(r=>r.forEach(q => qhawax_asigned.push(q)))
	return qhawax_asigned;
}

 export const viewDashboard = () => {
  const dashboardElem = document.createElement('div');
    dashboardElem.classList.add('dashboard');
	navBarQhawax(dashboardElem, viewBoard);
	request().then(list =>createRow(dashboardElem, list ));
    return dashboardElem;
};




