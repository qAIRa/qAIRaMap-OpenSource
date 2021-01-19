import { APISource } from '../index.js';

const handleError = (err) => new Response(JSON.stringify({
  code: 400,
  message: 'Stupid network Error xD',
}));

const requestAllQhawax = async() => {
  const response = await fetch(`${APISource}AllQhawaxInMap/`).catch((err) => handleError(err));
  return await response.json();
};

const requestAllDrones = async() => {
  const response = await fetch(`${APISource}AllDronesInMap/`).catch((err) => handleError(err));
  return await response.json();
};

const requestAverageMeasurement = async(qhawax, sensor) => {
  const response = await fetch(`${APISource}gas_average_measurement/?qhawax=${qhawax}&gas=${sensor}`).catch((err) => handleError(err));
  return await response.json();
};

const requestBinnacle = async(ID) => {
  const response = await fetch(`${APISource}get_all_observations_by_qhawax/?qhawax_id=${ID}`).catch((err) => handleError(err));
  return await response.json();
};

const requestStatus = async(ID) => {
  const response = await fetch(`${APISource}qhawax_status/?name=${ID}`);
  return await response.text();
};
const downloadData = async(id, init, end) => {
  const response = await fetch(`${APISource}average_valid_processed_period/?qhawax_id=${id}&initial_timestamp=${init}&final_timestamp=${end}`)
  return await response.json();
};
const requestInstallationDate = async(ID) => {
  const response = await fetch(`${APISource}GetInstallationDate/?qhawax_id=${ID}`);
  return await response.text();
};

const requestGraphicsData = async(qhawax, time) => {
  const response = await fetch(`${APISource}processed_measurements/?name=${qhawax}&interval_minutes=${time}`);
  return await response.json();
};


export {
  requestAverageMeasurement,
  requestAllQhawax,
  requestBinnacle,
  requestStatus,
  downloadData,
  requestInstallationDate,
  handleError,
  requestGraphicsData,
 requestAllDrones
};
