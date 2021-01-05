import {
  openModalDateAlert,
  openModalEmptyAlert,
} from '../lib/pickerErrors.js';
import { json2csv, download } from '../lib/fromJsonToCsv.js';
import { navBarClient } from '../lib/navBarClient.js';
import { viewDownload } from '../lib/HtmlComponents.js';
import { requestAllQhawax, downloadData, requestInstallationDate } from '../requests/get.js';
import { optionsDatePicker, optionsTimePicker } from '../lib/mapAssets.js';

const reorderDate = (str) => str.split('-').reverse().join('-');

const withLocalTime = (date) => {
  const local_time = new Date(date).toJSON();
  return local_time?reorderDate(local_time.slice(0,10)) + ' '+ local_time.slice(11,19):'';
};

const csvFields = [
  'CO (ug/m3)',
  'H2S (ug/m3)',
  'NO2 (ug/m3)',
  'O3 (ug/m3)',
  'PM10 (ug/m3)',
  'PM2.5 (ug/m3)',
  'SO2 (ug/m3)',
  'Noise (dB)',
  'UV',
  'Humidity (%)',
  'Latitude',
  'Longitude',
  'Pressure (Pa)',
  'Temperature (C)',
  'Date',
];

const waitingLoader = `
<div class="progress">
      <div class="indeterminate"></div>
  </div>
`;
const array_qhawax = [];
const selectedParameters = {};

const requestQhawaxs = async(element) => {
  const qhawax_list = await requestAllQhawax();
  const addOptions = element.querySelector('#selectQhawax');
  qhawax_list.forEach((qhawax) => {
    const option = document.createElement('option');
    option.setAttribute('value', qhawax.qhawax_id);
    option.innerText =	qhawax.name + ': ' + qhawax.comercial_name;;
    array_qhawax.push(qhawax);
    addOptions.appendChild(option);
  });
};

const requestDownload = async(init, end) => {
  let filename = '';
  const json = await downloadData( selectedParameters.id, init, end);
  console.log(json);
  array_qhawax.forEach((qhawax) => {
    filename +=	Number(selectedParameters.id) === Number(qhawax.qhawax_id)
      ? `${qhawax.name}`
				  + '-'
				  + `${qhawax.comercial_name}`
      : '';
  });

  const csvContent = json2csv(json, csvFields);
  csvContent!=='' ? download(csvContent, filename):M.Toast.dismissAll()||M.toast({ html: 'No hay data válida para el periodo.',
	displayLength: 3000, });
	 setTimeout(()=>window.location.reload(), 2000)
};

const installationDateReq = async(selection, element) => {
  const installationDate = await requestInstallationDate(selection[0].value);

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

  const datePicker = element.querySelectorAll('.datepicker');
  M.Datepicker.init(datePicker, optionsDatePicker);

  const timePicker = element.querySelectorAll('.timepicker');
  M.Timepicker.init(timePicker, optionsTimePicker);
};

const initialToast = () => {
  M.toast({ html: 'First select a module!' });
  M.toast({ html: 'Please complete all fields.' });
  return 'init';
};

const finalToast = () => {
  M.toast({
    html: 'The date may take 5 minutes...',
    displayLength: 10000,
  });
  M.toast({
    html: 'We are preparing your data!',
    displayLength: 6000,
  });
  return 'final'
};

const downloadView = () => {
  initialToast();

  const downloadElem = document.createElement('div');

 navBarClient(downloadElem, viewDownload)

  requestQhawaxs(downloadElem);

  const selection = downloadElem.querySelectorAll('select');
  M.FormSelect.init(selection);

  selection[0].onchange = () => {
    installationDateReq(selection, downloadElem);
  };

  const downloadBtn = downloadElem.querySelector('#submit-btn');

  downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const initial_timestamp = withLocalTime(selectedParameters.initDate+' '+selectedParameters.initHour+':00');
		const final_timestamp = withLocalTime(selectedParameters.endDate+' '+selectedParameters.endHour+':00');
    const initial_value = reorderDate(selectedParameters.initDate) + ' '+selectedParameters.initHour;
		const final_value= reorderDate(selectedParameters.endDate) + ' '+selectedParameters.endHour;
    if (Object.values(selectedParameters).includes('') || Object.values(selectedParameters).length < 5) {
      openModalEmptyAlert();
    } else if (Date.parse(initial_value) >= Date.parse(final_value)) {
      openModalDateAlert();
    } else {
      console.log(initial_timestamp, final_timestamp);
         requestDownload(initial_timestamp, final_timestamp)
         
      finalToast();
      const pannel = document.querySelector('.card-pannel');
      pannel.innerHTML = waitingLoader;
    }
  });

  return downloadElem;
};

export { 
  downloadView, 
  reorderDate, 
  withLocalTime, 
  requestQhawaxs, 
  requestDownload, 
  installationDateReq,
  initialToast,
  finalToast
};
