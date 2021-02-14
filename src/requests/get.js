import { APISource } from '../index.js';
import { toast} from '../lib/helpers.js';

export const handleError = (err) => {
  toast(`Please check your internet connection.`,'grey darken-1 rounded')
return  new Response(JSON.stringify({
  code: 400,
  message: err,
}))

};

export const noParametersRequest= async(address)=>{
  const response = await fetch(`${APISource+address}`).catch(e=>handleError(e))
    return await response.json();
}

export const oneParameterRequest= async(address, ID)=>{
  const response = await fetch(`${APISource+address+ID}`).catch(e=>handleError(e))
    return await response.text();
}


export const requestAverageMeasurement = async(qhawax, sensor) => {

    const response = await fetch(`${APISource}gas_average_measurement/?qhawax=${qhawax}&gas=${sensor}`).catch(e=>handleError(e))
    return await response.json();

};

export const requestBinnacle = async(ID) => {

    const response = await fetch(`${APISource}get_all_observations_by_qhawax/?qhawax_id=${ID}`).catch(e=>handleError(e))
    return await response.json();

};

export const downloadData = async(id, init, end) => {

    const response = await fetch(`${APISource}average_valid_processed_period/?qhawax_id=${id}&initial_timestamp=${init}&final_timestamp=${end}`).catch(e=>handleError(e))
    return await response.json();

};

export const requestGraphicsData = async(qhawax, time) => {

    const response = await fetch(`${APISource}processed_measurements/?name=${qhawax}&interval_minutes=${time}`).catch(e=>handleError(e))
    return await response.json();

};

export const requestFlightList = async(init, end) => {

    const response = await fetch(`${APISource}get_drone_flights_period_time?initial_timestamp=${init}&final_timestamp=${end}`).catch(e=>handleError(e))
    return await response.json();

}

export const requestQhawaxFlight = async(name, init, end) => {

    const response = await fetch(`${APISource}processed_measurements_andean_drone?qhawax_name=${name}&initial_timestamp=${init}&final_timestamp=${end}`).catch(e=>handleError(e))
    return await response.json();

}

export const requestTelemetryFlight = async(name, init, end) => {

    const response = await fetch(`${APISource}telemetry_andean_drone?qhawax_name=${name}&initial_timestamp=${init}&final_timestamp=${end}`).catch(e=>handleError(e))
    return await response.json();

}

export const lastStartFlight = async(name)=>{

  const response = await fetch(`${APISource}flight_log_info_by_qhawax_name/?name=${name}`).catch(e=>handleError(e))
  return await response.json();

}


export const getInFlightSensor = async(data)=>{

    const response = await fetch(`${APISource}measurements_by_pollutant_during_flight/?name=${data.name}&pollutant=${data.sensor}`).catch(e=>handleError(e))
    return await response.json();

}

