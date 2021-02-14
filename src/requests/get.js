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
    const response = await fetch(`${APISource}AllQhawaxInMap/`).catch(e=>handleError(e))
    return await response.json();
};

const requestAllDrones = async() => {

    const response = await fetch(`${APISource}AllDronesInMap/`).catch(e=>handleError(e))
    return await response.json();

};

const requestAverageMeasurement = async(qhawax, sensor) => {

    const response = await fetch(`${APISource}gas_average_measurement/?qhawax=${qhawax}&gas=${sensor}`).catch(e=>handleError(e))
    return await response.json();

};

const requestBinnacle = async(ID) => {

    const response = await fetch(`${APISource}get_all_observations_by_qhawax/?qhawax_id=${ID}`).catch(e=>handleError(e))
    return await response.json();

};

const requestStatus = async(ID) => {

    const response = await fetch(`${APISource}qhawax_status/?name=${ID}`).catch(e=>handleError(e))
    return await response.text();

};

const downloadData = async(id, init, end) => {

    const response = await fetch(`${APISource}average_valid_processed_period/?qhawax_id=${id}&initial_timestamp=${init}&final_timestamp=${end}`).catch(e=>handleError(e))
    return await response.json();

};

const requestInstallationDate = async(ID) => {

  const response = await fetch(`${APISource}GetInstallationDate/?qhawax_id=${ID}`).catch(e=>handleError(e))
  return await response.text();

};

const requestGraphicsData = async(qhawax, time) => {

    const response = await fetch(`${APISource}processed_measurements/?name=${qhawax}&interval_minutes=${time}`).catch(e=>handleError(e))
    return await response.json();

};

const requestFlightList = async(init, end) => {

    const response = await fetch(`${APISource}get_drone_flights_period_time?initial_timestamp=${init}&final_timestamp=${end}`).catch(e=>handleError(e))
    return await response.json();

}

const requestQhawaxFlight = async(name, init, end) => {

    const response = await fetch(`${APISource}processed_measurements_andean_drone?qhawax_name=${name}&initial_timestamp=${init}&final_timestamp=${end}`).catch(e=>handleError(e))
    return await response.json();

}

const requestTelemetryFlight = async(name, init, end) => {

    const response = await fetch(`${APISource}telemetry_andean_drone?qhawax_name=${name}&initial_timestamp=${init}&final_timestamp=${end}`).catch(e=>handleError(e))
    return await response.json();

}

const lastStartFlight = async(name)=>{

  const response = await fetch(`${APISource}flight_log_info_by_qhawax_name/?name=${name}`).catch(e=>handleError(e))
  return await response.json();

}


const getFlyingDrones = async()=>{

    const response = await fetch(`${APISource}flight_log_info_during_flight`).catch(e=>handleError(e))
    return await response.json();

}

const getInFlightSensor = async(data)=>{

    const response = await fetch(`${APISource}measurements_by_pollutant_during_flight/?name=${data.name}&pollutant=${data.sensor}`).catch(e=>handleError(e))
    return await response.json();

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
