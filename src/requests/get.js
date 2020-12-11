import { APISource } from '../index.js';

const handleError = (err) => new Response(JSON.stringify({
  code: 400,
  message: 'Stupid network Error xD',
}));

const requestAllQhawax = async() => {
  const response = await fetch(`${APISource}AllQhawaxInMap/`).catch((err) => handleError(err));
  return await response.json();
};

const requestAverageMeasurement = async(qhawax, sensor) => {
  const response = await fetch(`${APISource}gas_average_measurement/?qhawax=${qhawax}&gas=${sensor}`).catch((err) => handleError(err));
  return await response.json();
};

const requestBinnacle = async(ID) => {
  const response = await fetch(`${APISource}get_all_observations_by_qhawax/?qhawaxId=${ID}`).catch((err) => handleError(err));
  return await response.json();
};

const requestStatus = async(ID) => {
  const response = await fetch(`${APISource}qhawax_status/?name=${ID}`);
  return await response.text();
};
const downloadData = async(check, id, init, end) => {
  const URL = check
    ? `${APISource}valid_processed_measurements_period/?qhawaxId=${id}&initial_timestamp=${init}&final_timestamp=${end}`
    : `${APISource}average_valid_processed_period/?qhawaxId=${id}&initial_timestamp=${init}&final_timestamp=${end}`;

  const response = await fetch(URL).catch((err) => handleError(err));
  return await response.json();
};
const requestInstallationDate = async(ID) => {
  const response = await fetch(`${APISource}GetInstallationDate/?qhawaxId=${ID}`);
  return await response.text();
};

const requestGraphicsData = async(qhawax, time) => {
  const response = await fetch(`${APISource}processed_measurements/?name=${qhawax}&interval_minutes=${time}`);
  return await response.json();
};

// const requestDroneTelemetry = async() => {
//   const response = await fetch('../src/lib/telemetry_workshop.json')
//   return await response.json();
// }
export {
  requestAverageMeasurement,
  requestAllQhawax,
  requestBinnacle,
  requestStatus,
  downloadData,
  requestInstallationDate,
  handleError,
  requestGraphicsData,
 
};
