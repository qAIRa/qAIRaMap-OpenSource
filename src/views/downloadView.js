import {
	openModalDateAlert,
	openModalEmptyAlert,
	toTimestamp,
} from '../lib/pickerErrors.js';
import { json2csv, download } from '../lib/fromJsonToCsv.js';
import { navBarClient} from '../lib/navBarClient.js';
import { viewDownload} from '../lib/HtmlComponents.js';
import { requestAllQhawaxByCompany} from '../requests/get.js';

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


const downloadView =() => {

	M.toast({ html: '¡First select a Module!' });
	M.toast({ html: 'Please complete all fields.' });

	const downloadElem = document.createElement('div');

		navBarClient(downloadElem, viewDownload);
	
	const selection = downloadElem.querySelectorAll('select');
	M.FormSelect.init(selection);

	const switchData = downloadElem.querySelector('#select-data');

	let array_qhawax = [];

		const request = async () => {
   //COMPANY
			const qhawax_list = await requestAllQhawaxByCompany(1);
		
			const addOptions = downloadElem.querySelector('#selectQhawax');

			qhawax_list.forEach(qhawax => {
				const option = document.createElement('option');
				option.setAttribute('value', qhawax.qhawax_id);
				option.innerText =
					qhawax.name + ': ' + qhawax.comercial_name;
				array_qhawax.push(qhawax);
				addOptions.appendChild(option);
			});
		};

		request();

	let selectedParameters = {};

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
		const arrayInitDate =
			typeof selectedParameters.initDate === 'undefined'
				? false
				: selectedParameters.initDate.split('/');
		const arrayEndDate =
			typeof selectedParameters.endDate === 'undefined'
				? false
				: selectedParameters.endDate.split('/');
		const arrayInitTime =
			typeof selectedParameters.initHour === 'undefined' ||
			selectedParameters.initHour === ''
				? false
				: selectedParameters.initHour.split(':');
		const arrayEndTime =
			typeof selectedParameters.endHour === 'undefined' ||
			selectedParameters.endHour === ''
				? false
				: selectedParameters.endHour.split(':');

		const initial_timestamp = toTimestamp(
			arrayInitDate,
			arrayInitTime
		).toUTCString();
		const final_timestamp = toTimestamp(
			arrayEndDate,
			arrayEndTime
		).toUTCString();

		if (
			!arrayInitDate ||
			!arrayEndDate ||
			!arrayInitTime ||
			!arrayEndTime
		) {
			openModalEmptyAlert();
		} else {
			if (Date.parse(initial_timestamp) >= Date.parse(final_timestamp)) {
				openModalDateAlert();
			} else {
				const URL = switchData.checked
					? `https://qairamapnapi-dev-opensource.qairadrones.com/api/valid_processed_measurements_period/?qhawax_id=${selectedParameters.id}&initial_timestamp=${initial_timestamp}&final_timestamp=${final_timestamp}`
					: `https://qairamapnapi-dev-opensource.qairadrones.com/api/average_valid_processed_period/?qhawax_id=${selectedParameters.id}&initial_timestamp=${initial_timestamp}&final_timestamp=${final_timestamp}`;

				const request = async () => {
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

				request();
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
