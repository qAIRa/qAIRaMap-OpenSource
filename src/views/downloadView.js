import {
	openModalDateAlert,
	openModalEmptyAlert,
	toTimestamp,
} from '../lib/pickerErrors.js';
import { json2csv, download } from '../lib/fromJsonToCsv.js';
import { navBarClient} from '../lib/navBarClient.js';
import { viewDownload} from '../lib/HtmlComponents.js';
import { requestAllQhawaxByCompany} from '../requests/get.js';

let array_qhawax = [];
let selectedParameters = {company:18};
const reorderDate = (str) =>str.split("-").reverse().join("-");

const csvFields = [
	'CO (ug/m3)',
	'H2S (ug/m3)',
	'NO2 (ug/m3)',
	'O3 (ug/m3)',
	'PM10 (ug/m3)',
	'PM2.5 (ug/m3)',
	'SO2 (ug/m3)',
	'Ruido (dB)',
	'UV',
	'Humedad (%)',
	'Latitud',
	'Longitud',
	'Presion (Pa)',
	'Temperatura (C)',
	'Fecha',
];

const waitingLoader = `
<div class="progress">
      <div class="indeterminate"></div>
  </div>
`;

const optionsDatePicker = {
	format: 'dd-mm-yyyy',
};

const optionsTimePicker = {
	twelveHour: false,
};

const requestQhawaxList = async (element) => {
	//COMPANY
			 const qhawax_list = await requestAllQhawaxByCompany(1);
		 
			 const addOptions = element.querySelector('#selectQhawax');
 
			 qhawax_list.forEach(qhawax => {
				 const option = document.createElement('option');
				 option.setAttribute('value', qhawax.qhawax_id);
				 option.innerText =
					 qhawax.name + ': ' + qhawax.comercial_name;
				 array_qhawax.push(qhawax);
				 addOptions.appendChild(option);
			 });
		 };

const requestData = async () => {
			let filename = switchData.checked
				? 'Data Cruda-'
				: 'Promedio Horario-';
			const response = await fetch(URL);
			const json = await response.json();

			array_qhawax.forEach(qhawax => {
				filename +=
					Number(selectedParameters.id) ===
					Number(qhawax.qhawax_id)
						? `${qhawax.name}` +
						  '-' +
						  `${qhawax.comercial_name}`
						: '';
			});

			const csvContent = json2csv(json, csvFields);
			download(
				csvContent,
				`${filename}.csv`,
				'text/csv;encoding:utf-8'
			);
			window.location.reload();
		};

const downloadView =() => {

	M.toast({ html: '¡First select a Module!' });
	M.toast({ html: 'Please complete all fields.' });

	const downloadElem = document.createElement('div');

	navBarClient(downloadElem, viewDownload);
	
	const selection = downloadElem.querySelectorAll('select');
	M.FormSelect.init(selection);

	const switchData = downloadElem.querySelector('#select-data');

	requestQhawaxList(downloadElem);

	selection[0].onchange = () => {
		fetch(
			`https://qairamapnapi-dev.qairadrones.com/api/GetInstallationDate/?qhawax_id=${selection[0].value}`
		)
			.then(res => res.text())
			.then(installationDate => {
				const datePicker = downloadElem.querySelectorAll('.datepicker');
				selectedParameters.id = selection[0].value;

				optionsDatePicker.minDate = new Date(installationDate);
				optionsDatePicker.maxDate = new Date(Date.now());
				optionsDatePicker.onClose = () => {
					selectedParameters.initDate = datePicker[0].value;
					selectedParameters.endDate = datePicker[1].value;
				};
				optionsTimePicker.onCloseEnd = () => {
					selectedParameters.initHour = timePicker[0].value;
					selectedParameters.endHour = timePicker[1].value;
					console.log(selectedParameters);
					
				};

				
				M.Datepicker.init(datePicker, optionsDatePicker);

				const timePicker = downloadElem.querySelectorAll('.timepicker');
				M.Timepicker.init(timePicker, optionsTimePicker);
			});
	};
	const downloadBtn = downloadElem.querySelector('#submit-btn');
	downloadBtn.addEventListener('click', (e) => {
		e.preventDefault()

		const initial_timestamp = String(selectedParameters.initDate+' '+selectedParameters.initHour+':00');
		const final_timestamp = String(selectedParameters.endDate+' '+selectedParameters.endHour+':00');
		const initial_value = reorderDate(selectedParameters.initDate) + ' '+selectedParameters.initHour;
		const final_value= reorderDate(selectedParameters.endDate) + ' '+selectedParameters.endHour;

		if (Object.values(selectedParameters).includes("")||Object.values(selectedParameters).length<5) {
			openModalEmptyAlert();
		} else {
			if (Date.parse(initial_value) >= Date.parse(final_value)) {
				openModalDateAlert();
			} else {
				const URL = switchData.checked
					? `https://qairamapnapi-dev.qairadrones.com/api/valid_processed_measurements_period/?qhawax_id=${selectedParameters.id}&company_id=${selectedParameters.company}&initial_timestamp=${initial_timestamp}&final_timestamp=${final_timestamp}`
					: `https://qairamapnapi-dev.qairadrones.com/api/average_valid_processed_period/?qhawax_id=${selectedParameters.id}&company_id=${selectedParameters.company}&initial_timestamp=${initial_timestamp}&final_timestamp=${final_timestamp}`;

				requestData();
				M.toast({
					html: 'The download may take 5 minutes...',
					displayLength: 10000,
				});
				M.toast({
					html: '¡We are preparing the data!',
					displayLength: 6000,
				});

				const pannel = document.querySelector('.card-pannel');
				pannel.innerHTML = waitingLoader;
			}
		}
	});

	return downloadElem;
};

export { downloadView };
