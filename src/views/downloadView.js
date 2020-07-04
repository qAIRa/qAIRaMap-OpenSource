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
	format: 'dd/mm/yyyy',
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


const downloadView = company => {
	
	M.toast({ html: '¡Primero selecciona un Módulo!' });
	M.toast({ html: 'Por favor ingresa todos los campos' });

	const downloadElem = document.createElement('div');

		navBarClient(downloadElem, viewDownload, company);
	
	const selection = downloadElem.querySelectorAll('select');
	M.FormSelect.init(selection);

	const switchData = downloadElem.querySelector('#select-data');

	let array_qhawax = [];

		const request = async () => {
   
			const qhawax_list = await requestAllQhawaxByCompany(company);
		
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

	let selectedParameters = {
		company,
	};

	selection[0].onchange = () => {
		fetch(
			`https://qairamapnapi-dev.qairadrones.com/api/GetInstallationDate/?qhawax_id=${selection[0].value}`
		)
			.then(res => res.text())
			.then(installationDate => {
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
				};

				const datePicker = downloadElem.querySelectorAll('.datepicker');
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
					? `https://qairamapnapi-dev.qairadrones.com/api/valid_processed_measurements_period/?qhawax_id=${selectedParameters.id}&company_id=${selectedParameters.company}&initial_timestamp=${initial_timestamp}&final_timestamp=${final_timestamp}`
					: `https://qairamapnapi-dev.qairadrones.com/api/average_valid_processed_period/?qhawax_id=${selectedParameters.id}&company_id=${selectedParameters.company}&initial_timestamp=${initial_timestamp}&final_timestamp=${final_timestamp}`;

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
					html: 'La descarga puede demorar unos 5 minutos...',
					displayLength: 10000,
				});
				M.toast({
					html: '¡Estamos preparando la data!',
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
