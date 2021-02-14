import { APISource } from '../index.js';
import { toast} from '../lib/helpers.js';

const handleError = (err) => {
  toast(`Please check your internet connection.`,'grey darken-1 rounded')
return  new Response(JSON.stringify({
  code: 400,
  message: 'Stupid network Error xD',
}))

};

const requestAllQhawax = async() => {
  try{
    const response = await fetch(`${APISource}AllQhawaxInMap/`)
    return await response.json();

  }catch(e){
    return handleError(e);
  }
};

const requestAllDrones = async() => {
  try{
    const response = await fetch(`${APISource}AllDronesInMap/`)
    return await response.json();
  }catch(e){
    return handleError(e);
  }
};

const requestAverageMeasurement = async(qhawax, sensor) => {
  try{
    const response = await fetch(`${APISource}gas_average_measurement/?qhawax=${qhawax}&gas=${sensor}`)
    return await response.json();
  }catch(e){
    return handleError(e);
  }
};

const requestBinnacle = async(ID) => {
  try{
    const response = await fetch(`${APISource}get_all_observations_by_qhawax/?qhawax_id=${ID}`)
    return await response.json();
  }catch(e){
    return handleError(e);
  }
};

const requestStatus = async(ID) => {
  try{
    const response = await fetch(`${APISource}qhawax_status/?name=${ID}`)
    return await response.text();
  }catch(e){
    return handleError(e);
  }
};

const downloadData = async(id, init, end) => {
  try{
    const response = await fetch(`${APISource}average_valid_processed_period/?qhawax_id=${id}&initial_timestamp=${init}&final_timestamp=${end}`)
    return await response.json();
  }catch(e){
    return handleError(e);
  }
};

const requestInstallationDate = async(ID) => {
  try{
  const response = await fetch(`${APISource}GetInstallationDate/?qhawax_id=${ID}`);
  return await response.text();
  }catch(e){
    return handleError(e);
  }
};

const requestGraphicsData = async(qhawax, time) => {
  try{
    const response = await fetch(`${APISource}processed_measurements/?name=${qhawax}&interval_minutes=${time}`);
    return await response.json();
  }catch(e){
    return handleError(e);
  }
};

const requestFlightList = async(init, end) => {
  try{
    const response = await fetch(`${APISource}get_drone_flights_period_time?initial_timestamp=${init}&final_timestamp=${end}`);
    return await response.json();
  }catch(e){
    return handleError(e);
  }
}

const requestQhawaxFlight = async(name, init, end) => {
  try{
    const response = await fetch(`${APISource}processed_measurements_andean_drone?qhawax_name=${name}&initial_timestamp=${init}&final_timestamp=${end}`)
    return await response.json();
  }catch(e){
    return handleError(e);
  }
}

const requestTelemetryFlight = async(name, init, end) => {
  try{
    const response = await fetch(`${APISource}telemetry_andean_drone?qhawax_name=${name}&initial_timestamp=${init}&final_timestamp=${end}`)
    return await response.json();
  }catch(e){
    return handleError(e);
  }
}

const lastStartFlight = async(name)=>{
  try{
  const response = await fetch(`${APISource}flight_log_info_by_qhawax_name/?name=${name}`)
  return await response.json();
  }catch(e){
    return handleError(e);
  }
}


const getFlyingDrones = async()=>{
  try{
    const response = await fetch(`${APISource}flight_log_info_during_flight`)
    return await response.json();
  }catch(e){
    return handleError(e);
  }
}

const getInFlightSensor = async(data)=>{
  try{
    const response = await fetch(`${APISource}measurements_by_pollutant_during_flight/?name=${data.name}&pollutant=${data.sensor}`)
    return await response.json();
  }catch(e){
    return handleError(e);
  }
}


export {
  requestAverageMeasurement,
  requestAllQhawax,
  requestBinnacle,
  requestStatus,
  downloadData,
  requestInstallationDate,
  handleError,
  requestGraphicsData,
  requestAllDrones ,
  requestFlightList,
  requestQhawaxFlight,
  requestTelemetryFlight,
  lastStartFlight,
  getFlyingDrones,
  getInFlightSensor
};
