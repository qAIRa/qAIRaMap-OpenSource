import { navBarClient } from '../lib/navBarClient.js';
import { viewBoard } from '../lib/HtmlComponents.js';
import { requestAllQhawax } from '../requests/get.js';
import { addZero } from '../lib/mapAssets.js';
import { openModalDateAlert } from '../lib/pickerErrors.js';

const ECAlimits = {
	CO_ug_m3:30000,NO2_ug_m3:200,O3_ug_m3:100,H2S_ug_m3:150,SO2_ug_m3:250,PM25:50,PM10:100,ID:0,lat:0,lon:0,UV:20,spl:0,timestamp:0,humidity:0,pressure:0,termperature:0,PM1:0
  }

let valuesForDashboard = {
  ID:{value:null,color:''},
  lat:{value:null,color:''},
  lon:{value:null,color:''},
  UV:{value:null,color:''},
  spl:{value:null,color:''},
  timestamp:{value:null,color:''},
  PM1:{value:null,color:''},
  humidity:{value:null,color:''},
  pressure:{value:null,color:''},
  temperature:{value:null,color:''},
  PM10:{value:null,color:''},
  SO2_ug_m3:{value:null,color:''},
  CO_ug_m3:{value:null,color:''},
  H2S_ug_m3:{value:null,color:''},
  PM25:{value:null,color:''},
  O3_ug_m3:{value:null,color:''},
  NO2_ug_m3:{value:null,color:''},
}


const indexValue = (data) => {
  Object.entries(valuesForDashboard).forEach(([key]) => { 
    valuesForDashboard[key].value=data[key]
    valuesForDashboard[key].value >= ECAlimits[key] ? valuesForDashboard[key].color= 'red' : valuesForDashboard[key].color= 'black';
   });
return valuesForDashboard;
  
};

const dashboardRow = (q) =>`
<td><strong>${q.name}</strong></td>
<td>${q.comercial_name}</td>
<td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td>
<td><i class="material-icons" style="color:gray">signal_wifi_off</i></td>`;
const dashboardRowActive =(data,q,value)=>`
<td><strong>${data.ID}</strong></td>
<td>${q.comercial_name}</td>
<td>${new Date(Date.parse(value.timestamp.value)).toLocaleString('en-EN')}</td>
<td style="color:${value.SO2_ug_m3.color}">${value.SO2_ug_m3.value.toFixed(1)}</td>
<td style="color:${value.NO2_ug_m3.color}">${value.NO2_ug_m3.value.toFixed(1)}</td>
<td style="color:${value.CO_ug_m3.color}">${value.CO_ug_m3.value.toFixed(1)}</td>
<td style="color:${value.H2S_ug_m3.color}">${value.H2S_ug_m3.value.toFixed(1)}</td>
<td style="color:${value.O3_ug_m3.color}">${value.O3_ug_m3.value.toFixed(1)}</td>
<td style="color:${value.PM25.color}">${value.PM25.value.toFixed(1)}</td>
<td style="color:${value.PM10.color}">${value.PM10.value.toFixed(1)}</td>
<td style="color:${value.UV.color}">${value.UV.value.toFixed(0)}</td>
<td>${value.spl.value.toFixed(1)}</td>
<td>${value.temperature.value.toFixed(1)}</td>
<td>${value.humidity.value.toFixed(1)}</td>
<td>${(value.pressure.value/1000).toFixed(1)}</td>
<td><i class="material-icons" style="color:#32CD32">wifi</i></td>`;

const request = async(element, qhawax_asigned) => {
  const table_body = element.querySelector('tbody');
	const qhawax_list = await requestAllQhawax();
  qhawax_list.forEach((q) => qhawax_asigned.push(q));
    qhawax_asigned.forEach((q) => {
				 const row_table = document.createElement('tr');
				 row_table.setAttribute('data-name', `${q.name}`);
				 table_body.appendChild(row_table);
				 let row_data = dashboardRow(q)
				 row_table.innerHTML = row_data;
				 const socket = io.connect('https://qairamapnapi-dev-opensource.qairadrones.com/');
				 socket.on('new_data_summary_processed', (data) => {
					 if (q.name === data.ID) {
						 const value = indexValue(data);
						 row_data = dashboardRowActive(data,q,value)
						 row_table.innerHTML = row_data;
					 }
				 });
			 });
   };
   
const viewDashboard = () => {
  const dashboardElem = document.createElement('div');
  dashboardElem.classList.add('dashboard');
  navBarClient(dashboardElem, viewBoard);
  const qhawax_asigned = [];
  request(dashboardElem, qhawax_asigned);
  return dashboardElem;
};

export {
  viewDashboard, addZero, indexValue, request, dashboardRow, dashboardRowActive
};
